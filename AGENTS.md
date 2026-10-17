<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---
# 🏫 SCHOOL FRONT-SIDE PROJECT RULES
**CRITICAL: You must follow these rules for every prompt in this project.**

## Master prompt source of truth
Before making code changes, read `docs/ai_guidelines.md` and the relevant files in `docs/`. Treat the `master prompt` section in `docs/ai_guidelines.md` as the project-level instruction set. Use `docs/04_api_contracts.md`, `docs/05_sitemap_and_layout.md`, and `docs/07_design_prompts.md` when implementing APIs, routes, or theme UI. Keep these documents synchronized when the architecture changes. the current AGENTS.md file is also a mini master prompt file you can consider as master prompt.

## 1. 🏛️ Architecture & Data Flow
*   **3-Tier Architecture:** 
    1. `src/services/`: Raw Axios API calls only.
    2. `src/hooks/api/`: React Query hooks (`useQuery`, `useMutation`).
    3. `src/components/themes/`: Dumb UI components that consume hooks.
*   **No Hardcoded Data:** Fetch all school content (Notices, Staff, Info) via API based on the resolved `school_id`.
*   **Dynamic Theming:** Components must adapt to active CSS variables (`--primary`, `--secondary`) injected by the theme resolver.
*   **i18n Localization:** Use `next-intl` (messages in `en.json`, `bn.json`, `ar.json`) for all static text.
*   **Validation:** Use Zod for validation schemas matching backend APIs.

## 2. 🎨 UI/UX Design Directives
*   **Aesthetic:** Extremely premium, trustworthy, and modern educational platform look.
*   **Tailwind CSS v4 & Shadcn:** Use Shadcn primitives for base components. Do NOT edit files in `src/components/ui/`; extend them via `className`.
*   **RTL / Arabic Support:** You MUST use Tailwind Logical Properties (e.g. `ms-4`, `pe-4`, `text-start`) instead of left/right (`ml-4`, `pr-4`) to ensure the design flips seamlessly for Arabic.
*   **Effects:** Use subtle glassmorphism (`backdrop-blur`), soft gradients, and generous padding.
*   **Micro-interactions:** Interactive elements MUST have hover states (e.g., `transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`).
*   **Responsive:** Mobile-first layout always.

## 3. 🚨 Error Handling
*   Use `extractErrorMessage(error)` from `src/utils/error.ts` for all error parsing.
*   Trigger `toast.error()` globally via React Query's `onError` callbacks.
