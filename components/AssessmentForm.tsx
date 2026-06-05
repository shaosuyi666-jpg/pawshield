"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { ClipboardCheck, X } from "lucide-react";
import { healthIssueSuggestions } from "@/data/assessment-options";
import { catBreeds, dogBreeds } from "@/data/breeds";
import { provinces } from "@/lib/constants";

const dogLifestyleOptions = [
  {
    label: "Mostly Relaxed",
    displayLabel: "Mostly Relaxed 🏡",
    value: "low",
    description: "Short walks, mostly indoor, enjoys resting at home."
  },
  {
    label: "Everyday Explorer",
    displayLabel: "Everyday Explorer 🐕",
    value: "normal",
    description: "Daily walks, regular playtime, normal outdoor activities."
  },
  {
    label: "Adventure Buddy",
    displayLabel: "Adventure Buddy 🏔️",
    value: "active",
    description:
      "Long walks, hiking, running, dog parks, swimming, or frequent outdoor adventures."
  },
  {
    label: "Working / Sport Dog",
    displayLabel: "Working / Sport Dog 🏅",
    value: "high",
    description:
      "High-intensity activities such as agility, hunting, training, or endurance exercise."
  }
] as const;

const catLifestyleOptions = [
  {
    label: "Indoor Relaxed",
    displayLabel: "Indoor Relaxed 💤",
    value: "low",
    description: "Mostly sleeps/rests, light play, indoor lifestyle."
  },
  {
    label: "Indoor Playful",
    displayLabel: "Indoor Playful 🧶",
    value: "normal",
    description: "Daily play, climbing, running, active around the home."
  },
  {
    label: "Outdoor Explorer",
    displayLabel: "Outdoor Explorer 🌿",
    value: "active",
    description: "Spends time outside, explores, climbs, or has higher environmental exposure."
  },
  {
    label: "Highly Active",
    displayLabel: "Highly Active ⚡",
    value: "high",
    description: "Very energetic cat with frequent jumping, climbing, or intense activity."
  }
] as const;

function filterOptions(options: string[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return options.slice(0, 8);

  return options
    .filter((option) => option.toLowerCase().includes(normalizedQuery))
    .slice(0, 8);
}

function hasMatch(items: string[], value: string) {
  return items.some((item) => item.toLowerCase() === value.trim().toLowerCase());
}

export function AssessmentForm() {
  const breedFieldRef = useRef<HTMLDivElement>(null);
  const [selectedPetType, setSelectedPetType] = useState<"dog" | "cat">("dog");
  const [breedInput, setBreedInput] = useState("Golden Retriever");
  const [selectedBreed, setSelectedBreed] = useState("Golden Retriever");
  const [ageNumber, setAgeNumber] = useState("2");
  const [ageUnit, setAgeUnit] = useState<"months" | "years">("years");
  const [ageError, setAgeError] = useState("");
  const [selectedLifestyleIndex, setSelectedLifestyleIndex] = useState(0);
  const [showBreedSuggestions, setShowBreedSuggestions] = useState(false);
  const [issueInput, setIssueInput] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [showIssueSuggestions, setShowIssueSuggestions] = useState(false);

  const breedOptions = selectedPetType === "dog" ? dogBreeds : catBreeds;
  const lifestyleOptions =
    selectedPetType === "dog" ? dogLifestyleOptions : catLifestyleOptions;
  const selectedLifestyle = lifestyleOptions[selectedLifestyleIndex];
  const breedMatches = useMemo(
    () => filterOptions(breedOptions, breedInput),
    [breedInput, breedOptions]
  );
  const issueMatches = useMemo(
    () =>
      filterOptions(healthIssueSuggestions, issueInput).filter(
        (issue) => !hasMatch(selectedIssues, issue)
      ),
    [issueInput, selectedIssues]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        breedFieldRef.current &&
        !breedFieldRef.current.contains(event.target as Node)
      ) {
        setShowBreedSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectBreed(breed: string) {
    setSelectedBreed(breed);
    setBreedInput(breed);
    setShowBreedSuggestions(false);
  }

  function addIssue(issue: string) {
    const trimmedIssue = issue.trim();
    if (!trimmedIssue || hasMatch(selectedIssues, trimmedIssue)) return;

    setSelectedIssues((current) => {
      if (trimmedIssue.toLowerCase() === "none") return ["None"];

      return [
        ...current.filter((item) => item.toLowerCase() !== "none"),
        trimmedIssue
      ];
    });
    setIssueInput("");
    setShowIssueSuggestions(false);
  }

  function removeIssue(issue: string) {
    setSelectedIssues((current) =>
      current.filter((item) => item.toLowerCase() !== issue.toLowerCase())
    );
  }

  function handleIssueKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    event.preventDefault();
  }

  function isValidAge(value: string, unit: "months" | "years") {
    const age = Number(value);
    if (!value.trim() || !Number.isFinite(age) || age <= 0) return false;

    if (unit === "months") {
      return Number.isInteger(age) && age >= 1 && age <= 240;
    }

    return age >= 0.1 && age <= 20;
  }

  function handleAgeChange(value: string) {
    const nextValue =
      ageUnit === "months" ? value.replace(/[^\d]/g, "") : value;

    setAgeNumber(nextValue);
    if (ageError && isValidAge(nextValue, ageUnit)) setAgeError("");
  }

  function handleAgeUnitChange(unit: "months" | "years") {
    setAgeUnit(unit);
    setAgeNumber((current) =>
      unit === "months" ? current.split(".")[0] : current
    );
    setAgeError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    let hasError = false;

    if (!selectedBreed.trim()) {
      event.preventDefault();
      setShowBreedSuggestions(true);
      hasError = true;
    }

    if (!isValidAge(ageNumber, ageUnit)) {
      event.preventDefault();
      setAgeError("Please enter a valid age.");
      hasError = true;
    }

    if (!hasError) setAgeError("");
  }

  return (
    <form
      action="/results"
      onSubmit={handleSubmit}
      className="mx-auto mt-10 grid max-w-3xl gap-5 rounded-lg border border-ink/10 bg-white p-5 shadow-soft sm:p-8"
    >
      <input type="hidden" name="breed" value={selectedBreed} />
      {selectedIssues.map((issue) => (
        <input key={issue} type="hidden" name="healthIssues" value={issue} />
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Pet name
          <input
            name="petName"
            type="text"
            placeholder="Mochi"
            className="focus-ring rounded-md border border-ink/15 px-3 py-3"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-ink">
          Sex
          <select
            name="sex"
            required
            defaultValue=""
            className="focus-ring rounded-md border border-ink/15 bg-white px-3 py-3"
          >
            <option value="" disabled>
              Select sex
            </option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Pet type
          <select
            name="petType"
            required
            value={selectedPetType}
            className="focus-ring rounded-md border border-ink/15 bg-white px-3 py-3"
            onChange={(event) => {
              const nextPetType = event.target.value === "cat" ? "cat" : "dog";
              setSelectedPetType(nextPetType);
              setBreedInput("");
              setSelectedBreed("");
              setSelectedLifestyleIndex(0);
              setShowBreedSuggestions(false);
            }}
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </label>

        <div className="grid gap-2 text-sm font-medium text-ink">
          <label htmlFor="breed">Breed</label>
          <div ref={breedFieldRef} className="relative">
            <input
              id="breed"
              type="text"
              value={breedInput}
              required
              placeholder="Type a breed"
              autoComplete="off"
              className="focus-ring w-full rounded-md border border-ink/15 px-3 py-3"
              onChange={(event) => {
                setBreedInput(event.target.value);
                setSelectedBreed("");
                setShowBreedSuggestions(true);
              }}
              onFocus={() => setShowBreedSuggestions(true)}
            />
            {showBreedSuggestions && breedMatches.length > 0 ? (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-lg border border-ink/10 bg-white p-1 shadow-soft">
                {breedMatches.map((breed) => (
                  <button
                    key={breed}
                    type="button"
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-ink hover:bg-mint"
                    onClick={() => selectBreed(breed)}
                  >
                    {breed}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2 text-sm font-medium text-ink">
          <span>Age</span>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <input
              name="ageNumber"
              type="number"
              min={ageUnit === "months" ? "1" : "0.1"}
              max={ageUnit === "months" ? "240" : "20"}
              step={ageUnit === "months" ? "1" : "0.1"}
              inputMode={ageUnit === "months" ? "numeric" : "decimal"}
              required
              value={ageNumber}
              className="focus-ring min-w-0 rounded-md border border-ink/15 px-3 py-3"
              onChange={(event) => handleAgeChange(event.target.value)}
              onKeyDown={(event) => {
                if (["e", "E", "+", "-"].includes(event.key)) {
                  event.preventDefault();
                }
                if (ageUnit === "months" && event.key === ".") {
                  event.preventDefault();
                }
              }}
              onBlur={() => {
                if (!isValidAge(ageNumber, ageUnit)) {
                  setAgeError("Please enter a valid age.");
                }
              }}
            />
            <select
              name="ageUnit"
              required
              value={ageUnit}
              className="focus-ring rounded-md border border-ink/15 bg-white px-3 py-3"
              onChange={(event) =>
                handleAgeUnitChange(
                  event.target.value === "months" ? "months" : "years"
                )
              }
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
          {ageError ? (
            <p className="text-sm font-medium text-[#b45309]">{ageError}</p>
          ) : null}
        </div>

        <label className="grid gap-2 text-sm font-medium text-ink">
          Province
          <select
            name="province"
            required
            defaultValue="ON"
            className="focus-ring rounded-md border border-ink/15 bg-white px-3 py-3"
          >
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-2 text-sm font-medium text-ink">
        <label htmlFor="healthIssues">Known health issues</label>
        <div className="relative">
          <input
            id="healthIssues"
            type="text"
            value={issueInput}
            placeholder="Type to search, then select an issue"
            autoComplete="off"
            className="focus-ring w-full rounded-md border border-ink/15 px-3 py-3"
            onChange={(event) => {
              setIssueInput(event.target.value);
              setShowIssueSuggestions(true);
            }}
            onFocus={() => setShowIssueSuggestions(true)}
            onKeyDown={handleIssueKeyDown}
          />
          {showIssueSuggestions && issueInput.trim() && issueMatches.length > 0 ? (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-lg border border-ink/10 bg-white p-1 shadow-soft">
              {issueMatches.map((issue) => (
                <button
                  key={issue}
                  type="button"
                  className="w-full rounded-md px-3 py-2 text-left text-sm text-ink hover:bg-mint"
                  onClick={() => addIssue(issue)}
                >
                  {issue}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        {selectedIssues.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedIssues.map((issue) => (
              <span
                key={issue}
                className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-spruce"
              >
                {issue}
                <button
                  type="button"
                  aria-label={`Remove ${issue}`}
                  className="rounded-full p-0.5 hover:bg-spruce/10"
                  onClick={() => removeIssue(issue)}
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid gap-5">
        <div className="grid gap-3 text-sm font-medium text-ink">
          <span>Lifestyle</span>
          <input type="hidden" name="lifestyle" value={selectedLifestyle.value} />
          <input
            type="hidden"
            name="lifestyleLabel"
            value={selectedLifestyle.displayLabel}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {lifestyleOptions.map((option, index) => {
              const isSelected = index === selectedLifestyleIndex;

              return (
                <button
                  key={option.label}
                  type="button"
                  aria-pressed={isSelected}
                  className={`rounded-lg border p-4 text-left transition ${
                    isSelected
                      ? "border-spruce bg-mint shadow-sm"
                      : "border-ink/10 bg-white hover:border-spruce/35 hover:bg-[#fbfdfc]"
                  }`}
                  onClick={() => setSelectedLifestyleIndex(index)}
                >
                  <span className="block text-base font-semibold text-ink">
                    {option.displayLabel}
                  </span>
                  <span className="mt-2 block text-sm font-normal leading-6 text-ink/70">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-spruce px-5 py-3 font-semibold text-white hover:bg-ink"
      >
        <ClipboardCheck size={18} />
        Analyze My Pet
      </button>
    </form>
  );
}
