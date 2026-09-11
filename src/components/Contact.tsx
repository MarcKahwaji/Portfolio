import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export default function Contact() {
  const githubLabel = site.github.replace("https://", "");

  return (
    <section id="contact" className="border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-[34px] leading-[1.1] font-bold tracking-[-0.02em] text-text md:text-[52px]">
            {site.contact.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="max-w-[62ch] text-base leading-[1.6] text-muted md:text-[18px]">
              {site.contact.intro}
            </p>
            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 text-base text-text transition-colors duration-150 hover:text-mint"
                >
                  <Mail size={16} className="text-mint" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-base text-text transition-colors duration-150 hover:text-mint"
                >
                  <GithubIcon size={16} className="text-mint" aria-hidden />
                  {githubLabel}
                </a>
              </li>
              {site.linkedin.startsWith("http") && (
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-base text-text transition-colors duration-150 hover:text-mint"
                  >
                    <LinkedinIcon size={16} className="text-mint" aria-hidden />
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
          <Reveal className="md:col-span-7" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
