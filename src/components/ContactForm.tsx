"use client";

import { useState } from "react";
import { sendContactMessage } from "@/app/actions/contact";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-[8px] border border-line bg-panel px-3.5 py-2.5 text-base text-text transition-[border-color,box-shadow] duration-150 placeholder:text-muted/60 focus:border-mint focus:shadow-[0_0_0_3px_rgba(61,220,151,0.15),0_0_24px_rgba(61,220,151,0.12)] focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      const result = await sendContactMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        need: String(
          data.get("need") ?? "",
        ) as (typeof site.contact.needOptions)[number],
        message: String(data.get("message") ?? ""),
        company: String(data.get("company") ?? ""),
      });
      if (result.ok) {
        setStatus("success");
      } else if (result.mailto) {
        setStatus("idle");
        window.location.href = result.mailto;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex items-center gap-4">
        <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
          <circle
            className="check-circle"
            cx="22"
            cy="22"
            r="19"
            fill="none"
            stroke="var(--color-mint)"
            strokeWidth="2"
          />
          <path
            className="check-path"
            d="M14 22.5l6 6L30 17"
            fill="none"
            stroke="var(--color-mint)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-base leading-[1.6] text-text md:text-[18px]">
          {site.contact.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm text-muted">
          {site.contact.fields.name}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm text-muted">
          {site.contact.fields.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="contact-need" className="mb-1.5 block text-sm text-muted">
          {site.contact.fields.need}
        </label>
        <select id="contact-need" name="need" required className={fieldClass}>
          {site.contact.needOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm text-muted"
        >
          {site.contact.fields.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={fieldClass}
        />
      </div>
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="shine rounded-[6px] bg-mint px-6 py-3 text-base font-medium text-ink transition-colors duration-150 hover:bg-mint-deep disabled:opacity-60 md:text-[18px]"
      >
        {status === "sending" ? site.contact.sending : site.contact.submit}
      </button>
      {status === "error" && (
        <p className="text-sm text-muted" role="alert">
          {site.contact.error}
        </p>
      )}
    </form>
  );
}
