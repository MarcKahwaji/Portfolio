# Start here

## Before you open VS Code

- Node 20 or newer (`node -v`)
- Claude Code installed: `npm install -g @anthropic-ai/claude-code`
- Git installed and logged in to GitHub
- A Resend account (free) for the contact form: https://resend.com, create an API key. Optional, the form falls back to mailto without it.

## Steps

1. Unzip this folder somewhere permanent, for example `~/projects/marc-portfolio`.
2. Open the folder in VS Code (File, Open Folder).
3. Open the integrated terminal and run `claude`.
4. Paste the prompt below and press Enter.
5. When it says it is done, run `npm run dev`, open http://localhost:3000, and check every section at desktop and mobile widths.
6. Fill the `TODO` values it lists (in `src/data/`), then follow section 7 of BRIEF.md to deploy.

## Prompt to paste into Claude Code

```
Read CLAUDE.md and BRIEF.md completely before doing anything. Then build the whole site in one pass:

1. Scaffold Next.js exactly as CLAUDE.md describes (into ./tmp, then move up), keep public/cv/ intact.
2. Set up the design tokens from BRIEF.md section 3 (palette, fonts, type scale) in Tailwind v4 and the root layout.
3. Create src/data/site.ts, projects.ts, experience.ts, skills.ts with the exact copy from BRIEF.md section 4. Unknown values are the literal string "TODO".
4. Build the sections in order: nav, hero with the agent graph, about, projects, experience, skills, contact (Server Action + Resend + mailto fallback), footer.
5. Add metadata, the OG image route, icon, sitemap, robots, JSON-LD, and README as in section 5.
6. Run npm run build and npm run lint, fix everything, then go through the definition of done in section 6 and confirm each item.
7. Commit after each section. At the end, print the list of remaining TODO values.

Do not ask me about design choices, they are all decided in BRIEF.md. Only stop if something blocks the build.
```

## If Claude Code drifts

- It adds a library not in CLAUDE.md: tell it to remove it and use what is listed.
- It puts copy inside components: tell it to move it to `src/data/`.
- It animates sections on scroll: tell it to remove that, only the hero animates (BRIEF.md section 3, Motion).
- It uses em dashes or all-caps labels: point it at CLAUDE.md hard rules.
