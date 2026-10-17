import api from "@/lib/api";
import {
  Banner,
  Notice,
  Staff,
  Gallery,
  SchoolProfile,
  Event,
  Result,
  Download,
  Stat,
  Testimonial,
  Program,
  SchoolClass,
  ClassRoutine,
  SchoolExam,
  StudentResultResponse,
  CertificateVerificationResponse,
  AdmissionSubmissionData,
  AdmissionSubmissionResponse,
  ContactSubmissionData,
  ContactSubmissionResponse,
  GlobalSearchResults,
} from "@/types/school.types";

export const SchoolService = {
  getProfile: async (schoolId: string): Promise<SchoolProfile> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/profile`);
      const data = response.data?.data || response.data || {};
      const banners = Array.isArray(data.banners)
        ? data.banners.map((b: any) => ({
            ...b,
            imageUrl: b.imageUrl || b.image_url,
            videoUrl: b.videoUrl || b.video_url,
            image_url: b.imageUrl || b.image_url,
            video_url: b.videoUrl || b.video_url,
          }))
        : [];

      return {
        id: schoolId,
        name: data.name || "School",
        history: data.history || "No history available.",
        mission: data.mission || "",
        vision: data.vision || "",
        logoUrl: data.logoUrl || data.logo_url || "",
        logo_url: data.logoUrl || data.logo_url || "",
        principal_name: data.principalName || data.principal_name || "Principal",
        principal_message: data.principalMessage || data.principal_message || "Welcome to our school.",
        principal_image_url: data.principalPhotoUrl || data.principalImage || data.principal_image_url || "",
        chairman_name: data.chairmanName || data.chairman_name || "",
        chairman_message: data.chairmanMessage || data.chairman_message || "",
        chairman_image_url: data.chairmanPhotoUrl || data.chairman_image_url || "",
        address: data.address || "",
        phone: data.phone || "",
        email: data.email || "",
        latitude: data.latitude || "",
        longitude: data.longitude || "",
        banners,
      };
    } catch (error) {
      console.error("Failed to fetch profile", error);
      return { id: schoolId, name: "School", history: "", principal_name: "", principal_message: "" } as SchoolProfile;
    }
  },

  getBanners: async (schoolId: string): Promise<Banner[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/banners`);
      const banners = response.data?.data || response.data || [];
      return banners.map((b: any) => ({
        ...b,
        imageUrl: b.imageUrl || b.image_url,
        videoUrl: b.videoUrl || b.video_url,
        image_url: b.imageUrl || b.image_url,
        video_url: b.videoUrl || b.video_url,
      }));
    } catch (error) {
      console.error("Failed to fetch banners", error);
      return [];
    }
  },

  getNotices: async (schoolId: string, limit: number = 10): Promise<Notice[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/notices`, { params: { limit } });
      const notices = response.data?.data || response.data || [];
      if (Array.isArray(notices) && notices.length > 0) {
        return notices.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: item.publishedAt ? new Date(item.publishedAt).toISOString().split("T")[0] : new Date(item.createdAt || Date.now()).toISOString().split("T")[0],
          content: item.description || item.content || "",
          pdf_url: item.fileUrl || item.pdf_url,
          category: item.category || "General",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch notices", error);
    }
    
    // Fallback Mock Data
    return [
      { id: "1", title: "Summer Vacation 2026", date: "2026-05-10", content: "School will remain closed for the annual summer vacation." },
      { id: "2", title: "Mid-term Exam Routine", date: "2026-04-15", content: "The midterm examinations will start from next week." },
    ];
  },

  getStaff: async (schoolId: string, type: string = "teacher"): Promise<Staff[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/staff`, { params: { type } });
      const staffList = response.data?.data || response.data || [];
      if (Array.isArray(staffList) && staffList.length > 0) {
        return staffList.map((item: any) => ({
          id: item.id,
          name: `${item.firstName || ''} ${item.lastName || ''}`.trim() || item.name || "Faculty Member",
          designation: item.designation?.name || item.designation || "Teacher",
          department: item.department?.name || item.department || "Academic Department",
          image_url: item.photoUrl || item.image_url || "",
          email: item.email || item.user?.email || "",
          phone: item.phone || item.mobileNumber || item.user?.phone || "",
          qualification: item.qualification || item.education || "",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch staff", error);
    }
    
    // Fallback Mock Data
    return [
      { id: "1", name: "Alice Smith", designation: "Math Teacher", department: "Science" },
      { id: "2", name: "Bob Jones", designation: "English Teacher", department: "Arts" },
    ];
  },

  getGalleries: async (schoolId: string): Promise<Gallery[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/galleries`);
      const galleries = response.data?.data || response.data || [];
      if (Array.isArray(galleries) && galleries.length > 0) {
        return galleries.map((item: any) => ({
          id: item.id,
          title: item.name || item.title || "Campus Gallery",
          cover_image_url: item.coverPhotoUrl || item.coverUrl || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
          date: item.createdAt ? new Date(item.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
          category: "Campus Life",
          items: []
        }));
      }
    } catch (error) {
      console.error("Failed to fetch galleries", error);
    }
    return [];
  },

  getEvents: async (schoolId: string): Promise<Event[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/events`);
      const events = response.data?.data || response.data || [];
      if (Array.isArray(events) && events.length > 0) {
        return events.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: item.date ? new Date(item.date).toISOString().split("T")[0] : "",
          time: item.time || (item.startTime ? `${item.startTime}${item.endTime ? ` - ${item.endTime}` : ''}` : "10:00 AM"),
          description: item.description || "",
          location: item.location || "Campus Premises",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
    return [
      { id: "1", title: "Parent-Teacher Meeting", date: "2026-11-15", description: "Discussing student progress.", location: "Main Auditorium" },
      { id: "2", title: "Winter Festival", date: "2026-12-20", description: "Annual winter cultural program and exhibitions.", location: "School Ground" },
    ];
  },

  getResults: async (schoolId: string): Promise<Result[]> => {
    return [
      { id: "1", student_id: "S1001", exam_name: "Mid Term 2026", gpa: "4.5", status: "Passed" },
      { id: "2", student_id: "S1002", exam_name: "Mid Term 2026", gpa: "5.0", status: "Passed" },
    ];
  },

  getStudentResults: async (schoolId: string, studentId: string = "S1001", examId?: string): Promise<StudentResultResponse> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/results`, {
        params: { studentId, examId }
      });
      return response.data?.data || response.data || { found: false, marks: [] };
    } catch (error) {
      console.error("Failed to fetch results", error);
      return {
        found: false,
        message: "Unable to retrieve examination result at this time.",
        marks: []
      };
    }
  },

  getDownloads: async (schoolId: string): Promise<Download[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/downloads`);
      const downloads = response.data?.data || response.data || [];
      if (Array.isArray(downloads) && downloads.length > 0) {
        return downloads.map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category || "General",
          size: item.size || "1.2 MB",
          date: item.date ? new Date(item.date).toISOString().split("T")[0] : "",
          url: item.fileUrl || item.url || "#",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch downloads", error);
    }
    return [
      { id: "1", title: "Academic Calendar 2026", category: "Academic", size: "1.2 MB", date: "2026-01-01", url: "#" },
      { id: "2", title: "Admission Form (PDF)", category: "Admissions", size: "2.5 MB", date: "2026-01-05", url: "#" },
      { id: "3", title: "Class 6 Syllabus", category: "Syllabus", size: "800 KB", date: "2026-01-10", url: "#" },
    ];
  },

  getStats: async (schoolId: string): Promise<Stat[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/stats`);
      const stats = response.data?.data || response.data || [];
      if (Array.isArray(stats) && stats.length > 0) {
        return stats.map((item: any) => ({
          id: item.id,
          value: item.value,
          suffix: item.suffix || "+",
          label: item.label,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
    return [
      { id: "1", value: "15", suffix: "+", label: "Years of Excellence" },
      { id: "2", value: "100", suffix: "%", label: "Board Exam Pass Rate" },
      { id: "3", value: "50", suffix: "+", label: "Extracurricular Activities" },
      { id: "4", value: "20", suffix: ":1", label: "Student-Teacher Ratio" },
    ];
  },

  getTestimonials: async (schoolId: string): Promise<Testimonial[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/testimonials`);
      const testimonials = response.data?.data || response.data || [];
      if (Array.isArray(testimonials) && testimonials.length > 0) {
        return testimonials.map((item: any) => ({
          id: item.id,
          name: item.name,
          role: item.role,
          quote: item.quote,
          avatar_url: item.avatarUrl || "",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch testimonials", error);
    }
    return [
      { id: "1", name: "Sarah Ahmed", role: "Parent", quote: "The dedication of the teachers here is unmatched. My daughter has blossomed both academically and personally." },
      { id: "2", name: "Dr. Hasan", role: "Alumni", quote: "This school gave me the foundation I needed to succeed in medical school. I am forever grateful." },
      { id: "3", name: "Fatima Rahman", role: "Parent", quote: "A safe, nurturing environment with state-of-the-art facilities. Truly the best choice for our family." },
    ];
  },

  getPrograms: async (schoolId: string): Promise<Program[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/programs`);
      const programs = response.data?.data || response.data || [];
      if (Array.isArray(programs) && programs.length > 0) {
        return programs.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description || "",
          image_url: item.imageUrl || "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
          href: item.href || "/academics",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch programs", error);
    }
    return [
      { id: "1", title: "Early Years", description: "A nurturing environment focused on play-based learning.", image_url: "https://placehold.co/600x400/10b981/ffffff?text=Early+Years", href: "/academics" },
      { id: "2", title: "Primary School", description: "Building a strong foundation in core academic subjects.", image_url: "https://placehold.co/600x400/6366f1/ffffff?text=Primary", href: "/academics" },
      { id: "3", title: "Middle School", description: "Fostering independence and critical thinking skills.", image_url: "https://placehold.co/600x400/f59e0b/ffffff?text=Middle+School", href: "/academics" },
      { id: "4", title: "High School", description: "Preparing students for university and future careers.", image_url: "https://placehold.co/600x400/ef4444/ffffff?text=High+School", href: "/academics" },
    ];
  },

  getGovernance: async (schoolId: string): Promise<any[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/governance`);
      const governance = response.data?.data || response.data || [];
      return governance.map((item: any) => ({
        id: item.id,
        name: item.name,
        role: item.designation,
        type: item.type?.toLowerCase() || "governing_body",
        image: item.photoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop",
      }));
    } catch (error) {
      console.error("Failed to fetch governance", error);
      return [];
    }
  },

  getFacilities: async (schoolId: string): Promise<any[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/facilities`);
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Failed to fetch facilities", error);
      return [];
    }
  },

  getPages: async (schoolId: string): Promise<any[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/pages`);
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Failed to fetch pages", error);
      return [];
    }
  },

  getPageBySlug: async (schoolId: string, slug: string): Promise<any> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/pages/${slug}`);
      return response.data?.data || response.data || null;
    } catch (error) {
      console.error("Failed to fetch page", error);
      return null;
    }
  },

  getClassSchedule: async (schoolId: string): Promise<any[]> => {
    return [
      { day: "Sunday", periods: ["Bangla", "English", "Math", "Break", "Science", "History"] },
      { day: "Monday", periods: ["Math", "Science", "Bangla", "Break", "English", "Geography"] },
      { day: "Tuesday", periods: ["English", "Math", "Science", "Break", "History", "ICT"] },
      { day: "Wednesday", periods: ["Science", "Bangla", "English", "Break", "Math", "Religion"] },
      { day: "Thursday", periods: ["History", "Geography", "ICT", "Break", "Bangla", "Math"] },
    ];
  },

  getOfficialDocuments: async (schoolId: string): Promise<any[]> => {
    try {
      const downloads = await SchoolService.getDownloads(schoolId);
      const official = downloads.filter((d) => 
        d.category.toLowerCase().includes("official") || 
        d.category.toLowerCase().includes("academic") ||
        d.category.toLowerCase().includes("report")
      );
      if (official.length > 0) {
        return official.map((doc) => ({
          id: doc.id,
          title: doc.title,
          type: doc.category,
          size: doc.size,
          date: doc.date,
          url: doc.url,
        }));
      }
    } catch (e) {
      console.error("Failed to map official docs", e);
    }
    return [
      { id: "1", title: "Government Approval Letter 2020", type: "Approval", size: "1.2 MB", date: "2020-05-10", url: "#" },
      { id: "2", title: "Education Board Affiliation", type: "Affiliation", size: "2.1 MB", date: "2015-08-22", url: "#" },
      { id: "3", title: "Yearly Audit Report 2025", type: "Report", size: "3.5 MB", date: "2025-12-30", url: "#" },
    ];
  },

  verifyCertificate: async (schoolId: string, refId: string): Promise<CertificateVerificationResponse> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/certificates/verify`, {
        params: { refId }
      });
      return response.data?.data || response.data || { isValid: false, message: "Record not found" };
    } catch (error) {
      console.error("Failed to verify certificate", error);
      return { isValid: false, message: "Certificate record could not be verified." };
    }
  },

  getClasses: async (schoolId: string): Promise<SchoolClass[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/classes`);
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Failed to fetch classes", error);
      return [
        { id: "c1", name: "Class 6" },
        { id: "c2", name: "Class 7" },
        { id: "c3", name: "Class 8" },
        { id: "c4", name: "Class 9" },
        { id: "c5", name: "Class 10" },
      ];
    }
  },

  getRoutines: async (schoolId: string, classId?: string, sectionId?: string): Promise<ClassRoutine[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/routines`, {
        params: { classId, sectionId }
      });
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Failed to fetch routines", error);
      return [];
    }
  },

  getExams: async (schoolId: string): Promise<SchoolExam[]> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/exams`);
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Failed to fetch exams", error);
      return [
        { id: "e1", name: "1st Term Examination 2026" },
        { id: "e2", name: "Mid Term Examination 2026" },
        { id: "e3", name: "Annual Examination 2026" },
      ];
    }
  },

  submitAdmission: async (schoolId: string, data: AdmissionSubmissionData): Promise<AdmissionSubmissionResponse> => {
    const response = await api.post(`/public/front-side/schools/${schoolId}/admissions/apply`, data);
    return response.data?.data || response.data || {
      success: true,
      applicationRef: `ADM-${Date.now().toString().slice(-6)}`,
      applicantName: data.studentName,
      classId: data.classId,
      phone: data.phone,
      submissionDate: new Date().toISOString(),
      status: "PENDING_REVIEW",
      message: "Application submitted successfully.",
    };
  },

  submitContact: async (schoolId: string, data: ContactSubmissionData): Promise<ContactSubmissionResponse> => {
    const response = await api.post(`/public/front-side/schools/${schoolId}/contact`, data);
    return response.data?.data || response.data || {
      success: true,
      ticketId: `MSG-${Date.now().toString().slice(-6)}`,
      name: data.name,
      email: data.email,
      subject: data.subject,
      date: new Date().toISOString(),
      message: "Your message has been delivered.",
    };
  },

  globalSearch: async (schoolId: string, query: string): Promise<GlobalSearchResults> => {
    try {
      const response = await api.get(`/public/front-side/schools/${schoolId}/search`, {
        params: { q: query }
      });
      return response.data?.data || response.data || { notices: [], staff: [], pages: [], events: [], downloads: [] };
    } catch (error) {
      console.error("Failed global search", error);
      return { notices: [], staff: [], pages: [], events: [], downloads: [] };
    }
  },
};
