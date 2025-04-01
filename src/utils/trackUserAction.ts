
import { supabase } from "@/integrations/supabase/client";

// Type for user actions
type UserAction = {
  id: string;
  action: string;
  timestamp: Date;
  details?: string | null;
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
    console.log("Storing action in Supabase:", { action, details });
    
    const { error } = await supabase
      .from('user_actions')
      .insert({
        action: action,
        details: details || null
      });
      
    if (error) {
      console.error("Failed to store action in Supabase:", error);
      throw error;
    }
    
    console.log("Action tracked and stored in Supabase:", newAction);
  } catch (error) {
    console.error("Failed to store action in Supabase:", error);
  }
  
  return newAction;
};

// Fallback method that uses in-memory storage
export const getAllUserActions = () => {
  console.log("Getting all user actions from memory, count:", userActions.length);
  return [...userActions];
};
