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

const formatContactEmail = (data: Record<string, unknown>): { subject: string; html: string; replyTo?: string } => {
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
  return {
    subject: `[Beiteen Contact] New message from ${data.name || "Anonymous"}`,
    replyTo: data.email ? String(data.email) : undefined,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #5a7a42; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Beiteen Association</h1>
          <p style="margin: 5px 0 0;">New Contact Form Submission</p>
        </div>
        <div style="padding: 20px; background: #fff;">
          <p><strong>📅 Submitted:</strong> ${timestamp}</p>
          <p><strong>📄 Source:</strong> Contact Page (/contact)</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>👤 Name:</strong> ${data.name || "Not provided"}</p>
          <p><strong>📧 Email:</strong> ${data.email || "Not provided"}</p>
          <h3 style="color: #5a7a42;">Message:</h3>
          <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #5a7a42; margin: 10px 0;">
            ${String(data.message || "").replace(/\n/g, "<br>")}
          </blockquote>
        </div>
        <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This email was sent from the Beiteen Association website contact form.</p>
          <p>Reply directly to this email to respond to ${data.name || "the submitter"}.</p>
        </div>
      </div>
    `,
  };
};

const formatMembershipEmail = (data: Record<string, unknown>): { subject: string; html: string; replyTo?: string } => {
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
  return {
    subject: `[Beiteen Membership] New application from ${data.full_name || "Anonymous"}`,
    replyTo: data.email ? String(data.email) : undefined,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #5a7a42; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Beiteen Association</h1>
          <p style="margin: 5px 0 0;">New Membership Application</p>
        </div>
        <div style="padding: 20px; background: #fff;">
          <p><strong>📅 Submitted:</strong> ${timestamp}</p>
          <p><strong>📄 Source:</strong> Membership Page (/membership)</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          
          <h3 style="color: #5a7a42;">👤 Applicant Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 5px 0;"><strong>Family Name:</strong></td><td>${data.family_name || "Not provided"}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Full Name:</strong></td><td>${data.full_name || "Not provided"}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Head of Household:</strong></td><td>${data.head_first_name || ""} ${data.head_middle_name || ""}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Date of Birth:</strong></td><td>${data.head_dob || "Not provided"}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Email:</strong></td><td>${data.email || "Not provided"}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Phone:</strong></td><td>${data.phone || "Not provided"}</td></tr>
          </table>
          
          <h3 style="color: #5a7a42;">🏠 Address</h3>
          <p>${data.street_address || ""}<br>
          ${data.city || ""}, ${data.state || ""} ${data.zip_code || ""}</p>
          
          <h3 style="color: #5a7a42;">👨‍👩‍👧‍👦 Household Members</h3>
          <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #5a7a42; margin: 10px 0;">
            ${String(data.household_members || "Not provided").replace(/\n/g, "<br>")}
          </blockquote>
          
          <h3 style="color: #5a7a42;">💳 Payment Information</h3>
          <p><strong>Zelle Contact:</strong> ${data.zelle_contact || "Not provided"}</p>
          <p><strong>Membership Type:</strong> ${data.membership_type || "household"}</p>
          
          ${data.college_id_urls && (data.college_id_urls as string[]).length > 0 ? `
            <h3 style="color: #5a7a42;">🎓 College ID Uploads</h3>
            <ul>
              ${(data.college_id_urls as string[]).map((url: string) => `<li><a href="${url}">${url}</a></li>`).join("")}
            </ul>
          ` : ""}
        </div>
        <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This email was sent from the Beiteen Association website membership form.</p>
          <p>Reply directly to this email to respond to the applicant.</p>
        </div>
      </div>
    `,
  };
};

const formatDonationEmail = (data: Record<string, unknown>): { subject: string; html: string; replyTo?: string } => {
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
  const amount = data.donation_amount ? `$${data.donation_amount}` : "Not specified";
  const donorName = data.is_anonymous ? "Anonymous" : (data.name || "Not provided");
  
  return {
    subject: `[Beiteen Donation] ${amount} pledge from ${donorName}`,
    replyTo: data.email ? String(data.email) : undefined,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #5a7a42; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Beiteen Association</h1>
          <p style="margin: 5px 0 0;">New Donation Pledge</p>
        </div>
        <div style="padding: 20px; background: #fff;">
          <p><strong>📅 Submitted:</strong> ${timestamp}</p>
          <p><strong>📄 Source:</strong> Donations Page (/donations)</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          
          <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h2 style="color: #5a7a42; margin: 0;">${amount}</h2>
            <p style="margin: 5px 0 0; color: #666;">Donation Pledge</p>
          </div>
          
          <h3 style="color: #5a7a42;">💝 Donor Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 5px 0;"><strong>Anonymous:</strong></td><td>${data.is_anonymous ? "Yes" : "No"}</td></tr>
            ${!data.is_anonymous ? `<tr><td style="padding: 5px 0;"><strong>Name:</strong></td><td>${data.name || "Not provided"}</td></tr>` : ""}
            <tr><td style="padding: 5px 0;"><strong>Email:</strong></td><td>${data.email || "Not provided"}</td></tr>
            ${data.intended_payment_date ? `<tr><td style="padding: 5px 0;"><strong>Intended Payment Date:</strong></td><td>${data.intended_payment_date}</td></tr>` : ""}
          </table>
          
          ${data.message ? `
            <h3 style="color: #5a7a42;">💬 Message</h3>
            <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #5a7a42; margin: 10px 0;">
              ${String(data.message).replace(/\n/g, "<br>")}
            </blockquote>
          ` : ""}
        </div>
        <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This email was sent from the Beiteen Association website donation form.</p>
          ${data.email ? `<p>Reply directly to this email to respond to the donor.</p>` : ""}
        </div>
      </div>
    `,
  };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const { formType, data }: EmailRequest = await req.json();

    console.log(`Processing ${formType} form submission email`);
    console.log("Submission data:", JSON.stringify(data, null, 2));

    let emailContent: { subject: string; html: string; replyTo?: string };

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

    const emailPayload: Record<string, unknown> = {
      from: "Beiteen Association <onboarding@resend.dev>",
      to: [NOTIFICATION_EMAIL],
      subject: emailContent.subject,
      html: emailContent.html,
    };

    // Add Reply-To if submitter provided email
    if (emailContent.replyTo) {
      emailPayload.reply_to = emailContent.replyTo;
    }

    console.log("Sending email to:", NOTIFICATION_EMAIL);
    console.log("Reply-To:", emailContent.replyTo || "None");

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
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
