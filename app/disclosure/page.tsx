import { CheckCircle2, HeartHandshake, Scale, Sparkles, WalletCards } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { legalDisclaimer } from "@/lib/constants";

const comparisonFactors = [
  "coverage options",
  "health risk factors",
  "expected protection needs",
  "plan features"
];

const trustCards = [
  {
    icon: HeartHandshake,
    title: "Education-first comparison",
    body: [
      "PawShield organizes pet health information and insurance coverage details into a simple, easy-to-understand experience.",
      "Our goal is to help owners understand what matters before choosing coverage."
    ]
  },
  {
    icon: Scale,
    title: "Independent Insurance Comparison",
    body: [
      "Our recommendations are designed around your pet's needs.",
      "We aim to help pet owners make informed decisions, not simply promote one provider."
    ]
  },
  {
    icon: WalletCards,
    title: "How PawShield stays free",
    body: [
      "PawShield is free for pet owners.",
      "Some partnerships may help support the platform, but our goal remains helping users understand and compare coverage options clearly."
    ]
  },
  {
    icon: Sparkles,
    title: "AI Guidance & Final Decisions",
    body: [
      "The PawShield recommendation system is an educational tool designed to simplify insurance comparison.",
      "Insurance prices, eligibility, coverage details, exclusions, and claim decisions are determined only by insurance providers.",
      "We encourage users to review official policy documents before purchasing."
    ]
  }
];

export default function DisclosurePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Trust & transparency"
        title="Our mission"
        text="PawShield helps Canadian pet owners make more informed insurance decisions through education and transparent comparison."
      />

      <section className="mx-auto mt-8 max-w-3xl rounded-lg border border-spruce/15 bg-white p-6 text-center shadow-sm">
        <p className="leading-7 text-ink/75">
          We organize pet health information and insurance coverage details into
          a simple, easy-to-understand experience.
        </p>
        <p className="mt-3 leading-7 text-ink/75">
          Our goal is to help owners understand what matters before choosing
          coverage.
        </p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {trustCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-md bg-mint text-spruce">
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-ink">{card.title}</h2>
                  <div className="mt-3 grid gap-3">
                    {card.body.map((paragraph) => (
                      <p key={paragraph} className="leading-7 text-ink/72">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {card.title === "Independent Insurance Comparison" ? (
                <ul className="mt-5 grid gap-2 rounded-lg bg-[#fbfdfc] p-4">
                  {comparisonFactors.map((factor) => (
                    <li key={factor} className="flex items-center gap-3 text-sm text-ink/75">
                      <CheckCircle2 className="shrink-0 text-spruce" size={18} />
                      {factor}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          );
        })}
      </section>

      <p className="mt-8 rounded-lg border border-ink/10 bg-butter p-5 text-sm font-medium leading-6 text-ink">
        {legalDisclaimer}
      </p>
    </main>
  );
}
