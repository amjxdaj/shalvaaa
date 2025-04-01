
import { supabase } from "@/integrations/supabase/client";

// Type for user actions
type UserAction = {
  id: string;
  action: string;
  timestamp: Date;
  details?: string;
};

// In-memory store (will reset on page refresh, used as a fallback)
const userActions: UserAction[] = [];

export const trackUserAction = async (action: string, details?: string) => {
  const newAction: UserAction = {
    id: crypto.randomUUID(),
    action,
    timestamp: new Date(),
    details,
  };
  
  // Add to in-memory store as fallback
  userActions.push(newAction);
  
  // Store in Supabase
  try {
    await supabase
      .from('user_actions')
      .insert({
        action: action,
        details: details || null
      });
    console.log("Action tracked and stored in Supabase:", newAction);
  } catch (error) {
    console.error("Failed to store action in Supabase:", error);
  }
  
  return newAction;
};

// Fallback method that uses in-memory storage
export const getAllUserActions = () => {
  return [...userActions];
};
