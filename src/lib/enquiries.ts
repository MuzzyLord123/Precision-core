import { supabase } from "@/integrations/supabase/client";

export const makeEnquiryRef = () => `MBM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

type BaseEnquiry = {
  ref: string;
  name: string;
  email: string;
  phone: string;
  device: string;
  model: string;
  notes?: string;
  source?: string;
};

export type EnquiryInput =
  | (BaseEnquiry & { kind: "booking"; repairs: string[]; date: string; time: string; isWalkIn: boolean })
  | (BaseEnquiry & { kind: "contact"; repair: string; urgency: string });

/** Writes a public enquiry. Returns an error message to show the user, or null on success. */
export const createEnquiry = async (input: EnquiryInput): Promise<string | null> => {
  const row = {
    guest_name: input.name,
    guest_email: input.email,
    guest_phone: input.phone || null,
    device_type: input.device,
    device_model: input.model || null,
    how_found_us: input.source || null,
    ref: input.ref,
    ...(input.kind === "booking"
      ? {
          repairs_requested: input.repairs,
          booked_date: input.isWalkIn ? null : input.date,
          booked_time: input.isWalkIn ? null : input.time,
          is_walk_in: input.isWalkIn,
          issue_description: input.notes || null,
          source: "booking_flow",
        }
      : {
          repairs_requested: [input.repair],
          issue_description: [input.notes, `Urgency: ${input.urgency}`].filter(Boolean).join("\n\n"),
          source: "contact_form",
        }),
  };

  const { error } = await supabase.from("enquiries").insert(row);
  if (!error) return null;
  return input.kind === "booking"
    ? "Something went wrong submitting your booking. Please try again."
    : "Something went wrong sending your enquiry. Please try again.";
};
