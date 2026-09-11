import { site } from "@/data/site";

const hrefFor = {
  github: site.github,
  email: `mailto:${site.email}`,
  cv: site.cvPath,
};

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-8 md:px-8">
        <p className="text-sm text-muted">{site.footer.left}</p>
        <nav aria-label="Footer" className="flex items-center gap-6">
          {site.footer.links.map((link) => (
            <a
              key={link.kind}
              href={hrefFor[link.kind]}
              {...(link.kind === "github"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...(link.kind === "cv"
                ? { download: "Marc-Kahwaji-CV.pdf" }
                : {})}
              className="inline-block py-3 text-sm text-muted transition-colors duration-150 hover:text-text md:py-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
