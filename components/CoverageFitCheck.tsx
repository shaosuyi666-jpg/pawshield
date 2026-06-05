"use client";

import { useMemo, useState } from "react";

type ProviderKey = "fetch" | "trupanion" | "petsPlusUs" | "phiDirect";
type CoverageLevel = "basic" | "balanced" | "strong";

type ProviderFeatures = {
  name: string;
  features: string[];
  missingOrCheck: string[];
};

type PetNeed = {
  key: string;
  label: string;
  featureMatches: string[];
  warning: string;
};

const providerData: Record<ProviderKey, ProviderFeatures> = {
  fetch: {
    name: "Fetch",
    features: [
      "accident coverage",
      "illness coverage",
      "hereditary conditions",
      "dental illness",
      "exam fees",
      "diagnostics",
      "reimbursement model"
    ],
    missingOrCheck: ["annual limit choice", "final exclusions"]
  },
  trupanion: {
    name: "Trupanion",
    features: [
      "accident coverage",
      "illness coverage",
      "hereditary conditions",
      "diagnostics",
      "high-cost care",
      "no annual payout limit",
      "Vet Direct Pay"
    ],
    missingOrCheck: [
      "exam fees not covered",
      "dental details",
      "deductible structure"
    ]
  },
  petsPlusUs: {
    name: "Pets Plus Us",
    features: [
      "accident coverage",
      "illness coverage",
      "hereditary conditions",
      "dental available",
      "wellness add-ons",
      "Canadian support"
    ],
    missingOrCheck: ["annual limit choice", "add-on details"]
  },
  phiDirect: {
    name: "PHI Direct",
    features: [
      "accident coverage",
      "illness coverage",
      "lower-cost structure",
      "dental injury"
    ],
    missingOrCheck: [
      "limited extras",
      "exam fees not included",
      "lower annual limit",
      "may be less suitable for high-risk pets"
    ]
  }
};

const coverageLevelLabels: Record<CoverageLevel, string> = {
  basic: "Basic Protection",
  balanced: "Balanced Coverage",
  strong: "Strong Protection"
};

const needRules: Array<{
  terms: string[];
  needs: PetNeed[];
}> = [
  {
    terms: ["allergies", "skin problems", "skin allergies", "ear infections"],
    needs: [
      {
        key: "illness",
        label: "Illness coverage",
        featureMatches: ["illness coverage"],
        warning:
          "Check chronic condition, medication, and exam fee coverage for allergy or skin-related care."
      },
      {
        key: "medication",
        label: "Medication support",
        featureMatches: ["illness coverage", "diagnostics"],
        warning:
          "Important to confirm medication and ongoing treatment rules for recurring issues."
      },
      {
        key: "exam-fees",
        label: "Exam fee support",
        featureMatches: ["exam fees"],
        warning: "Exam fees may not be included with every provider or plan."
      },
      {
        key: "chronic",
        label: "Chronic condition support",
        featureMatches: ["illness coverage", "hereditary conditions"],
        warning:
          "Worth checking how recurring or chronic conditions are handled after enrollment."
      }
    ]
  },
  {
    terms: ["eye disease", "eye conditions", "eye problems"],
    needs: [
      {
        key: "eye-illness",
        label: "Illness coverage",
        featureMatches: ["illness coverage"],
        warning:
          "Check whether eye conditions, specialist visits, and diagnostic testing are eligible."
      },
      {
        key: "diagnostics",
        label: "Diagnostic testing",
        featureMatches: ["diagnostics"],
        warning: "Important to confirm diagnostic testing eligibility."
      },
      {
        key: "specialist",
        label: "Specialist care",
        featureMatches: ["high-cost care", "diagnostics", "illness coverage"],
        warning: "Specialist care rules can vary by plan and provider."
      }
    ]
  },
  {
    terms: ["dental disease", "dental"],
    needs: [
      {
        key: "dental-illness",
        label: "Dental illness coverage",
        featureMatches: ["dental illness", "dental available"],
        warning:
          "Check whether dental illness is available, not only dental injury."
      }
    ]
  },
  {
    terms: [
      "luxating patella",
      "hip dysplasia",
      "elbow dysplasia",
      "arthritis",
      "previous knee injury",
      "joint",
      "orthopedic"
    ],
    needs: [
      {
        key: "orthopedic",
        label: "Orthopedic-related coverage",
        featureMatches: ["hereditary conditions", "high-cost care"],
        warning:
          "Check orthopedic, hereditary, bilateral condition, and waiting-period rules."
      },
      {
        key: "hereditary",
        label: "Hereditary condition coverage",
        featureMatches: ["hereditary conditions"],
        warning: "Important to confirm hereditary condition eligibility."
      },
      {
        key: "ortho-diagnostics",
        label: "Diagnostic imaging",
        featureMatches: ["diagnostics"],
        warning: "Diagnostic imaging can matter for orthopedic concerns."
      },
      {
        key: "rehab",
        label: "Rehabilitation options",
        featureMatches: ["wellness add-ons", "high-cost care"],
        warning:
          "Rehabilitation or recovery support may require specific options or add-ons."
      }
    ]
  },
  {
    terms: ["cancer"],
    needs: [
      {
        key: "cancer-limit",
        label: "High annual limit",
        featureMatches: ["no annual payout limit", "high-cost care"],
        warning: "Annual limit may matter for surgery or long-term illness."
      },
      {
        key: "cancer-diagnostics",
        label: "Diagnostics",
        featureMatches: ["diagnostics"],
        warning: "Important to confirm diagnostics and staging tests."
      },
      {
        key: "cancer-medication",
        label: "Medication support",
        featureMatches: ["illness coverage", "high-cost care"],
        warning: "Confirm medication, treatment, and specialist rules."
      }
    ]
  },
  {
    terms: ["heart disease", "kidney disease", "diabetes", "seizures"],
    needs: [
      {
        key: "chronic-illness",
        label: "Chronic illness coverage",
        featureMatches: ["illness coverage", "high-cost care"],
        warning: "Important to confirm chronic illness rules and exclusions."
      },
      {
        key: "chronic-medication",
        label: "Medication support",
        featureMatches: ["illness coverage"],
        warning: "Medication rules can vary and are worth checking closely."
      },
      {
        key: "chronic-diagnostics",
        label: "Diagnostics",
        featureMatches: ["diagnostics"],
        warning: "Ongoing diagnostics may be important for chronic conditions."
      },
      {
        key: "chronic-limit",
        label: "High annual limit",
        featureMatches: ["no annual payout limit", "high-cost care"],
        warning: "Annual limits may matter for long-term illness management."
      }
    ]
  }
];

function includesTerm(items: string[], terms: string[]) {
  const normalizedItems = items.map((item) => item.toLowerCase());

  return terms.some((term) =>
    normalizedItems.some((item) => item.includes(term.toLowerCase()))
  );
}

function getPetNeeds(risks: string[], issues: string[]) {
  const combined = [...risks, ...issues];
  const needs = new Map<string, PetNeed>();

  needRules.forEach((rule) => {
    if (!includesTerm(combined, rule.terms)) return;
    rule.needs.forEach((need) => needs.set(need.key, need));
  });

  if (needs.size === 0) {
    needs.set("starter-illness", {
      key: "starter-illness",
      label: "Accident and illness coverage",
      featureMatches: ["accident coverage", "illness coverage"],
      warning: "Confirm waiting periods, exclusions, and annual limits."
    });
    needs.set("limits", {
      key: "limits",
      label: "Clear annual limit",
      featureMatches: ["no annual payout limit", "high-cost care"],
      warning: "Annual limits are worth checking before requesting a quote."
    });
  }

  return Array.from(needs.values());
}

function getFitLabel(percent: number) {
  if (percent >= 80) return "Strong fit";
  if (percent >= 60) return "Good fit";
  if (percent >= 40) return "Partial fit";
  return "Needs careful review";
}

function getFitExplanation(label: string, providerName: string, level: string) {
  if (label === "Strong fit") {
    return `${providerName} appears aligned with many of this pet's risk needs at the ${level} level.`;
  }
  if (label === "Good fit") {
    return `${providerName} may support several important needs, with a few details worth checking.`;
  }
  if (label === "Partial fit") {
    return `${providerName} matches some needs, but key coverage details should be confirmed carefully.`;
  }
  return `${providerName} needs careful review for this profile before relying on it as a coverage match.`;
}

export function CoverageFitCheck({
  breedRisks,
  healthIssues
}: {
  breedRisks: string[];
  healthIssues: string[];
}) {
  const [providerKey, setProviderKey] = useState<ProviderKey>("fetch");
  const [coverageLevel, setCoverageLevel] = useState<CoverageLevel>("balanced");
  const provider = providerData[providerKey];
  const needs = useMemo(
    () => getPetNeeds(breedRisks, healthIssues),
    [breedRisks, healthIssues]
  );

  const matchedNeeds = needs.filter((need) =>
    need.featureMatches.some((feature) => provider.features.includes(feature))
  );
  const levelWarnings =
    coverageLevel === "basic"
      ? ["Basic plans may have fewer extras or lower limits for complex care."]
      : coverageLevel === "strong"
        ? ["Confirm higher-limit options, exclusions, and deductible choices."]
        : ["Compare annual limits and add-ons before choosing."];
  const providerWarnings = provider.missingOrCheck.map((item) => {
    if (item.includes("exam fees")) return "Exam fees may not be included.";
    if (item.includes("lower annual limit")) {
      return "Annual limit may matter for surgery or long-term illness.";
    }
    if (item.includes("annual limit")) {
      return "Annual limit choice is important to confirm.";
    }
    if (item.includes("dental")) {
      return "Dental details are worth checking closely.";
    }
    return `${item.charAt(0).toUpperCase()}${item.slice(1)} is important to confirm.`;
  });
  const conflictCount = provider.missingOrCheck.filter((item) =>
    item.includes("exam fees") ||
    item.includes("annual limit") ||
    item.includes("less suitable")
  ).length;
  const levelConflictCount =
    coverageLevel === "basic" &&
    needs.some((need) =>
      ["High annual limit", "Specialist care", "Rehabilitation options"].includes(
        need.label
      )
    )
      ? 1
      : 0;
  const levelBonus =
    coverageLevel === "strong" &&
    needs.some((need) =>
      ["High annual limit", "Specialist care", "Orthopedic-related coverage"].includes(
        need.label
      )
    )
      ? 1
      : 0;
  const rawScore = matchedNeeds.length + levelBonus - conflictCount - levelConflictCount;
  const fitPercent = Math.max(
    0,
    Math.min(100, Math.round((rawScore / Math.max(1, needs.length)) * 100))
  );
  const fitLabel = getFitLabel(fitPercent);

  return (
    <section className="mt-8 rounded-lg border border-spruce/15 bg-white p-6 shadow-soft sm:p-8">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold text-ink">
          Check Coverage Fit for Your Pet
        </h2>
        <p className="mt-2 leading-7 text-ink/70">
          Select a provider and coverage level to see how well the features
          match your pet&apos;s health risks.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Provider
          <select
            value={providerKey}
            className="focus-ring rounded-md border border-ink/15 bg-white px-3 py-3"
            onChange={(event) => setProviderKey(event.target.value as ProviderKey)}
          >
            <option value="fetch">Fetch</option>
            <option value="trupanion">Trupanion</option>
            <option value="petsPlusUs">Pets Plus Us</option>
            <option value="phiDirect">PHI Direct</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-ink">
          Coverage level
          <select
            value={coverageLevel}
            className="focus-ring rounded-md border border-ink/15 bg-white px-3 py-3"
            onChange={(event) =>
              setCoverageLevel(event.target.value as CoverageLevel)
            }
          >
            <option value="basic">Basic Protection</option>
            <option value="balanced">Balanced Coverage</option>
            <option value="strong">Strong Protection</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <article className="rounded-lg border border-ink/10 bg-[#fbfdfc] p-5">
          <h3 className="text-lg font-semibold text-ink">
            Likely helpful for your pet
          </h3>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/75">
            {matchedNeeds.length > 0 ? (
              matchedNeeds.map((need) => (
                <li key={need.key} className="flex gap-2">
                  <span className="font-semibold text-spruce">✓</span>
                  <span>{need.label}</span>
                </li>
              ))
            ) : (
              <li>Worth checking basic accident and illness support.</li>
            )}
          </ul>
        </article>

        <article className="rounded-lg border border-ink/10 bg-[#fff8ef] p-5">
          <h3 className="text-lg font-semibold text-ink">
            Things to double-check
          </h3>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/75">
            {[...needs.map((need) => need.warning), ...providerWarnings, ...levelWarnings]
              .filter((warning, index, list) => list.indexOf(warning) === index)
              .slice(0, 6)
              .map((warning) => (
                <li key={warning}>- {warning}</li>
              ))}
          </ul>
        </article>

        <article className="rounded-lg border border-ink/10 bg-mint p-5">
          <h3 className="text-lg font-semibold text-ink">
            PawShield fit summary
          </h3>
          <p className="mt-4 text-sm font-semibold text-spruce">Fit level</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{fitLabel}</p>
          <p className="mt-3 text-sm leading-6 text-ink/75">
            {getFitExplanation(
              fitLabel,
              provider.name,
              coverageLevelLabels[coverageLevel]
            )}
          </p>
        </article>
      </div>

      <p className="mt-5 rounded-md bg-butter px-4 py-3 text-sm font-medium leading-6 text-ink">
        This is an educational fit check. Final coverage, exclusions, waiting
        periods, and eligibility are confirmed directly with each provider.
      </p>
    </section>
  );
}
