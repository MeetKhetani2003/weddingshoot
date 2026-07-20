"use client";

import { useState, type FormEvent } from "react";

const eventTypes = [
  "Wedding Planning",
  "Wedding Photography",
  "Wedding Films",
  "Wedding Decor",
  "Destination Wedding",
  "Maternity Shoot",
  "Newborn Session",
  "Family / Kids Shoot",
  "Other",
];

const budgets = [
  "Under ₹2 Lakhs",
  "₹2 – 5 Lakhs",
  "₹5 – 12 Lakhs",
  "₹12 – 25 Lakhs",
  "₹25 Lakhs+",
];

const inputCls =
  "w-full border-b border-ink/20 bg-transparent py-3 text-sm text-ink placeholder:text-ink/35 focus:border-gold focus:outline-none transition-colors";

export default function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-gold/40 bg-petal/40 p-10 text-center">
        <p className="font-script text-4xl text-gold">Thank you</p>
        <h3 className="h-display mt-3 text-2xl">Your story has reached us</h3>
        <p className="mt-4 text-sm leading-relaxed text-ink/60">
          Our team will write back within 24 hours to begin the conversation.
          We can&apos;t wait to hear about your celebration.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="grid gap-7 md:grid-cols-2">
        <div>
          <label className="eyebrow block mb-1" htmlFor="name">Your Name *</label>
          <input id="name" name="name" required placeholder="Full name" className={inputCls} />
        </div>
        <div>
          <label className="eyebrow block mb-1" htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required placeholder="you@email.com" className={inputCls} />
        </div>
        <div>
          <label className="eyebrow block mb-1" htmlFor="phone">Phone</label>
          <input id="phone" name="phone" placeholder="+91" className={inputCls} />
        </div>
        <div>
          <label className="eyebrow block mb-1" htmlFor="eventType">Occasion *</label>
          <select id="eventType" name="eventType" required className={inputCls} defaultValue="">
            <option value="" disabled>Select an occasion</option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="eyebrow block mb-1" htmlFor="eventDate">Event Date</label>
          <input id="eventDate" name="eventDate" type="date" className={inputCls} />
        </div>
        <div>
          <label className="eyebrow block mb-1" htmlFor="location">Location / Destination</label>
          <input id="location" name="location" placeholder="City or venue" className={inputCls} />
        </div>
        <div className="md:col-span-2">
          <label className="eyebrow block mb-1" htmlFor="budget">Estimated Budget</label>
          <select id="budget" name="budget" className={inputCls} defaultValue="">
            <option value="">Prefer not to say</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="eyebrow block mb-1" htmlFor="message">Tell Us Your Story</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Your celebration, your vision, anything you'd love us to know…"
            className={inputCls}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-4 border border-ink px-10 py-4 text-[0.7rem] uppercase tracking-[0.35em] text-ink transition-all duration-500 hover:bg-ink hover:text-bone disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Begin the Conversation"}
        <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
      </button>
    </form>
  );
}
