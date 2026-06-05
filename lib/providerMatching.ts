import { findBreedRisk } from "@/data/breeds";
import { Provider, providers } from "@/data/providers";
import {
  AssessmentInput,
  hasMajorHealthIssue,
  normalizeHealthIssues
} from "@/lib/scoring";

export type CoveragePriority = "save-cost" | "balanced" | "max-protection";

const fetchFriendlyIssues = new Set([
  "dental disease",
  "allergies",
  "skin problems",
  "recurring infections",
  "ear infections",
  "eye disease",
  "vomiting or diarrhea",
  "sensitive stomach"
]);

function scoreProvider(
  provider: Provider,
  input: AssessmentInput,
  priority: CoveragePriority
) {
  const breedRisk = findBreedRisk(input.breed);
  const healthIssues = normalizeHealthIssues(input.healthIssues);
  const hasMajorIssue = hasMajorHealthIssue(healthIssues);
  const hasNoIssues = healthIssues.length === 0;
  const hasFetchFriendlyIssue = healthIssues.some((issue) =>
    fetchFriendlyIssues.has(issue.toLowerCase())
  );
  const isYoungPet = input.ageInMonths <= 24;
  const isLowerOrMediumRisk =
    !breedRisk || breedRisk.riskLevel === "Lower" || breedRisk.riskLevel === "Medium";

  if (provider.name === "Trupanion") {
    return (
      (priority === "max-protection" ? 7 : 0) +
      (breedRisk?.riskLevel === "High" || breedRisk?.riskLevel === "Medium-High" ? 5 : 0) +
      (hasMajorIssue ? 5 : 0)
    );
  }

  if (provider.name === "Fetch Pet Insurance") {
    return (
      (priority === "max-protection" ? 4 : 0) +
      (priority === "balanced" ? 5 : 0) +
      (hasFetchFriendlyIssue ? 5 : 0) +
      (hasMajorIssue ? 2 : 0)
    );
  }

  if (provider.name === "Pets Plus Us") {
    return (
      (priority === "balanced" ? 5 : 0) +
      (isYoungPet ? 4 : 0) +
      (input.petType === "dog" ? 1 : 0)
    );
  }

  if (provider.name === "PHI Direct") {
    return (
      (priority === "save-cost" ? 8 : 0) +
      (priority === "balanced" && isLowerOrMediumRisk ? 3 : 0) +
      (isLowerOrMediumRisk ? 3 : 0) +
      (hasNoIssues ? 4 : 0)
    );
  }

  return 0;
}

export function getMatchedProviders(
  input: AssessmentInput,
  priority: CoveragePriority = "balanced"
) {
  return [...providers].sort(
    (a, b) => scoreProvider(b, input, priority) - scoreProvider(a, input, priority)
  );
}
