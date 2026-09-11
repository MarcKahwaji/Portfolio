# Marc Kahwaji portfolio

Personal portfolio site for Marc Kahwaji, AI developer and full-stack engineer. A single statically generated page built with Next.js 15 (App Router, TypeScript strict), Tailwind CSS v4, and Motion for the hero animation. The contact form is the only interactive island: a Server Action validated with zod that sends through Resend, with a mailto fallback when no API key is configured.

All copy lives in `src/data/` (site.ts, projects.ts, experience.ts, skills.ts). To change any text, link, or project, edit those files, the components only render the data. Values that still read `TODO` need to be filled in before launch. The CV PDF lives at `public/cv/Marc-Kahwaji-CV.pdf`.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY`: Resend API key for the contact form. Without it the form still renders and submit opens a prefilled mailto link.
- `CONTACT_TO_EMAIL`: where contact messages are delivered, defaults to kahwajiimark@gmail.com.
- `NEXT_PUBLIC_SITE_URL`: the canonical site URL, used for metadata, the sitemap, and robots.txt.
