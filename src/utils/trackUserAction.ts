
// Simple in-memory storage for user actions (in a real app, this would use a database)
type UserAction = {
  id: string;
  action: string;
  timestamp: Date;
  details?: string;
};

// In-memory store (will reset on page refresh)
const userActions: UserAction[] = [];

export const trackUserAction = (action: string, details?: string) => {
  const newAction: UserAction = {
    id: crypto.randomUUID(),
    action,
    timestamp: new Date(),
    details,
  };
  
  userActions.push(newAction);
  console.log("Action tracked:", newAction);
  
  // In a real app, you'd send this to a backend
  return newAction;
};

export const getAllUserActions = () => {
  return [...userActions];
};
