# AI Developer Guidelines & Working System

This document contains the strict architectural and behavioral rules that any AI Assistant or Developer must follow when writing code for this Next.js School Front-Side application. 

**Whenever you start a new chat, ensure the AI reads this document to understand the established patterns.**

---

## 🏛️ 1. Architectural Patterns & Data Flow
DO NOT mix data-fetching logic inside React Components. Strictly follow the 3-tier architecture:

1. **Services Layer (`src/services/*.service.ts`)**: 
   - All raw API calls using `axios` to the Unified School Backend API go here.
   - Absolutely no React code, hooks, or state management should exist here.
2. **Hooks Layer (`src/hooks/api/*/*.ts`)**: 
   - All `@tanstack/react-query` hooks (`useQuery`, `useMutation`) go here.
   - This layer is responsible for calling the service layer, handling cache invalidation, and triggering global `toast` notifications.
   - Keep query keys co-located in a `.keys.ts` file next to the hook (e.g., `notices.keys.ts`).
3. **UI Components (`src/components/themes/`)**:
   - Theme-specific UI components should ONLY consume the hooks. 
   - They must remain "dumb" to API transport logic. They simply pass data to the `mutate` function and render the UI based on their specific template layout.

## 📝 2. Dynamic Content (CMS-Driven Approach)
- **No Hardcoded Data**: All school information (Notices, Staff, Gallery, Info) MUST come from the unified API based on the resolved `school_id`. Do not hardcode arrays in the React components.
- **Dynamic Theming Context**: Components must respect the active theme and brand colors. Ensure CSS variables are utilized.
- **`next-intl` for Static UI Text**: Commonly used texts (Header links, Buttons like "Submit", "View Details") MUST be stored in `messages/en.json` and `messages/bn.json`. Use `useTranslations` in components to keep these reusable and manageable across languages.

## 🛡️ 3. Type Safety & Validation
- **Strict TypeScript**: Do not use `any`. Always define proper interfaces matching the Backend API responses.
- **Zod for Validation**: Always use `zod` for validating inputs (e.g., Contact forms, Admission forms).
- **Shared Schemas**: Ensure Zod schemas align perfectly with the backend's expected payloads.

## 🚨 4. Error Handling
- Never manually parse error strings in components.
- Always use the centralized `extractErrorMessage(error)` utility from `src/utils/error.ts`.
- `toast.error(extractErrorMessage(error))` should ideally be handled inside the React Query hook's `onError` callback.

## 🧩 5. Reusability & UI Constraints
- **Shadcn UI First**: Use the Shadcn component as the base for standard UI elements across all themes.
- **NEVER Modify `ui/` Components**: Do NOT manually edit or overwrite any Shadcn-generated components inside the `src/components/ui/` folder. Apply customizations via `className` props inside your specific theme components.
- **Small, Focused Components**: Break large pages down into smaller components.
- **Styling**: Adhere strictly to the aesthetic rules defined in `07_design_prompts.md`.

---

## 🤖 The "Architecture Master Prompt"
*Paste this prompt to the AI when asking it to build a new feature:*

> "I need you to build a new feature/theme component for my Next.js School Front-Side app. CRITICAL RULES: 
> 1. Follow the strict 3-tier architecture: Raw Axios calls in `src/services/`, React Query hooks in `src/hooks/api/`, and 'dumb' UI components that only consume the hooks.
> 2. No hardcoded data arrays! Fetch all school content (notices, staff) via React Query from the unified backend APIs.
> 3. Use `next-intl` for common static texts (buttons, headers) to support English, Bangla, and Arabic.
> 4. Ensure strict TypeScript and Zod validation. Use `extractErrorMessage()` for global toasts.
> 5. NEVER manually edit files inside `src/components/ui/`. Apply customizations via `className` props to match the theme.
> 6. STRICT RTL SUPPORT: Always use Tailwind Logical Properties (`ms-4`, `pe-4`, `text-start`) instead of left/right directions."




## master prompt :
---
# 🏫 SCHOOL FRONT-SIDE PROJECT RULES
**CRITICAL: You must follow these rules for every prompt in this project.**

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

