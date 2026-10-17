# Sitemap & Standard Layout Strategy

While each theme has its own unique design, the core routing structure of the Next.js application will remain consistent across all themes to ensure uniform SEO and link generation.

## 1. Core Sitemap (Routes)

The `front-side` application will support the following standard routes. Themes will intercept these routes and provide their own presentation.

*   `/` - Home Page (Overview, Notice Marquee, Quick Links, Gallery Highlights)
*   `/about` - About Us, History, Mission, and Vision
*   `/about/leadership` - Chairman and Principal Speeches
*   `/academics/staff` - Directory of current teachers and staff
*   `/academics/schedule` - Class routines and academic calendar
*   `/admissions` - Information on enrollment and registration links
*   `/facilities` - Library, Labs, and Co-curricular activities
*   `/results` - Portals to check exam and board results
*   `/notices` - Full paginated list of all school notices and circulars
*   `/gallery` - Full media gallery albums
*   `/contact` - Contact information and inquiry form

## 2. Shared Layout Components
Even though themes differ, all themes MUST implement standard semantic layout components:

1.  **Header (`<header>`)**: Containing the School Logo, Name, and Main Navigation menu (including Language & Theme togglers).
2.  **Main Content (`<main>`)**: The dynamic content area specific to the route.
3.  **Footer (`<footer>`)**: Important links, social media icons, copyright info, and contact details.

## 3. i18n Routing Structure
Since `next-intl` is used, the URLs will typically be prefixed with the locale (except for the default language if configured so).
*   `/[locale]/` (e.g., `/en/` or `/bn/`)
*   `/[locale]/about`
*   `/[locale]/notices`
