import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFICATION_EMAIL = "gktechnologies.stl@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface EmailRequest {
  formType: "contact" | "membership" | "donation";
  data: Record<string, unknown>;
}

const formatContactEmail = (data: Record<string, unknown>): { subject: string; html: string } => {
  return {
    subject: `[Beiteen Contact] New message from ${data.name || "Anonymous"}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}</p>
      <hr />
      <p><strong>Name:</strong> ${data.name || "Not provided"}</p>
      <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #5a7a42; margin: 10px 0;">
        ${String(data.message || "").replace(/\n/g, "<br>")}
      </blockquote>
      <hr />
      <p style="color: #666; font-size: 12px;">This email was sent from the Beiteen Association website contact form.</p>
    `,
  };
};

const formatMembershipEmail = (data: Record<string, unknown>): { subject: string; html: string } => {
  return {
    subject: `[Beiteen Membership] New application from ${data.full_name || "Anonymous"}`,
    html: `
      <h2>New Membership Application</h2>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}</p>
      <hr />
      <h3>Applicant Information</h3>
      <p><strong>Family Name:</strong> ${data.family_name || "Not provided"}</p>
      <p><strong>Full Name:</strong> ${data.full_name || "Not provided"}</p>
      <p><strong>Head of Household:</strong> ${data.head_first_name || ""} ${data.head_middle_name || ""}</p>
      <p><strong>Date of Birth:</strong> ${data.head_dob || "Not provided"}</p>
      <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
      <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
      
      <h3>Address</h3>
      <p>${data.street_address || ""}<br>
      ${data.city || ""}, ${data.state || ""} ${data.zip_code || ""}</p>
      
      <h3>Household Members</h3>
      <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #5a7a42; margin: 10px 0;">
        ${String(data.household_members || "Not provided").replace(/\n/g, "<br>")}
      </blockquote>
      
      <h3>Payment Information</h3>
      <p><strong>Zelle Contact:</strong> ${data.zelle_contact || "Not provided"}</p>
      <p><strong>Membership Type:</strong> ${data.membership_type || "household"}</p>
      
      ${data.college_id_urls && (data.college_id_urls as string[]).length > 0 ? `
        <h3>College ID Uploads</h3>
        <ul>
          ${(data.college_id_urls as string[]).map((url: string) => `<li><a href="${url}">${url}</a></li>`).join("")}
        </ul>
      ` : ""}
      
      <hr />
      <p style="color: #666; font-size: 12px;">This email was sent from the Beiteen Association website membership form.</p>
    `,
  };
};

const formatDonationEmail = (data: Record<string, unknown>): { subject: string; html: string } => {
  const amount = data.donation_amount ? `$${data.donation_amount}` : "Not specified";
  const donorName = data.is_anonymous ? "Anonymous" : (data.name || "Not provided");
  
  return {
    subject: `[Beiteen Donation] ${amount} pledge from ${donorName}`,
    html: `
      <h2>New Donation Pledge</h2>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}</p>
      <hr />
      <h3>Donation Details</h3>
      <p><strong>Amount:</strong> ${amount}</p>
      <p><strong>Anonymous:</strong> ${data.is_anonymous ? "Yes" : "No"}</p>
      ${!data.is_anonymous ? `<p><strong>Name:</strong> ${data.name || "Not provided"}</p>` : ""}
      <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
      ${data.intended_payment_date ? `<p><strong>Intended Payment Date:</strong> ${data.intended_payment_date}</p>` : ""}
      
      ${data.message ? `
        <h3>Message</h3>
        <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #5a7a42; margin: 10px 0;">
          ${String(data.message).replace(/\n/g, "<br>")}
        </blockquote>
      ` : ""}
      
      <hr />
      <p style="color: #666; font-size: 12px;">This email was sent from the Beiteen Association website donation form.</p>
    `,
  };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formType, data }: EmailRequest = await req.json();

    console.log(`Processing ${formType} form submission email`);

    let emailContent: { subject: string; html: string };

    switch (formType) {
      case "contact":
        emailContent = formatContactEmail(data);
        break;
      case "membership":
        emailContent = formatMembershipEmail(data);
        break;
      case "donation":
        emailContent = formatDonationEmail(data);
        break;
      default:
        throw new Error(`Unknown form type: ${formType}`);
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Beiteen Association <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    const emailResult = await emailResponse.json();
    
    if (!emailResponse.ok) {
      throw new Error(emailResult.message || "Failed to send email");
    }

    console.log("Email sent successfully:", emailResult);

    return new Response(JSON.stringify({ success: true, emailResult }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending notification email:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
