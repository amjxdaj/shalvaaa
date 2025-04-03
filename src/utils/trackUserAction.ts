
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Type for user actions
type UserAction = {
  id: string;
  action: string;
  timestamp: Date;
  details?: string | null;
};

// Track user action function
export const trackUserAction = async (action: string, details?: string) => {
  console.log(`Tracking action: "${action}"${details ? ` with details: "${details}"` : ''}`);
  
  try {
    // Insert into Supabase with explicit return
    const { error, data } = await supabase
      .from('user_actions')
      .insert({
        action: action,
        details: details || null
      })
      .select();
      
    if (error) {
      console.error("Failed to store action in Supabase:", error);
      toast.error("Failed to save action");
      return null;
    }
    
    console.log("Action tracked successfully, response:", data);
    toast.success("Action tracked successfully");
    return data[0];
  } catch (error) {
    console.error("Exception when storing action in Supabase:", error);
    toast.error("Error saving action");
    return null;
  }
};
