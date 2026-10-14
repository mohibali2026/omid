"use client";

import { useState } from "react";

// Placeholder until Omid's real inbox is decided.
const CONTACT_EMAIL = "hello@example.com";

const fieldClass =
  "w-full rounded-xl border border-field bg-white px-4 py-3.5 text-[17px] text-label placeholder:text-placeholder outline-none transition focus:border-action focus:ring-4 focus:ring-action/15";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  // No backend yet: opens the visitor's mail app with the message filled in.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setOpened(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2 text-[14px] font-semibold text-label">
        Name
        <input
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
          placeholder="Your name"
        />
      </label>
      <label className="flex flex-col gap-2 text-[14px] font-semibold text-label">
        Email
        <input
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
          placeholder="you@example.com"
        />
      </label>
      <label className="flex flex-col gap-2 text-[14px] font-semibold text-label">
        Message
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-y`}
          placeholder="How can we help?"
        />
      </label>
      <div className="mt-2 flex flex-col gap-3">
        <button
          type="submit"
          className="h-11 w-fit rounded-full bg-action px-6 text-[17px] text-white transition-colors hover:bg-action-hover active:scale-[0.98]"
        >
          Send message
        </button>
        <p className="text-[14px] text-label-2" aria-live="polite">
          {opened
            ? `Your email app should now be open with this message. If it didn't open, write to ${CONTACT_EMAIL}.`
            : "This opens your email app with your message ready to send."}
        </p>
      </div>
    </form>
  );
}
