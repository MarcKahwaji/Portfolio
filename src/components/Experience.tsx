"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { experience } from "@/data/experience";

const DOT_CENTRE = 10; // dot top offset 6px + half of 8px dot

export default function Experience() {
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const entryRefs = useRef<(HTMLLIElement | null)[]>([]);
  const fractions = useRef<number[]>([]);
  const [rail, setRail] = useState({ top: 0, height: 1 });
  const [active, setActive] = useState(-1);
  const [ripples, setRipples] = useState<ReadonlySet<number>>(new Set());

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.4"],
  });

  const markerTop = useTransform(
    scrollYProgress,
    (p) => rail.top + p * rail.height,
  );
  const fillHeight = useTransform(scrollYProgress, (p) => p * rail.height);

  const velocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(velocity, { stiffness: 120, damping: 30 });
  const tailAboveOpacity = useTransform(smoothVelocity, (v) =>
    v > 0 ? Math.min(v * 1.4, 0.85) : 0,
  );
  const tailBelowOpacity = useTransform(smoothVelocity, (v) =>
    v < 0 ? Math.min(-v * 1.4, 0.85) : 0,
  );

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const lis = entryRefs.current.filter(
      (li): li is HTMLLIElement => li !== null,
    );
    if (lis.length === 0) return;
    const top = lis[0].offsetTop + DOT_CENTRE;
    const bottom = lis[lis.length - 1].offsetTop + DOT_CENTRE;
    const height = Math.max(bottom - top, 1);
    setRail((prev) =>
      prev.top === top && prev.height === height ? prev : { top, height },
    );
    fractions.current = lis.map(
      (li) => (li.offsetTop + DOT_CENTRE - top) / height,
    );
  }, []);

  useEffect(() => {
    measure();
    const late = setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(late);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    let idx = -1;
    fractions.current.forEach((f, i) => {
      if (p >= f - 0.001) idx = i;
    });
    setActive((prev) => (prev === idx ? prev : idx));
    if (idx >= 0) {
      setRipples((prev) => {
        let changed = false;
        const next = new Set(prev);
        for (let i = 0; i <= idx; i++) {
          if (!next.has(i)) {
            next.add(i);
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }
  });

  const lit = (i: number) => (reduced ? true : i <= active);

  return (
    <section id="experience" className="border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-[34px] leading-[1.1] font-bold tracking-[-0.02em] text-text md:text-[52px]">
            {site.experienceTitle}
          </h2>
        </Reveal>
        <div className="relative mt-12 md:ml-60">
          <ol ref={listRef} className="relative">
            <div
              aria-hidden
              className="absolute left-0 w-px bg-line"
              style={{ top: rail.top, height: rail.height }}
            />
            {!reduced && (
              <motion.div
                aria-hidden
                className="absolute left-0 w-px overflow-hidden bg-gradient-to-b from-mint to-cyan"
                style={{ top: rail.top, height: fillHeight }}
              >
                <span className="rail-shimmer" />
              </motion.div>
            )}
            {!reduced && (
              <>
                <motion.div
                  aria-hidden
                  className="absolute left-0 w-[3px] -translate-x-[1px] rounded-full"
                  style={{
                    top: markerTop,
                    height: 90,
                    y: "-100%",
                    opacity: tailAboveOpacity,
                    background:
                      "linear-gradient(to top, #3DDC97, transparent)",
                  }}
                />
                <motion.div
                  aria-hidden
                  className="absolute left-0 w-[3px] -translate-x-[1px] rounded-full"
                  style={{
                    top: markerTop,
                    height: 90,
                    opacity: tailBelowOpacity,
                    background:
                      "linear-gradient(to bottom, #3DDC97, transparent)",
                  }}
                />
                <motion.div
                  aria-hidden
                  className="absolute -left-[5.5px] z-10 h-3 w-3 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_14px_rgba(61,220,151,0.85)]"
                  style={{ top: markerTop }}
                >
                  <span className="marker-halo absolute inset-0 rounded-full bg-mint" />
                </motion.div>
              </>
            )}
            {experience.map((entry, i) => (
              <li
                key={entry.title}
                ref={(el) => {
                  entryRefs.current[i] = el;
                }}
                className="relative pb-12 pl-7 last:pb-0 md:pl-10"
              >
                <span
                  aria-hidden
                  className={`absolute top-1.5 -left-[4.5px] h-2 w-2 rounded-full transition-all duration-300 ${
                    lit(i)
                      ? "bg-mint shadow-[0_0_10px_rgba(61,220,151,0.8)]"
                      : "bg-line"
                  }`}
                >
                  {!reduced && ripples.has(i) && (
                    <span className="dot-ripple absolute inset-0 rounded-full border border-mint" />
                  )}
                </span>
                <p className="mb-2 font-mono text-sm text-muted md:absolute md:top-0.5 md:right-full md:mr-8 md:mb-0 md:w-52 md:text-right">
                  {entry.dates}
                </p>
                <Reveal x={-24} y={0}>
                  <h3
                    className={`text-[18px] font-medium transition-colors duration-300 ${
                      lit(i) && !reduced ? "text-mint" : "text-text"
                    }`}
                  >
                    {entry.title}
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-line">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 24)}
                        className="max-w-[62ch] text-base leading-[1.6] text-muted md:text-[18px]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
