# System Design: School Front-Side Application

## 1. Overview
The "front-side" application serves as the public-facing website for schools using the school management system. It aims to provide a dynamic, SEO-friendly, and customizable web presence for each school, powered by a single codebase and unified API.

## 2. Architecture & Tech Stack

### Tech Stack
*   **Frontend Framework**: **Next.js (React)** - Chosen for its excellent Server-Side Rendering (SSR) capabilities, ensuring high performance and strong Search Engine Optimization (SEO) for public school pages.
*   **Styling**: CSS Modules or TailwindCSS (TBD based on preference)
*   **Data Fetching**: Next.js native `fetch` with caching strategies to minimize load on the backend.

### Theming Architecture (Dynamic Component Loading)
*   **Single Application Instance**: The `front-side` application is a single Next.js project. It handles requests for all schools.
*   **Domain/Subdomain Routing**: The application identifies which school is being requested via the host header (e.g., `schoolA.example.com` or a custom domain).
*   **Theme Resolution**: Upon receiving a request, the app fetches the school's configuration (including its active `theme_id`) from the unified backend API.
*   **Dynamic Rendering**: Based on the `theme_id`, the app dynamically imports and renders the specific layout and components designed for that theme (e.g., if `theme_id=classic`, it loads `themes/classic/Layout.tsx`).

## 3. Data Flow

1.  **Request**: User visits `school-domain.com`.
2.  **Resolution**: Next.js Server identifies the domain and makes a fast API call to the backend: `GET /api/public/resolve-domain?domain=school-domain.com`.
3.  **Configuration**: Backend returns the `school_id`, `theme_id`, and basic settings (colors, logo).
4.  **Data Fetching**: Next.js server fetches the required data (Notices, Teachers, etc.) for that specific `school_id` using the unified APIs.
5.  **Rendering**: Next.js passes the data to the resolved theme's components, renders the full HTML, and sends it to the client for optimal SEO.

## 4. Unified API Strategy

All templates will consume the exact same API endpoints. The backend does not care which theme is active; it purely serves data.

*   `GET /api/public/schools/{id}/profile` - Core info, logo, history, contact.
*   `GET /api/public/schools/{id}/notices` - Public announcements and notices.
*   `GET /api/public/schools/{id}/staff` - Directory of teachers and administration.
*   `GET /api/public/schools/{id}/galleries` - Albums and photos/videos.
*   `GET /api/public/schools/{id}/events` - Academic calendar and upcoming events.

## 5. Core Features (Data Models)

Based on standard school requirements and an analysis of the provided demo website, the system will support a rich set of features, categorized into logical modules:

*   **Administration & About**:
    *   School Profile (Name, Contact Details, Logo, History, Mission/Vision, Campus Tour).
    *   Leadership Speeches (Chairman, Principal/Head Teacher).
    *   Governance (Governing Body, Ex-Governing Body, Founder & Donor List, Administrators).
    *   Official Information (Teaching Permission, Recognition Letters, Govt. Approvals, Statistics).
*   **Academics & Staff**:
    *   Directory (Current Teachers, Former Teachers, Current Staff, Former Staff).
    *   Academic Info (Class Schedule, Academic Rules, Academic Calendar, Syllabus/Routine).
    *   Attendance & Leave Information (Public view or links for Attendance Sheets).
*   **Admissions**:
    *   Admissions Portal (Why Study Here?, How to Apply, Admission Test Info, Admission Policy).
    *   Online Registration System.
*   **Student Life & Facilities**:
    *   Student Information (Student List, Tuition Fees, Exam System/Schedule, Rules & Regulations, Uniform).
    *   Facilities Showcase (Library, Play Ground, Science Labs [Physics, Biology, Chemistry], ICT Lab, Co-curricular Activities).
*   **Results & Verification**:
    *   Exam Results (Academic Result, Board Exam Result, Evaluation Result).
    *   Certificate Verification System.
*   **News, Events & Media**:
    *   Notice Board & Scrolling Marquee (Urgent updates, circulars).
    *   News & Events Calendar.
    *   Media Gallery (Image and video albums).
    *   Downloads Section (Forms, resources).
*   **Global Utilities**:
    *   Multi-language Support (e.g., English / Bangla toggle).
    *   Dark / Light Theme Toggle.

## 6. Admin Panel Integration

The existing backend/admin panel will act as a Headless CMS for the front-side:
*   **Theme Selection**: Admin can browse available themes and set one as active.
*   **Content Management**: Admin can create/edit Notices, upload to the Gallery, and update School Info without needing a separate database or login.
*   **Customization**: Depending on the theme, admins can tweak primary/secondary colors to match their school branding.

## 7. Directory Structure (Proposed)

```text
front-side/
├── src/
│   ├── app/                 # Next.js App Router (handles domains & routing)
│   ├── components/
│   │   ├── shared/          # Reusable components across ALL themes (e.g., SEO tags)
│   │   └── themes/          # Theme-specific implementations
│   │       ├── default/     # Template 1
│   │       │   ├── Home.tsx
│   │       │   ├── Header.tsx
│   │       │   └── ...
│   │       └── modern/      # Template 2
│   │           ├── Home.tsx
│   │           └── ...
│   ├── lib/                 # API clients, utilities
│   └── types/               # TypeScript interfaces for API responses (Shared)
```
