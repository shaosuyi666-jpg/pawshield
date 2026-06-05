import { HeartHandshake, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";

const supportCards = [
  {
    icon: HeartHandshake,
    title: "For Pet Owners",
    text: "Questions about your pet profile, coverage guidance, or how to compare provider options? Send us a note and we will review it."
  },
  {
    icon: ShieldCheck,
    title: "For Insurance Partners",
    text: "Interested in working with PawShield or sharing provider information for comparison? We would be happy to hear from you."
  }
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Contact"
        title="Get in touch with PawShield"
        text="Reach out with questions, feedback, or partnership inquiries."
      />

      <ContactForm />

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {supportCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="rounded-lg border border-ink/10 bg-[#fbfdfc] p-6 shadow-sm"
            >
              <div className="grid size-12 place-items-center rounded-md bg-mint text-spruce">
                <Icon size={24} />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-ink">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{card.text}</p>
            </article>
          );
        })}
      </section>

      <section className="mx-auto mt-8 max-w-3xl rounded-lg border border-spruce/15 bg-mint p-6 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-ink">
          Looking for quick answers?
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-ink/70">
          Visit the FAQ for simple explanations about PawShield, quotes,
          coverage, and provider details.
        </p>
        <Link
          href="/faq"
          className="mt-5 inline-flex rounded-md bg-spruce px-5 py-3 font-semibold text-white hover:bg-ink"
        >
          View FAQ
        </Link>
      </section>
    </main>
  );
}
