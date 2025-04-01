
import React, { useState, useEffect } from 'react';
import { getAllUserActions } from '../utils/trackUserAction';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const AdminDashboard = () => {
  const [actions, setActions] = useState<any[]>([]);

  useEffect(() => {
    // Update the actions when the component mounts
    setActions(getAllUserActions());

    // Set up an interval to refresh the data every few seconds
    const interval = setInterval(() => {
      setActions(getAllUserActions());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Interactions</h2>
          
          {actions.length === 0 ? (
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
