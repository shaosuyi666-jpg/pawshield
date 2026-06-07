import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SubtleMotion } from "@/components/SubtleMotion";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pawshield.com"),
  title: "PawShield | Compare Pet Insurance in Canada",
  description:
    "Free Canadian pet insurance comparison tool. Understand your dog or cat's health risks, compare coverage options, and find protection that fits your pet.",
  keywords: [
    "pet insurance Canada",
    "dog insurance Canada",
    "cat insurance Canada",
    "compare pet insurance Canada",
    "Fetch vs Trupanion",
    "pet health risk assessment",
    "Canadian pet insurance comparison",
    "pet insurance for dogs Canada",
    "pet insurance for cats Canada"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "PawShield - Smart Pet Insurance Comparison Canada",
    description:
      "Personalized pet insurance education and comparison for Canadian dog and cat owners.",
    url: "/",
    siteName: "PawShield",
    images: [
      {
        url: "/hero-pets.png",
        width: 1536,
        height: 1024,
        alt: "PawShield pet insurance comparison for Canadian dog and cat owners"
      }
    ],
    locale: "en_CA",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PawShield - Smart Pet Insurance Comparison Canada",
    description:
      "Personalized pet insurance education and comparison for Canadian dog and cat owners.",
    images: ["/hero-pets.png"]
  }
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/assessment", label: "Assessment" },
  { href: "/providers", label: "Coverage Guide" },
  { href: "/disclosure", label: "Disclosure" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
              <span className="grid size-9 place-items-center rounded-md bg-spruce text-lg text-white">
                🐾
              </span>
              <span className="leading-tight">PawShield</span>
            </Link>
            <div className="hidden items-center gap-1 sm:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-ink/70 hover:bg-mint hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-3 sm:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-ink/70 hover:bg-mint hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </header>
        {children}
        <SubtleMotion />
        <footer className="border-t border-ink/10 bg-white">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-[1fr_2fr] lg:px-8">
            <div>
              <p className="text-lg font-semibold text-ink">🐾 PawShield</p>
              <p className="mt-1 text-sm font-medium text-spruce">
                Helping Canadian pet owners understand pet insurance before
                they buy.
              </p>
            </div>
            <p className="text-sm leading-6 text-ink/65 md:text-right">
              Free educational comparison • Personalized pet insights •
              Transparent coverage information
              <br />
              PawShield does not sell insurance. Official quotes and policy
              details are provided directly by insurance providers.
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
