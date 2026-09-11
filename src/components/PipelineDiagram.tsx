import type { CSSProperties } from "react";

export default function PipelineDiagram({
  pipeline,
  accent = "#3DDC97",
}: {
  pipeline: string[];
  accent?: string;
}) {
  return (
    <ol className="flex flex-wrap items-center gap-y-3" aria-label="Pipeline">
      {pipeline.map((label, i) => (
        <li key={label} className="flex items-center">
          {i > 0 && <span aria-hidden className="mx-2 h-px w-4 bg-line" />}
          <span
            aria-hidden
            className="pipe-dot mr-1.5 inline-block h-2 w-2 rounded-full bg-current"
            style={{ color: accent, "--pipe-i": i } as CSSProperties}
          />
          <span className="font-mono text-xs text-muted">{label}</span>
        </li>
      ))}
    </ol>
  );
}
