export type PetType = "dog" | "cat";
export type BreedRiskLevel = "Lower" | "Medium" | "Medium-High" | "High";

export type BreedProfile = {
  breed: string;
  petType: PetType;
  riskLevel: BreedRiskLevel;
  commonRisks: string[];
  coverageFocus: string;
};

export type BreedRisk = BreedProfile;

function profile(
  petType: PetType,
  riskLevel: BreedRiskLevel,
  commonRisks: string[],
  coverageFocus: string
) {
  return { petType, riskLevel, commonRisks, coverageFocus };
}

export const breedProfiles = {
  "Mixed Breed Dog": profile("dog", "Lower", ["Varied inherited risk depending on ancestry", "Dental disease", "Weight-related conditions"], "Affordable accident and illness coverage"),
  "Golden Retriever": profile("dog", "Medium-High", ["Hip dysplasia", "Cancer risk", "Skin allergies"], "Orthopedic and illness coverage"),
  "Labrador Retriever": profile("dog", "Medium", ["Hip dysplasia", "Obesity tendency", "Ear infections"], "Joint and illness coverage"),
  "French Bulldog": profile("dog", "High", ["Breathing issues", "Skin allergies", "Spinal problems"], "Comprehensive accident and illness coverage"),
  "Shiba Inu": profile("dog", "Medium", ["Allergies", "Eye conditions", "Luxating patella"], "Skin, eye, and orthopedic coverage"),
  "German Shepherd": profile("dog", "Medium-High", ["Hip dysplasia", "Elbow dysplasia", "Digestive issues"], "Orthopedic and chronic condition coverage"),
  Poodle: profile("dog", "Medium", ["Eye disease", "Dental disease", "Skin problems"], "Long-term illness coverage"),
  "Miniature Poodle": profile("dog", "Medium", ["Dental disease", "Eye disease", "Luxating patella"], "Dental, eye, and illness coverage"),
  "Toy Poodle": profile("dog", "Medium", ["Dental disease", "Luxating patella", "Eye disease"], "Dental and orthopedic coverage"),
  "Standard Poodle": profile("dog", "Medium", ["Bloat risk", "Hip dysplasia", "Eye disease"], "Illness and emergency coverage"),
  Beagle: profile("dog", "Medium", ["Ear infections", "Obesity tendency", "Intervertebral disc disease"], "Illness and orthopedic coverage"),
  Dachshund: profile("dog", "High", ["Intervertebral disc disease", "Back problems", "Dental disease"], "Spinal and emergency coverage"),
  "Miniature Dachshund": profile("dog", "High", ["Intervertebral disc disease", "Back problems", "Dental disease"], "Spinal and emergency coverage"),
  "Border Collie": profile("dog", "Medium", ["Hip dysplasia", "Eye conditions", "Activity-related injuries"], "Accident, orthopedic, and illness coverage"),
  "Australian Shepherd": profile("dog", "Medium", ["Hip dysplasia", "Eye conditions", "Seizures"], "Illness and orthopedic coverage"),
  Chihuahua: profile("dog", "Medium", ["Dental disease", "Luxating patella", "Heart disease"], "Dental and chronic condition coverage"),
  "Yorkshire Terrier": profile("dog", "Medium", ["Dental disease", "Luxating patella", "Eye conditions"], "Dental, orthopedic, and illness coverage"),
  "Bernese Mountain Dog": profile("dog", "High", ["Cancer risk", "Hip dysplasia", "Elbow dysplasia"], "Orthopedic and major illness coverage"),
  "Cavalier King Charles Spaniel": profile("dog", "High", ["Heart disease", "Eye conditions", "Neurologic conditions"], "Cardiac and comprehensive illness coverage"),
  "Pembroke Welsh Corgi": profile("dog", "Medium", ["Intervertebral disc disease", "Hip dysplasia", "Obesity tendency"], "Spinal and orthopedic coverage"),
  "Siberian Husky": profile("dog", "Medium", ["Eye conditions", "Hip dysplasia", "Skin conditions"], "Eye, orthopedic, and illness coverage"),
  Maltese: profile("dog", "Medium", ["Dental disease", "Luxating patella", "Eye conditions"], "Dental and illness coverage"),
  Pomeranian: profile("dog", "Medium", ["Dental disease", "Luxating patella", "Tracheal issues"], "Dental and illness coverage"),
  Rottweiler: profile("dog", "Medium-High", ["Hip dysplasia", "Elbow dysplasia", "Cancer risk"], "Orthopedic and major illness coverage"),
  Boxer: profile("dog", "Medium", ["Heart disease", "Cancer risk", "Skin allergies"], "Cardiac and illness coverage"),
  "Boston Terrier": profile("dog", "Medium", ["Breathing issues", "Eye conditions", "Skin allergies"], "Eye and illness coverage"),
  "Great Dane": profile("dog", "High", ["Bloat risk", "Heart disease", "Joint issues"], "Emergency and orthopedic coverage"),
  Newfoundland: profile("dog", "Medium-High", ["Hip dysplasia", "Elbow dysplasia", "Heart disease"], "Orthopedic and cardiac coverage"),
  Samoyed: profile("dog", "Medium", ["Hip dysplasia", "Eye conditions", "Skin problems"], "Orthopedic and illness coverage"),
  Akita: profile("dog", "Medium-High", ["Hip dysplasia", "Skin problems", "Autoimmune conditions"], "Orthopedic and chronic condition coverage"),
  "West Highland White Terrier": profile("dog", "Medium", ["Skin allergies", "Ear infections", "Dental disease"], "Skin, ear, and dental coverage"),
  "Australian Labradoodle": profile("dog", "Medium", ["Hip dysplasia", "Ear infections", "Skin allergies"], "Orthopedic and illness coverage"),
  Goldendoodle: profile("dog", "Medium", ["Hip dysplasia", "Ear infections", "Skin allergies"], "Orthopedic and illness coverage"),
  Labradoodle: profile("dog", "Medium", ["Hip dysplasia", "Ear infections", "Skin allergies"], "Orthopedic and illness coverage"),
  Bernedoodle: profile("dog", "Medium-High", ["Hip dysplasia", "Elbow dysplasia", "Cancer risk"], "Orthopedic and illness coverage"),
  Cockapoo: profile("dog", "Medium", ["Ear infections", "Eye disease", "Dental disease"], "Ear, eye, and illness coverage"),
  "Mixed Breed Cat": profile("cat", "Lower", ["Dental disease", "Obesity", "Kidney disease with aging"], "Routine illness protection"),
  "Domestic Shorthair": profile("cat", "Lower", ["Dental disease", "Kidney disease with aging", "Obesity"], "Routine illness protection"),
  "Domestic Longhair": profile("cat", "Lower", ["Dental disease", "Hairball or digestive concerns", "Kidney disease with aging"], "Routine illness protection"),
  "Domestic Medium Hair": profile("cat", "Lower", ["Dental disease", "Obesity", "Kidney disease with aging"], "Routine illness protection"),
  "British Shorthair": profile("cat", "Medium", ["Heart conditions", "Obesity", "Dental disease"], "Illness and diagnostic coverage"),
  Persian: profile("cat", "High", ["Breathing issues", "Eye problems", "Kidney disease"], "Comprehensive illness coverage"),
  Ragdoll: profile("cat", "Medium", ["Heart conditions", "Urinary issues", "Dental disease"], "Illness and diagnostic coverage"),
  "Maine Coon": profile("cat", "Medium-High", ["Heart disease", "Hip dysplasia", "Joint issues"], "Cardiac and orthopedic coverage"),
  Siamese: profile("cat", "Medium", ["Respiratory issues", "Dental disease", "Digestive sensitivity"], "Illness and diagnostic coverage"),
  Bengal: profile("cat", "Medium", ["Heart disease", "Eye disease", "Digestive sensitivity"], "Illness and diagnostic coverage"),
  "Scottish Fold": profile("cat", "High", ["Joint and cartilage disorders", "Arthritis", "Mobility concerns"], "Orthopedic and chronic condition coverage"),
  Sphynx: profile("cat", "Medium-High", ["Skin problems", "Heart disease", "Dental disease"], "Skin and cardiac coverage"),
  "Russian Blue": profile("cat", "Medium", ["Obesity", "Urinary issues", "Dental disease"], "Illness and urinary coverage"),
  "Norwegian Forest Cat": profile("cat", "Medium", ["Heart disease", "Hip dysplasia", "Kidney disease"], "Cardiac and orthopedic coverage"),
  Birman: profile("cat", "Medium", ["Heart conditions", "Kidney disease", "Dental disease"], "Illness and diagnostic coverage"),
  "Devon Rex": profile("cat", "Medium", ["Skin problems", "Dental disease", "Joint issues"], "Skin and illness coverage"),
  "American Shorthair": profile("cat", "Lower", ["Dental disease", "Obesity", "Heart or kidney concerns with age"], "Routine illness protection"),
  "Exotic Shorthair": profile("cat", "Medium-High", ["Breathing issues", "Eye problems", "Kidney disease"], "Comprehensive illness coverage"),
  Himalayan: profile("cat", "High", ["Breathing issues", "Eye problems", "Kidney disease"], "Comprehensive illness coverage")
} satisfies Record<string, Omit<BreedProfile, "breed">>;

export const breedRisks: BreedRisk[] = Object.entries(breedProfiles).map(
  ([breed, data]) => ({ breed, ...data })
);

export const dogBreeds = breedRisks
  .filter((profile) => profile.petType === "dog")
  .map((profile) => profile.breed);

export const catBreeds = breedRisks
  .filter((profile) => profile.petType === "cat")
  .map((profile) => profile.breed);

function normalizeBreedName(breed: string) {
  return breed.trim().toLowerCase().replace(/\s+(cat|dog)$/, "");
}

export function findBreedRisk(breed: string) {
  const normalizedBreed = normalizeBreedName(breed);

  return breedRisks.find(
    (profile) =>
      profile.breed.toLowerCase() === breed.trim().toLowerCase() ||
      normalizeBreedName(profile.breed) === normalizedBreed
  );
}
