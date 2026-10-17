import { useQuery, useMutation } from "@tanstack/react-query";
import { SchoolService } from "@/services/school.service";
import { schoolKeys } from "./school.keys";
import type { AdmissionSubmissionData, ContactSubmissionData } from "@/types/school.types";

export const useGetSchoolProfile = (schoolId: string) => {
  return useQuery({
    queryKey: schoolKeys.profile(schoolId),
    queryFn: () => SchoolService.getProfile(schoolId),
    enabled: !!schoolId,
    staleTime: 1000 * 60 * 60, // 1 hour (profiles rarely change)
  });
};

export const useGetBanners = (schoolId: string) => {
  return useQuery({
    queryKey: schoolKeys.banners(schoolId),
    queryFn: () => SchoolService.getBanners(schoolId),
    enabled: !!schoolId,
    staleTime: 1000 * 60 * 15, // 15 mins
  });
};

export const useGetNotices = (schoolId: string, limit: number = 10) => {
  return useQuery({
    queryKey: schoolKeys.notices(schoolId, limit),
    queryFn: () => SchoolService.getNotices(schoolId, limit),
    enabled: !!schoolId,
  });
};

export const useGetStaff = (schoolId: string, type: string = "teacher") => {
  return useQuery({
    queryKey: schoolKeys.staff(schoolId, type),
    queryFn: () => SchoolService.getStaff(schoolId, type),
    enabled: !!schoolId,
  });
};

export const useGetGalleries = (schoolId: string) => {
  return useQuery({
    queryKey: schoolKeys.galleries(schoolId),
    queryFn: () => SchoolService.getGalleries(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetEvents = (schoolId: string) => {
  return useQuery({
    queryKey: schoolKeys.events(schoolId),
    queryFn: () => SchoolService.getEvents(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetResults = (schoolId: string) => {
  return useQuery({
    queryKey: schoolKeys.results(schoolId),
    queryFn: () => SchoolService.getResults(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetStudentResults = (schoolId: string, studentId: string = "S1001", examId?: string) => {
  return useQuery({
    queryKey: [...schoolKeys.all, "studentResults", schoolId, studentId, examId],
    queryFn: () => SchoolService.getStudentResults(schoolId, studentId, examId),
    enabled: !!schoolId && !!studentId,
  });
};

export const useGetDownloads = (schoolId: string) => {
  return useQuery({
    queryKey: schoolKeys.downloads(schoolId),
    queryFn: () => SchoolService.getDownloads(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetStats = (schoolId: string) => {
  return useQuery({
    queryKey: [...schoolKeys.all, "stats", schoolId],
    queryFn: () => SchoolService.getStats(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetTestimonials = (schoolId: string) => {
  return useQuery({
    queryKey: [...schoolKeys.all, "testimonials", schoolId],
    queryFn: () => SchoolService.getTestimonials(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetPrograms = (schoolId: string) => {
  return useQuery({
    queryKey: [...schoolKeys.all, "programs", schoolId],
    queryFn: () => SchoolService.getPrograms(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetGovernance = (schoolId: string) => {
  return useQuery({
    queryKey: [...schoolKeys.all, "governance", schoolId],
    queryFn: () => SchoolService.getGovernance(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetClassSchedule = (schoolId: string) => {
  return useQuery({
    queryKey: [...schoolKeys.all, "schedule", schoolId],
    queryFn: () => SchoolService.getClassSchedule(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetOfficialDocuments = (schoolId: string) => {
  return useQuery({
    queryKey: [...schoolKeys.all, "officialDocs", schoolId],
    queryFn: () => SchoolService.getOfficialDocuments(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetPages = (schoolId: string) => {
  return useQuery({
    queryKey: [...schoolKeys.all, "pages", schoolId],
    queryFn: () => SchoolService.getPages(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetClasses = (schoolId: string) => {
  return useQuery({
    queryKey: schoolKeys.classes(schoolId),
    queryFn: () => SchoolService.getClasses(schoolId),
    enabled: !!schoolId,
  });
};

export const useGetClassRoutines = (schoolId: string, classId?: string, sectionId?: string) => {
  return useQuery({
    queryKey: schoolKeys.routines(schoolId, classId, sectionId),
    queryFn: () => SchoolService.getRoutines(schoolId, classId, sectionId),
    enabled: !!schoolId,
  });
};

export const useGetExams = (schoolId: string) => {
  return useQuery({
    queryKey: schoolKeys.exams(schoolId),
    queryFn: () => SchoolService.getExams(schoolId),
    enabled: !!schoolId,
  });
};

export const useVerifyCertificate = (schoolId: string, refId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: schoolKeys.certificate(schoolId, refId),
    queryFn: () => SchoolService.verifyCertificate(schoolId, refId),
    enabled: !!schoolId && !!refId && enabled,
  });
};

export const useSubmitAdmission = (schoolId: string) => {
  return useMutation({
    mutationFn: (data: AdmissionSubmissionData) => SchoolService.submitAdmission(schoolId, data),
  });
};

export const useSubmitContact = (schoolId: string) => {
  return useMutation({
    mutationFn: (data: ContactSubmissionData) => SchoolService.submitContact(schoolId, data),
  });
};

export const useGlobalSearch = (schoolId: string, query: string) => {
  return useQuery({
    queryKey: schoolKeys.search(schoolId, query),
    queryFn: () => SchoolService.globalSearch(schoolId, query),
    enabled: !!schoolId && !!query && query.trim().length > 1,
  });
};
