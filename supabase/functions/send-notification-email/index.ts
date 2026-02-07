/**
 * send-notification-email — Beiteen Association Edge Function
 *
 * RESEND_API_KEY: Stored as a Lovable Cloud secret. Used to authenticate
 *   with the Resend API (https://resend.com).
 *
 * FROM address: "Beiteen Association <onboarding@resend.dev>"
 *   — For production, verify your domain at https://resend.com/domains
 *     then change to e.g. "Beiteen Association <noreply@beiteen.org>"
 *
 * TO:  beiteenassociation.STL@gmail.com
 * CC:  gktechnologies.stl@gmail.com (testing/admin copy)
 *
 * Domain verification (Resend):
 *   1. Go to https://resend.com/domains
 *   2. Add your domain (e.g. beiteen.org)
 *   3. Add the DNS records Resend provides (MX, SPF, DKIM)
 *   4. Once verified, update FROM address above
 */
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Recipients for all form submissions
const NOTIFICATION_TO = "beiteenassociation.STL@gmail.com";
const NOTIFICATION_CC = "gktechnologies.stl@gmail.com";

// Logo URL - hosted publicly
const LOGO_URL = "https://beiteen-community-connect.lovable.app/beiteen-logo.png";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface EmailRequest {
  formType: "contact" | "membership" | "donation";
  data: Record<string, unknown>;
}

const getEmailHeader = (subtitle: string) => `
  <div style="background: linear-gradient(135deg, #5a7a42 0%, #4a6a35 100%); padding: 40px 20px; text-align: center;">
    <img src="${LOGO_URL}" alt="Beiteen Association" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 15px; border: 3px solid rgba(255,255,255,0.3);" />
    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Beiteen Association U.S.A.</h1>
    <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 400;">${subtitle}</p>
    <p style="margin: 5px 0 0; color: rgba(255,255,255,0.7); font-size: 12px;">جمعية بيتين - سانت لويس</p>
  </div>
`;

const getEmailFooter = (replyName?: string) => `
  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px 20px; text-align: center; border-top: 4px solid #5a7a42;">
    <p style="margin: 0 0 10px; color: #5a7a42; font-weight: 600; font-size: 14px;">Beiteen Association U.S.A.</p>
    <p style="margin: 0 0 5px; color: #666; font-size: 12px;">St. Louis, Missouri</p>
    <p style="margin: 0 0 15px; color: #666; font-size: 12px;">📧 beiteenassociation.STL@gmail.com</p>
    <div style="margin: 15px 0; padding: 15px; background: rgba(90, 122, 66, 0.1); border-radius: 8px;">
      <p style="margin: 0; color: #5a7a42; font-size: 12px;">
        ${replyName ? `💬 Reply directly to respond to ${replyName}` : '📩 This is an automated notification'}
      </p>
    </div>
    <p style="margin: 10px 0 0; color: #999; font-size: 11px;">© ${new Date().getFullYear()} Beiteen Association. All rights reserved.</p>
  </div>
`;

const formatContactEmail = (data: Record<string, unknown>): { subject: string; html: string; replyTo?: string } => {
  const timestamp = new Date().toLocaleString("en-US", { 
    timeZone: "America/Chicago",
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return {
    subject: `📩 New Contact Message from ${data.name || "Website Visitor"}`,
    replyTo: data.email ? String(data.email) : undefined,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          ${getEmailHeader("New Contact Form Submission")}
          
          <div style="padding: 30px;">
            <!-- Timestamp & Source Badge -->
            <div style="display: flex; gap: 10px; margin-bottom: 25px;">
              <div style="background: #e8f5e9; padding: 12px 16px; border-radius: 8px; flex: 1;">
                <p style="margin: 0; color: #5a7a42; font-size: 11px; text-transform: uppercase; font-weight: 600;">📅 Submitted</p>
                <p style="margin: 4px 0 0; color: #333; font-size: 13px;">${timestamp}</p>
              </div>
              <div style="background: #e3f2fd; padding: 12px 16px; border-radius: 8px; flex: 1;">
                <p style="margin: 0; color: #1976d2; font-size: 11px; text-transform: uppercase; font-weight: 600;">📄 Source</p>
                <p style="margin: 4px 0 0; color: #333; font-size: 13px;">Contact Page</p>
              </div>
            </div>
            
            <!-- Contact Info -->
            <div style="background: #fafafa; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #eee;">
              <h3 style="margin: 0 0 15px; color: #5a7a42; font-size: 16px; border-bottom: 2px solid #5a7a42; padding-bottom: 8px;">
                👤 Contact Information
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 120px;">
                    <strong style="color: #666; font-size: 13px;">Name</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">
                    ${data.name || "Not provided"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; width: 120px;">
                    <strong style="color: #666; font-size: 13px;">Email</strong>
                  </td>
                  <td style="padding: 10px 0; color: #333; font-size: 14px;">
                    <a href="mailto:${data.email}" style="color: #5a7a42; text-decoration: none;">${data.email || "Not provided"}</a>
                  </td>
                </tr>
              </table>
            </div>
            
            <!-- Message -->
            <div style="background: linear-gradient(135deg, #f5f7f0 0%, #e8ede3 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #5a7a42;">
              <h3 style="margin: 0 0 12px; color: #5a7a42; font-size: 16px;">💬 Message</h3>
              <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${String(data.message || "No message provided").replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          
          ${getEmailFooter(data.name ? String(data.name) : undefined)}
        </div>
      </body>
      </html>
    `,
  };
};

const formatMembershipEmail = (data: Record<string, unknown>): { subject: string; html: string; replyTo?: string } => {
  const timestamp = new Date().toLocaleString("en-US", { 
    timeZone: "America/Chicago",
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const membershipType = data.membership_type === "college" ? "College Student" : "Household";
  
  return {
    subject: `🎉 New Membership Application - ${data.full_name || "New Applicant"}`,
    replyTo: data.email ? String(data.email) : undefined,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          ${getEmailHeader("New Membership Application")}
          
          <div style="padding: 30px;">
            <!-- Membership Type Badge -->
            <div style="text-align: center; margin-bottom: 25px;">
              <span style="background: linear-gradient(135deg, #5a7a42 0%, #4a6a35 100%); color: white; padding: 10px 25px; border-radius: 25px; font-size: 14px; font-weight: 600; display: inline-block; box-shadow: 0 3px 10px rgba(90, 122, 66, 0.3);">
                ${membershipType} Membership
              </span>
            </div>
            
            <!-- Timestamp & Source Badge -->
            <div style="display: flex; gap: 10px; margin-bottom: 25px;">
              <div style="background: #e8f5e9; padding: 12px 16px; border-radius: 8px; flex: 1;">
                <p style="margin: 0; color: #5a7a42; font-size: 11px; text-transform: uppercase; font-weight: 600;">📅 Submitted</p>
                <p style="margin: 4px 0 0; color: #333; font-size: 13px;">${timestamp}</p>
              </div>
              <div style="background: #e3f2fd; padding: 12px 16px; border-radius: 8px; flex: 1;">
                <p style="margin: 0; color: #1976d2; font-size: 11px; text-transform: uppercase; font-weight: 600;">📄 Source</p>
                <p style="margin: 4px 0 0; color: #333; font-size: 13px;">Membership Page</p>
              </div>
            </div>
            
            <!-- Applicant Info -->
            <div style="background: #fafafa; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #eee;">
              <h3 style="margin: 0 0 15px; color: #5a7a42; font-size: 16px; border-bottom: 2px solid #5a7a42; padding-bottom: 8px;">
                👤 Applicant Information
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 140px;">
                    <strong style="color: #666; font-size: 13px;">Family Name</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333; font-size: 14px; font-weight: 600;">
                    ${data.family_name || "Not provided"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 140px;">
                    <strong style="color: #666; font-size: 13px;">Full Name</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">
                    ${data.full_name || "Not provided"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 140px;">
                    <strong style="color: #666; font-size: 13px;">Head of Household</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">
                    ${data.head_first_name || ""} ${data.head_middle_name || ""}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 140px;">
                    <strong style="color: #666; font-size: 13px;">Date of Birth</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">
                    ${data.head_dob || "Not provided"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 140px;">
                    <strong style="color: #666; font-size: 13px;">Email</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">
                    <a href="mailto:${data.email}" style="color: #5a7a42; text-decoration: none;">${data.email || "Not provided"}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; width: 140px;">
                    <strong style="color: #666; font-size: 13px;">Phone</strong>
                  </td>
                  <td style="padding: 10px 0; color: #333; font-size: 14px;">
                    ${data.phone || "Not provided"}
                  </td>
                </tr>
              </table>
            </div>
            
            <!-- Address -->
            <div style="background: #fafafa; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #eee;">
              <h3 style="margin: 0 0 15px; color: #5a7a42; font-size: 16px; border-bottom: 2px solid #5a7a42; padding-bottom: 8px;">
                🏠 Address
              </h3>
              <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6;">
                ${data.street_address || "Not provided"}<br>
                ${data.city || ""}${data.city && data.state ? ", " : ""}${data.state || ""} ${data.zip_code || ""}
              </p>
            </div>
            
            <!-- Household Members -->
            ${data.household_members ? `
            <div style="background: linear-gradient(135deg, #f5f7f0 0%, #e8ede3 100%); border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #5a7a42;">
              <h3 style="margin: 0 0 12px; color: #5a7a42; font-size: 16px;">👨‍👩‍👧‍👦 Household Members</h3>
              <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${String(data.household_members).replace(/\n/g, "<br>")}</p>
            </div>
            ` : ""}
            
            <!-- Payment Info -->
            <div style="background: #fff3e0; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #ffe0b2;">
              <h3 style="margin: 0 0 15px; color: #e65100; font-size: 16px; border-bottom: 2px solid #e65100; padding-bottom: 8px;">
                💳 Payment Information
              </h3>
              <p style="margin: 0; color: #333; font-size: 14px;">
                <strong>Zelle Contact:</strong> ${data.zelle_contact || "Not provided"}
              </p>
            </div>
            
            <!-- College ID -->
            ${data.college_id_urls && Array.isArray(data.college_id_urls) && data.college_id_urls.length > 0 ? `
            <div style="background: #e3f2fd; border-radius: 12px; padding: 20px; border: 1px solid #bbdefb;">
              <h3 style="margin: 0 0 12px; color: #1565c0; font-size: 16px;">🎓 College ID Uploads</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${(data.college_id_urls as string[]).map((url: string, i: number) => `
                  <li style="margin: 8px 0;">
                    <a href="${url}" style="color: #1565c0; text-decoration: none; font-size: 13px;">View Document ${i + 1} →</a>
                  </li>
                `).join("")}
              </ul>
            </div>
            ` : ""}
          </div>
          
          ${getEmailFooter(data.full_name ? String(data.full_name) : undefined)}
        </div>
      </body>
      </html>
    `,
  };
};

const formatDonationEmail = (data: Record<string, unknown>): { subject: string; html: string; replyTo?: string } => {
  const timestamp = new Date().toLocaleString("en-US", { 
    timeZone: "America/Chicago",
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const amount = data.donation_amount ? `$${Number(data.donation_amount).toLocaleString()}` : "Not specified";
  const donorName = data.is_anonymous ? "Anonymous Donor" : (data.name || "Generous Supporter");
  
  return {
    subject: `💝 Donation Pledge: ${amount} from ${donorName}`,
    replyTo: data.email ? String(data.email) : undefined,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          ${getEmailHeader("New Donation Pledge")}
          
          <div style="padding: 30px;">
            <!-- Amount Display -->
            <div style="background: linear-gradient(135deg, #5a7a42 0%, #4a6a35 100%); border-radius: 16px; padding: 30px; text-align: center; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(90, 122, 66, 0.3);">
              <p style="margin: 0 0 5px; color: rgba(255,255,255,0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Donation Amount</p>
              <h2 style="margin: 0; color: #ffffff; font-size: 42px; font-weight: 700;">${amount}</h2>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.7); font-size: 13px;">
                ${data.is_anonymous ? "🙏 Anonymous Contribution" : `From ${donorName}`}
              </p>
            </div>
            
            <!-- Timestamp & Source Badge -->
            <div style="display: flex; gap: 10px; margin-bottom: 25px;">
              <div style="background: #e8f5e9; padding: 12px 16px; border-radius: 8px; flex: 1;">
                <p style="margin: 0; color: #5a7a42; font-size: 11px; text-transform: uppercase; font-weight: 600;">📅 Submitted</p>
                <p style="margin: 4px 0 0; color: #333; font-size: 13px;">${timestamp}</p>
              </div>
              <div style="background: #e3f2fd; padding: 12px 16px; border-radius: 8px; flex: 1;">
                <p style="margin: 0; color: #1976d2; font-size: 11px; text-transform: uppercase; font-weight: 600;">📄 Source</p>
                <p style="margin: 4px 0 0; color: #333; font-size: 13px;">Donations Page</p>
              </div>
            </div>
            
            <!-- Donor Details -->
            <div style="background: #fafafa; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #eee;">
              <h3 style="margin: 0 0 15px; color: #5a7a42; font-size: 16px; border-bottom: 2px solid #5a7a42; padding-bottom: 8px;">
                💝 Donor Details
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 140px;">
                    <strong style="color: #666; font-size: 13px;">Anonymous</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">
                    <span style="background: ${data.is_anonymous ? '#fff3e0' : '#e8f5e9'}; color: ${data.is_anonymous ? '#e65100' : '#2e7d32'}; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500;">
                      ${data.is_anonymous ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
                ${!data.is_anonymous ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 140px;">
                    <strong style="color: #666; font-size: 13px;">Name</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333; font-size: 14px; font-weight: 600;">
                    ${data.name || "Not provided"}
                  </td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 10px 0; ${data.intended_payment_date ? 'border-bottom: 1px solid #eee;' : ''} width: 140px;">
                    <strong style="color: #666; font-size: 13px;">Email</strong>
                  </td>
                  <td style="padding: 10px 0; ${data.intended_payment_date ? 'border-bottom: 1px solid #eee;' : ''} color: #333; font-size: 14px;">
                    ${data.email ? `<a href="mailto:${data.email}" style="color: #5a7a42; text-decoration: none;">${data.email}</a>` : "Not provided"}
                  </td>
                </tr>
                ${data.intended_payment_date ? `
                <tr>
                  <td style="padding: 10px 0; width: 140px;">
                    <strong style="color: #666; font-size: 13px;">Payment Date</strong>
                  </td>
                  <td style="padding: 10px 0; color: #333; font-size: 14px;">
                    ${data.intended_payment_date}
                  </td>
                </tr>
                ` : ""}
              </table>
            </div>
            
            <!-- Message -->
            ${data.message ? `
            <div style="background: linear-gradient(135deg, #f5f7f0 0%, #e8ede3 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #5a7a42;">
              <h3 style="margin: 0 0 12px; color: #5a7a42; font-size: 16px;">💬 Message from Donor</h3>
              <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.7; white-space: pre-wrap; font-style: italic;">"${String(data.message).replace(/\n/g, "<br>")}"</p>
            </div>
            ` : ""}
          </div>
          
          ${getEmailFooter(!data.is_anonymous && data.name ? String(data.name) : undefined)}
        </div>
      </body>
      </html>
    `,
  };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!RESEND_API_KEY) {
    console.error("⚠️ ADMIN WARNING: RESEND_API_KEY is not configured. All email notifications will fail. Add the key in Lovable Cloud → Secrets.");
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Email service is not configured. Your submission was saved but the notification email could not be sent. Please contact the administrator." 
      }),
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

    // Validate submitter email if provided
    if (emailContent.replyTo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailContent.replyTo)) {
      console.warn("Invalid reply-to email, stripping:", emailContent.replyTo);
      emailContent.replyTo = undefined;
    }

    const emailPayload: Record<string, unknown> = {
      from: "Beiteen Association <onboarding@resend.dev>",
      to: [NOTIFICATION_TO],
      cc: [NOTIFICATION_CC],
      subject: emailContent.subject,
      html: emailContent.html,
    };

    // Add Reply-To if submitter provided a valid email
    if (emailContent.replyTo) {
      emailPayload.reply_to = emailContent.replyTo;
    }

    console.log(`Sending ${formType} email — TO: ${NOTIFICATION_TO}, CC: ${NOTIFICATION_CC}`);
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
      const isVerificationIssue = emailResult.message?.includes("verify") || emailResult.message?.includes("domain") || emailResult.statusCode === 403;
      if (isVerificationIssue) {
        console.error("⚠️ ADMIN WARNING: Domain verification required. Emails cannot be delivered to external addresses. Verify domain at https://resend.com/domains");
      }
      console.error("Resend API error:", JSON.stringify(emailResult));
      throw new Error(
        isVerificationIssue
          ? "Email delivery blocked: domain verification required. Your submission was saved but the email could not be sent."
          : (emailResult.message || `Email delivery failed with status ${emailResponse.status}`)
      );
    }

    console.log("✅ Email sent successfully:", emailResult);

    return new Response(JSON.stringify({ success: true, emailId: emailResult.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Error sending notification email:", errorMessage);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage,
        note: "The form submission was saved to the database. Only the email notification failed."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
