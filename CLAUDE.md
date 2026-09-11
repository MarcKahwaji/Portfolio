# Marc Kahwaji portfolio

Personal portfolio site for Marc Kahwaji, AI developer and full-stack engineer. Single page, statically generated, deployed on Vercel. The full design and content spec is in BRIEF.md. Read it completely before writing any code.

## Stack (fixed, do not swap)

- Next.js 15, App Router, TypeScript strict
- Tailwind CSS v4
- Motion (`motion` package, the successor of framer-motion) for the one hero animation only
- `lucide-react` for icons
- `resend` + `zod` for the contact form
- next/font/google for fonts, next/og for the OG image
- No UI kits (no shadcn, no MUI, no Chakra). No CSS-in-JS. No extra animation libraries.

## Scaffolding

This folder already contains CLAUDE.md, BRIEF.md, and public/cv/. `create-next-app` refuses non-empty directories, so scaffold into `./tmp` with `npx create-next-app@latest tmp --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes`, move everything from `tmp/` up into this folder (including dotfiles), delete `tmp/`, then keep `public/cv/` as it is.

## Commands

- `npm run dev` for local
- `npm run build` must pass with zero errors and zero warnings before you report done
- `npm run lint` must pass

## Hard rules

- Never use em dashes anywhere: not in copy, not in code comments, not in commit messages. Use commas, periods, colons, or plain hyphens.
- Never use emojis anywhere.
- British spelling in all copy (organisation, specialise, programme, modelling).
- Sentence case for all headings and buttons. No all-caps labels.
- All site content lives in `src/data/*.ts` (site, projects, experience, skills). Components render data, they do not contain copy.
- No traces of Lovable: grep the repo for `lovable` and `r2.dev` before finishing, both must return nothing.
- Anything you do not know (a URL, a number, a name) goes in as the literal string `TODO` in the data file, never invented.
- Commit after each completed section with a plain message, for example `feat: hero section`.
- Do not add analytics, cookie banners, chat widgets, or third-party scripts unless asked.
- Semantic HTML (header, nav, main, section, footer), visible focus states, `prefers-reduced-motion` respected, WCAG AA contrast.
- Mobile first. Verify at 360, 768, and 1280 px wide.

## Working style

Work through BRIEF.md top to bottom in one pass. Do not stop to ask about styling choices, they are decided in BRIEF.md. Only stop if something blocks the build. When you finish, list the remaining `TODO` values so they can be filled in.
