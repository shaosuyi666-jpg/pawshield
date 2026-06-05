export type Provider = {
  name: string;
  bestFor: string;
  coverageNotes: string;
  affiliateUrl: string;
  logoPlaceholder: string;
};

export const providers: Provider[] = [
  {
    name: "Trupanion",
    bestFor: "Comprehensive coverage and higher-cost medical events",
    coverageNotes:
      "Often positioned around broad accident and illness coverage with direct-pay style claim support where available.",
    affiliateUrl: "https://www.trupanion.com/en-ca/enrollments/get-a-quote",
    logoPlaceholder: "TR"
  },
  {
    name: "Fetch Pet Insurance",
    bestFor: "Owners who want flexible accident and illness coverage",
    coverageNotes:
      "A common comparison option for illness, accident, dental injury, and exam-fee style coverage considerations.",
    affiliateUrl: "https://www.fetchpet.com/mypet",
    logoPlaceholder: "FE"
  },
  {
    name: "Pets Plus Us",
    bestFor: "Canadian pet owners comparing local brand familiarity",
    coverageNotes:
      "Useful to review for accident and illness plans, wellness options, and Canadian support expectations.",
    affiliateUrl: "https://quote.petsplusus.com/",
    logoPlaceholder: "PP"
  },
  {
    name: "PHI Direct",
    bestFor: "Budget-conscious owners seeking straightforward coverage",
    coverageNotes:
      "Often considered by owners looking for simple accident and illness protection with a leaner monthly budget.",
    affiliateUrl: "https://get.phidirect.com/",
    logoPlaceholder: "PH"
  }
];
