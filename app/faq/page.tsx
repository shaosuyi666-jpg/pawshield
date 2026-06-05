import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const faqs = [
  {
    question: "Does PawShield sell pet insurance?",
    answer:
      "No. PawShield is an educational comparison platform. Official quotes, eligibility, exclusions, and policy details are provided directly by insurance providers."
  },
  {
    question: "Is the PawShield Protection Score insurance advice?",
    answer:
      "No. The score is an educational estimate based on your pet profile. It helps you understand what coverage features may be worth comparing."
  },
  {
    question: "Can PawShield tell me the final price?",
    answer:
      "Not yet. PawShield summarizes coverage information, but final premiums are confirmed on each provider's official quote page."
  },
  {
    question: "Why does breed matter?",
    answer:
      "Some breeds are more likely to experience certain health conditions. PawShield uses breed information to highlight coverage features that may be important to review."
  },
  {
    question: "Can pre-existing conditions be covered?",
    answer:
      "Coverage for pre-existing conditions depends on each insurer's rules. Always review official policy documents before buying."
  }
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="FAQ"
        title="Pet insurance questions, answered simply"
        text="Learn how PawShield works and what to confirm before requesting official quotes."
      />

      <section className="mt-10 grid gap-4">
        {faqs.map((faq) => (
          <article
            key={faq.question}
            className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-md bg-mint text-spruce">
                <HelpCircle size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-ink">{faq.question}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/70">
                  {faq.answer}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-8 rounded-lg border border-spruce/15 bg-mint p-6 text-center">
        <h2 className="text-xl font-semibold text-ink">
          Still have a question?
        </h2>
        <Link
          href="/contact"
          className="mt-4 inline-flex rounded-md bg-spruce px-5 py-3 font-semibold text-white hover:bg-ink"
        >
          Contact PawShield
        </Link>
      </div>
    </main>
  );
}
