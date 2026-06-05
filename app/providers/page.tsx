import Link from "next/link";
import {
  AlertTriangle,
  Bone,
  CalendarClock,
  CircleDollarSign,
  HeartPulse,
  Percent,
  ShieldCheck,
  Stethoscope
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const coverageCards = [
  {
    icon: Bone,
    title: "Accident Coverage",
    text: "Helps with unexpected events like injuries, swallowed objects, broken bones, and emergency visits."
  },
  {
    icon: HeartPulse,
    title: "Illness Coverage",
    text: "Helps with medical conditions like infections, allergies, cancer, and chronic diseases."
  },
  {
    icon: Stethoscope,
    title: "Advanced Coverage",
    text: "May include hereditary conditions, diagnostics, specialists, medications, and ongoing care."
  }
];

const termCards = [
  {
    icon: CircleDollarSign,
    title: "Deductible",
    text: "The amount you pay first before insurance starts helping with eligible costs."
  },
  {
    icon: Percent,
    title: "Reimbursement Rate",
    text: "The percentage of eligible vet costs the insurer may pay back after your deductible."
  },
  {
    icon: ShieldCheck,
    title: "Annual Limit",
    text: "The maximum amount the insurer may pay in one policy year."
  },
  {
    icon: CalendarClock,
    title: "Waiting Period",
    text: "The time after signup before some coverage begins."
  }
];

const mistakeCards = [
  {
    title: "Waiting until your pet gets sick",
    text: "Many plans do not cover pre-existing conditions, so timing matters."
  },
  {
    title: "Choosing only the cheapest monthly price",
    text: "Lower premiums may come with higher deductibles, lower limits, or more exclusions."
  },
  {
    title: "Not reading exclusions",
    text: "Coverage can vary by provider, condition, dental care, breed-related issues, and policy terms."
  }
];

const guideProviders = [
  {
    name: "Trupanion",
    logoPlaceholder: "TR",
    rows: {
      coverageStyle: "Comprehensive accident & illness",
      standoutFeature: "No annual payout limits on eligible conditions",
      bestMatch: "Owners preparing for major unexpected vet costs"
    }
  },
  {
    name: "Fetch Pet Insurance",
    logoPlaceholder: "FE",
    rows: {
      coverageStyle: "Flexible accident & illness",
      standoutFeature: "Exam fees, diagnostics, and dental illness considerations",
      bestMatch: "Owners wanting broader illness-related coverage"
    }
  },
  {
    name: "Pets Plus Us",
    logoPlaceholder: "PP",
    rows: {
      coverageStyle: "Accident, illness & wellness options",
      standoutFeature: "Canadian support resources and optional wellness benefits",
      bestMatch: "Owners interested in preventive care options"
    }
  },
  {
    name: "PHI Direct",
    logoPlaceholder: "PH",
    rows: {
      coverageStyle: "Simple accident & illness protection",
      standoutFeature: "Budget-focused monthly pricing approach",
      bestMatch: "Owners wanting affordable essential coverage"
    }
  }
];

const providerRowLabels = [
  {
    key: "coverageStyle",
    icon: "🛡️",
    label: "Coverage Style"
  },
  {
    key: "standoutFeature",
    icon: "⭐",
    label: "Standout Feature"
  },
  {
    key: "bestMatch",
    icon: "🐾",
    label: "Best Match"
  }
] as const;

export default function ProvidersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Coverage guide"
        title="Pet Insurance Made Simple"
        text="Understand what you're paying for before choosing a plan."
      />

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-ink">What Does Pet Insurance Cover?</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {coverageCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm"
              >
                <div className="grid size-12 place-items-center rounded-md bg-mint text-spruce">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">{card.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-ink">The Terms Nobody Explains</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {termCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm"
              >
                <Icon className="text-spruce" size={24} />
                <h3 className="mt-4 text-lg font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{card.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-ink">Common Mistakes Before Buying</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {mistakeCards.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border border-[#f2be8f]/60 bg-[#fff8ef] p-6 shadow-sm"
            >
              <AlertTriangle className="text-[#c87938]" size={24} />
              <h3 className="mt-4 text-lg font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-spruce">
            Provider options
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">
            Providers PawShield Helps You Explore
          </h2>
          <p className="mt-3 leading-7 text-ink/70">
            PawShield helps you understand different insurance options. Your
            personalized suggestions are generated after learning about your
            pet's breed, age, lifestyle, health risks, and coverage needs.
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {guideProviders.map((provider) => (
            <article
              key={provider.name}
              className="flex h-full flex-col rounded-lg border border-ink/10 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-md bg-skywash font-semibold text-spruce">
                  {provider.logoPlaceholder}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{provider.name}</h3>
                  <p className="mt-1 text-sm font-medium text-spruce">
                    Insurance option overview
                  </p>
                </div>
              </div>
              <ul className="mt-5 grid flex-1 gap-3">
                {providerRowLabels.map((row) => (
                  <li
                    key={row.key}
                    className="grid grid-cols-[2rem_1fr] gap-3 rounded-md bg-[#fbfdfc] p-3"
                  >
                    <span className="text-lg leading-6" aria-hidden="true">
                      {row.icon}
                    </span>
                    <span className="grid gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wide text-spruce">
                        {row.label}
                      </span>
                      <span className="text-sm leading-5 text-ink/75">
                        {provider.rows[row.key]}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-3xl rounded-lg border border-spruce/15 bg-mint p-6 text-center shadow-sm">
          <h3 className="text-2xl font-semibold text-ink">
            Not sure which option fits your pet?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-ink/70">
            Every pet is different. Let PawShield analyze your pet profile and
            help identify coverage options that match your needs.
          </p>
          <Link
            href="/assessment"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-spruce px-7 py-3.5 font-semibold text-white transition hover:bg-ink"
          >
            Find My Match
          </Link>
        </div>
      </section>
    </main>
  );
}
