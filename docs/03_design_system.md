# Design System & Theming Architecture

## 1. Multiple Templates Support
The School Front-Side does not have a single fixed UI. It supports multiple templates designed by different frontend developers, allowing school admins to choose the look and feel of their public website.

## 2. Shared Global UI (shadcn/ui)
We utilize `shadcn/ui` alongside `Tailwind CSS`. While layouts differ per theme, core primitive components (Buttons, Inputs, Dialogs) should rely on shadcn/ui to maintain accessibility and speed up development.

## 3. Theme CSS Variables
Each template will utilize Tailwind CSS v4 variables to adapt to the school's branding. 
When the backend resolves a domain, it provides the school's brand colors. These must be injected into the root layout so that Tailwind uses them:

```css
:root {
  --primary: 222.2 47.4% 11.2%; /* Injected dynamically */
  --secondary: 210 40% 96.1%;
}
```

## 4. Directory Structure for Themes
All theme-specific code lives under `src/components/themes/`.

```
src/components/
├── shared/           # Generic components (SEO headers, icons)
├── ui/               # shadcn/ui primitives
└── themes/
    ├── classic/      # Theme 1: "Classic"
    │   ├── Layout.tsx
    │   ├── Home.tsx
    │   └── Notices.tsx
    └── modern/       # Theme 2: "Modern"
        ├── Layout.tsx
        ├── Home.tsx
        └── Notices.tsx
```

## 5. Dynamic Rendering Strategy
In the Next.js `app/page.tsx` (and other routes), the application will read the `theme_id` context and render the correct theme component dynamically using React's `lazy` or Next.js `next/dynamic`.
