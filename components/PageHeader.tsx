export function PageHeader({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-spruce">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-ink/70">{text}</p>
    </div>
  );
}
