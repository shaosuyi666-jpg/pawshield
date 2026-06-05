"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

const contactEmail = "pawshieldteam@gmail.com";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("Pet owner");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `User type: ${userType}`,
      "",
      "Message:",
      message
    ].join("\n");
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  }

  return (
    <section className="mx-auto mt-10 max-w-3xl rounded-lg border border-spruce/15 bg-white p-5 shadow-soft sm:p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-spruce">
          Contact PawShield
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">
          Send us a message
        </h2>
        <p className="mt-3 text-sm leading-6 text-ink/70">
          We usually review messages as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-ink">
            Name
            <input
              type="text"
              required
              value={name}
              className="focus-ring rounded-md border border-ink/15 px-3 py-3"
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Email
            <input
              type="email"
              required
              value={email}
              className="focus-ring rounded-md border border-ink/15 px-3 py-3"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-ink">
          I am a:
          <select
            value={userType}
            className="focus-ring rounded-md border border-ink/15 bg-white px-3 py-3"
            onChange={(event) => setUserType(event.target.value)}
          >
            <option>Pet owner</option>
            <option>Insurance partner</option>
            <option>Veterinarian / clinic</option>
            <option>Other</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-ink">
          Subject
          <input
            type="text"
            required
            value={subject}
            className="focus-ring rounded-md border border-ink/15 px-3 py-3"
            onChange={(event) => setSubject(event.target.value)}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-ink">
          Message
          <textarea
            required
            value={message}
            rows={6}
            className="focus-ring rounded-md border border-ink/15 px-3 py-3"
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-spruce px-5 py-3 font-semibold text-white hover:bg-ink"
        >
          <Send size={18} />
          Send Message
        </button>
      </form>

      <p className="mt-5 text-center text-sm font-medium text-ink/70">
        Prefer email? Contact us directly at{" "}
        <a className="text-spruce underline" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
      </p>
    </section>
  );
}
