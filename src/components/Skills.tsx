import Reveal from "@/components/Reveal";
import SkillRow from "@/components/SkillRow";
import { site } from "@/data/site";
import { skills } from "@/data/skills";
import { ACCENT_HEX, groupAccent } from "@/lib/colors";

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
          {skills.map((row, i) => (
            <Reveal key={row.group} delay={i * 0.06}>
              <SkillRow
                group={row.group}
                tools={row.tools}
                hex={ACCENT_HEX[groupAccent(i)]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
