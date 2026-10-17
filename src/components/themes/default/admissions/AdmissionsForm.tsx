"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Printer, ArrowRight, UserCheck, Sparkles, AlertCircle } from "lucide-react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetClasses, useSubmitAdmission } from "@/hooks/api/school/useSchoolQueries";
import type { AdmissionSubmissionResponse } from "@/types/school.types";
import { toast } from "sonner";

const admissionSchema = z.object({
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  fatherName: z.string().min(2, "Father's name is required"),
  motherName: z.string().min(2, "Mother's name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  classId: z.string().min(1, "Please select a class"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  previousSchool: z.string().optional(),
  address: z.string().optional(),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

export function AdmissionsForm() {
  const t = useTranslations("Common");
  const { school_id } = useSchool();
  const { data: classes = [], isLoading: classesLoading } = useGetClasses(school_id);
  const submitAdmissionMutation = useSubmitAdmission(school_id);

  const [submittedData, setSubmittedData] = useState<AdmissionSubmissionResponse | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      studentName: "",
      fatherName: "",
      motherName: "",
      phone: "",
      classId: "",
      gender: "Male",
    },
  });

  const onSubmit = async (data: AdmissionFormData) => {
    try {
      const response = await submitAdmissionMutation.mutateAsync(data);
      setSubmittedData(response);
      toast.success("Online admission application submitted successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to submit admission application. Please try again.");
    }
  };

  const selectedClass = classes.find((c) => c.id === submittedData?.classId);

  return (
    <Section className="bg-muted/30 min-h-screen">
      <SectionHeading 
        title="Online Admission Portal" 
        subtitle="Apply for the upcoming academic year through our official online registration gateway." 
      />

      <div className="max-w-3xl mx-auto">
        {/* Notice: Online admissions currently closed */}
        <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Notice: Online Admissions Currently Inactive</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                We are currently not accepting direct online admission applications from the website. For inquiries, prospectus details, and campus visits, please contact our administrative office.
              </p>
            </div>
          </div>
          <Button asChild size="sm" variant="default" className="shrink-0 bg-primary text-primary-foreground font-semibold">
            <Link href="/contact">Contact Office</Link>
          </Button>
        </div>

        {submittedData ? (
          <Card className="shadow-xl border-2 border-emerald-500/30 bg-white dark:bg-card overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-emerald-800 dark:text-emerald-300">
                Application Submitted Successfully!
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your admission application has been recorded in the school registry.
              </p>
              
              <div className="mt-4 inline-block bg-background px-6 py-3 rounded-2xl border-2 border-emerald-500/30 shadow-sm">
                <span className="text-xs uppercase font-bold text-muted-foreground block">Application Reference ID</span>
                <span className="font-mono text-2xl font-black text-primary tracking-wider">
                  {submittedData.applicationRef}
                </span>
              </div>
            </div>

            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm bg-muted/20 p-5 rounded-2xl border border-border">
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Student Name</span>
                  <p className="font-bold text-foreground text-base">{submittedData.applicantName}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Class Applied</span>
                  <p className="font-bold text-foreground text-base">{selectedClass?.name || submittedData.classId}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Contact Phone</span>
                  <p className="font-bold text-foreground">{submittedData.phone}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Submission Date</span>
                  <p className="font-bold text-foreground">{new Date(submittedData.submissionDate || Date.now()).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 text-sm text-muted-foreground space-y-1">
                <p className="font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" /> Next Steps:
                </p>
                <p>1. Keep your Application Reference ID safe for checking status.</p>
                <p>2. The admission office will review your application and send test details via SMS/Phone.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-border">
                <Button 
                  variant="outline"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto"
                >
                  <Printer className="w-4 h-4 me-2" /> Print Application Slip
                </Button>
                <Button 
                  onClick={() => {
                    setSubmittedData(null);
                    reset();
                  }}
                  className="w-full sm:w-auto"
                >
                  Apply For Another Student
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg border-primary/10 bg-white dark:bg-card">
            <CardHeader className="bg-primary/5 rounded-t-xl border-b border-border">
              <CardTitle className="text-xl">Student & Guardian Information</CardTitle>
              <CardDescription>
                Please provide accurate details matching the applicant's official birth certificate.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Student Full Name *</label>
                    <Input {...register("studentName")} placeholder="e.g. John Doe" />
                    {errors.studentName && <p className="text-destructive text-xs">{errors.studentName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Class Applying For *</label>
                    <select
                      {...register("classId")}
                      className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Select Target Class</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                    {errors.classId && <p className="text-destructive text-xs">{errors.classId.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Father's Full Name *</label>
                    <Input {...register("fatherName")} placeholder="Father's full name" />
                    {errors.fatherName && <p className="text-destructive text-xs">{errors.fatherName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mother's Full Name *</label>
                    <Input {...register("motherName")} placeholder="Mother's full name" />
                    {errors.motherName && <p className="text-destructive text-xs">{errors.motherName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Guardian Contact Phone *</label>
                    <Input {...register("phone")} placeholder="+880 1..." />
                    {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date of Birth</label>
                    <Input type="date" {...register("dateOfBirth")} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Gender</label>
                    <select
                      {...register("gender")}
                      className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Previous School Attended</label>
                    <Input {...register("previousSchool")} placeholder="Previous school name (if any)" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Residential Address</label>
                    <Input {...register("address")} placeholder="Street, City, Postal Code" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={submitAdmissionMutation.isPending}
                    className="font-bold min-w-[160px]"
                  >
                    {submitAdmissionMutation.isPending ? "Submitting..." : t("apply_now")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </Section>
  );
}

