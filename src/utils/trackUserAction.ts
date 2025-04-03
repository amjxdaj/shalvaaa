
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
  
  console.log("Attempting to track action:", { action, details });
  
  // Store in Supabase
  try {
    // Insert with explicit fields and return the inserted data
    const { error, data } = await supabase
      .from('user_actions')
      .insert({
        action: action,
        details: details || null
      })
      .select();
      
    if (error) {
      console.error("Failed to store action in Supabase:", error);
      // Store in memory as fallback
      userActions.push(newAction);
      toast.error("Failed to save action");
      return newAction;
    }
    
    console.log("Action successfully tracked in Supabase, returned data:", data);
    toast.success("Action tracked successfully");
    return newAction;
  } catch (error) {
    console.error("Exception when storing action in Supabase:", error);
    // Store in memory as fallback
    userActions.push(newAction);
    return newAction;
  }
};

// Fallback method that uses in-memory storage
export const getAllUserActions = () => {
  return [...userActions];
};
