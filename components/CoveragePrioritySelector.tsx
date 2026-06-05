"use client";

import { useEffect, useState } from "react";

type CoverageLevel = "basic" | "balanced" | "strong";
type ProviderKey = "fetch" | "trupanion" | "petsPlusUs" | "phiDirect";

type ProviderComparison = {
  providerName: string;
  coverageDepth: string;
  reimbursement: string;
  annualLimit: string;
  deductibleChoices: string;
  addOns: string;
  waitingPeriod: string;
  breedConditions: string;
  dentalIllness: string;
  examFees: string;
  vetPayment: string;
  bestFor: string;
  keyStrength: string;
  watchFor: string;
  quoteLabel: string;
};

const coverageLevels: Array<{
  value: CoverageLevel;
  title: string;
}> = [
  { value: "basic", title: "Basic Protection" },
  { value: "balanced", title: "Balanced Coverage" },
  { value: "strong", title: "Strong Protection" }
];

const providerLinks = {
  fetch: "https://www.fetchpet.com/mypet",
  trupanion: "https://www.trupanion.com/en-ca/enrollments/get-a-quote",
  petsPlusUs: "https://quote.petsplusus.com/",
  phiDirect: "https://get.phidirect.com/"
};

const providerNames: Record<ProviderKey, string> = {
  fetch: "Fetch",
  trupanion: "Trupanion",
  petsPlusUs: "Pets Plus Us",
  phiDirect: "PHI Direct"
};

const basicComparisonData: Record<ProviderKey, ProviderComparison> = {
  fetch: {
    providerName: "Fetch",
    coverageDepth: "Starter accident + illness",
    reimbursement: "Up to 90%",
    annualLimit: "Lower custom limit",
    deductibleChoices: "Higher deductible option",
    addOns: "Core illness features",
    waitingPeriod: "Accident/illness: up to 15 days",
    breedConditions: "Hereditary included",
    dentalIllness: "Covered",
    examFees: "Covered",
    vetPayment: "Reimbursement",
    bestFor: "Flexible basic coverage",
    keyStrength: "Broad starter coverage",
    watchFor: "Choose annual limit",
    quoteLabel: "Get Fetch Quote"
  },
  trupanion: {
    providerName: "Trupanion",
    coverageDepth: "Medical-first coverage",
    reimbursement: "90%",
    annualLimit: "No annual limit",
    deductibleChoices: "Per-condition deductible",
    addOns: "Recovery Care optional",
    waitingPeriod: "Injury: 5 days; illness: 30 days",
    breedConditions: "Hereditary included",
    dentalIllness: "Covered if eligible",
    examFees: "Not covered",
    vetPayment: "Vet Direct Pay",
    bestFor: "Owners avoiding limits",
    keyStrength: "Major bill protection",
    watchFor: "Higher monthly cost",
    quoteLabel: "Get Trupanion Quote"
  },
  petsPlusUs: {
    providerName: "Pets Plus Us",
    coverageDepth: "Entry accident + illness",
    reimbursement: "70%, 80%, 90%",
    annualLimit: "$7.5k option",
    deductibleChoices: "Selectable deductible",
    addOns: "Wellness optional",
    waitingPeriod: "Accident: 48h; illness: 14 days",
    breedConditions: "Hereditary included",
    dentalIllness: "Dental available",
    examFees: "Eligible exam fees",
    vetPayment: "Reimbursement",
    bestFor: "Basic Canadian coverage",
    keyStrength: "Canadian support",
    watchFor: "Pick limit carefully",
    quoteLabel: "Get Pets Plus Us Quote"
  },
  phiDirect: {
    providerName: "PHI Direct",
    coverageDepth: "Essential backup",
    reimbursement: "80%",
    annualLimit: "$5k option",
    deductibleChoices: "Simple deductible",
    addOns: "Few extras",
    waitingPeriod: "Accident: 48h; illness: 14 days",
    breedConditions: "New conditions covered",
    dentalIllness: "Dental injury",
    examFees: "Not included",
    vetPayment: "Reimbursement",
    bestFor: "Budget-first owners",
    keyStrength: "Lower monthly cost",
    watchFor: "Cruciate wait: 60 days",
    quoteLabel: "Get PHI Direct Quote"
  }
};

const balancedComparisonData: Record<ProviderKey, ProviderComparison> = {
  fetch: {
    providerName: "Fetch",
    coverageDepth: "Flexible accident + illness",
    reimbursement: "Up to 90%",
    annualLimit: "Mid-range custom limit",
    deductibleChoices: "Balanced deductible",
    addOns: "Exam and dental illness",
    waitingPeriod: "Accident/illness: up to 15 days",
    breedConditions: "Hereditary included",
    dentalIllness: "Covered",
    examFees: "Covered",
    vetPayment: "Reimbursement",
    bestFor: "Balanced protection",
    keyStrength: "Everyday illness support",
    watchFor: "Check annual limit",
    quoteLabel: "Get Fetch Quote"
  },
  trupanion: {
    providerName: "Trupanion",
    coverageDepth: "Strong medical coverage",
    reimbursement: "90%",
    annualLimit: "No annual limit",
    deductibleChoices: "Per-condition deductible",
    addOns: "Recovery Care optional",
    waitingPeriod: "Injury: 5 days; illness: 30 days",
    breedConditions: "Hereditary included",
    dentalIllness: "Covered if eligible",
    examFees: "Not covered",
    vetPayment: "Vet Direct Pay",
    bestFor: "Higher-risk pets",
    keyStrength: "High-cost care",
    watchFor: "Premium may be higher",
    quoteLabel: "Get Trupanion Quote"
  },
  petsPlusUs: {
    providerName: "Pets Plus Us",
    coverageDepth: "Accident + illness options",
    reimbursement: "70%, 80%, 90%",
    annualLimit: "$7.5k or $15k",
    deductibleChoices: "Selectable deductible",
    addOns: "Wellness add-ons",
    waitingPeriod: "Accident: 48h; illness: 14 days",
    breedConditions: "Hereditary included",
    dentalIllness: "Dental available",
    examFees: "Eligible exam fees",
    vetPayment: "Reimbursement",
    bestFor: "Local support",
    keyStrength: "Flexible options",
    watchFor: "Compare add-ons",
    quoteLabel: "Get Pets Plus Us Quote"
  },
  phiDirect: {
    providerName: "PHI Direct",
    coverageDepth: "Simple accident + illness",
    reimbursement: "80%",
    annualLimit: "$5k or $10k",
    deductibleChoices: "Simple deductible",
    addOns: "Limited extras",
    waitingPeriod: "Accident: 48h; illness: 14 days",
    breedConditions: "New conditions covered",
    dentalIllness: "Dental injury",
    examFees: "Not included",
    vetPayment: "Reimbursement",
    bestFor: "Cost-conscious pets",
    keyStrength: "Simple protection",
    watchFor: "Less complete coverage",
    quoteLabel: "Get PHI Direct Quote"
  }
};

const strongComparisonData: Record<ProviderKey, ProviderComparison> = {
  fetch: {
    providerName: "Fetch",
    coverageDepth: "Broad accident + illness",
    reimbursement: "Up to 90%",
    annualLimit: "Higher limit options",
    deductibleChoices: "Lower deductible option",
    addOns: "Broader illness support",
    waitingPeriod: "Accident/illness: up to 15 days",
    breedConditions: "Hereditary included",
    dentalIllness: "Covered",
    examFees: "Covered",
    vetPayment: "Reimbursement",
    bestFor: "Ongoing health needs",
    keyStrength: "Broad illness coverage",
    watchFor: "Select higher limit",
    quoteLabel: "Get Fetch Quote"
  },
  trupanion: {
    providerName: "Trupanion",
    coverageDepth: "Premium medical coverage",
    reimbursement: "90%",
    annualLimit: "No annual limit",
    deductibleChoices: "Per-condition deductible",
    addOns: "Recovery Care optional",
    waitingPeriod: "Injury: 5 days; illness: 30 days",
    breedConditions: "Hereditary included",
    dentalIllness: "Covered if eligible",
    examFees: "Not covered",
    vetPayment: "Vet Direct Pay",
    bestFor: "High-risk breeds",
    keyStrength: "Large vet bills",
    watchFor: "Higher monthly cost",
    quoteLabel: "Get Trupanion Quote"
  },
  petsPlusUs: {
    providerName: "Pets Plus Us",
    coverageDepth: "Accident + illness + extras",
    reimbursement: "70%, 80%, 90%",
    annualLimit: "$15k option",
    deductibleChoices: "Lower deductible option",
    addOns: "Wellness and extras",
    waitingPeriod: "Accident: 48h; illness: 14 days",
    breedConditions: "Hereditary included",
    dentalIllness: "Dental available",
    examFees: "Eligible exam fees",
    vetPayment: "Reimbursement",
    bestFor: "Extra support",
    keyStrength: "Add-on flexibility",
    watchFor: "Coverage cap",
    quoteLabel: "Get Pets Plus Us Quote"
  },
  phiDirect: {
    providerName: "PHI Direct",
    coverageDepth: "Affordable backup",
    reimbursement: "80%",
    annualLimit: "$10k option",
    deductibleChoices: "Simple deductible",
    addOns: "Few extras",
    waitingPeriod: "Accident: 48h; illness: 14 days",
    breedConditions: "New conditions covered",
    dentalIllness: "Dental injury",
    examFees: "Not included",
    vetPayment: "Reimbursement",
    bestFor: "Budget backup plan",
    keyStrength: "Affordable backup",
    watchFor: "Not strongest coverage",
    quoteLabel: "Get PHI Direct Quote"
  }
};

const comparisonData: Record<CoverageLevel, Record<ProviderKey, ProviderComparison>> = {
  basic: basicComparisonData,
  balanced: balancedComparisonData,
  strong: strongComparisonData
};

const providerKeys: ProviderKey[] = ["fetch", "trupanion", "petsPlusUs", "phiDirect"];

const comparisonRows: Array<{
  key: keyof Omit<ProviderComparison, "providerName" | "quoteLabel">;
  label: string;
  icon: string;
}> = [
  { key: "coverageDepth", label: "Coverage depth", icon: "🛡️" },
  { key: "reimbursement", label: "Reimbursement", icon: "💵" },
  { key: "annualLimit", label: "Annual limit", icon: "📈" },
  { key: "deductibleChoices", label: "Deductible choices", icon: "🧾" },
  { key: "addOns", label: "Add-ons", icon: "➕" },
  { key: "waitingPeriod", label: "Waiting period", icon: "⏳" },
  { key: "breedConditions", label: "Breed conditions", icon: "🦴" },
  { key: "dentalIllness", label: "Dental illness", icon: "🦷" },
  { key: "examFees", label: "Exam fees", icon: "🩺" },
  { key: "vetPayment", label: "Vet payment", icon: "🏥" },
  { key: "keyStrength", label: "Key strength", icon: "⭐" },
  { key: "watchFor", label: "Watch for", icon: "⚠️" },
  { key: "bestFor", label: "Best fit", icon: "🐾" }
];

export function CoveragePrioritySelector({
  recommendedLevel = "balanced"
}: {
  recommendedLevel?: CoverageLevel;
}) {
  const [selectedCoverageLevel, setSelectedCoverageLevel] =
    useState<CoverageLevel>(recommendedLevel);
  const activeComparison = comparisonData[selectedCoverageLevel];

  useEffect(() => {
    function handleRecommendedLevel(event: Event) {
      const customEvent = event as CustomEvent<{ level?: CoverageLevel }>;
      const nextLevel = customEvent.detail?.level;

      if (nextLevel && nextLevel in comparisonData) {
        setSelectedCoverageLevel(nextLevel);
      }
    }

    window.addEventListener(
      "pawshield:set-coverage-level",
      handleRecommendedLevel
    );

    return () => {
      window.removeEventListener(
        "pawshield:set-coverage-level",
        handleRecommendedLevel
      );
    };
  }, []);

  return (
    <section
      id="compare-insurance-options"
      className="mt-8 scroll-mt-24 rounded-lg border border-spruce/15 bg-white p-6 shadow-soft"
    >
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold text-ink">
          Compare Your Coverage Options
        </h2>
        <p className="mt-2 leading-7 text-ink/70">
          See how providers compare for your recommended protection level. You
          can switch between Basic, Balanced, and Strong coverage.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {coverageLevels.map((level) => {
          const isSelected = level.value === selectedCoverageLevel;

          return (
            <button
              key={level.value}
              type="button"
              aria-pressed={isSelected}
              className={`rounded-lg border px-5 py-4 text-left font-semibold transition ${
                isSelected
                  ? "border-spruce bg-mint text-ink shadow-sm"
                  : "border-ink/10 bg-[#fbfdfc] text-ink/75 hover:border-spruce/35 hover:bg-mint/50"
              }`}
              onClick={() => setSelectedCoverageLevel(level.value)}
            >
              {level.title}
            </button>
          );
        })}
      </div>

      <div className="comparison-table-wrapper mt-6 hidden max-h-[75vh] overflow-auto rounded-lg border border-ink/10 md:block">
        <table className="min-w-[980px] divide-y divide-ink/10 bg-white text-left text-sm">
          <thead className="sticky top-0 z-20 bg-[#fbfdfc] shadow-[0_8px_14px_rgba(29,53,46,0.08)]">
            <tr>
              <th className="sticky left-0 z-30 w-44 bg-[#fbfdfc] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-spruce shadow-[8px_0_12px_rgba(29,53,46,0.06)]">
                Feature
              </th>
              {providerKeys.map((providerKey) => (
                <th
                  key={providerKey}
                  className="bg-[#fbfdfc] px-4 py-3 text-sm font-semibold text-ink"
                >
                  {providerNames[providerKey]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {comparisonRows.map((row) => (
              <tr key={row.key} className="align-top">
                <th className="sticky left-0 z-10 bg-[#fbfdfc] px-4 py-4 text-sm font-semibold text-spruce shadow-[8px_0_12px_rgba(29,53,46,0.05)]">
                  <span aria-hidden="true">{row.icon}</span> {row.label}
                </th>
                {providerKeys.map((providerKey) => (
                  <td
                    key={`${row.key}-${providerKey}`}
                    className="px-4 py-4 leading-6 text-ink/72"
                  >
                    {activeComparison[providerKey][row.key]}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="align-top">
              <th className="sticky left-0 z-10 bg-[#fbfdfc] px-4 py-4 text-sm font-semibold text-spruce shadow-[8px_0_12px_rgba(29,53,46,0.05)]">
                Quote
              </th>
              {providerKeys.map((providerKey) => (
                <td key={providerKey} className="px-4 py-4">
                  <a
                    href={providerLinks[providerKey]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex whitespace-nowrap rounded-md bg-spruce px-4 py-2.5 font-semibold text-white hover:bg-ink"
                  >
                    {activeComparison[providerKey].quoteLabel}
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 md:hidden">
        {providerKeys.map((providerKey) => {
          const provider = activeComparison[providerKey];

          return (
            <article
              key={providerKey}
              className="rounded-lg border border-ink/10 bg-[#fbfdfc] p-5"
            >
              <h3 className="text-lg font-semibold text-ink">
                {provider.providerName}
              </h3>
              <dl className="mt-4 grid gap-3">
                {comparisonRows.map((row) => (
                  <div key={row.key} className="grid gap-1">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-spruce">
                      <span aria-hidden="true">{row.icon}</span> {row.label}
                    </dt>
                    <dd className="text-sm leading-6 text-ink/72">
                      {provider[row.key]}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href={providerLinks[providerKey]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full justify-center rounded-md bg-spruce px-4 py-2.5 font-semibold text-white hover:bg-ink"
              >
                {provider.quoteLabel}
              </a>
            </article>
          );
        })}
      </div>

      <p className="mt-5 rounded-md bg-butter px-4 py-3 text-sm font-medium leading-6 text-ink">
        You&apos;ll continue on each provider&apos;s official website to confirm
        your personalized price, eligibility, and policy details.
      </p>

      <p className="mt-3 rounded-md bg-[#fbfdfc] px-4 py-3 text-sm font-medium leading-6 text-ink/70">
        Coverage details are summarized for easier comparison and may change.
        Final eligibility, exclusions, pricing, and policy terms are confirmed
        directly with each provider.
      </p>
    </section>
  );
}
