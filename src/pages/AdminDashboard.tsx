
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

// Simplified UserAction type focusing on just action and timestamp
type UserAction = {
  id: string;
  action: string;
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
      console.log("Fetching user actions from Supabase...");
      
      // Make the query as simple as possible - just get id, action, and timestamp
      const { data, error } = await supabase
        .from('user_actions')
        .select('id, action, timestamp');
      
      if (error) {
        console.error("Error fetching actions from Supabase:", error);
        throw error;
      }
      
      // Log complete raw response to debug
      console.log("Raw response:", JSON.stringify(data));
      
      if (data && Array.isArray(data) && data.length > 0) {
        console.log(`Found ${data.length} user actions`);
        data.forEach((item, index) => {
          console.log(`Item ${index}:`, JSON.stringify(item));
        });
        
        setActions(data as UserAction[]);
        toast.success(`Loaded ${data.length} user actions`);
      } else {
        console.log("No user actions found or invalid response format");
        console.log("Data value:", data);
        setActions([]);
        toast.info("No user actions found");
      }
    } catch (err: any) {
      console.error("Failed to fetch user actions:", err);
      setError(err.message || "Failed to load user actions");
      toast.error("Failed to load data from Supabase");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load actions immediately
    fetchActions();
    
    // Set up realtime subscription for new actions
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'user_actions' 
        }, 
        (payload) => {
          console.log("Received new action via realtime:", payload);
          setActions(currentActions => [payload.new as UserAction, ...currentActions]);
          toast.info(`New action: ${(payload.new as UserAction).action}`);
        }
      )
      .subscribe((status) => {
        console.log("Supabase channel status:", status);
      });
    
    // Cleanup subscription
    return () => {
      console.log("Cleaning up Supabase channel subscription");
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (err) {
      console.error("Error formatting date:", dateString, err);
      return dateString;
    }
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
            <ScrollArea className="h-[60vh]">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {actions.map((action) => (
                      <TableRow key={action.id}>
                        <TableCell>{formatDate(action.timestamp)}</TableCell>
                        <TableCell className="font-medium">{action.action}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
