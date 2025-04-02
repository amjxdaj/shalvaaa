
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  
  console.log("Attempting to track action:", { action, details });
  
  // Store in Supabase
  try {
    // Ensure we're passing values in the correct format expected by Supabase
    const { data, error } = await supabase
      .from('user_actions')
      .insert({
        action: action,
        details: details || null
      });
      
    if (error) {
      console.error("Failed to store action in Supabase:", error);
      toast.error("Failed to record action");
      return newAction;
    }
    
    console.log("Action successfully tracked in Supabase");
    return newAction;
  } catch (error) {
    console.error("Exception when storing action in Supabase:", error);
    toast.error("Failed to record action");
    return newAction;
  }
};

// Fallback method that uses in-memory storage
export const getAllUserActions = () => {
  return [...userActions];
};
