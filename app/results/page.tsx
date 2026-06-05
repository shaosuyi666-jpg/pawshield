import Link from "next/link";
import {
  AlertCircle,
  BarChart3,
  HeartPulse,
  HelpCircle,
  ShieldCheck
} from "lucide-react";
import { CompareRecommendedButton } from "@/components/CompareRecommendedButton";
import { CoverageFitCheck } from "@/components/CoverageFitCheck";
import { CoveragePrioritySelector } from "@/components/CoveragePrioritySelector";
import { legalDisclaimer } from "@/lib/constants";
import {
  AssessmentInput,
  calculateInsuranceScore,
  Lifestyle
} from "@/lib/scoring";

type ScoreCategory = "Low" | "Medium" | "High";

type RecommendedProvider = {
  name: string;
  reasons: string[];
  score: number;
};

const scoreBreakdownMeta = [
  { key: "breedRisk", label: "Breed risk", max: 30 },
  { key: "age", label: "Age", max: 20 },
  { key: "healthIssues", label: "Health issues", max: 25 },
  { key: "lifestyle", label: "Lifestyle", max: 10 },
  { key: "provinceCost", label: "Province cost", max: 10 },
  { key: "earlyEnrollment", label: "Early enrollment", max: 5 }
] as const;

function readValue(
  params: Record<string, string | string[] | undefined>,
  key: string,
  fallback: string
) {
  const value = params[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

function readValues(
  params: Record<string, string | string[] | undefined>,
  key: string
) {
  const value = params[key];
  if (Array.isArray(value)) return value.filter((item) => item.trim());
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}

function readNumber(
  params: Record<string, string | string[] | undefined>,
  key: string,
  fallback: number
) {
  const value = Number(readValue(params, key, String(fallback)));
  return Number.isFinite(value) ? Math.max(0, value) : fallback;
}

function readAgeUnit(
  params: Record<string, string | string[] | undefined>
): AssessmentInput["ageUnit"] {
  return readValue(params, "ageUnit", "years").toLowerCase() === "months"
    ? "months"
    : "years";
}

function getAgeInMonths(ageNumber: number, ageUnit: AssessmentInput["ageUnit"]) {
  return ageUnit === "years" ? ageNumber * 12 : ageNumber;
}

function formatAge(ageNumber: number, ageUnit: AssessmentInput["ageUnit"]) {
  const unitLabel =
    ageUnit === "years"
      ? ageNumber === 1
        ? "year"
        : "years"
      : ageNumber === 1
        ? "month"
        : "months";

  return `${ageNumber} ${unitLabel} old`;
}

function getPetDisplayName(input: AssessmentInput) {
  return input.petName.trim() || input.breed;
}

function toAssessmentInput(
  params: Record<string, string | string[] | undefined>
): AssessmentInput {
  const ageUnit = readAgeUnit(params);
  const ageNumber = readNumber(params, "ageNumber", readNumber(params, "age", 2));

  return {
    petType: readValue(params, "petType", "dog") === "cat" ? "cat" : "dog",
    petName: readValue(params, "petName", ""),
    sex: readValue(params, "sex", "Female") === "Male" ? "Male" : "Female",
    breed: readValue(params, "breed", "Golden Retriever"),
    ageNumber,
    ageUnit,
    ageInMonths: getAgeInMonths(ageNumber, ageUnit),
    province: readValue(params, "province", "ON"),
    healthIssues: readValues(params, "healthIssues"),
    lifestyle: readValue(params, "lifestyle", "normal") as Lifestyle,
    lifestyleLabel: readValue(params, "lifestyleLabel", "Everyday Explorer 🐕")
  };
}

function includesRisk(items: string[], terms: string[]) {
  const normalizedItems = items.map((item) => item.toLowerCase());

  return terms.some((term) =>
    normalizedItems.some((item) => item.includes(term.toLowerCase()))
  );
}

function getCoverageLevel(score: number) {
  if (score >= 70) {
    return {
      value: "strong" as const,
      title: "Strong Protection 🛡️",
      summary:
        "A stronger accident + illness plan may be worth comparing for broader protection against unexpected medical costs."
    };
  }

  if (score >= 40) {
    return {
      value: "balanced" as const,
      title: "Balanced Coverage ⚖️",
      summary:
        "A balanced accident + illness plan may provide a good mix of protection and cost."
    };
  }

  return {
    value: "basic" as const,
    title: "Basic Protection 💰",
    summary:
      "A simpler accident + illness option may be a reasonable starting point for comparing affordable protection."
  };
}

function getRecommendationReasons(
  input: AssessmentInput,
  category: ScoreCategory
) {
  const reasons = [`${category} PawShield score`];

  if (input.breed) reasons.push(`${input.breed} breed profile`);
  if (input.ageInMonths <= 24) reasons.push("Young age");
  if (input.ageInMonths >= 96) reasons.push("Senior age");
  if (input.lifestyle === "active" || input.lifestyle === "high") {
    reasons.push("Active lifestyle");
  }
  if (input.healthIssues.length > 0) reasons.push("Selected health issues");

  return reasons.slice(0, 4);
}

function getCoverageFeatures(input: AssessmentInput, risks: string[]) {
  const allRisks = [...risks, ...input.healthIssues];
  const features = new Set<string>();

  if (
    includesRisk(allRisks, [
      "hip dysplasia",
      "luxating patella",
      "arthritis",
      "previous knee injury",
      "elbow dysplasia",
      "joint",
      "orthopedic"
    ])
  ) {
    features.add("Orthopedic coverage");
    features.add("Hereditary condition coverage");
    features.add("Diagnostic imaging coverage");
    features.add("Rehabilitation options");
  }

  if (
    includesRisk(allRisks, [
      "allergies",
      "skin",
      "ear infections",
      "recurring infections"
    ])
  ) {
    features.add("Illness coverage");
    features.add("Medication coverage");
    features.add("Exam fee coverage");
    features.add("Chronic condition support");
  }

  if (includesRisk(allRisks, ["eye disease", "eye conditions", "eye problems"])) {
    features.add("Specialist visits");
    features.add("Diagnostic testing");
    features.add("Long-term illness coverage");
  }

  if (includesRisk(allRisks, ["dental disease", "dental"])) {
    features.add("Dental illness coverage");
    features.add("Dental injury coverage");
  }

  if (input.ageInMonths <= 24) {
    features.add("Early enrollment");
    features.add("Future illness protection");
  }

  if (features.size === 0) {
    features.add("Accident + illness coverage");
    features.add("Clear annual coverage limits");
    features.add("Waiting period details");
  }

  return Array.from(features).slice(0, 6);
}

function getProviderRecommendations(
  input: AssessmentInput,
  risks: string[],
  score: number
) {
  const allRisks = [...risks, ...input.healthIssues];
  const providers: RecommendedProvider[] = [
    {
      name: "Trupanion",
      score: score >= 70 ? 30 : score >= 40 ? 12 : 4,
      reasons: ["unexpected high-cost care"]
    },
    {
      name: "Fetch",
      score: score >= 70 ? 24 : score >= 40 ? 30 : 10,
      reasons: ["everyday illness coverage"]
    },
    {
      name: "Pets Plus Us",
      score: score >= 70 ? 16 : score >= 40 ? 24 : 20,
      reasons: ["flexible Canadian coverage options"]
    },
    {
      name: "PHI Direct",
      score: score < 40 ? 30 : 8,
      reasons: ["budget-conscious basic protection"]
    }
  ];

  if (
    includesRisk(allRisks, [
      "hip dysplasia",
      "luxating patella",
      "arthritis",
      "previous knee injury",
      "elbow dysplasia",
      "orthopedic",
      "joint"
    ])
  ) {
    providers.find((provider) => provider.name === "Trupanion")!.score += 8;
    providers.find((provider) => provider.name === "Fetch")!.score += 5;
    providers.find((provider) => provider.name === "Trupanion")!.reasons.push(
      "orthopedic concerns"
    );
    providers.find((provider) => provider.name === "Fetch")!.reasons.push(
      "diagnostics and illness support"
    );
  }

  if (
    includesRisk(allRisks, [
      "dental",
      "skin",
      "allergies",
      "ear infections",
      "recurring infections"
    ])
  ) {
    providers.find((provider) => provider.name === "Fetch")!.score += 8;
    providers.find((provider) => provider.name === "Fetch")!.reasons.push(
      "dental, allergy, or skin concerns"
    );
  }

  if (input.ageInMonths <= 24) {
    providers.find((provider) => provider.name === "Pets Plus Us")!.score += 5;
    providers.find((provider) => provider.name === "PHI Direct")!.score +=
      score < 40 ? 6 : 2;
    providers.find((provider) => provider.name === "Pets Plus Us")!.reasons.push(
      "wellness and preventive options"
    );
    providers.find((provider) => provider.name === "PHI Direct")!.reasons.push(
      "healthy young pets"
    );
  }

  return providers
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((provider) => ({
      ...provider,
      reasons: Array.from(new Set(provider.reasons)).slice(0, 3)
    }));
}

export default async function ResultsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const input = toAssessmentInput(await searchParams);
  const result = calculateInsuranceScore(input);
  const risks = result.breedRisk?.commonRisks ?? [
    "We are still expanding detailed breed insights",
    "PawShield estimated your result using general pet information",
    "Ask your veterinarian about breed-specific concerns"
  ];
  const coverageRecommendation = getCoverageLevel(result.score);
  const recommendationReasons = getRecommendationReasons(input, result.category);
  const coverageFeatures = getCoverageFeatures(input, risks);
  const providerRecommendations = getProviderRecommendations(
    input,
    risks,
    result.score
  );
  const petDisplayName = getPetDisplayName(input);

  return (
    <main className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-spruce">
          Assessment results
        </p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-ink">
              {petDisplayName}&apos;s PawShield Protection Score
            </h1>
            <p className="mt-2 text-ink/70">
              {input.petType === "dog" ? "Dog" : "Cat"} · {input.breed} ·{" "}
              {input.sex} · {formatAge(input.ageNumber, input.ageUnit)} ·{" "}
              {input.province}
            </p>
            <p className="mt-1 text-sm font-medium text-spruce">
              Lifestyle: {input.lifestyleLabel}
            </p>
          </div>
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center rounded-md border border-ink/15 px-4 py-2.5 text-sm font-semibold hover:bg-mint"
          >
            Edit profile
          </Link>
        </div>

        <div className="mt-8 rounded-lg border border-spruce/15 bg-mint p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div className="relative rounded-lg bg-white p-6 shadow-sm">
              <div className="group absolute right-4 top-4">
                <HelpCircle className="text-spruce" size={18} />
                <div className="pointer-events-none absolute right-0 top-7 z-10 w-64 rounded-md border border-spruce/15 bg-white p-3 text-xs font-medium leading-5 text-ink/75 opacity-0 shadow-soft transition group-hover:opacity-100">
                  Score combines breed risk, age, health issues, lifestyle, and
                  province vet-cost weight. Higher scores mean broader coverage
                  may be more useful to compare.
                </div>
              </div>
              <BarChart3 className="text-spruce" size={28} />
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-spruce">
                PawShield Protection Score
              </p>
              <p className="mt-2 text-6xl font-semibold leading-none text-ink">
                {result.score}
                <span className="text-2xl text-ink/50">/100</span>
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <div className="group relative">
                  <span className="inline-flex items-center gap-2 rounded-full bg-skywash px-4 py-2 text-sm font-semibold text-ink">
                    <AlertCircle className="text-spruce" size={16} />
                    {result.category}
                    <HelpCircle className="text-spruce" size={14} />
                  </span>
                  <div className="pointer-events-none absolute left-0 top-11 z-10 w-64 rounded-md border border-spruce/15 bg-white p-3 text-xs font-medium leading-5 text-ink/75 opacity-0 shadow-soft transition group-hover:opacity-100">
                    Category summarizes the score as Low, Medium, or High. It
                    frames how much insurance value PawShield estimates for this
                    pet.
                  </div>
                </div>
              </div>
              <div className="group relative mt-5 rounded-md bg-butter px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-spruce">
                      Coverage recommendation
                    </p>
                    <p className="mt-1 text-base font-semibold leading-6 text-ink">
                      {result.coverageType}
                    </p>
                  </div>
                  <HelpCircle className="shrink-0 text-spruce" size={16} />
                </div>
                <div className="pointer-events-none absolute right-3 top-12 z-10 w-64 rounded-md border border-spruce/15 bg-white p-3 text-xs font-medium leading-5 text-ink/75 opacity-0 shadow-soft transition group-hover:opacity-100">
                  Recommended coverage suggests a level to compare first. Final
                  policy fit, eligibility, and pricing come from insurers.
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink">Score breakdown</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {scoreBreakdownMeta.map((item) => (
                  <div
                    key={item.key}
                    className="rounded-md border border-spruce/10 bg-white/70 px-3 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-ink/65">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-ink">
                        {result.breakdown[item.key]}/{item.max}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-md bg-white/75 px-4 py-4">
                <h2 className="text-base font-semibold text-ink">
                  What this means
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink/70">
                  This score is based on your pet&apos;s breed profile, age,
                  lifestyle, province, and any selected health issues. It helps
                  estimate how useful broader coverage may be for your pet.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-ink/10 bg-[#fbfdfc] p-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <HeartPulse className="text-spruce" size={22} />
            Common breed risks
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {risks.map((risk) => (
              <li key={risk} className="rounded-md bg-white px-3 py-3 text-sm shadow-sm">
                {risk}
              </li>
            ))}
          </ul>
          {result.breedRisk?.coverageFocus ? (
            <p className="mt-4 rounded-md bg-mint px-3 py-3 text-sm font-medium leading-6 text-spruce">
              Coverage focus: {result.breedRisk.coverageFocus}
            </p>
          ) : null}
        </div>

        <div className="mt-8 rounded-lg border border-spruce/15 bg-[#fbfdfc] p-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-ink">
              PawShield Recommendation 🐾
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              PawShield uses your pet profile to suggest coverage levels,
              important features, and providers worth comparing.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-spruce">
                Recommended coverage level
              </p>
              <h3 className="mt-3 text-xl font-semibold text-ink">
                {coverageRecommendation.title}
              </h3>
              <div className="mt-4">
                <p className="text-sm font-semibold text-ink">Based on:</p>
                <ul className="mt-2 grid gap-2 text-sm leading-6 text-ink/72">
                  {recommendationReasons.map((reason) => (
                    <li key={reason}>- {reason}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-sm leading-6 text-ink/72">
                {coverageRecommendation.summary}
              </p>
            </article>

            <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-spruce">
                Coverage features to prioritize
              </p>
              <h3 className="mt-3 text-xl font-semibold text-ink">
                You may want:
              </h3>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/72">
                {coverageFeatures.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="font-semibold text-spruce">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-spruce">
                Suggested providers to compare
              </p>
              <div className="mt-4 grid gap-4">
                {providerRecommendations.map((provider, index) => (
                  <div
                    key={provider.name}
                    className="rounded-md border border-ink/10 bg-[#fbfdfc] p-4"
                  >
                    <h3 className="font-semibold text-ink">
                      #{index + 1} {provider.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-spruce">
                      Good match for:
                    </p>
                    <ul className="mt-1 grid gap-1 text-sm leading-6 text-ink/72">
                      {provider.reasons.map((reason) => (
                        <li key={reason}>- {reason}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <CompareRecommendedButton
                coverageLevel={coverageRecommendation.value}
              />
              <div className="group relative mx-auto mt-3 w-fit text-center">
                <button
                  type="button"
                  className="text-xs font-semibold text-spruce underline decoration-spruce/30 underline-offset-4"
                >
                  How we compare
                </button>
                <div className="pointer-events-none absolute bottom-7 left-1/2 z-20 w-72 -translate-x-1/2 rounded-md border border-spruce/15 bg-white p-3 text-left text-xs font-medium leading-5 text-ink/75 opacity-0 shadow-soft transition group-hover:opacity-100 group-focus-within:opacity-100">
                  PawShield compares reimbursement options, coverage limits,
                  waiting periods, breed-related coverage, and payment process.
                  Final prices and policy decisions are confirmed directly with
                  insurance providers.
                </div>
              </div>
            </article>
          </div>

          <p className="mt-5 rounded-md bg-mint px-4 py-3 text-sm font-medium leading-6 text-spruce">
            PawShield provides educational matching only.
          </p>
        </div>

      </section>

      <CoverageFitCheck
        breedRisks={risks}
        healthIssues={input.healthIssues}
      />

      <CoveragePrioritySelector recommendedLevel={coverageRecommendation.value} />

      <p className="mt-8 rounded-lg border border-ink/10 bg-white p-4 text-sm leading-6 text-ink/70">
        {legalDisclaimer}
      </p>
    </main>
  );
}
