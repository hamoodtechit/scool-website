import { z } from "zod";

// --- Notices ---
export const NoticeSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  content: z.string(),
  pdf_url: z.string().optional(),
  category: z.string().optional(),
  isPinned: z.boolean().optional(),
});
export type Notice = z.infer<typeof NoticeSchema>;

// --- Staff/Teachers ---
export const StaffSchema = z.object({
  id: z.string(),
  name: z.string(),
  designation: z.string(),
  department: z.string().optional(),
  image_url: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  qualification: z.string().optional(),
});
export type Staff = z.infer<typeof StaffSchema>;

// --- Gallery ---
export const GalleryItemSchema = z.object({
  id: z.string(),
  url: z.string(),
  type: z.enum(["image", "video"]),
});
export type GalleryItem = z.infer<typeof GalleryItemSchema>;

export const GallerySchema = z.object({
  id: z.string(),
  title: z.string(),
  cover_image_url: z.string(),
  date: z.string(),
  category: z.string().optional(),
  items: z.array(GalleryItemSchema).optional(),
});
export type Gallery = z.infer<typeof GallerySchema>;

// --- Banners / Hero Section ---
export const BannerSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  badge: z.string().optional().nullable(),
  mediaType: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(), // backwards compatibility
  video_url: z.string().optional().nullable(),
  primaryBtnText: z.string().optional().nullable(),
  primaryBtnUrl: z.string().optional().nullable(),
  secondaryBtnText: z.string().optional().nullable(),
  secondaryBtnUrl: z.string().optional().nullable(),
  order: z.number().optional().nullable(),
  isActive: z.boolean().optional().nullable(),
});
export type Banner = z.infer<typeof BannerSchema>;

// --- School Profile (extended beyond domain config) ---
export const SchoolProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  history: z.string(),
  mission: z.string().optional(),
  vision: z.string().optional(),
  logoUrl: z.string().optional(),
  logo_url: z.string().optional(),
  principal_message: z.string(),
  principal_name: z.string(),
  principal_image_url: z.string().optional(),
  chairman_message: z.string().optional(),
  chairman_name: z.string().optional(),
  chairman_image_url: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  banners: z.array(BannerSchema).optional(),
});
export type SchoolProfile = z.infer<typeof SchoolProfileSchema>;

// --- Events ---
export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  description: z.string(),
  location: z.string().optional(),
  time: z.string().optional(),
});
export type Event = z.infer<typeof EventSchema>;

// --- Results ---
export const ResultSchema = z.object({
  id: z.string(),
  student_id: z.string(),
  exam_name: z.string(),
  gpa: z.string(),
  status: z.string(),
});
export type Result = z.infer<typeof ResultSchema>;

// --- Downloads ---
export const DownloadSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  size: z.string(),
  date: z.string(),
  url: z.string(),
});
export type Download = z.infer<typeof DownloadSchema>;

// --- Homepage Extensions ---
export const StatSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  suffix: z.string().optional(),
});
export type Stat = z.infer<typeof StatSchema>;

export const TestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  quote: z.string(),
  avatar_url: z.string().optional(),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;

export const ProgramSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image_url: z.string(),
  href: z.string(),
});
export type Program = z.infer<typeof ProgramSchema>;

// --- Classes & Routine ---
export interface ClassSection {
  id: string;
  section: { id: string; name: string };
}

export interface SchoolClass {
  id: string;
  name: string;
  classSections?: ClassSection[];
}

export interface RoutineSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  duration?: string;
  roomNumber?: string;
  isBreak: boolean;
  subject?: { id: string; name: string; code?: string };
  teacher?: { id: string; fullName: string };
}

export interface ClassRoutine {
  id: string;
  classId: string;
  sectionId: string;
  class?: { id: string; name: string };
  section?: { id: string; name: string };
  classRoutineSlots: RoutineSlot[];
}

// --- Exams & Results ---
export interface SchoolExam {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
}

export interface MarkDetail {
  id: string;
  examName: string;
  subjectName: string;
  writtenObtained: number;
  mcqObtained: number;
  practicalObtained: number;
  totalObtained: number;
  grade: string;
  point: number;
  isPassed: boolean;
  remarks?: string;
}

export interface StudentResultResponse {
  found: boolean;
  message?: string;
  student?: {
    id: string;
    idCardNo: string;
    rollNumber?: number;
    name: string;
    className: string;
    sectionName: string;
  };
  summary?: {
    totalSubjects: number;
    totalObtained: number;
    gpa: string;
    status: string;
  };
  marks: MarkDetail[];
}

// --- Certificate Verification ---
export interface CertificateVerificationResponse {
  isValid: boolean;
  message?: string;
  refId?: string;
  studentName?: string;
  idCardNo?: string;
  rollNumber?: number;
  className?: string;
  academicYear?: string;
  status?: string;
  issueDate?: string;
  verificationCode?: string;
}

// --- Online Admissions ---
export interface AdmissionSubmissionData {
  studentName: string;
  classId: string;
  fatherName: string;
  motherName: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  previousSchool?: string;
  address?: string;
}

export interface AdmissionSubmissionResponse {
  success: boolean;
  applicationRef: string;
  applicantName: string;
  classId: string;
  phone: string;
  submissionDate: string;
  status: string;
  message: string;
}

// --- Contact Form ---
export interface ContactSubmissionData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  ticketId: string;
  name: string;
  email: string;
  subject: string;
  date: string;
  message: string;
}

// --- Global Search ---
export interface SearchItem {
  id: string;
  title?: string;
  name?: string;
  designation?: string;
  date?: string;
  slug?: string;
  category?: string;
  fileUrl?: string;
  type: 'notice' | 'staff' | 'page' | 'event' | 'download';
}

export interface GlobalSearchResults {
  notices: SearchItem[];
  staff: SearchItem[];
  pages: SearchItem[];
  events: SearchItem[];
  downloads: SearchItem[];
}



