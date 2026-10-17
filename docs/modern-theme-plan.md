# Aurora Modern Theme Plan

## Completed in this pass

- Connected the project master prompt to `AGENTS.md`, which Codex automatically discovers for repository work.
- Reworked the existing `modern` theme into the Aurora Campus visual direction: responsive sidebar navigation, mobile sheet navigation, glass surfaces, dynamic primary/secondary colors, gradient hero, responsive cards, and hover motion.
- Added a data-driven modern homepage using the existing profile, notices, events, galleries, and stats hooks.
- Added modern presentations for the full school sitemap: about, leadership, governance, official information, academics, schedule, rules, attendance, admissions, admission information, staff, notices, events, gallery, downloads, results, certificate verification, facilities, student life, and contact.
- Routed pages that previously rendered only the default theme through `ThemePageRenderer` so the active school theme controls the presentation consistently.
- Added English, Bangla, and Arabic translation keys for the new theme UI.

## Next implementation phases

1. Replace mock implementations in `src/services/domain.service.ts` and `src/services/school.service.ts` with the production backend endpoints from `docs/04_api_contracts.md`.
2. Align the response schemas with the backend and add missing public contracts for facilities, admission content, student life, and certificate verification if the backend does not already expose them.
3. Add query-level error toasts and loading states to every mutation or interactive data flow.
4. Add route-level metadata, structured data, sitemap generation, and image optimization for production SEO.
5. Run visual QA at mobile, tablet, desktop, dark mode, and Arabic RTL breakpoints after connecting real school content.
