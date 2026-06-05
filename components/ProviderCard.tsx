import { ExternalLink } from "lucide-react";
import { Provider } from "@/data/providers";

export function ProviderCard({
  provider,
  ctaLabel = "Get official quote",
  ctaHref = provider.affiliateUrl,
  showCta = true
}: {
  provider: Provider;
  ctaLabel?: string;
  ctaHref?: string;
  showCta?: boolean;
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-md bg-skywash font-semibold text-spruce">
          {provider.logoPlaceholder}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-ink">{provider.name}</h3>
          <p className="mt-1 text-sm font-medium text-spruce">{provider.bestFor}</p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-6 text-ink/70">
        {provider.coverageNotes}
      </p>
      {showCta ? (
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-spruce px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink"
        >
          {ctaLabel} <ExternalLink size={16} />
        </a>
      ) : null}
    </article>
  );
}
