
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '../components/ui/button';
import { getAllUserActions } from '../utils/trackUserAction';

type UserAction = {
  id: string;
  action: string;
  details: string | null;
  timestamp: string;
};

const AdminDashboard = () => {
  const [actions, setActions] = useState<UserAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch actions from Supabase
      const { data, error } = await supabase
        .from('user_actions')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setActions(data as UserAction[]);
      } else {
        // Fallback to in-memory actions if no data from Supabase
        setActions(getAllUserActions() as unknown as UserAction[]);
      }
    } catch (err: any) {
      console.error("Error fetching actions:", err);
      setError(err.message || "Failed to load user actions");
      
      // Fallback to in-memory actions
      setActions(getAllUserActions() as unknown as UserAction[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActions();
    
    // Set up real-time subscription for new actions
    const channel = supabase
      .channel('public:user_actions')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'user_actions' 
        }, 
        (payload) => {
          // Add new action to the list
          setActions(currentActions => [payload.new as UserAction, ...currentActions]);
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline"
            onClick={fetchActions}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <ReloadIcon className="h-4 w-4" />}
            Refresh
          </Button>
        </header>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Interactions</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 mb-4 rounded-md">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center py-8">
              <ReloadIcon className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : actions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No user actions recorded yet. Try interacting with the app first.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {actions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell>{formatDate(action.timestamp)}</TableCell>
                      <TableCell className="font-medium">{action.action}</TableCell>
                      <TableCell>{action.details || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
