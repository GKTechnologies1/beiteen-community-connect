import { supabase } from "@/integrations/supabase/client";

type FormType = "contact" | "membership" | "donation";

export const sendNotificationEmail = async (
  formType: FormType,
  data: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data: result, error } = await supabase.functions.invoke(
      "send-notification-email",
      {
        body: { formType, data },
      }
    );

    if (error) {
      console.error("Error calling notification email function:", error);
      return { success: false, error: error.message };
    }

    console.log("Notification email sent:", result);
    return { success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to send notification email:", errorMessage);
    return { success: false, error: errorMessage };
  }
};
