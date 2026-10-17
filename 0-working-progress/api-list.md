# School Website API List (Subject / Module Wise)

---

## 1. Domain Resolution & School Discovery
### Public
- `GET /api/v1/public/front-side/resolve-domain` — Resolve domain/subdomain to school config, theme, and branding

---

## 2. Theme & SEO Configuration
### Admin
- `GET /api/v1/front-side/theme` — Get theme & SEO configuration
- `PUT /api/v1/front-side/theme` — Update theme template, colors, SEO, and social links

---

## 3. School Profile & Leadership
### Public
- `GET /api/v1/public/front-side/schools/:branchId/profile` — Get school profile, history, and leadership messages
### Admin
- `GET /api/v1/front-side/profile` — Get school profile details
- `PUT /api/v1/front-side/profile` — Update school profile, mission, vision, chairman/principal speeches

---

## 4. Governance & Board Members
### Public
- `GET /api/v1/public/front-side/schools/:branchId/governance` — List all governance members
### Admin
- `GET /api/v1/front-side/governance` — List governance members
- `POST /api/v1/front-side/governance` — Create governance member
- `PUT /api/v1/front-side/governance/:id` — Update governance member
- `DELETE /api/v1/front-side/governance/:id` — Delete governance member

---

## 5. Photo Gallery & Albums
### Public
- `GET /api/v1/public/front-side/schools/:branchId/galleries` — List all photo gallery albums
### Admin
- `GET /api/v1/front-side/galleries` — List gallery albums
- `POST /api/v1/front-side/galleries` — Create gallery album
- `PUT /api/v1/front-side/galleries/:id` — Update gallery album
- `DELETE /api/v1/front-side/galleries/:id` — Delete gallery album

---

## 6. Campus Facilities
### Public
- `GET /api/v1/public/front-side/schools/:branchId/facilities` — List all school facilities
### Admin
- `GET /api/v1/front-side/facilities` — List facilities
- `POST /api/v1/front-side/facilities` — Create facility
- `PUT /api/v1/front-side/facilities/:id` — Update facility
- `DELETE /api/v1/front-side/facilities/:id` — Delete facility

---

## 7. Custom Pages (CMS)
### Public
- `GET /api/v1/public/front-side/schools/:branchId/pages` — List all published custom pages
- `GET /api/v1/public/front-side/schools/:branchId/pages/:slug` — Get single custom page by slug
### Admin
- `GET /api/v1/front-side/pages` — List all custom pages (published & drafts)
- `POST /api/v1/front-side/pages` — Create custom page
- `PUT /api/v1/front-side/pages/:id` — Update custom page
- `DELETE /api/v1/front-side/pages/:id` — Delete custom page

---

## 8. Events & Calendar
### Public
- `GET /api/v1/public/front-side/schools/:branchId/events` — List all upcoming school events
### Admin
- `GET /api/v1/front-side/events` — List all events
- `POST /api/v1/front-side/events` — Create event
- `PUT /api/v1/front-side/events/:id` — Update event
- `DELETE /api/v1/front-side/events/:id` — Delete event

---

## 9. Downloads & Forms
### Public
- `GET /api/v1/public/front-side/schools/:branchId/downloads` — List all downloadable files and circulars
### Admin
- `GET /api/v1/front-side/downloads` — List downloads
- `POST /api/v1/front-side/downloads` — Create download
- `PUT /api/v1/front-side/downloads/:id` — Update download
- `DELETE /api/v1/front-side/downloads/:id` — Delete download

---

## 10. Key Statistics & Achievements
### Public
- `GET /api/v1/public/front-side/schools/:branchId/stats` — List highlighted statistics counters
### Admin
- `GET /api/v1/front-side/stats` — List stats
- `POST /api/v1/front-side/stats` — Create stat
- `PUT /api/v1/front-side/stats/:id` — Update stat
- `DELETE /api/v1/front-side/stats/:id` — Delete stat

---

## 11. Testimonials
### Public
- `GET /api/v1/public/front-side/schools/:branchId/testimonials` — List all testimonials
### Admin
- `GET /api/v1/front-side/testimonials` — List testimonials
- `POST /api/v1/front-side/testimonials` — Create testimonial
- `PUT /api/v1/front-side/testimonials/:id` — Update testimonial
- `DELETE /api/v1/front-side/testimonials/:id` — Delete testimonial

---

## 12. Academic Programs
### Public
- `GET /api/v1/public/front-side/schools/:branchId/programs` — List all educational programs
### Admin
- `GET /api/v1/front-side/programs` — List programs
- `POST /api/v1/front-side/programs` — Create program
- `PUT /api/v1/front-side/programs/:id` — Update program
- `DELETE /api/v1/front-side/programs/:id` — Delete program

---

## 13. Media Upload (Cloudinary)
### Admin
- `POST /api/v1/media/upload` — Upload single file (image/doc)
- `POST /api/v1/media/upload-multiple` — Upload multiple files (up to 10)
- `GET /api/v1/media` — List uploaded media library

---

# Admin Panel Pages List (Front Side Management)

| # | Page / Module | Admin URL Route | Key Features & Components |
|---|:---|:---|:---|
| **1** | **Theme & SEO** | `/dashboard/front-side/theme` | Visual theme selector (Classic / Modern), primary & secondary color pickers, preset palettes, SEO title & description, social media links |
| **2** | **School Profile** | `/dashboard/front-side/profile` | Institution history, mission, vision, Chairman & Principal names, speeches, and portrait image uploaders |
| **3** | **Governance** | `/dashboard/front-side/governance` | Table of board members, member photo upload, designation, sort order, and type filter (*Founder, Governing Body, Ex-Governing Body*) |
| **4** | **Campus Facilities** | `/dashboard/front-side/facilities` | Facilities list, facility photo upload, name, description, and icon picker (*Robotics Lab, Library, Science Lab, Playground*) |
| **5** | **Photo Gallery** | `/dashboard/front-side/gallery` | Album management, album title, description, and cover photo uploader |
| **6** | **Custom Pages (CMS)** | `/dashboard/front-side/pages` | Custom webpage builder with URL slug generator, page title, rich content area, and publish/draft switch |
| **7** | **Events & Calendar** | `/dashboard/front-side/events` | Events calendar list, event title, ISO date picker, event location, and detailed description |
| **8** | **Downloads & Forms** | `/dashboard/front-side/downloads` | Download repository with file upload, category picker (*Admissions, Academic, Syllabus*), and file size display |
| **9** | **Key Statistics** | `/dashboard/front-side/stats` | Stat counters list, numerical value, prefix/suffix (e.g. `+`, `%`), and counter label |
| **10** | **Testimonials** | `/dashboard/front-side/testimonials` | Reviews list, student/parent/alumni author name, role, and quote text |
| **11** | **Academic Programs** | `/dashboard/front-side/programs` | Curriculum levels (*Early Years, Primary, Middle, High School*), program image upload, description, and page link |
| **12** | **Media Library** | `/dashboard/media` | Centralized Cloudinary asset manager used by all front-side uploaders for images and PDF documents |

