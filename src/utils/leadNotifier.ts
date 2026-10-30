/**
 * VELMO Architectural Elevators — Structured Lead Notification Service
 * Dispatches a formatted, structured lead summary to the designated company phone number.
 */

// Target phone number to receive lead notifications (8882167309 with country code 91)
export const NOTIFICATION_RECIPIENT_PHONE = "918882167309";
export const NOTIFICATION_DISPLAY_PHONE = "+91 8882167309";

export interface StructuredLeadData {
  fullName: string;
  phone: string;
  email: string;
  buildingType: string;
  floors?: string;
  notes?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  timestamp?: string;
}

/**
 * Generates an executive, structured text message formatted for WhatsApp, SMS, or webhook dispatch.
 */
export function formatStructuredLeadMessage(lead: StructuredLeadData): string {
  const dateFormatted = lead.timestamp
    ? new Date(lead.timestamp).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      })
    : new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  const lines = [
    `🏛️ *NEW VELMO ELEVATORS INQUIRY*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Client Name:* ${lead.fullName || 'Not Provided'}`,
    `📞 *Contact Number:* ${lead.phone || 'Not Provided'}`,
    `✉️ *Email Address:* ${lead.email || 'Not Provided'}`,
    `🏢 *Building Typology:* ${lead.buildingType || 'Elevator Inquiry'}`,
    `📐 *Floors / Stops:* ${lead.floors || 'Standard / TBD'}`,
  ];

  if (lead.notes && lead.notes.trim()) {
    lines.push(`📝 *Requirements:* ${lead.notes.trim()}`);
  }

  lines.push(`🕒 *Timestamp:* ${dateFormatted}`);

  if (lead.source || lead.utmSource) {
    const src = [lead.source, lead.utmSource, lead.utmCampaign].filter(Boolean).join(' · ');
    lines.push(`📍 *Referral Channel:* ${src}`);
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`_VELMO Priority Lead Dispatch · ${NOTIFICATION_DISPLAY_PHONE}_`);

  return lines.join('\n');
}

/**
 * Builds direct WhatsApp dispatch URL targeting the recipient phone number.
 */
export function getWhatsAppDispatchUrl(
  lead: StructuredLeadData,
  recipientPhone: string = NOTIFICATION_RECIPIENT_PHONE
): string {
  const text = formatStructuredLeadMessage(lead);
  const cleanPhone = recipientPhone.replace(/\D/g, '');
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
}

/**
 * Builds direct SMS dispatch URI (for native mobile messaging fallback).
 */
export function getSmsDispatchUrl(
  lead: StructuredLeadData,
  recipientPhone: string = NOTIFICATION_RECIPIENT_PHONE
): string {
  const text = formatStructuredLeadMessage(lead);
  const cleanPhone = recipientPhone.replace(/\D/g, '');
  return `sms:${cleanPhone}?body=${encodeURIComponent(text)}`;
}
