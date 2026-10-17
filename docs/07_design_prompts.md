# System Prompts for UI/UX Design Generation

This document contains strict, standardized prompts to be fed to AI assistants (or given as guidelines to human developers) whenever generating UI templates and components for the School Management Front-Side Website.

These rules ensure the final product looks like a highly polished, trustworthy, and modern educational institution platform.

---

## 🎨 1. Core Aesthetic Directives (The "Wow" Factor)
Whenever building a new template or component, adhere to these aesthetic rules:
- **Trustworthy & Modern Look:** The design must feel state-of-the-art while maintaining the professional dignity of a school. Use curated, harmonious palettes provided by the API (e.g., deep navy for backgrounds, vibrant gold or crimson for accents).
- **Glassmorphism & Depth:** Liberally use `backdrop-blur-md`, subtle semi-transparent backgrounds (`bg-background/60`), and soft borders (`border-white/10` or `border-border/50`) for sticky headers, floating cards, and dialogs.
- **Subtle Gradients:** Avoid flat, boring backgrounds for hero sections. Use beautiful, subtle Tailwind gradients (`bg-gradient-to-br from-primary/10 via-background to-secondary/10`).
- **Typography:** Ensure a clean, modern font stack (like Inter, Geist, or traditional Serif fonts for classic school themes).

## ✨ 2. Micro-Interactions & Animations
An interface that feels "alive" builds immediate trust.
- **Hover Effects:** Every interactive element MUST have a smooth hover state. Use `transition-all duration-300 ease-in-out`. 
- **Buttons:** Buttons should slightly lift or glow on hover (e.g., `hover:-translate-y-1 hover:shadow-lg active:scale-95`).
- **Cards (Notices, Gallery):** Feature cards should have a hover effect that brings them forward (`hover:shadow-xl hover:border-primary/50`).
- **Framer Motion:** For page loads or list renderings (like the Staff Directory), utilize Framer Motion or simple CSS animations so elements stagger gracefully into view.

## 📱 3. Responsive & Layout Rules
- **Mobile First, Desktop Perfect:** All designs must use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`). The site must look just as stunning on mobile (for parents) as it does on a desktop.
- **Whitespace & Breathing Room:** Do not cramp elements. Use generous padding (`p-8`, `p-12`) to create a luxurious sense of space.
- **Bento Box Layouts:** When displaying school features or statistics, favor modern CSS Grid layouts that dynamically resize.

## 🧱 4. Component Usage (Shadcn UI)
- **Do not reinvent the wheel:** Use the existing Shadcn UI components (Buttons, Inputs, Cards, Dialogs). 
- **Extend, don't break:** When using Shadcn components, pass in custom `className` props to apply our premium aesthetic.
- **Icons:** Use `lucide-react` icons heavily to add visual context to text.

---

## 🤖 The "Copy-Paste" Master Prompt
*If you are opening a new chat session with an AI to build a component for a theme, paste the following block along with your request:*

> "I need you to build a React component for a specific theme in my Next.js School Front-Side application. CRITICAL INSTRUCTIONS: The design must be incredibly premium, modern, and trustworthy. Use Tailwind CSS v4. Do NOT make it look like a basic generic template. Utilize subtle glassmorphism (`backdrop-blur`), soft gradients, generous padding, and micro-animations on hover (`transition-all duration-300 hover:-translate-y-1`). The layout should be fully responsive (mobile-first). Use `lucide-react` for icons. Ensure the component utilizes dynamic CSS variables (--primary, --secondary) so it adapts to any school's branding. **CRITICAL: You MUST use Tailwind Logical Properties (e.g. `ms-4`, `pe-4`, `text-start`) instead of left/right to ensure 100% Arabic/RTL compatibility.** Ensure the final result gives parents and students a 'WOW' impression at first glance."
