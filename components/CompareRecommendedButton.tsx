"use client";

type CoverageLevel = "basic" | "balanced" | "strong";

export function CompareRecommendedButton({
  coverageLevel
}: {
  coverageLevel: CoverageLevel;
}) {
  function handleClick() {
    window.dispatchEvent(
      new CustomEvent("pawshield:set-coverage-level", {
        detail: { level: coverageLevel }
      })
    );
    document
      .getElementById("compare-insurance-options")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      type="button"
      className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-spruce px-4 py-3 font-semibold text-white hover:bg-ink"
      onClick={handleClick}
    >
      Compare recommended options
    </button>
  );
}
