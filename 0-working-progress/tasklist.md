# 📋 School Front-Side Dynamic Data Analysis & Implementation Tasklist

> **Analysis Scope:** Complete comprehensive audit of all pages, layouts, and components across **both themes** (`Modern Theme` and `Default Theme`), identifying all hardcoded, simulated, or missing dynamic data, specifying required APIs, and tracking implementation.
> **Modern Theme Status:** ✅ Completed & Verified
> **Default Theme Status:** ⏳ Detailed Tasklist Created & Ready for Implementation

---

# Part 1: Modern Theme Implementation (Completed)

## Executive Summary of Completed Implementations

| Page / Component | Previous State | Dynamic Implementation Status | Resolution Details |
| :--- | :--- | :--- | :--- |
| **Class Schedule** (`/academics/schedule`) | 100% hardcoded 5-day periods table; NO class/section filters | ✅ **Dynamic via API** | Connected to `useGetClasses` & `useGetClassRoutines`; interactive class picker, routine slots, timing, teacher, room numbers, and print button. |
| **Results Portal** (`/results`) | 100% hardcoded 2 mock items; client-side filter; no subject marks | ✅ **Dynamic via API** | Connected to `useGetExams` and `useGetStudentResults`; full marksheet breakdown (written, MCQ, practical, GPA, grade, pass/fail status). |
| **Certificate Verification** (`/certificate`) | 100% simulated verification (`starts with 123`); placeholder text | ✅ **Dynamic via API** | Connected to `useVerifyCertificate`; validates against central registry, displays verified student record, session, enrollment status, and security hash. |
| **Online Admissions** (`/admissions`) | Fake `setTimeout` submission; text input for Class; no backend save | ✅ **Dynamic via API** | Connected to `useGetClasses` dropdown & `useSubmitAdmission` mutation; generates and displays official tracking reference number (`ADM-...`). |
| **Contact Us** (`/contact`) | Fake `setTimeout` submission; hardcoded Dhaka lat/long | ✅ **Dynamic via API** | Connected to `useSubmitContact` mutation; displays ticket reference, dynamic school phone/email, office hours, and dynamic map coordinates. |
| **Staff Directory** (`/staff`) | Flat list without department filtering or teacher search | ✅ **Dynamic via API** | Dynamic department filter pills generated from data, plus real-time faculty search by name and designation. |
| **Notices** (`/notices`) | Flat list of 30 notices without category tabs or detail view | ✅ **Dynamic via API** | Dynamic category filter tabs, keyword search, and interactive notice detail modal with attachment downloads. |
| **Events & Calendar** (`/events`) | Flat list without upcoming/past filtering | ✅ **Dynamic via API** | Dynamic filter tabs for "Upcoming" vs "Past" events based on current date. |
| **Media Gallery** (`/gallery`) | Lightbox modal only showed cover photo | ✅ **Dynamic via API** | Interactive album cards with badge count and full Lightbox modal viewing. |
| **Downloads** (`/downloads`) | Flat list without category tabs or document search | ✅ **Dynamic via API** | Dynamic category tabs ("Academic", "Syllabus", "Admissions", "Forms") and search filter. |
| **Campus Facilities** (`/facilities`) | Hardcoded `localhost` domain bug; hardcoded 4 fallback items | ✅ **Dynamic via API & Bug Fixed** | Fixed server `headers()` domain resolution bug; dynamic support for real facility `photoUrl` and details. |
| **Custom Pages** (`/pages/[slug]`) | Hardcoded `localhost` domain resolution bug | ✅ **Dynamic via API & Bug Fixed** | Fixed server `headers()` domain resolution bug; renders custom page content from backend `CustomPage` model. |
| **Global Layout & Navbar** | In-memory search (20 items max); footer lacked social bindings | ✅ **Dynamic via API** | Connected search modal to `useGlobalSearch` querying backend across notices, staff, pages, events, and downloads. |
| **Secondary Pages Architecture** | 1,527-line monolithic file (`ModernSecondaryPages.tsx`) | ✅ **Modularized** | Deconstructed into clean dedicated page components under `src/components/themes/modern/` matching default theme structure. |
| **Policies & Conduct (Rules, Attendance, Student Life)** | Hardcoded text points | ℹ️ **Refined & Localized** | Intentionally maintained as clean localized institutional policies with dynamic syllabus and leave document downloads. |

---

## Phase 1: Backend Public API Endpoints Implemented

- [x] **1.1. Online Admissions API**
  - [x] Added `GET /api/v1/public/front-side/schools/:branchId/classes` (Fetch active classes and sections available for admission).
  - [x] Added `POST /api/v1/public/front-side/schools/:branchId/admissions/apply` (Submit student admission form: student name, DOB, gender, guardian details, previous school, selected class).
  - [x] Generate and return unique application tracking reference number (e.g., `ADM-XXXXXX`).

- [x] **1.2. Public Examination Results Lookup API**
  - [x] Added `GET /api/v1/public/front-side/schools/:branchId/exams` (List published terms/exams: Mid Term, Final, etc.).
  - [x] Added `GET /api/v1/public/front-side/schools/:branchId/results` (Query parameters: `studentId`, `examId`).
  - [x] Return structured marksheet: Student Name, Roll, Class, Section, Subject-wise Marks (`written`, `mcq`, `practical`, `total`), Subject Grades, Overall GPA, and Result Status.

- [x] **1.3. Public Certificate Verification API**
  - [x] Added `GET /api/v1/public/front-side/schools/:branchId/certificates/verify` (Query parameter: `refId`).
  - [x] Verify reference against student registry.
  - [x] Return verification payload: Student Name, ID Card No, Roll Number, Class, Academic Year, Status, Issue Date, and Verification Security Hash.

- [x] **1.4. Public Class Routines API**
  - [x] Added `GET /api/v1/public/front-side/schools/:branchId/routines` (Query parameters: `classId`, `sectionId`).
  - [x] Consume existing `ClassRoutine` and `ClassRoutineSlot` tables.
  - [x] Return slots with day, start time, end time, subject name, teacher name, room number, and break indicators.

- [x] **1.5. Public Contact Message & Inquiry API**
  - [x] Added `POST /api/v1/public/front-side/schools/:branchId/contact` (Fields: `name`, `email`, `subject`, `message`).
  - [x] Returns confirmed ticket reference (`MSG-XXXXXX`).

- [x] **1.6. Unified Global Search API**
  - [x] Added `GET /api/v1/public/front-side/schools/:branchId/search?q=:query` (Search across notices, events, downloads, staff, and custom pages from the database).

---

## Phase 2: Frontend Services & React Query Hooks

- [x] **2.1. Updated `SchoolService.ts`**
  - [x] Added `SchoolService.getStudentResults(schoolId, studentId, examId)` calling real results API.
  - [x] Added `SchoolService.verifyCertificate(schoolId, refId)` calling real certificate verification API.
  - [x] Added `SchoolService.getClasses(schoolId)` calling classes API.
  - [x] Added `SchoolService.getRoutines(schoolId, classId, sectionId)` calling routine slots API.
  - [x] Added `SchoolService.getExams(schoolId)` calling published exams API.
  - [x] Added `SchoolService.submitAdmission(schoolId, data)` calling admissions API.
  - [x] Added `SchoolService.submitContact(schoolId, data)` calling contact API.
  - [x] Added `SchoolService.globalSearch(schoolId, query)` calling unified search API.

- [x] **2.2. Created React Query Hooks (`src/hooks/api/school/`)**
  - [x] Added `useGetClasses(schoolId)` query hook.
  - [x] Added `useGetClassRoutines(schoolId, classId, sectionId)` query hook.
  - [x] Added `useGetExams(schoolId)` query hook.
  - [x] Added `useGetStudentResults(schoolId, studentId, examId)` query hook.
  - [x] Added `useVerifyCertificate(schoolId, refId)` query hook.
  - [x] Added `useSubmitAdmission(schoolId)` mutation hook.
  - [x] Added `useSubmitContact(schoolId)` mutation hook.
  - [x] Added `useGlobalSearch(schoolId, query)` query hook.
  - [x] Updated `school.keys.ts` with dedicated query key scopes.

- [x] **2.3. Extended TypeScript Types & Zod Schemas (`src/types/school.types.ts`)**
  - [x] Added `SchoolClass`, `ClassSection`, `RoutineSlot`, `ClassRoutine`.
  - [x] Added `SchoolExam`, `MarkDetail`, `StudentResultResponse`.
  - [x] Added `CertificateVerificationResponse`.
  - [x] Added `AdmissionSubmissionData`, `AdmissionSubmissionResponse`.
  - [x] Added `ContactSubmissionData`, `ContactSubmissionResponse`.
  - [x] Added `SearchItem`, `GlobalSearchResults`.

---

## Phase 3: Page-by-Page Modern Theme Refactoring

- [x] **3.1. Class Schedule Page (`ModernSchedule.tsx`)**
  - [x] Interactive Class selector pills populated dynamically from `useGetClasses`.
  - [x] Routine slots table grouped by day of week with period times, room numbers, teachers, and subjects.
  - [x] Printable routine button.

- [x] **3.2. Examination Results Portal (`ModernResults.tsx`)**
  - [x] Dynamic Exam selection dropdown populated from `useGetExams`.
  - [x] Search by Student ID Card No or Roll Number.
  - [x] Marksheet summary: Student Name, Roll, Class, Section, GPA score, and status pill.
  - [x] Detailed subject marks breakdown table: Written, MCQ, Practical, Total, Grade, Point.
  - [x] Marksheet printing layout.
  - [x] Board examination institutional statistics tab.

- [x] **3.3. Certificate Verification Portal (`ModernCertificate.tsx`)**
  - [x] Real verification query checking backend student registry.
  - [x] Authentic verification certificate card with student name, ID card no, session, and verification security code.
  - [x] Printable verification certificate layout.
  - [x] Graceful alert for unregistered reference numbers.

- [x] **3.4. Online Admissions Application (`ModernAdmissions.tsx`)**
  - [x] Class selection `<select>` populated dynamically via `useGetClasses`.
  - [x] Complete student and guardian registration form with Zod validation.
  - [x] Submits through `useSubmitAdmission` mutation.
  - [x] Application confirmation screen displaying unique application reference number (`ADM-...`).
  - [x] Printable application confirmation receipt.

- [x] **3.5. Contact Us Page (`ModernContact.tsx`)**
  - [x] Submits inquiries through `useSubmitContact` mutation.
  - [x] Confirmation ticket code generation.
  - [x] Dynamic school contact details and office operating hours.
  - [x] Interactive map embed with coordinates.

- [x] **3.6. Campus Facilities Page (`ModernFacilities.tsx`)**
  - [x] Fixed hardcoded `resolveDomain('localhost')` bug in `src/app/[locale]/facilities/page.tsx` using `headers()`.
  - [x] Render real facility photos (`photoUrl`) and descriptions.

- [x] **3.7. Custom Pages (`pages/[slug]/page.tsx`)**
  - [x] Fixed hardcoded `resolveDomain('localhost')` bug in `generateMetadata` and `CustomPage` using `headers()`.

- [x] **3.8. Staff Directory Page (`ModernStaff.tsx`)**
  - [x] Dynamically extracted department filter pills from staff data.
  - [x] Instant faculty search input by teacher name and designation.

- [x] **3.9. Notice Board Page (`ModernNotices.tsx`)**
  - [x] Category filter tabs (Academic, Examinations, Admissions, General).
  - [x] Circular search input.
  - [x] Full notice detail modal with attachments.

- [x] **3.10. Events & Calendar Page (`ModernEvents.tsx`)**
  - [x] Dynamic filter tabs for "Upcoming" vs "Past" events.

- [x] **3.11. Downloads Page (`ModernDownloads.tsx`)**
  - [x] Dynamic category tabs and search input.

- [x] **3.12. Media Gallery Page (`ModernGallery.tsx`)**
  - [x] Album grid and full Lightbox modal.

- [x] **3.13. Global Search & Navigation (`Navbar.tsx`)**
  - [x] Search modal connected to `useGlobalSearch` backend API.

---

## Phase 4: Architectural Refactoring & Modularization

- [x] **4.1. Modularized `ModernSecondaryPages.tsx` into Dedicated Component Modules:**
  - [x] `src/components/themes/modern/common/ModernCommon.tsx` (`PageIntro`, `Glass`, `Empty`)
  - [x] `src/components/themes/modern/about/ModernAbout.tsx`
  - [x] `src/components/themes/modern/about/ModernLeadership.tsx`
  - [x] `src/components/themes/modern/about/ModernGovernance.tsx`
  - [x] `src/components/themes/modern/about/ModernOfficialInfo.tsx`
  - [x] `src/components/themes/modern/academics/ModernAcademics.tsx`
  - [x] `src/components/themes/modern/academics/ModernSchedule.tsx`
  - [x] `src/components/themes/modern/academics/ModernRules.tsx`
  - [x] `src/components/themes/modern/academics/ModernAttendance.tsx`
  - [x] `src/components/themes/modern/admissions/ModernAdmissions.tsx`
  - [x] `src/components/themes/modern/admissions/ModernAdmissionInfo.tsx`
  - [x] `src/components/themes/modern/results/ModernResults.tsx`
  - [x] `src/components/themes/modern/certificate/ModernCertificate.tsx`
  - [x] `src/components/themes/modern/staff/ModernStaff.tsx`
  - [x] `src/components/themes/modern/notices/ModernNotices.tsx`
  - [x] `src/components/themes/modern/events/ModernEvents.tsx`
  - [x] `src/components/themes/modern/gallery/ModernGallery.tsx`
  - [x] `src/components/themes/modern/downloads/ModernDownloads.tsx`
  - [x] `src/components/themes/modern/facilities/ModernFacilities.tsx`
  - [x] `src/components/themes/modern/contact/ModernContact.tsx`
  - [x] `src/components/themes/modern/student-life/ModernStudentLife.tsx`
  - [x] Maintained `ModernSecondaryPages.tsx` as a clean re-export hub for backward compatibility.

---

# Part 2: Default Theme Dynamic Integration & Bug Fixes (Tasklist)

## Executive Summary of Default Theme Audit

| Page / Component | Current State | Target Dynamic Implementation | Scope & Action Items |
| :--- | :--- | :--- | :--- |
| **Class Schedule** (`ClassSchedule.tsx`) | Hardcoded classes array (`Class 6..10`); mock `useGetClassSchedule` hook; clicking classes does not fetch routine; no printable routine. | ⏳ **Dynamic via API** | Connect to `useGetClasses` & `useGetClassRoutines(school_id, classId, sectionId)`; interactive class selector, period slots, room, teacher, and print button. |
| **Results Portal** (`ResultsPortal.tsx`) | Hardcoded classes/board select options; simulated `setTimeout` search on 2 mock items; no subject marks breakdown. | ⏳ **Dynamic via API** | Connect to `useGetExams` and `useGetStudentResults`; dynamic exam dropdown, student lookup, detailed marksheet table (written, MCQ, practical, grades, GPA), printable view. |
| **Certificate Verification** (`CertificateVerification.tsx`) | Fake check `if (refId.startsWith("123"))`; hardcoded dummy student "John Doe"; double layout wrapper bug in `certificate/page.tsx`. | ⏳ **Dynamic via API & Bug Fix** | Connect to `useVerifyCertificate(school_id, refId)`; display authentic verification card with registry details, security code, and fix double layout wrapper bug in `certificate/page.tsx`. |
| **Online Admissions** (`AdmissionsForm.tsx`) | Static text input `<Input placeholder="e.g. Class 6" />`; fake `setTimeout` submission; no tracking reference code. | ⏳ **Dynamic via API** | Connect to `useGetClasses` for dynamic Class & Section dropdown; submit via `useSubmitAdmission`; show success card with official tracking reference (`ADM-XXXXXX`) and printable receipt. |
| **Contact Us** (`ContactUs.tsx`) | Fake `setTimeout` submission; hardcoded office hours; no ticket reference generated. | ⏳ **Dynamic via API** | Submit via `useSubmitContact`; show ticket reference (`MSG-XXXXXX`); bind dynamic school phone, email, and address from `useGetSchoolProfile`. |
| **Global Search** (`Header.tsx`) | Search modal displays 3 static mock links without querying any search API. | ⏳ **Dynamic via API** | Connect to `useGlobalSearch(school_id, debouncedQuery)`; display real categorized live results across notices, staff, events, downloads, and pages with direct navigation. |
| **Footer** (`Footer.tsx`) | Hardcoded school name "School Portal", hardcoded phone, email, and Dhaka address. | ⏳ **Dynamic Binding** | Bind dynamically to `school.school_name`, `school.phone`, `school.email`, `school.address` from `useSchool()`. |
| **Notices & Marquee** (`NoticeList.tsx` & `NoticeMarquee.tsx`) | Links to `/notices/${notice.id}` which does NOT exist (leads to 404 error page). | ⏳ **Bug Fix & Dynamic UI** | Add interactive Notice Detail modal in `NoticeList.tsx` with full content and attachments; update marquee to open notice or navigate to `/notices`. |
| **Broken Event Links** (`NewsAndEvents.tsx` & `QuickLinks.tsx`) | Links to `/calendar` which does NOT exist (causes 404). | ⏳ **Bug Fix** | Correct `/calendar` links to point to `/events`. |
| **Hero Banner** (`HeroBanner.tsx`) | "Apply Now" and "Learn More" buttons have no links or click handlers. | ⏳ **Bug Fix** | Wrap buttons in `<Link href="/admissions">` and `<Link href="/about">`. |
| **Academics Overview** (`academics/page.tsx`) | Default theme renders a plain placeholder `<div>` with centered text. | ⏳ **Component Implementation** | Build clean `DefaultAcademics` overview component showcasing academic programs, schedule links, curriculum, and rules. |
| **Official Documents** (`OfficialInformation.tsx`) | Download button in document list has no link (`<Download />` does nothing). | ⏳ **Bug Fix** | Bind download button to document URL (`doc.fileUrl || doc.file_url`). |
| **Academic Rules & Syllabus** (`RulesSyllabus.tsx`) | Hardcoded 5 dummy syllabus rows with `url: "#"`. | ⏳ **Dynamic Binding** | Connect to `useGetDownloads(school_id)` filtering for Syllabus category to enable real syllabus downloads. |
| **Student Info Hub** (`InfoHub.tsx`) | Mock student table and mock upcoming exam list. | ⏳ **Dynamic Binding** | Connect upcoming exams tab to `useGetExams(school_id)`; clean student tab. |
| **Staff Directory** (`StaffDirectory.tsx`) | Filter pills hardcoded to role strings; profile modal has dummy email, phone, credentials. | ⏳ **Enhancement** | Dynamically generate department pills; display actual contact info and department in modal. |
| **Facilities Showcase** (`FacilitiesShowcase.tsx`) | Empty grid if facilities API is empty; no fallback or empty state. | ⏳ **Enhancement** | Add graceful empty state card or fallback campus highlights. |
| **Events Calendar** (`EventsCalendar.tsx`) | Hardcoded time `"10:00 AM"`; arrow button does nothing. | ⏳ **Enhancement** | Dynamic time formatting from `event.date`; expandable event details modal. |
| **Next.js 15 Async Params** | `events`, `academics/schedule`, `contact`, `student-life/info-hub` sync params. | ⏳ **Framework Compliance** | Standardize `const { locale } = await params;` across all page routes. |
| **Static / Institutional Content** (`AdmissionInfo.tsx`, `RulesSyllabus.tsx` rules, `AboutSchool.tsx` values) | Code of conduct, attendance guidelines, uniform policies, why study here. | ℹ️ **Intentionally Static** | Kept as clean, localized static content without unnecessary database tables. |

---

## Phase 5: Core Dynamic Flows in Default Theme

- [x] **5.1. Class Schedule & Routine (`ClassSchedule.tsx`)**
  - [x] Replace hardcoded `classes` array with dynamic classes from `useGetClasses(school_id)`.
  - [x] Track `selectedClassId` and optional `selectedSectionId`.
  - [x] Replace mock `useGetClassSchedule` with `useGetClassRoutines(school_id, selectedClassId, selectedSectionId)`.
  - [x] Render weekly routine grid with real periods, subjects, teachers, and room numbers.
  - [x] Implement printable routine / "Download PDF" print action via `window.print()`.
  - [x] Add loading skeleton and empty routine state.

- [x] **5.2. Examination Results Portal (`ResultsPortal.tsx`)**
  - [x] Replace hardcoded exam dropdown with published exams from `useGetExams(school_id)`.
  - [x] Replace simulated `setTimeout` filtering with real `useGetStudentResults(school_id, studentId, examId)`.
  - [x] Render full marksheet breakdown: Student Name, Roll, Class, Section, GPA, Result Status.
  - [x] Subject-wise marks table: Written, MCQ, Practical, Total Marks, Grade, Point.
  - [x] Add printable marksheet styling.
  - [x] Display graceful error message when student ID or exam record is not found.

- [x] **5.3. Certificate Verification Portal (`CertificateVerification.tsx`)**
  - [x] Replace simulated `refId.startsWith("123")` with real `useVerifyCertificate(school_id, refId)`.
  - [x] Render verified student credential card: Full Name, ID Card No, Roll, Class, Session, Status, Issue Date, Security Hash.
  - [x] Printable verification certificate layout.
  - [x] Fix double layout wrapping bug in `src/app/[locale]/certificate/page.tsx` (remove redundant `<DefaultThemeLayout>`).

- [x] **5.4. Online Admissions Form (`AdmissionsForm.tsx`)**
  - [x] Replace static text input for Class with dynamic `<select>` dropdown populated via `useGetClasses(school_id)`.
  - [x] Replace fake `setTimeout` submission with `useSubmitAdmission(school_id)` mutation.
  - [x] Display official application confirmation card with generated tracking number (`ADM-XXXXXX`).
  - [x] Provide printable application confirmation slip.

- [x] **5.5. Contact Us Inquiries (`ContactUs.tsx`)**
  - [x] Replace fake `setTimeout` with `useSubmitContact(school_id)` mutation.
  - [x] Display confirmation message with generated inquiry ticket ID (`MSG-XXXXXX`).
  - [x] Bind dynamic school address, phone, email, and operating hours from `useGetSchoolProfile(school_id)`.

---

## Phase 6: Global Layout & Cross-Cutting Bug Fixes

- [x] **6.1. Header Global Search Modal (`Header.tsx`)**
  - [x] Replace static mock links with live debounced search query.
  - [x] Connect to `useGlobalSearch(school.school_id, debouncedQuery)`.
  - [x] Render categorized results: Notices, Staff, Events, Downloads, Custom Pages with direct clickable navigation.
  - [x] Add keyboard shortcut (`Ctrl+K` / `Cmd+K`) and escape to close.

- [x] **6.2. Footer Dynamic School Info (`Footer.tsx`)**
  - [x] Bind school name dynamically to `school.school_name`.
  - [x] Bind contact phone, email, and location dynamically from `useSchool()`.
  - [x] Bind dynamic social media links if configured.

- [x] **6.3. Fix Broken 404 Route Links in Default Theme**
  - [x] In `NoticeList.tsx`: Replace broken `/notices/${notice.id}` link with an interactive Notice Detail modal displaying full notice content and PDF attachment download.
  - [x] In `NoticeMarquee.tsx`: Remove broken `/notices/${notice.id}` link; navigate to `/notices` or open modal.
  - [x] In `NewsAndEvents.tsx`: Change `/calendar` link to `/events`.
  - [x] In `QuickLinks.tsx`: Change `/calendar` link to `/events`.
  - [x] In `HeroBanner.tsx`: Full dynamic hero carousel with background image and video (`.mp4`) support, heading text, eyebrow badge, subtitle, description, and dynamic CTA buttons (`/admissions` and `/about`).
  - [x] **Logo Display Fix across Default Theme & Backend**:
    - Connected `Settings.logo-url` fallback in `backend/src/modules/front-side/front-side.service.ts` (`resolveDomain` and `getProfile`).
    - Synced `branch.logoUrl` in database to match the active school Cloudinary logo.
    - Updated `Header.tsx`, `Footer.tsx`, and `Navbar.tsx` to reliably resolve `school.branding?.logo_url || profile?.logoUrl`.
    - Wrapped brand logo and name in clickable links navigating to `/`.

- [x] **6.4. Academics Landing Page (`src/app/[locale]/academics/page.tsx`)**
  - [x] Replace plain text placeholder `<div>` with a dedicated `DefaultAcademics` component.
  - [x] Showcase Academic Programs, Quick Links to Class Schedule, Academic Rules & Syllabus, and Attendance portal.

---

## Phase 7: Secondary Pages Enhancements & Data Bindings

- [x] **7.1. Staff Directory (`StaffDirectory.tsx`)**
  - [x] Dynamically derive department filter tabs from loaded staff data.
  - [x] Display actual staff contact email, phone, and department in the profile modal.

- [x] **7.2. Events Calendar (`EventsCalendar.tsx`)**
  - [x] Replace hardcoded "10:00 AM" clock with dynamic event time formatting.
  - [x] Add interactive event modal or expandable details view for event descriptions and venue information.

- [x] **7.3. Campus Facilities Showcase (`FacilitiesShowcase.tsx`)**
  - [x] Add graceful empty state card or fallback highlights when facilities are not yet configured.

- [x] **7.4. Official Documents (`OfficialInformation.tsx`)**
  - [x] Bind document download button to the document download URL (`file.fileUrl || file.file_url`).

- [x] **7.5. Academic Rules & Syllabus (`RulesSyllabus.tsx`)**
  - [x] Connect Syllabus tab to `useGetDownloads(school_id)` filtering for `"Syllabus"` or `"Academic"` category documents.

- [x] **7.6. Student Information Hub (`InfoHub.tsx`)**
  - [x] Connect examination schedule tab to `useGetExams(school_id)`.
  - [x] Refactor student directory tab to clean search lookup.

- [x] **7.7. Next.js 15 Async Route Params Compliance**
  - [x] Ensure all page routes (`events/page.tsx`, `student-life/info-hub/page.tsx`, `academics/schedule/page.tsx`, `contact/page.tsx`) correctly await `params`.

---

## Static Institutional Content (Intentionally Kept Non-Dynamic)

The following content sections are intentionally preserved as clean, localized institutional information without creating redundant database models:
- **Code of Conduct & Disciplinary Policies** in `RulesSyllabus.tsx` and `InfoHub.tsx`.
- **Attendance Rules & Guidelines** (80% minimum attendance policy, formal leave procedures).
- **Uniform Guidelines** in `InfoHub.tsx`.
- **Institutional Philosophy, History, Mission, Vision, and Core Values** in `AboutSchool.tsx`.
- **Informational Admission Steps** in `AdmissionInfo.tsx`.

---

# Part 3: Admin Dashboard (`frontend`) & Backend Requirements for Public Website Management

## Executive Gap Analysis (Public Site vs. Admin Panel)

| Feature / Dynamic Data Entity | Public Website (`front-side`) Usage | Backend API Status | Admin Panel (`frontend`) Status | Needed Action / Gap |
| :--- | :--- | :--- | :--- | :--- |
| **Online Admissions Applications** | Parents submit application (`/admissions`) with student info, class, guardian, tracking ref `ADM-XXXXXX`. | `POST /public/front-side/schools/:branchId/admissions/apply` returns in-memory mock JSON; **NOT saved to DB**. | ❌ **No UI page** to view, search, review, or approve online admission applications. | 🚨 **Critical**: Add `OnlineAdmission` Prisma model; persist submissions; build Admin Admissions Inbox page (`dashboard/front-side/admissions`). |
| **Contact Inquiries & Messages** | Visitors submit inquiries (`/contact`) with name, email, subject, message, tracking ref `MSG-XXXXXX`. | `POST /public/front-side/schools/:branchId/contact` returns in-memory mock JSON; **NOT saved to DB**. | ❌ **No UI page** to view, search, mark read, or respond to public messages. | 🚨 **Critical**: Add `ContactMessage` Prisma model; persist inquiries; build Admin Inquiries Inbox page (`dashboard/front-side/messages`). |
| **Notices & Circulars** | Displayed in `/notices`, marquee ticker, news & events, live global search (`Ctrl+K`). | Full Noticeboard API (`/api/v1/notices`) exists with CRUD, categories, file attachments, and permissions. | ❌ **No Noticeboard UI page** in admin dashboard or `nav.ts` sidebar. | 🚨 **Critical**: Build Admin Noticeboard management page (`dashboard/front-side/notices`) with create, edit, category, isPinned, and PDF uploader. |
| **Download / Syllabus Categorization** | Filtered by category (`"Syllabus"`, `"Approval"`, `"Affiliation"`, `"Report"`, `"Academic"`). | `SchoolDownload` model and API exist. | ⚠️ Category input is free text `<Input />`; prone to typos that break front-side tab filters. | 🟡 **Enhancement**: Replace free text with standardized category `<Select>` dropdown in download dialog. |
| **Media Gallery Multi-Photo Albums** | Displays album covers + full Lightbox modal containing photo items (`items: [{ url, type }]`). | `GalleryAlbum` only stores a single `coverPhotoUrl`; no multi-photo items relation. | ⚠️ Admin can only upload a single cover photo per album. | 🟡 **Enhancement**: Add multi-photo items support to `GalleryAlbum` so albums contain full image collections for the lightbox. |
| **Theme & Branding Switcher** | Public site adapts to `theme_id` ("default" vs "modern"), colors, social links, SEO. | `ThemeConfig` model and API exist. | ✅ Implemented in `dashboard/front-side/theme` with presets and live preview. | 🟢 **Complete**: Already working properly. |
| **School Profile & Leadership** | Displays history, mission, vision, chairman/principal speeches & photos. | `SchoolProfile` model and API exist. | ✅ Implemented in `dashboard/front-side/profile`. | 🟢 **Complete**: Already working properly. |
| **Campus Facilities** | Displays campus facilities, descriptions, photos, and icons. | `Facility` model and API exist. | ✅ Implemented in `dashboard/front-side/facilities`. | 🟢 **Complete**: Already working properly. |
| **Academic Programs** | Displays academic pathways and divisions. | `SchoolProgram` model and API exist. | ✅ Implemented in `dashboard/front-side/programs`. | 🟢 **Complete**: Already working properly. |
| **School Events Calendar** | Displays events, dates, times, descriptions, venues. | `SchoolEvent` model and API exist. | ✅ Implemented in `dashboard/front-side/events`. | 🟢 **Complete**: Already working properly. |
| **Governing Body Members** | Displays founders, governing body, ex-members. | `GovernanceMember` model and API exist. | ✅ Implemented in `dashboard/front-side/governance`. | 🟢 **Complete**: Already working properly. |
| **Custom Dynamic Pages** | Displays `/pages/[slug]` for arbitrary institution pages. | `CustomPage` model and API exist. | ✅ Implemented in `dashboard/front-side/pages`. | 🟢 **Complete**: Already working properly. |

---

## Phase 9: Backend Data Persistence & Admin Endpoints

- [-] **9.1. Online Admissions Persistence (`backend/`)** *(Deferred for now per user request)*
  - [-] Add `OnlineAdmission` model to `backend/prisma/schema/frontside.prisma`.
  - [-] Implement admin admission inbox and review workflows.

- [x] **9.2. Public Contact Inquiries Persistence (`backend/`)**
  - [x] Add `ContactMessage` model to `backend/prisma/schema/frontside.prisma`:
    - Fields: `id`, `branchId`, `ticketId` (unique, e.g. `MSG-XXXXXX`), `name`, `email`, `phone`, `subject`, `message`, `status` (`UNREAD`, `READ`, `RESOLVED`), `adminReply`, `createdAt`, `updatedAt`.
  - [x] Update `submitContact` in `front-side.service.ts` to insert into `prisma.contactMessage`.
  - [x] Add admin endpoints in `front-side.routes.ts`:
    - `GET /api/v1/front-side/messages` (List messages with pagination, search by ticketId/name/subject, filter by status).
    - `GET /api/v1/front-side/messages/:id` (Get inquiry details).
    - `PATCH /api/v1/front-side/messages/:id` (Update status to READ / RESOLVED, add admin notes).
    - `DELETE /api/v1/front-side/messages/:id` (Delete inquiry).

- [x] **9.3. Gallery Album Multi-Photo Item Support (`backend/`)**
  - [x] Add `photos: String[]` to `GalleryAlbum` model in `frontside.prisma`.
  - [x] Update gallery endpoints in `front-side.service.ts` to support adding, listing, and removing photos within an album.

---

## Phase 10: Admin Dashboard (`frontend`) New Pages & Components

- [-] **10.1. Online Admissions Applications Management Page (`frontend/`)** *(Deferred for now per user request)*

- [x] **10.2. Contact Inquiries & Messages Inbox Page (`frontend/`)**
  - [x] Create route: `frontend/src/app/(dashboard)/dashboard/front-side/messages/page.tsx`.
  - [x] Build `MessagesTable` with filter tabs (All, Unread, In Review, Resolved) and search.
  - [x] Build Message Details Modal showing full inquiry message, sender contact info, direct `mailto:` and `tel:` links, and status change/reply workflow.
  - [x] Add React Query hooks in `use-front-side.ts` (`useGetContactMessages`, `useGetContactMessageById`, `useUpdateContactMessage`, `useDeleteContactMessage`).
  - [x] Add navigation entry in `frontend/src/config/nav.ts` under `frontSideManagement`.

- [x] **10.3. Noticeboard Management Page in Admin Panel (`frontend/`)**
  - [x] Create route: `frontend/src/app/(dashboard)/dashboard/front-side/notices/page.tsx`.
  - [x] Build `NoticesTable` with columns: Title & Description snippet, Target Audience pills, Status badge (Published/Draft), Attachment link, Date, and Actions.
  - [x] Build `CreateNoticeDialog` and `EditNoticeDialog` with status selector, audience pill selector, attachment uploader, and optional SMS/email triggers.
  - [x] Connect to backend `/api/v1/noticeboard` endpoints with fallback branch resolution via React Query hooks.
  - [x] Add navigation entry in `frontend/src/config/nav.ts` under `frontSideManagement`.

- [x] **10.4. Downloads & Syllabus Category Standardizer (`frontend/`)**
  - [x] In `frontend/src/components/front-side/downloads/create-download-dialog.tsx` and `edit-download-dialog.tsx`:
    - Standardized category selection with curated presets:
      - `Syllabus` (feeds into website Syllabus tab)
      - `Academic Calendar`
      - `Approval Letter` (feeds into Official Information permissions)
      - `Affiliation Letter` (feeds into Official Information affiliations)
      - `Annual Report` (feeds into Official Information reports)
      - `General Download`
      - `Routine`
      - `Prospectus`
      - `Other` (custom category fallback)

- [x] **10.5. Gallery Multi-Photo Uploader (`frontend/`)**
  - [x] In `frontend/src/components/front-side/gallery/create-gallery-dialog.tsx` and `edit-gallery-dialog.tsx`:
    - Integrated `MediaPicker` with `multiple={true}` to select and batch-append photos to albums.
    - Added thumbnail preview grid with per-photo delete buttons and total photo count badge.
    - Updated `gallery-table.tsx` to display real-time photo count per album.



## new tasks:

- [x] **11.1. Notice Notification System Audit (`backend/` & `frontend/`)**
  - [x] Audited notice publication flow and confirmed target audience support (`STUDENT`, `PARENT`, `TEACHER`, `STAFF`).
  - [x] Verified current status of in-app noticeboard notifications vs SMS/Email notification queue mechanisms.

- [x] **11.2. Front-Side Real Data Seeding (`backend/`)**
  - [x] Created and executed `seed-frontside-real-data.ts` to replace placeholder/dummy texts with authentic institutional content for Patwary Quality Educare Institute.
  - [x] Populated School Profile, Governance & Leadership, Notices, Events, Faculty & Staff, Facilities, Photo Galleries, Downloads (Syllabuses & Calendars), and Academic Rules.

- [x] **11.3. Dynamic Theme Contrast & Button Color Collision Fixes (`front-side/`)**
  - [x] Implemented WCAG luminance calculation in `src/lib/color.ts` to dynamically inject high-contrast `--primary-foreground` and `--secondary-foreground` CSS variables in `layout.tsx`.
  - [x] Resolved button background and text color collisions across Default and Modern theme components (`AdmissionsBanner.tsx`, `NewsAndEvents.tsx`, `StaffDirectory.tsx`, `DefaultAcademics.tsx`, and `globals.css`).

- [x] **11.4. Modern Theme Navbar Overhaul & Polish (`front-side/`)**
  - [x] Added desktop "More" dropdown menu (`DropdownMenu`) with icons for Notices, Facilities, Staff, Gallery, Downloads, Results, Certificates, and Custom Pages.
  - [x] Added multilingual Language Switcher (`EN`, `বাংলা`, `العربية`) on both desktop header and mobile drawer with active locale indicator.
  - [x] Corrected responsive breakpoints (`hidden lg:flex` for desktop nav, `lg:hidden` for mobile hamburger trigger, `sm:inline-flex` for Apply Now).
  - [x] Fixed school branding hierarchy (promoted school name to bold primary headline, "Campus Portal" to subtitle).
  - [x] Replaced rigid negative-offset underline with modern pill active indicators.
  - [x] Upgraded mobile sheet drawer with accessible `SheetTitle`, scrollable wrapper (`overflow-y-auto`), grouped sections, and quick controls.
  - [x] Enhanced global search modal with 250ms debouncing, backdrop click dismissal, `Ctrl+K`/`Escape` hotkeys, and full category coverage (notices, staff, events, downloads, pages).
  - [x] Added `certificate` translation keys across `en.json`, `bn.json`, and `ar.json`.
  - [x] Updated `ModernFooter` with dynamic school logo support and expanded navigation links.

- [x] **11.5. School Logo Resolution & Database Synchronization (`backend/` & `front-side/`)**
  - [x] Resolved logo display failure in Default Theme: traced root cause to Cloudinary logo stored in PostgreSQL `Settings` table (`key: 'logo-url'`) while `Branch.logoUrl` was empty (`""`).
  - [x] Updated backend `front-side.service.ts` (`resolveDomain` and `getProfile`) to prioritize `branch.logoUrl` and fall back to `prisma.settings.findUnique({ where: { key: 'logo-url' } })`.
  - [x] Synced `Branch.logoUrl` directly in PostgreSQL with the active Cloudinary asset.
  - [x] Updated front-side `Header.tsx`, `Footer.tsx`, and `Navbar.tsx` to reliably consume `school.branding?.logo_url || profile?.logoUrl`.

- [x] **11.6. Dynamic Hero / Banner Management with Video & Image Support (`backend/`, `frontend/`, `front-side/`)**
  - [x] Created `SchoolBanner` Prisma model in `backend/prisma/schema/frontside.prisma` with fields: `title`, `subtitle`, `description`, `badge`, `mediaType` (`IMAGE` | `VIDEO`), `imageUrl`, `videoUrl`, `primaryBtnText`, `primaryBtnUrl`, `secondaryBtnText`, `secondaryBtnUrl`, `order`, `isActive`, and relations to `Branch`.
  - [x] Generated Prisma client and pushed schema updates to PostgreSQL via `prisma db push`.
  - [x] Built public endpoints (`GET /api/v1/public/front-side/schools/:branchId/banners`) and admin CRUD endpoints (`/banners`) in `front-side.controller.ts` & `front-side.service.ts`.
  - [x] Seeded initial production banners in DB, including a dynamic looping `.mp4` video banner.
  - [x] Built full CRUD Admin Banner Management page (`/dashboard/front-side/banners`) in `frontend` with creation/edit dialogs, media picker, preview, reordering, status toggles, and localized messages.
  - [x] Overhauled `HeroBanner.tsx` in `front-side` with dynamic carousel slides, `<video autoPlay loop muted playsInline>` support, fallback poster images, dynamic badges, titles, descriptions, and CTA buttons.

- [x] **11.7. Resilient Button Contrast & Dynamic Color Theme Decoupling (`front-side/`)**
  - [x] Resolved button background and text color collisions (e.g. white text on white button in light mode, or dark text on dark button in dark mode) when administrators customize primary/secondary colors.
  - [x] Decoupled `AdmissionsBanner.tsx` secondary "Learn More" button from Shadcn `variant="outline"`'s default `bg-background` by explicitly using `bg-transparent`, `text-secondary-foreground`, `border-2 border-secondary-foreground/35`, and `hover:text-secondary-foreground`.
  - [x] Added `border border-primary-foreground/20` and elevated drop shadow to the primary CTA ("Apply Now") to maintain clear separation even if primary and secondary colors are configured identically.
  - [x] Fixed hover state color darkening in `HeroBanner.tsx` by adding `hover:text-white` to the secondary button and `hover:text-primary-foreground` in `DefaultAcademics.tsx`.
  - [x] Added `--primary-border` and `--secondary-border` dynamic tokens in `color.ts` and `globals.css`.
  - [x] Replaced hardcoded CTA strings in `AdmissionsBanner.tsx` with `useTranslations("Common")` and enabled RTL arrow rotation.

- [x] **11.8. Footer Attribution & Developer Branding (`front-side/`)**
  - [x] Replaced previous "Terms of Service" and "Privacy Policy" links in Default theme `Footer.tsx` with **"Developed by [Hamoodtech](https://hamoodtech.com/)"** (`target="_blank" rel="noopener noreferrer"`).
  - [x] Updated Modern theme `ModernFooter` in `Navbar.tsx` to include the same developer attribution and link for cross-theme consistency.

- [x] **11.9. Modern Theme Principal Message UI & Typography Polish (`front-side/`)**
  - [x] Overhauled Principal's Message card in `ModernHome.tsx`: replaced oversized `text-2xl sm:text-3xl` with refined `text-sm sm:text-base leading-relaxed` italic speech typography.
  - [x] Restructured card layout with a balanced top header (avatar with ring border, designation, category badge, and top-right quote emblem) and a bottom institutional footer with a "Read more" link pointing to `/about/leadership`.
  - [x] Optimized blockquote font size in `ModernLeadership.tsx` for both Principal and Chairman message cards to maintain editorial consistency across the modern theme.

- [x] **11.10. Modern Theme Section Spacing & Layout Breathing Room Polish (`front-side/`)**
  - [x] Increased home page section gaps in `ModernHome.tsx` from tight `space-y-8 lg:space-y-12` to generous, modern `space-y-16 sm:space-y-20 lg:space-y-28` to provide visual breathing room between Hero, Stats, Leadership/Notices, and Calendar/Gallery.
  - [x] Enhanced `ModernThemeLayout.tsx` with dedicated bottom padding (`pb-16 sm:pb-24 lg:pb-32`) to prevent sections from sitting directly against the footer across all modern pages.
  - [x] Increased `PageIntro` margin in `ModernCommon.tsx` from `mb-8` to `mb-10 sm:mb-12 lg:mb-14`.
  - [x] Adjusted vertical container spacing across all modern secondary pages (About, Academics, Admissions, Notices, Events, Staff, Facilities, Gallery, Downloads, Results, Certificates, and Contact) to `space-y-10 sm:space-y-14` / `space-y-12 sm:space-y-16`.

- [x] **11.11. Online Admissions Buttons Transition to Contact & Inquiries (`front-side/` & `backend/`)**
  - [x] **Modern Theme Navbar (`Navbar.tsx`)**: Replaced desktop and mobile drawer "Apply Now" buttons with "Contact Us" (`/contact`), updated search modal quick links, and streamlined `primaryLinks` to focus on Home, About, Academics, Calendar/Events, and Contact.
  - [x] **Modern Theme Home (`ModernHome.tsx`)**: Hero banner primary CTA fallback and `/admissions` redirects dynamically mapped to `/contact` ("Contact") with sanitized eyebrow badge.
  - [x] **Default Theme Header & Footer (`Header.tsx`, `Footer.tsx`)**: Replaced `/admissions` navigation and footer links with `/events` ("Calendar") and `/contact` ("Contact").
  - [x] **Default Theme Hero Banner (`HeroBanner.tsx`)**: Replaced fallback and dynamic `/admissions` links with `/contact` ("Contact Us") and converted admissions badges to "Excellence in Education".
  - [x] **Default Theme Admissions Banner (`AdmissionsBanner.tsx`)**: Rebranded section to "Have Questions or Want to Connect?" with primary CTA pointing to `/contact` ("Contact Us") and secondary CTA to `/about` ("Learn More").
  - [x] **Quick Links (`QuickLinks.tsx`)**: Replaced `/admissions` card with `/about` ("About") card.
  - [x] **Academics CTA (`DefaultAcademics.tsx`)**: Replaced "Apply for Admission" button with "Contact Academic Office" (`/contact`).
  - [x] **Admission Info Pages (`AdmissionInfo.tsx`, `ModernAdmissionInfo.tsx`)**: Replaced "Apply Online Now" with "Contact Admissions Office" (`/contact`).
  - [x] **Admissions Form Pages (`AdmissionsForm.tsx`, `ModernAdmissions.tsx`)**: Added clear institutional notice banners informing visitors that online admission submissions are temporarily inactive from the website front-side and directing all inquiries to the school office and `/contact` page.
  - [x] **Database Banner Synchronization**: Updated seeded `SchoolBanner` in PostgreSQL to use `badge: 'Excellence in Education'`, `primaryBtnText: 'Contact Us'`, and `primaryBtnUrl: '/contact'`.
- [x] **11.12. Modern Theme Mobile Navbar Optimization & Hamburger Menu Visibility (`front-side/`)**
  - [x] **Root Cause Resolution**: Traced issue where mobile users saw no menu button to open the navbar. An unconstrained brand width (`shrink-0`) and three concurrent action buttons (Search, LanguageSwitcher dropdown, ThemeToggle) crowded the top header, forcing total width beyond mobile viewports (458px > 375px/390px) and pushing the hamburger button off-screen.
  - [x] **Responsive Header Simplification**: On mobile screens (< 640px), hid redundant top bar LanguageSwitcher and ThemeToggle (which are already cleanly integrated inside the slide-out drawer) leaving a clean, spacious 2-action header: Search icon button + Hamburger Menu button.
  - [x] **Flexible Brand Container**: Replaced rigid `shrink-0` with `flex-1 sm:flex-initial overflow-hidden` and `truncate` with `max-w-[170px]` on mobile, preventing long school names from pushing right-side controls off-screen.
  - [x] **Prominent Hamburger Menu Button**: Upgraded trigger with `shrink-0`, `size-9 sm:size-10`, `size-5` (20px) icon, touch-target compliance, and high-contrast border styling for effortless tapping on phones.
  - [x] **Enhanced Mobile Drawer**: Added quick search shortcut button inside the drawer, verified full navigation coverage (Primary links, Explore links, Custom pages, Language selector, Theme toggle, and Contact CTA).


## today works
- [x] **11.13. Multilingual Translation Synchronization & Missing Keys Resolution (`frontend/` & `front-side/`)**
  - [x] **Admin Panel Localization (`frontend/src/i18n/messages/` & `frontend/src/app/`)**:
    - Added missing `"pages": "Custom Pages"` in `en.json` and `"pages": "কাস্টম পেজ"` in `bn.json` under the `"nav"` namespace, resolving the missing key called in `frontend/src/app/(dashboard)/dashboard/front-side/pages/page.tsx` (`t("pages")`).
    - Added missing `"teachers"` namespace (`title`, `description`, `addTeacher`) in `frontend/src/i18n/messages/bn.json` to restore 100% structural and key parity between English and Bengali admin translation catalogs.
  - [x] **Front-Side Application Localization (`front-side/messages/` & `front-side/src/`)**:
    - Added missing `"pages"` (`"Pages"` in `en.json`, `"পেজসমূহ"` in `bn.json`, `"الصفحات"` in `ar.json`) under the `"Navigation"` namespace.
    - Added comprehensive navigation section keys: `"menu"`, `"explore"`, `"campus"`, `"quick_links"`, `"portals_resources"`, `"exam_results"`, `"verify_certificate"`, `"downloads_forms"`, and `"campus_contact"`.
    - Added dedicated `"nav"` namespace in `en.json`, `bn.json`, and `ar.json` mirroring all navigation items so direct `nav.pages` and `useTranslations("nav")` calls resolve seamlessly across any theme.
    - Added localized search and status keys (`"search"`, `"search_placeholder"`, `"search_results"`, `"searching"`, `"not_found"`, `"return_home"`, `"go_back"`) to `"Common"`.
    - Added `"pages_title"` to `"ModernPages"` across all language files.
  - [x] **Front-Side Theme Component Localization Polish (`front-side/src/components/`)**:
    - **Modern Theme Navbar (`Navbar.tsx`)**: Replaced hardcoded desktop dropdown label and mobile drawer heading with localized `{t('pages')}`, replaced `"Menu"` heading with `{t('menu')}`, replaced footer `"Explore"` header with `{t('explore')}`, and linked drawer search shortcut to `{common('search_placeholder')}`.
    - **ThemeToggle Component**: Standardized namespace alias to `common = useTranslations('Common')` with `common('theme')` for clean component-level scoping.
    - **Default Theme Header (`Header.tsx`)**: Replaced hardcoded `"More"` dropdown trigger and mobile drawer `"More Pages"` heading with localized `{t("pages")}`.
    - **Default Theme Footer (`Footer.tsx`)**: Replaced hardcoded column headings and links (`"Quick Links"`, `"Portals & Resources"`, `"Campus Contact"`, `"Events & Calendar"`, `"Exam Results"`, `"Verify Certificate"`, `"Downloads & Forms"`) with localized `t(...)` keys from the `Navigation` namespace.
  - [x] **Verification & Type Safety**:
    - Performed comprehensive AST scanning across all 705 files in `frontend` and 123 files in `front-side`, verifying 0 missing translation keys.
    - Verified 100% key parity across `en.json`, `bn.json`, and `ar.json`.
    - Executed TypeScript validation (`tsc --noEmit`) across both `frontend` and `front-side` projects with 0 errors.

- [x] **11.14. Dual Login Architecture & Public Portal Access Segregation (`frontend/` & `front-side/`)**
  - [x] **Generic School Portal Login Page (`frontend/src/app/(auth)/portal-login/page.tsx`)**:
    - Created a clean, generic `/portal-login` page without role-specific text (removed all specific mentions of Students, Guardians, Faculty, and institutional ID labels).
    - Preserved 100% of the existing role-based routing (`ROLE_HOME_ROUTES`): Students $\rightarrow$ `/dashboard/student`, Teachers $\rightarrow$ `/dashboard/teacher`, Parents $\rightarrow$ `/dashboard/parent`, and Admins $\rightarrow$ `/dashboard`.
    - Removed admin login redirection text to maintain an unencumbered, professional sign-in interface.
    - Added direct "Back to School Website" navigation link to `NEXT_PUBLIC_FRONTSIDE_URL`.
    - Added clickable navigation link to `https://hamoodtech.com` on the "HamoodTech" brand text in the footer.
    - Added to `PUBLIC_PATHS` in `frontend/src/constants/auth.constants.ts`.
  - [x] **Admin Login Page & Unrestricted Multi-Role Access (`frontend/src/app/(auth)/login/page.tsx` & `frontend/src/hooks/use-auth.ts`)**:
    - Allowed any role to log in from both `/login` and `/portal-login`, automatically navigating to their respective role dashboard via `ROLE_HOME_ROUTES`.
    - Added clickable navigation link to `https://hamoodtech.com` on the "HamoodTech" brand text in the footer.
  - [x] **Front-Side Login Button Integration (`front-side/`)**:
    - **Default Theme Header (`Header.tsx`)**: Upgraded desktop header and mobile slide-out drawer static login buttons to active `<Button asChild><a href={portalLoginUrl}>` links pointing directly to the new `/portal-login` portal route.
    - **Modern Theme Navbar (`Navbar.tsx`)**: Added prominent "Login" action links in the desktop header controls bar and mobile slide-out drawer linking seamlessly to `${NEXT_PUBLIC_ADMIN_PORTAL_URL}/portal-login`.
  - [x] **Environment Configuration**:
    - Set `NEXT_PUBLIC_FRONTSIDE_URL="http://localhost:3001"` in `frontend/.env`.
    - Set `NEXT_PUBLIC_ADMIN_PORTAL_URL="http://localhost:3000"` in `front-side/.env`.
  - [x] **Verification**:
    - Ran TypeScript typecheck (`tsc --noEmit`) on both `frontend` and `front-side` with **0 errors**.



