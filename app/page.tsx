import Image from "next/image";
import Link from "next/link";

const howItWorksSteps = [
  {
    icon: "🐶",
    title: "Build your pet profile",
    text: "Tell us about your dog or cat: breed, age, lifestyle, location, and health history."
  },
  {
    icon: "🧠",
    title: "Understand your pet's needs",
    text: "Learn about breed health risks, potential future concerns, and important coverage features."
  },
  {
    icon: "🔍",
    title: "Compare coverage options",
    text: "Review Canadian pet insurance providers side-by-side using simple explanations."
  },
  {
    icon: "🛡️",
    title: "Choose with confidence",
    text: "Continue directly with providers for official quotes and final policy details."
  }
];

const trustCards = [
  {
    icon: "🐾",
    title: "Personalized, not generic",
    text: "Every pet is different. PawShield considers breed, age, lifestyle, health factors, and location to explain what coverage features may matter."
  },
  {
    icon: "🇨🇦",
    title: "Built for Canadian pet owners",
    text: "Explore pet insurance options available in Canada and understand important differences before requesting quotes."
  },
  {
    icon: "🧠",
    title: "Health-first comparison",
    text: "PawShield starts with your pet profile, not advertisements. Understand your pet's needs before comparing providers."
  },
  {
    icon: "🔍",
    title: "Transparent coverage information",
    text: "Easily compare reimbursement options, coverage limits, waiting periods, breed-related coverage, and claim process."
  }
];

export default function Home() {
  return (
    <main>
      <section className="relative isolate min-h-[90vh] overflow-hidden bg-[#f8fbf5]">
        <Image
          src="/images/hero-pets.png"
          alt="Dog and cat relaxing at home"
          fill
          priority
          className="object-cover object-right md:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffaf0]/95 via-[#fffaf0]/76 to-[#fffaf0]/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fbf5]/70 via-transparent to-transparent md:hidden" />
        <div className="relative mx-auto grid min-h-[90vh] max-w-7xl content-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-spruce shadow-sm ring-1 ring-spruce/15 backdrop-blur">
              🐾 Meet PawShield, your AI pet insurance guide
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Canada&apos;s Smart Pet Insurance Education & Comparison Platform 🐾
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-ink/72">
              Understand your pet&apos;s health risks, compare coverage options,
              and make a more informed insurance decision — all in one place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center rounded-full bg-spruce px-7 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-ink focus:outline-none focus:ring-4 focus:ring-spruce/25"
              >
                Start Free Assessment
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-spruce/25 bg-white/80 px-7 py-3.5 text-base font-semibold text-spruce shadow-sm backdrop-blur transition hover:bg-mint focus:outline-none focus:ring-4 focus:ring-spruce/15"
              >
                Learn How It Works
              </Link>
            </div>
            <p className="mt-4 text-sm font-medium text-spruce/80">
              Free • Educational • Built for Canadian pet owners
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-7 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-spruce">
            How PawShield Works
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">
            Understand coverage before you buy.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {howItWorksSteps.map((step, index) => {
            return (
              <article
                key={step.title}
                className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-spruce">
                  Step {index + 1}
                </p>
                <div className="mt-4 text-3xl" aria-hidden="true">
                  {step.icon}
                </div>
                <h2 className="mt-4 text-lg font-semibold">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/70">{step.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#fbfdfc]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-7 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-spruce">
              Why PawShield?
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">
              Independent education for Canadian pet owners.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustCards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm"
              >
                <div className="text-3xl" aria-hidden="true">
                  {card.icon}
                </div>
                <h2 className="mt-4 text-lg font-semibold">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/70">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
