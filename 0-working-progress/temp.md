# School Front-Side: Development Tasklist

This document serves as the step-by-step roadmap for developing the multi-theme frontend. We will tackle these items serially.

## Phase 1: Core Architecture & Global Setup
- [x] **1.1 Global Providers:** Ensure `React Query` and `next-themes` (Dark/Light mode) are properly wrapped around the application.
- [x] **1.2 Axios Instance:** Create a base Axios instance in `src/services/api.ts` pointing to the backend (or a dummy endpoint initially).
- [x] **1.3 Domain Resolver Context:** Create a React Context or Server Component logic that reads the current domain, fetches the `theme_id` and brand colors, and injects the CSS variables into the DOM.
- [x] **1.4 i18n Setup:** Finalize the `next-intl` setup in `proxy.ts` (or `middleware.ts` if proxy fails) to support English (`en`) and Bangla (`bn`) routing.

## Phase 2: Building the "Default" Theme Layout
- [x] **2.1 Theme Folder Structure:** Create `src/components/themes/default/`.
- [x] **2.2 Base Layout:** Build the `Header` and `Footer` components using Shadcn UI.
- [x] **2.3 Global Toggles:** Implement the Language Switcher (EN/BN) and Theme Switcher (Dark/Light) inside the Header.
- [x] **2.4 Navigation:** Build a responsive, mobile-first navigation menu mapping to our standard sitemap (About, Academic, Admission, etc.).

## Phase 3: Core Pages (Default Theme)
- [x] **3.1 Homepage:** Build the Hero Banner carousel, Notice Marquee, Quick Links (Bento box style), and Principal's Speech section.
- [x] **3.2 Notices & Circulars Page:** Build a list/grid view for paginated notices.
- [x] **3.3 Staff Directory Page:** Build a grid of teacher/staff profile cards.
- [x] **3.4 Media Gallery:** Implement an image/video gallery with lightbox functionality.
- [x] **3.5 Certificate Verification:** Build a modal/page with an input field to verify certificates via Reference ID.

## Phase 4: API Hook Integration (Connecting to Backend)
- [x] **4.1 API Services:** Write raw Axios calls in `src/services/` for fetching School Profile, Notices, Staff, etc.
- [x] **4.2 React Query Hooks:** Create custom hooks (e.g., `useGetNotices`) in `src/hooks/api/` with proper caching.
- [ ] **4.3 UI Hydration:** Replace all hardcoded dummy data in the Default Theme with the real data coming from the hooks.

## Phase 5: Multi-Theme Implementation (Proof of Concept)
- [x] **5.1 New Theme Creation:** Create a second folder `src/components/themes/modern/`.
- [x] **5.2 Alternative UI:** Build a completely different Homepage layout (e.g., using a sidebar instead of a top nav) that consumes the *exact same* API hooks as the Default theme.
- [x] **5.3 Dynamic Resolver Test:** Ensure the application correctly switches between `default` and `modern` based on the API's `theme_id` response.

## Phase 6: Polish & Launch
- [x] **6.1 SEO Metadata:** Dynamically generate Next.js `<title>` and `<meta>` tags based on the active school's profile.
- [x] **6.2 Error Handling:** Build beautiful 404 and 500 error pages.
- [x] **6.3 Final Testing:** Ensure all responsive breakpoints and micro-animations are perfect.

## Phase 7: UI Data Hydration & API Completion
- [x] **7.1 Complete Data Hydration:** Complete task 4.3 from the original tasklist. Replace all hardcoded dummy data in the Default Theme and Modern Theme with the real data coming from React Query hooks.
- [x] **7.2 Robust Error/Empty States:** Ensure all data-fetching components have skeleton loaders (loading states), error states (using `extractErrorMessage`), and empty states when no data is returned.
- [x] **7.3 API Integration for Secondary Modules:** Write Axios services and React Query hooks for the remaining modules (Results, Events/Calendar, Admissions).

## Phase 8: Core Modules Expansion (Default Theme)
- [x] **8.1 Administration & About Pages:** Implement School Profile, Leadership Speeches, Governance (Governing Body, Founder/Donor List), and Official Information pages.
- [x] **8.2 Academic & Student Life Pages:** Implement Class Schedule, Academic Calendar, Syllabus, Student Info (Fees, Rules), and Facilities Showcase.
- [x] **8.3 Admissions Portal:** Implement informational pages (Why Study Here?, Admission Policy) and build the Online Registration Form with `zod` validation and `next-intl`.
- [x] **8.4 Results & Verification:** Implement the Academic Result, Board Exam Result, and Evaluation Result checking portals.

## Phase 9: Modern Theme Parity & RTL Readiness
- [x] **9.1 Modern Theme Page Parity:** Ensure the `modern` theme has distinct layouts for the new core pages built in Phase 8 (Notices, Gallery, Staff, About, Academics, Results).
- [x] **9.2 RTL (Right-to-Left) Audit:** Conduct a full codebase sweep to ensure Tailwind Logical Properties (`ms-`, `pe-`, `text-start`, `border-s`, etc.) are used everywhere instead of physical properties (`ml-`, `pr-`, `text-left`), guaranteeing flawless Arabic/BN RTL support.
- [x] **9.3 Component Customization Audit:** Verify all shared `shadcn/ui` components have not been directly modified in `src/components/ui/`, but rather customized via `className` across themes.

## Phase 10: Advanced Features & Final Polish
- [x] **10.1 Downloads Section:** Implement a searchable/filterable repository for school forms, routines, and educational resources.
- [x] **10.2 Global Search:** Implement a global site search feature that looks through notices, pages, and staff.
- [x] **10.3 Performance Optimization:** Audit React Query caching strategies and Next.js Image optimizations to ensure lightning-fast load times.
- [x] **10.4 Deployment Preparation:** Finalize the Dockerfile and CI/CD pipelines for production deployment.
