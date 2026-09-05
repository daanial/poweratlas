import { sourcesById } from "@/content/sources";

export function SourceCitations({ sourceIds }: { sourceIds?: string[] }) {
  if (!sourceIds?.length) return null;
  const items = sourceIds
    .map((id) => sourcesById[id])
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  if (items.length === 0) return null;

  return (
    <ul className="mt-4 space-y-1.5 text-xs leading-6 text-[color:var(--muted)]">
      {items.map((s) => (
        <li key={s.id}>
          {s.url ? (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-[color:var(--power)] hover:underline"
            >
              {s.titleFa}
            </a>
          ) : (
            <span>{s.titleFa}</span>
          )}
          <span className="ms-2 opacity-50" lang="en" dir="ltr">
            {s.titleEn}
          </span>
        </li>
      ))}
    </ul>
  );
}
