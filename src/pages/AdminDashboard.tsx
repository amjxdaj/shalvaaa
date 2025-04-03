
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

// Basic user action type
type UserAction = {
  id: string;
  action: string;
  timestamp: string;
};

const AdminDashboard = () => {
  const [actions, setActions] = useState<UserAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<string>('');

  const fetchActions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching user actions from Supabase...");
      
      // Simplest possible query
      const { data, error } = await supabase
        .from('user_actions')
        .select('id, action, timestamp');
      
      if (error) {
        console.error("Error fetching actions:", error);
        setError(`Failed to load actions: ${error.message}`);
        toast.error("Error loading user actions");
        setActions([]);
        return;
      }
      
      console.log("Raw data response:", data);
      
      if (data && Array.isArray(data)) {
        console.log(`Found ${data.length} user actions`);
        setActions(data);
        if (data.length > 0) {
          toast.success(`Loaded ${data.length} user actions`);
        } else {
          toast.info("No user actions found");
        }
      } else {
        console.error("Invalid data response format:", data);
        setError("Invalid response from database");
        setActions([]);
      }
    } catch (err: any) {
      console.error("Exception occurred:", err);
      setError("Failed to load user actions");
      toast.error("Error loading data");
      setActions([]);
    } finally {
      setLoading(false);
      setLastFetchTime(new Date().toLocaleTimeString());
    }
  };

  // Create test data for verification
  const createTestAction = async () => {
    try {
      const { data, error } = await supabase
        .from('user_actions')
        .insert({
          action: `Test action ${new Date().toLocaleTimeString()}`,
          details: "Generated for testing"
        })
        .select();
        
      if (error) {
        toast.error("Failed to create test action");
        console.error("Error creating test action:", error);
      } else {
        toast.success("Test action created");
        console.log("Test action created:", data);
        fetchActions(); // Refresh the list
      }
    } catch (err) {
      console.error("Exception creating test action:", err);
    }
  };

  useEffect(() => {
    fetchActions();
    
    // Set up realtime subscription
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
          fetchActions(); // Refresh the entire list when a new action is added
        }
      )
      .subscribe();
    
    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (err) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={fetchActions}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <ReloadIcon className="h-4 w-4" />}
              Refresh
            </Button>
            <Button
              variant="secondary"
              onClick={createTestAction}
              disabled={loading}
            >
              Create Test Action
            </Button>
          </div>
        </header>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Interactions</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 mb-4 rounded-md">
              {error}
            </div>
          )}
          
          <div className="mb-4 text-sm text-gray-500">
            Last refreshed: {lastFetchTime || 'Never'}
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <ReloadIcon className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : actions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No user actions recorded yet. Try interacting with the app or use the "Create Test Action" button.
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
          
          <div className="mt-8 p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <p className="text-xs text-gray-600">
              Supabase URL: {supabase.constructor['url'] || 'Unknown'}
            </p>
            <p className="text-xs text-gray-600">
              Connected to table: public.user_actions
            </p>
            <p className="text-xs text-gray-600">
              Actions loaded: {actions.length}
            </p>
            <Button size="sm" variant="ghost" onClick={() => console.log("Current actions state:", actions)}>
              Log Current State
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
