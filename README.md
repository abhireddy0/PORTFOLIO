# Abhishek Reddy — Portfolio

Immersive 3D portfolio built with **Vite + React + GSAP + Three.js (R3F)**.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Drop in your own assets

- `public/resume.pdf` — linked from the navbar + contact section
- `public/portrait.jpg` — shown in the About section
- `public/projects/project-1.jpg`, `project-2.jpg` — shown on project cards

## Edit content

Grep for `TODO:` to find the project cards that still use placeholder text:

- [src/sections/Projects.tsx](src/sections/Projects.tsx) — the `PROJECTS` array

Real content lives in:

- [src/sections/Hero.tsx](src/sections/Hero.tsx) — name + tagline
- [src/sections/About.tsx](src/sections/About.tsx) — bio paragraphs
- [src/sections/Skills.tsx](src/sections/Skills.tsx) — skill groups + marquee list
- [src/sections/Experience.tsx](src/sections/Experience.tsx) — timeline entries
- [src/sections/Contact.tsx](src/sections/Contact.tsx) — email/phone/socials

## Deploy (Vercel)

`git init && git add . && git commit -m "init"` → push to GitHub → import into Vercel. Vite is detected automatically; no config needed.
