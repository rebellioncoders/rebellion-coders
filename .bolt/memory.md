# Project memory

## Product intent & audience

- Production-grade web app with a distinct brand identity centered on an official logo.
- Audience expects a polished, complete, branded experience (not a template/demo).

## Brand personality & voice

- Futuristic, professional brand presentation.
- User communicates in Hindi/Hinglish; responses in Hindi are appropriate.

## Visual design & UX direction

- Real brand logo lives at `public/logo.jpeg` (square aspect).
- Logo placements: navbar (compact), hero (within futuristic visual), footer (larger), favicon, social preview image.
- Logo must never stretch/distort — use `object-contain`.
- Responsive sizing tuned for both desktop and mobile.
- Layout components include Navbar, Hero, Footer.
- Aesthetic: futuristic, production-quality, non-cookie-cutter.

## Decisions, constraints & rationale

- Replaced placeholder SVG logo with actual `public/logo.jpeg` asset across all placements.
- Rationale: previously layout used placeholder while real square logo was available.
- Keep JSX + Tailwind + Lucide React stack; avoid extra UI packages unless explicitly requested.
- Import modules via `@/` alias (maps to `src/`).
- Lint, type-check, and production build verified passing after logo/layout changes.

## Open questions & assumptions

- Assuming logo color palette dictates accent colors — not yet confirmed by user.
- No explicit brand color/typography guidance given beyond "beautiful, not cookie cutter."
- Page structure beyond navbar/hero/footer not yet explored.