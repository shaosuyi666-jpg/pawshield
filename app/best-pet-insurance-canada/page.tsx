import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  CircleDollarSign,
  HeartPulse,
  ListChecks,
  ShieldCheck
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Best Pet Insurance Canada | Compare Coverage Options",
  description:
    "Compare pet insurance options in Canada. Learn about coverage, waiting periods, reimbursement, breed risks, and how to choose protection for your dog or cat."
};

const decisionFactors = [
  "pet breed",
  "age",
  "health risks",
  "budget",
  "coverage needs"
];

const providerCards = [
  {
    name: "Fetch",
    points: [
      "flexible accident and illness coverage",
      "exam fee coverage considerations",
      "dental illness options"
    ]
  },
  {
    name: "Trupanion",
    points: [
      "strong medical coverage",
      "Vet Direct Pay availability",
      "no annual payout limit"
    ]
  },
  {
    name: "Pets Plus Us",
    points: [
      "Canadian provider",
      "flexible coverage choices",
      "wellness options"
    ]
  },
  {
    name: "PHI Direct",
    points: ["simple coverage", "budget-conscious option"]
  }
];

const costFactors = [
  "age",
  "breed",
  "location",
  "deductible",
  "reimbursement",
  "coverage level"
];

const commonMistakes = [
  "waiting until illness happens",
  "choosing only cheapest plan",
  "ignoring exclusions"
];

export default function BestPetInsuranceCanadaPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Pet insurance Canada"
        title="Best Pet Insurance Canada: Compare Coverage Options"
        text="An educational guide for Canadian pet owners comparing coverage features, provider differences, and pet-specific health risks."
      />

      <section className="mx-auto mt-10 max-w-4xl rounded-lg border border-spruce/15 bg-white p-6 shadow-soft sm:p-8">
        <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-start">
          <div className="grid size-12 place-items-center rounded-md bg-mint text-spruce">
            <HeartPulse size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">Introduction</h2>
            <p className="mt-3 leading-7 text-ink/72">
              Choosing pet insurance in Canada depends on your pet&apos;s
              profile, not just the monthly price. The right coverage to compare
              can change based on breed, age, current health risks, budget, and
              the level of protection you want for future care.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {decisionFactors.map((factor) => (
                <li
                  key={factor}
                  className="rounded-md bg-[#fbfdfc] px-3 py-2 text-sm font-medium text-ink/75"
                >
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-spruce">
            Provider comparison
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">
            Compare Canadian pet insurance providers
          </h2>
          <p className="mt-3 leading-7 text-ink/70">
            These summaries are educational. Always confirm official prices,
            eligibility, exclusions, waiting periods, and final policy terms
            directly with each provider.
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {providerCards.map((provider) => (
            <article
              key={provider.name}
              className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm"
            >
              <div className="grid size-12 place-items-center rounded-md bg-skywash font-semibold text-spruce">
                {provider.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">
                {provider.name}
              </h3>
              <ul className="mt-4 grid gap-2">
                {provider.points.map((point) => (
                  <li key={point} className="text-sm leading-6 text-ink/72">
                    - {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        <article className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
          <div className="grid size-12 place-items-center rounded-md bg-mint text-spruce">
            <CircleDollarSign size={24} />
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-ink">
            What affects pet insurance cost?
          </h2>
          <p className="mt-3 leading-7 text-ink/70">
            Pet insurance pricing can vary by pet profile and plan design. These
            are common factors to compare before requesting a quote.
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {costFactors.map((factor) => (
              <li
                key={factor}
                className="rounded-md bg-[#fbfdfc] px-3 py-2 text-sm font-medium text-ink/75"
              >
                {factor}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg border border-[#f2be8f]/60 bg-[#fff8ef] p-6 shadow-sm">
          <AlertTriangle className="text-[#c87938]" size={28} />
          <h2 className="mt-5 text-2xl font-semibold text-ink">
            Common mistakes
          </h2>
          <ul className="mt-5 grid gap-3">
            {commonMistakes.map((mistake) => (
              <li key={mistake} className="flex gap-3 text-sm text-ink/75">
                <ListChecks className="mt-0.5 shrink-0 text-[#c87938]" size={17} />
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mx-auto mt-12 max-w-3xl rounded-lg border border-spruce/15 bg-mint p-6 text-center shadow-sm">
        <ShieldCheck className="mx-auto text-spruce" size={30} />
        <h2 className="mt-4 text-2xl font-semibold text-ink">
          Find coverage for your dog or cat
        </h2>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-ink/70">
          Build a pet profile and PawShield will help you understand breed
          risks, coverage needs, and provider options worth comparing.
        </p>
        <Link
          href="/assessment"
          className="mt-6 inline-flex rounded-full bg-spruce px-7 py-3.5 font-semibold text-white hover:bg-ink"
        >
          Find Coverage For My Pet
        </Link>
      </section>
    </main>
  );
}
