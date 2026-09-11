# Portfolio brief: Marc Kahwaji

## 1. What this is

A rebuild of an existing single-page portfolio (previously built in Lovable) for Marc Kahwaji, an AI developer and full-stack engineer based in Zahle, Lebanon. The old site had the right structure and identity (dark navy, mint accent, technical tone) but was client-rendered only, carried a Lovable badge, used a stale auto-generated preview image, and had generic template styling. This rebuild keeps the identity and the section order, fixes the technical problems, and raises the design quality.

Audience: recruiters, hiring managers, and potential freelance clients. Primary job of the page: in under ten seconds, make it clear that Marc builds AI systems that reach production, then let the reader verify that through projects and experience, then contact him or download the CV.

Owner decisions already made (do not re-open):
- Name is spelled **Marc Kahwaji** everywhere (matches the CV and github.com/MarcKahwaji).
- Degree is a **BSc in Management Information Systems** at AUST.
- NOETICO is not mentioned anywhere on the site. Not in copy, not in projects, not in experience.
- Projects shown: the multi-agent research orchestrator, the crypto trading multi-agent system, the e-commerce support AIM, Quoz, the ISMS asset classification model, and the Android malware systematic review. BuildQuote and the task planning agent are dropped.
- The typewriter role cycler from the old hero is replaced by a static headline and the agent-graph animation described in section 4. One motion moment, not several.
- The four stat cards from the old About section become one quiet row of three figures.
- Chip soup for skills becomes a definition list.
- The "self-directed 17-day curriculum" line under Education is dropped.

## 2. Writing rules for all copy

- Plain wording a person would actually say. No marketing adjectives (seamless, robust, cutting-edge, powerful, innovative, passionate), no "leverage", no "delve", no "elevate".
- Short sentences. Specific numbers where they exist. Say what a thing does, not how impressive it is.
- Sentence case for headings and buttons. No all-caps labels.
- No em dashes. No emojis. British spelling.
- Use the copy in section 4 as written. Where it says TODO, put the literal string `TODO` in the data file.

## 3. Sections, in order

1. Nav
2. Hero
3. About (with the three figures)
4. Projects
5. Experience (timeline, includes education)
6. Skills
7. Contact
8. Footer

Skills sits below Projects and Experience. Evidence first, inventory second.

## 4. Design system

### Palette

| Token | Hex | Use |
|---|---|---|
| ink | #0B1220 | page background |
| panel | #111B2E | featured cards, form fields |
| line | #22304A | hairlines, card borders |
| text | #E6EAF2 | body text |
| muted | #8B97AD | secondary text, dates |
| mint | #3DDC97 | accent: links, primary button, graph, timeline |
| mint-deep | #24B67A | hover and pressed states, text on mint where needed |

Mint is used sparingly. If more than about five mint elements are visible in one viewport, remove some. No gradients except the single radial glow behind the hero graph. No drop shadows.

### Type

- Display: **Bricolage Grotesque** (next/font/google), weights 500 and 700, for the name, hero headline, section titles, and project titles. Letter-spacing -0.02em at large sizes.
- Body and UI: **IBM Plex Sans**, weights 400 and 500.
- Mono: **IBM Plex Mono**, weight 400, only for the skills definition list values, timeline dates, node labels in the diagrams, and the caption under the hero graph. Not for labels or buttons.

Scale (desktop / mobile): hero headline 64 / 40 px, section title 40 / 30 px, project title 22 / 20 px, body 17 / 16 px, small 14 px. Line height 1.15 on display, 1.6 on body. Body line length about 65 characters max.

### Layout

- Content container max-width 1120 px, left-aligned. Nothing is centred except the mobile nav menu.
- Section spacing: 128 px vertical on desktop, 80 px on mobile. A single hairline (`line`) separates sections. No section eyebrow labels, no numbered markers except the timeline (which is a real sequence).
- Corner radius: featured project cards 12 px, compact cards and form fields 8 px, buttons 6 px. This difference is deliberate and encodes hierarchy.
- Background: flat `ink`. Behind the hero graph only, a radial glow of mint at 8 percent opacity, 600 px wide, fading to transparent.

### Motion

- One orchestrated moment on load: the hero headline and subline fade in (300 ms, 80 ms stagger), then the agent graph starts its pulse. Nothing else animates on scroll. No fade-up on sections, no parallax, no counters.
- Hover: links and buttons change colour over 150 ms. Project cards change border colour from `line` to `mint` at 60 percent opacity. That is all.
- `prefers-reduced-motion: reduce` renders the graph static and disables the load sequence.

## 5. Section specs and copy

### Nav

Sticky top bar, transparent over the hero, gains a `line` bottom hairline and a blurred `ink` background at 90 percent after scrolling 40 px. Left: "Marc Kahwaji" in display 500. Right: links About, Projects, Experience, Skills, Contact, and one button "Download CV" (links to `/cv/Marc-Kahwaji-CV.pdf`, opens in a new tab). Active section link is `text`, others `muted`. On mobile, a menu button opens a full-height panel with the same links stacked.

### Hero

Two columns on desktop (text 7/12, graph 5/12), stacked on mobile with the graph below the text at reduced height.

Left column:
- Line above the headline, body size, `muted`: "Marc Kahwaji, AI developer and full-stack engineer"
- Headline (display 700): "I build multi-agent systems and the apps around them."
- Subline (body, `muted`): "Software developer at HyperCycle, where I have put 15+ AI services into production. I work in Python, FastAPI, Docker, React, and TypeScript, from first prototype to running system."
- Buttons: primary "See projects" (mint background, ink text) scrolls to Projects; secondary "Download CV" (line border, text colour) opens the PDF; a plain text link "kahwajiimark@gmail.com" with a mail icon that opens mailto.
- Status line under the buttons, small, `muted`, with a small mint dot: "Open to full-time, contract, and freelance work. Based in Lebanon, relocating to France in September 2026." TODO: owner to confirm the relocation sentence or remove it.

Right column, the agent graph. This is the one memorable element of the page. Build it as an inline SVG component (`src/components/AgentGraph.tsx`):
- Seven nodes in a loose orbit around one central node (the orchestrator). Node = 6 px circle in `mint`, central node 9 px. Edges from the centre to each node and between three adjacent pairs, 1 px `line` strokes.
- Pulse: every 1.8 s a 3 px `mint` dot travels along one edge from centre to a node (400 ms, ease-in-out), then that node brightens briefly. Edges are chosen in sequence, not randomly, so the motion reads as orchestration. Use SVG `animateMotion` or Motion, whichever is simpler and respects reduced motion.
- Caption under the graph, mono, `muted`, 13 px: "Agent layout from the research orchestrator project."
- The graph sits inside the radial glow. No frame, no card.

### About

Title (display): "About"

Two columns on desktop: prose on the left (7/12), the three figures on the right (4/12, offset from the top by one line). Stacked on mobile.

Prose, three paragraphs:

1. "I am a software developer at HyperCycle, where I build AI microservices and multi-agent systems on decentralised infrastructure. On the side I take freelance work for clients who need AI features, a web app, or training for their team."

2. "Most of my recent work is orchestration: systems of six or seven agents that hand work to each other, multi-tenant deployments that serve several organisations from one instance, and platforms with real-time AI support built in. I work across the whole stack, from Python backends and React or React Native frontends to Docker, CI/CD, and deployment."

3. "I am in my final year of a BSc in Management Information Systems at the American University of Science and Technology, graduating in January 2027. My habit on every project is the same: get a working version out early, then improve it with real usage."

Figures (no cards, no borders, each is a display-weight number over a small `muted` label, stacked vertically with 32 px between them):
- "15+" / "AI services in production"
- "12+" / "projects shipped"
- "8+" / "websites launched"

TODO: owner to confirm the three numbers before launch.

### Projects

Title (display): "Projects"

One line under the title, `muted`: "Work from HyperCycle, freelance clients, and research. Client work is described without internal detail."

Layout: two featured cards in a row (each 6/12) with `panel` background and 12 px radius, then a grid of four compact cards (2 columns on desktop and tablet, 1 on mobile) with transparent background, `line` border, 8 px radius.

Every card shows: title (display 500), a type label in `muted` body text, description, a stack line in small `muted` text (comma separated, not chips), and links "Code" (GitHub icon) where a repo exists and "Live" where a demo exists. Cards without links omit them. No badges.

Featured cards additionally show a small pipeline diagram above the description: a horizontal row of labelled nodes joined by 1 px `line` strokes, node labels in mono 12 px `muted`, nodes 6 px `mint` circles. Static, no animation. The diagram is rendered from a `pipeline: string[]` field in the data, so the component is generic (`src/components/PipelineDiagram.tsx`). On mobile the row wraps to two lines.

Data (`src/data/projects.ts`):

Featured 1
- title: "Multi-agent research orchestrator"
- type: "Multi-agent system"
- pipeline: ["Plan", "Search", "Retrieve", "Summarise", "Synthesise", "Critique", "Report"]
- description: "A seven-agent pipeline that researches any topic and writes a cited report. A dashboard streams each agent's progress over SSE, with Prometheus metrics behind it."
- stack: Python, LangGraph, Groq, FastAPI, Next.js, Docker, SSE, Prometheus
- repo: TODO
- live: none

Featured 2
- title: "Crypto trading multi-agent system"
- type: "Multi-agent system"
- pipeline: ["Market data", "News sentiment", "Signals", "Charts", "Summary"]
- description: "Five agents split the work of market analysis: price retrieval, news sentiment, trading signals with confidence scores, Plotly charts, and an executive summary. The web UI shows each agent as it runs."
- stack: Python, FastAPI, pyhypercycle_aim, Groq, Docker, Flask, Plotly, CoinGecko API, NewsAPI
- repo: TODO
- live: none

Compact 1
- title: "E-commerce customer support AIM"
- type: "Multi-tenant AI service"
- description: "Support agent with hybrid keyword and LLM routing across 26 FAQ categories, above 80 percent routing accuracy. Each tenant gets its own policies, responses, and sessions."
- stack: Python, FastAPI, pyhypercycle_aim, Docker
- repo: TODO

Compact 2
- title: "Quoz"
- type: "Client platform, contract work"
- description: "A B2B platform for managing bespoke art programmes for large commercial clients. I work on the application layer: approval workflows, design versioning, and automated PDF lookbooks."
- stack: React, TypeScript, Supabase, Cloudflare
- repo: none
- live: none

Compact 3
- title: "AI-based asset classification for ISMS"
- type: "Machine learning"
- description: "Supervised model that classifies people and devices from log data (CERT r4.2), benchmarked against a rule-based baseline and mapped to ISO/IEC 27001 controls. Random Forest reached 97 percent accuracy against a 92 percent baseline."
- stack: Python, Random Forest, ANN, SVM
- repo: TODO (use `none` if there is no public repo)

Compact 4
- title: "Dynamic AI-based Android malware detection"
- type: "Systematic review"
- description: "PRISMA-based review of 42 studies, screened from 1,724 papers, on runtime malware detection for Android: analysis techniques, models, datasets, adversarial robustness, and reproducibility."
- stack: PRISMA 2020, literature synthesis
- repo: none
- live: none

### Experience

Title (display): "Experience"

A vertical timeline: a 1 px `line` rail on the left with an 8 px `mint` dot per entry, dates in mono `muted` to the left of the rail on desktop (above the entry on mobile). Entries in order:

1. **Software developer, HyperCycle** (May 2025 to present)
   - Designed, built, and deployed 15+ production AI microservices (AIMs) with Python, FastAPI, and Docker on HyperCycle's decentralised infrastructure.
   - Built an internal AI tool that moved from pilot to daily production use and is now part of the core workflow of roughly 80 percent of company staff.
   - Architected multi-agent systems of six to seven coordinated agents (LangGraph, LangChain, CrewAI, Groq) and multi-tenant deployments serving several organisations with isolated data and custom configuration.
   - Implemented CI/CD pipelines (GitHub Actions and Aimifier) for automated deployment to Ubuntu nodes and hardened reliability across all services.

2. **Freelance AI and software developer** (April 2025 to present)
   - Contract developer on Quoz, a B2B art programme management platform: approval workflows, design versioning, and automated PDF generation.
   - Built full-stack websites (React, Tailwind CSS, Node.js) with integrated AI backends and real-time chat.
   - Scoped and delivered CRM integrations, WhatsApp automation bots, AI-powered telephony systems, and machine learning solutions for dataset analysis and predictive modelling.
   - Designed and delivered technical training on LLMs, multi-agent systems, prompt engineering, and Python to learners from complete beginners to working developers.

3. **BSc in Management Information Systems, American University of Science and Technology (AUST)** (2021 to January 2027, expected)
   - Relevant coursework: AI and information systems, database management, software engineering, statistics.
   - Capstone: multi-agent research system, seven orchestrated agents with a real-time monitoring dashboard (LangGraph, Groq, FastAPI, Docker).

### Skills

Title (display): "Skills"

A definition list, not chips. Two columns on desktop: group name on the left in body 500 `text` (4/12), tools on the right in mono `muted` (8/12), one row per group with a `line` hairline between rows. On mobile, group name above tools.

Rows (`src/data/skills.ts`):
- AI and machine learning: LangGraph, LangChain, CrewAI, multi-agent orchestration, RAG, prompt engineering, OpenAI, Groq, Ollama, FAISS, NLP, computer vision, predictive modelling
- Languages: Python, TypeScript, JavaScript, C++, Java, Bash
- Backend: FastAPI, Node.js, tRPC, Hono, Bun, REST APIs, WebSockets, webhooks
- Frontend and mobile: React, Next.js, React Native, Expo, Tailwind CSS
- Data and infrastructure: PostgreSQL, Supabase, SQLite, Docker, GitHub Actions, AWS EC2, Linux, Nginx, Vercel, Prometheus
- Integrations: Stripe, WhatsApp Business API (Twilio), n8n, Zapier, SMTP
- Languages spoken: Arabic (native), English (fluent, IELTS C1), French (fluent), German (B1)

### Contact

Title (display): "Contact"

Two columns on desktop. Left (5/12): one short paragraph and the direct channels. Right (7/12): the form.

Left copy: "If you need an AI system built, a web app shipped, or a team trained, send a message. I reply within two working days."

Channels, each a plain link with a lucide icon: kahwajiimark@gmail.com (mail), github.com/MarcKahwaji (github), LinkedIn TODO (linkedin). If the LinkedIn value is TODO, do not render that link.

Form fields: Name, Email, What do you need (select: "AI system or agent", "Web or mobile app", "Technical training", "Something else"), Message. Button: "Send message". States: sending ("Sending"), success replaces the form with "Message sent. I will reply within two working days.", error shows "The message did not send. Email me directly at kahwajiimark@gmail.com." under the button. Include a hidden honeypot field.

Implementation: a Server Action in `src/app/actions/contact.ts` validated with zod, sending through Resend to `CONTACT_TO_EMAIL` from `onboarding@resend.dev` (works without a verified domain). Env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (default kahwajiimark@gmail.com). If `RESEND_API_KEY` is missing, the form still renders but submit opens a prefilled mailto link instead, so the site never has a dead form. Add `.env.example` with both keys.

### Footer

Single row, small `muted` text, `line` hairline above: left "Marc Kahwaji, 2026", right links "GitHub", "Email", "Download CV". Nothing else. No "built with", no back-to-top button.

## 6. Technical requirements

- Static generation for the page. No client-side data fetching on load. The contact form is the only interactive island.
- `src/app/layout.tsx` metadata: title "Marc Kahwaji, AI developer and full-stack engineer", description "Marc Kahwaji builds multi-agent systems, AI microservices, and full-stack applications. Software developer at HyperCycle, freelance for clients.", canonical from `NEXT_PUBLIC_SITE_URL` (default `https://TODO`), Open Graph and Twitter card metadata.
- `src/app/opengraph-image.tsx` with next/og: ink background, the name in display type, the headline underneath, a small static rendering of the agent graph on the right, 1200 by 630.
- `src/app/icon.svg`: the letters "MK" in display 700, mint on ink, plus a 180 px apple icon generated from it.
- `sitemap.ts` and `robots.ts`.
- JSON-LD `Person` schema in the layout with name, jobTitle, url, sameAs (GitHub, LinkedIn if present).
- Section ids for anchor links: about, projects, experience, skills, contact. Smooth scroll with `scroll-margin-top` on sections so the sticky nav never covers a title.
- Lighthouse targets on the production build, mobile: 95 or above on Performance, Accessibility, Best Practices, SEO.
- `README.md`: two paragraphs on what the site is, how to run it, the env vars, and where to edit content (`src/data/`).

## 7. Definition of done

- `npm run build` and `npm run lint` pass clean.
- All sections render with the copy above at 360, 768, and 1280 px.
- Keyboard navigation reaches every link, button, and field with a visible focus ring.
- `grep -ri lovable .` and `grep -ri r2.dev .` (excluding node_modules and .next) return nothing.
- `grep -rnP "\x{2014}" src/` (the em dash code point) returns nothing. No emojis in the repo.
- The CV downloads from the nav, the hero, and the footer.
- Contact form works with `RESEND_API_KEY` set and falls back to mailto without it.
- A final list of every remaining `TODO` value in `src/data/` is printed for the owner.

## 8. After the build (owner's checklist, not for Claude Code)

1. Fill the TODO values in `src/data/`: repo URLs, LinkedIn, the three figures, the relocation sentence.
2. Push to GitHub, import into Vercel, add `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
3. Buy a domain, attach it in Vercel, set `NEXT_PUBLIC_SITE_URL`, redeploy.
4. Paste the live URL into a LinkedIn post preview to check the OG image.
5. Add the new domain to the CV header, re-export the PDF, replace `public/cv/Marc-Kahwaji-CV.pdf`.
6. Unpublish the Lovable project.
