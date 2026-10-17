# Project Overview: School Front-Side Application

## 1. Introduction
This project involves building a dynamic, multi-tenant public-facing website (the "front-side") for schools utilizing the central School Management System. It aims to provide schools with a professional web presence where they can showcase information, notices, galleries, and staff directories. 

## 2. Multi-Theme Architecture
A core requirement of this project is to support multiple templates/designs from a single codebase.
- **Single Application:** A single Next.js instance serves all schools.
- **Dynamic Theming:** When a request is received, the app determines the school based on the domain/subdomain, fetches the school's configuration (including `theme_id`), and dynamically loads the UI components and layout corresponding to that theme.
- **Headless Backend:** The frontend relies entirely on existing backend APIs to fetch data. There is no dedicated database for this frontend.

## 3. Technology Stack
- **Framework:** Next.js (App Router) for Server-Side Rendering (SSR) and optimal SEO.
- **Language:** TypeScript for type safety.
- **Styling:** Tailwind CSS (v4) with CSS variables for theme customization.
- **State & Data Fetching:** React Query for API caching and data management.
- **Localization:** `next-intl` to support multiple languages (e.g., English and Bangla).
- **Theming:** `next-themes` for Dark/Light mode support.

## 4. Core Objectives
1. **High Performance & SEO:** Public pages must load quickly and be indexable by search engines.
2. **Template Customizability:** Provide diverse, premium-looking templates that admins can choose from.
3. **Seamless API Integration:** Connect to the existing unified APIs provided by the School Management System.
4. **Responsive Design:** Ensure flawless experience across all devices.

## 5. Deployment
The application is designed to be deployed on platforms like Vercel or a VPS using Docker, with support for multi-tenant domain mapping (wildcard subdomains and custom domains).
