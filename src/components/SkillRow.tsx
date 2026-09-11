"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { hexA } from "@/lib/colors";

export default function SkillRow({
  group,
  tools,
  hex,
}: {
  group: string;
  tools: string[];
  hex: string;
}) {
  const [rowHover, setRowHover] = useState(false);
  const [hoverChip, setHoverChip] = useState(-1);
  const origin = hoverChip < 0 ? 0 : hoverChip;

  return (
    <dl
      className="grid gap-3 py-6 md:grid-cols-12 md:gap-8"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setRowHover(true);
      }}
      onPointerLeave={() => {
        setRowHover(false);
        setHoverChip(-1);
      }}
    >
      <dt className="flex items-start gap-2.5 text-[17px] font-medium text-text md:col-span-4 md:text-[18px]">
        <span
          aria-hidden
          className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full transition-shadow duration-200"
          style={{
            backgroundColor: hex,
            boxShadow: rowHover ? `0 0 10px ${hex}` : "none",
          }}
        />
        {group}
      </dt>
      <dd className="flex flex-wrap gap-2 md:col-span-8">
        {tools.map((tool, i) => (
          <span
            key={tool}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setHoverChip(i);
            }}
            className="chip inline-flex min-h-[44px] items-center rounded-[6px] border px-3 font-mono text-[13px] md:min-h-0 md:px-2.5 md:py-1"
            style={
              {
                "--chip": hex,
                color: hex,
                borderColor: hexA(hex, 0.35),
                backgroundColor: hexA(hex, 0.08),
                filter: rowHover ? "brightness(1.25)" : "brightness(1)",
                transitionDelay: rowHover
                  ? `0ms, 0ms, 0ms, 0ms, ${Math.abs(i - origin) * 30}ms`
                  : "0ms",
              } as CSSProperties
            }
          >
            {tool}
          </span>
        ))}
      </dd>
    </dl>
  );
}
