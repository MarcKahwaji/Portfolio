"use server";

import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().max(200),
  need: z.enum(site.contact.needOptions),
  message: z.string().trim().min(1).max(5000),
  company: z.string().max(200).optional(),
});

export type ContactInput = z.input<typeof schema>;

export type ContactResult = { ok: boolean; mailto?: string };

export async function sendContactMessage(
  input: ContactInput,
): Promise<ContactResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false };

  if (parsed.data.company) return { ok: true };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const subject = `Portfolio contact from ${parsed.data.name}`;
    const body = [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      `Need: ${parsed.data.need}`,
      "",
      parsed.data.message,
    ].join("\n");
    return {
      ok: false,
      mailto: `mailto:${site.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`,
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Portfolio contact <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? site.email,
    replyTo: parsed.data.email,
    subject: `Portfolio contact from ${parsed.data.name}`,
    text: [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      `Need: ${parsed.data.need}`,
      "",
      parsed.data.message,
    ].join("\n"),
  });

  return { ok: !error };
}
