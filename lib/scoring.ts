import { BreedRisk, findBreedRisk } from "@/data/breeds";

export type Lifestyle = "low" | "normal" | "active" | "high";

export type AssessmentInput = {
  petType: "dog" | "cat";
  petName: string;
  sex: "Female" | "Male";
  breed: string;
  ageNumber: number;
  ageUnit: "months" | "years";
  ageInMonths: number;
  province: string;
  healthIssues: string[];
  lifestyle: Lifestyle;
  lifestyleLabel: string;
};

export type InsuranceScoreResult = {
  score: number;
  category: "Low" | "Medium" | "High";
  coverageType: string;
  explanation: string;
  breakdown: {
    breedRisk: number;
    age: number;
    healthIssues: number;
    lifestyle: number;
    provinceCost: number;
    earlyEnrollment: number;
  };
  breedRisk?: BreedRisk;
};

const provinceCostWeight: Record<string, number> = {
  AB: 8,
  BC: 9,
  ON: 8,
  QC: 6
};

const lifestyleWeight: Record<Lifestyle, number> = {
  low: 2,
  normal: 5,
  active: 8,
  high: 10
};

const minorHealthIssues = new Set([
  "allergies",
  "skin problems",
  "ear infections",
  "dental disease",
  "sensitive stomach",
  "vomiting or diarrhea",
  "urinary problems",
  "obesity",
  "anxiety"
]);

const majorHealthIssues = new Set([
  "eye disease",
  "arthritis",
  "hip dysplasia",
  "elbow dysplasia",
  "previous knee injury",
  "luxating patella",
  "intervertebral disc disease",
  "respiratory problems",
  "brachycephalic breathing issues",
  "heart disease",
  "kidney disease",
  "liver disease",
  "diabetes",
  "cancer",
  "seizures",
  "thyroid disease",
  "pancreatitis",
  "previous surgery",
  "chronic medication",
  "recurring infections"
]);

function getAgeWeight(ageInMonths: number) {
  if (ageInMonths <= 11) return 5;
  if (ageInMonths <= 47) return 10;
  if (ageInMonths <= 95) return 15;
  return 20;
}

function getCoverageType(score: number) {
  if (score >= 70) return "Comprehensive accident and illness coverage";
  if (score >= 40) return "Balanced accident and illness coverage";
  return "Basic accident coverage or lower-limit accident and illness coverage";
}

function getCategory(score: number): InsuranceScoreResult["category"] {
  if (score >= 70) return "High";
  if (score >= 40) return "Medium";
  return "Low";
}

export function getBreedScore(breedRisk?: BreedRisk) {
  if (!breedRisk) return 8;
  if (breedRisk.riskLevel === "High") return 30;
  if (breedRisk.riskLevel === "Medium-High") return 22;
  if (breedRisk.riskLevel === "Medium") return 15;
  return 8;
}

export function normalizeHealthIssues(healthIssues: string[]) {
  const uniqueIssues = Array.from(
    new Set(
      healthIssues
        .map((issue) => issue.trim())
        .filter((issue) => issue.length > 0)
    )
  );

  if (uniqueIssues.some((issue) => issue.toLowerCase() === "none")) return [];

  return uniqueIssues;
}

export function hasMajorHealthIssue(healthIssues: string[]) {
  return normalizeHealthIssues(healthIssues).some((issue) =>
    majorHealthIssues.has(issue.toLowerCase())
  );
}

export function hasMinorHealthIssue(healthIssues: string[]) {
  return normalizeHealthIssues(healthIssues).some((issue) =>
    minorHealthIssues.has(issue.toLowerCase())
  );
}

function getHealthIssueScore(healthIssues: string[]) {
  const uniqueIssues = normalizeHealthIssues(healthIssues).map((issue) =>
    issue.toLowerCase()
  );

  if (uniqueIssues.length === 0) return 0;

  const minorScore = Math.min(
    15,
    uniqueIssues.filter((issue) => minorHealthIssues.has(issue)).length * 6
  );
  const majorScore = Math.min(
    25,
    uniqueIssues.filter((issue) => majorHealthIssues.has(issue)).length * 12
  );

  return Math.min(25, minorScore + majorScore);
}

function getEarlyEnrollmentScore(ageInMonths: number) {
  return ageInMonths < 24 ? 5 : 0;
}

export function calculateInsuranceScore(
  input: AssessmentInput
): InsuranceScoreResult {
  const breedRisk = findBreedRisk(input.breed);
  const ageInMonths = Number.isFinite(input.ageInMonths)
    ? Math.max(0, input.ageInMonths)
    : 0;
  const breedScore = getBreedScore(breedRisk);
  const ageScore = getAgeWeight(ageInMonths);
  const healthScore = getHealthIssueScore(input.healthIssues);
  const activityScore = lifestyleWeight[input.lifestyle] ?? lifestyleWeight.normal;
  const locationScore = provinceCostWeight[input.province] ?? 5;
  const earlyEnrollmentScore = getEarlyEnrollmentScore(ageInMonths);

  const score = Math.min(
    100,
    Math.round(
      breedScore +
        ageScore +
        healthScore +
        activityScore +
        locationScore +
        earlyEnrollmentScore
    )
  );
  const category = getCategory(score);
  const coverageType = getCoverageType(score);
  const riskPhrase = breedRisk
    ? `${input.breed} is treated as a ${breedRisk.riskLevel.toLowerCase()} risk breed profile in PawShield's educational model.`
    : "We are still expanding detailed breed insights. PawShield estimated your result using general breed, age, lifestyle, and health information.";
  const healthPhrase = healthScore
    ? `${normalizeHealthIssues(input.healthIssues).length} selected health issue${normalizeHealthIssues(input.healthIssues).length === 1 ? "" : "s"} increase the value of comparing broader coverage, while insurers may still apply exclusions or waiting periods.`
    : "No known health issues were entered, so the score is based on age, breed, lifestyle, and province.";

  return {
    score,
    category,
    coverageType,
    explanation: `${riskPhrase} Your pet's age, ${input.lifestyleLabel} lifestyle, and province vet-cost estimate are included in the score. ${healthPhrase}`,
    breakdown: {
      breedRisk: breedScore,
      age: ageScore,
      healthIssues: healthScore,
      lifestyle: activityScore,
      provinceCost: locationScore,
      earlyEnrollment: earlyEnrollmentScore
    },
    breedRisk
  };
}
