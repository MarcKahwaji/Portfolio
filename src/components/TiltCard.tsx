"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { hexA } from "@/lib/colors";

export default function TiltCard({
  children,
  accent,
  featured = false,
}: {
  children: ReactNode;
  accent: string;
  featured?: boolean;
}) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;
    const rect = root.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    root.style.setProperty("--spot-x", `${px * 100}%`);
    root.style.setProperty("--spot-y", `${py * 100}%`);
    if (reduced || e.pointerType !== "mouse") return;
    const rx = Math.max(-6, Math.min(6, (0.5 - py) * 12));
    const ry = Math.max(-6, Math.min(6, (px - 0.5) * 12));
    inner.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  };

  const onLeave = () => {
    const inner = innerRef.current;
    if (inner) inner.style.transform = "";
  };

  const card = (
    <div
      ref={innerRef}
      className={`card-accent-border relative h-full will-change-transform ${
        featured
          ? "rounded-[12px] border border-line/60 bg-panel p-6 md:p-8"
          : "rounded-[8px] border border-line bg-ink/40 p-6"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${hexA(
            accent,
            0.14,
          )}, transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      data-inview={inView}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group h-full"
      style={{ "--card-accent": accent } as CSSProperties}
    >
      {featured ? (
        <div
          className="h-full rounded-[13px] p-px"
          style={{
            background: `linear-gradient(135deg, ${hexA(accent, 0.35)}, rgba(34, 48, 74, 0.6) 45%, ${hexA(
              "#22D3EE",
              0.25,
            )})`,
          }}
        >
          {card}
        </div>
      ) : (
        card
      )}
    </div>
  );
}
