# API Contracts: School Front-Side

Since the front-side application does not maintain its own database, it relies entirely on the existing unified backend API of the School Management System.

## 1. Domain Resolution & Theme Configuration
This is the most critical API call, executed upon every initial request (cached appropriately) to determine which school and theme to load.

**Endpoint:** `GET /api/v1/public/resolve-domain`
**Query Parameter:** `domain` (e.g., `schoolA.example.com`)
**Response:**
```json
{
  "school_id": "uuid-1234",
  "theme_id": "modern-blue",
  "branding": {
    "logo_url": "https://...",
    "primary_color": "#1e3a8a",
    "secondary_color": "#facc15"
  },
  "contact": {
    "email": "contact@schoola.com",
    "phone": "+8801700000000",
    "address": "Dhaka, Bangladesh"
  },
  "seo": {
    "title": "School A - Excellence in Education",
    "description": "Welcome to School A."
  }
}
```

## 2. Content API Endpoints (Examples)

All template themes consume the exact same endpoints based on the resolved `school_id`.

*   **School Profile:**
    `GET /api/v1/public/schools/{school_id}/profile`
*   **Notices:**
    `GET /api/v1/public/schools/{school_id}/notices?limit=10`
*   **Staff/Teachers:**
    `GET /api/v1/public/schools/{school_id}/staff?type=teacher`
*   **Gallery:**
    `GET /api/v1/public/schools/{school_id}/galleries`
*   **Events/Calendar:**
    `GET /api/v1/public/schools/{school_id}/events`

## 3. Data Hydration in Next.js
Data is fetched on the server using Next.js App Router's `fetch` API.
Server Components will pass the fetched data down to the dynamically loaded Theme Components. React Query can be utilized on the client-side for dynamic data updates or pagination (e.g., loading more notices).
