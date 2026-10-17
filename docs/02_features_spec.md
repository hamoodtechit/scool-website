# Feature Specifications: School Front-Side

## 1. Multi-Template Engine
*   **Theme Resolution:** Middleware or server-side component resolves the incoming domain to a specific school and fetches its `theme_id`.
*   **Dynamic Component Loading:** The application dynamically imports page layouts and components from `src/components/themes/[theme_id]/`.
*   **CSS Variable Theming:** Core colors (primary, secondary), fonts, and branding are mapped to CSS variables based on API responses.

## 2. Core Modules

### 2.1 Administration & About
*   **School Profile:** Displays school Name, Logo, Contact Details, History, Mission, and Vision.
*   **Leadership Speeches:** Sections for messages from the Chairman and Principal/Head Teacher.
*   **Governance:** Dedicated pages/sections for Governing Body, Ex-Governing Body, Founder & Donor List, and Administrators.
*   **Official Information:** Displays Teaching Permission, Recognition Letters, Govt. Approvals, and Statistics Reports.

### 2.2 Academics & Staff
*   **Staff Directory:** Grids or lists showcasing Current Teachers, Former Teachers, Current Staff, and Former Staff.
*   **Academic Info:** Sections for Class Schedule, Academic Rules, Academic Calendar, and Syllabus/Routine.
*   **Attendance & Leave Information:** Public links or embedded views for Attendance Sheets.

### 2.3 Admissions
*   **Admissions Portal:** Informational pages ("Why Study Here?", "How to Apply", "Admission Test Info", "Admission Policy").
*   **Online Registration System:** Forms for student enrollment linked directly to the backend API.

### 2.4 Student Life & Facilities
*   **Student Information:** Details on Student List, Tuition Fees, Exam System/Schedule, Rules & Regulations, and Uniform guidelines.
*   **Facilities Showcase:** Visual showcases of the Library, Play Ground, Science Labs (Physics, Biology, Chemistry), ICT Lab, and Co-curricular Activities.

### 2.5 Results & Verification
*   **Exam Results:** Portals to check Academic Result, Board Exam Result, and Evaluation Result.
*   **Certificate Verification System:** A search functionality/modal to verify certificates using a Reference ID.

### 2.6 News, Events & Media
*   **Notice Board & Scrolling Marquee:** Highlight urgent updates and circulars prominently (e.g., as a marquee on the homepage).
*   **News & Events Calendar:** A detailed list/calendar view of upcoming events.
*   **Media Gallery:** Image and video albums with lightbox support.
*   **Downloads Section:** A repository for forms, routines, and educational resources.

## 3. Global Utilities
*   **Multi-language Support:** Toggle between languages (e.g., English and Bangla) using `next-intl`.
*   **Dark / Light Theme Toggle:** Accessible via `next-themes`.
