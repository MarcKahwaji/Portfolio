"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { experience } from "@/data/experience";

export default function Experience() {
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLOListElement>(null);
  const entryRefs = useRef<(HTMLLIElement | null)[]>([]);
  const fractions = useRef<number[]>([]);
  const [active, setActive] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const markerTop = useTransform(scrollYProgress, (p) => `${p * 100}%`);
  const fillHeight = markerTop;

  useEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      if (!rail) return;
      const total = rail.offsetHeight || 1;
      fractions.current = entryRefs.current.map((li) =>
        li ? (li.offsetTop + 10) / total : 1,
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    let idx = -1;
    fractions.current.forEach((f, i) => {
      if (p >= f) idx = i;
    });
    setActive((prev) => (prev === idx ? prev : idx));
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
          <ol ref={railRef} className="relative">
            <div
              aria-hidden
              className="absolute top-0 bottom-0 left-0 w-px bg-line"
            />
            {!reduced && (
              <motion.div
                aria-hidden
                className="absolute top-0 left-0 w-px bg-gradient-to-b from-mint to-cyan"
                style={{ height: fillHeight }}
              />
            )}
            {!reduced && (
              <motion.div
                aria-hidden
                className="absolute -left-[5.5px] z-10 h-3 w-3 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_14px_rgba(61,220,151,0.85)]"
                style={{ top: markerTop }}
              />
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
                />
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
