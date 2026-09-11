import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { skills } from "@/data/skills";
import { ACCENT_HEX, groupAccent, hexA } from "@/lib/colors";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-[34px] leading-[1.1] font-bold tracking-[-0.02em] text-text md:text-[52px]">
            {site.skillsTitle}
          </h2>
        </Reveal>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {skills.map((row, i) => {
            const hex = ACCENT_HEX[groupAccent(i)];
            return (
              <Reveal key={row.group} delay={i * 0.06}>
                <dl className="group grid gap-3 py-6 md:grid-cols-12 md:gap-8">
                  <dt className="flex items-start gap-2.5 text-[17px] font-medium text-text md:col-span-4 md:text-[18px]">
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: hex }}
                    />
                    {row.group}
                  </dt>
                  <dd className="flex flex-wrap gap-2 md:col-span-8">
                    {row.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-[6px] border px-2.5 py-1 font-mono text-[13px] transition-[filter] duration-150 group-hover:brightness-125"
                        style={{
                          color: hex,
                          borderColor: hexA(hex, 0.35),
                          backgroundColor: hexA(hex, 0.08),
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </dd>
                </dl>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
