import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(6, "Phone number is required").max(40),
  serviceSlug: z.string().trim().min(1).max(80),
  serviceTitle: z.string().trim().min(1).max(120),
  items: z
    .array(
      z.object({
        groupName: z.string().max(120),
        name: z.string().max(160),
        description: z.string().max(600),
      }),
    )
    .min(1, "Select at least one item")
    .max(60),
  dueDate: z.string().trim().max(20).optional().default(""),
  dueTime: z.string().trim().max(20).optional().default(""),
});

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const dueText = [data.dueDate, data.dueTime].filter(Boolean).join(" ").trim();
    const dueAt = data.dueDate ? new Date(`${data.dueDate}T${data.dueTime || "09:00"}:00`) : null;

    const { data: row, error } = await supabaseAdmin
      .from("booking_requests")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        service_slug: data.serviceSlug,
        service_title: data.serviceTitle,
        items: data.items,
        due_at: dueAt && !Number.isNaN(dueAt.getTime()) ? dueAt.toISOString() : null,
        due_text: dueText || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("booking insert failed", error.message);
      throw new Error("We couldn't save your request. Please try again.");
    }

    return { id: row.id as string };
  });
