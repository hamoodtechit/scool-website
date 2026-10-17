'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetClasses, useSubmitAdmission } from '@/hooks/api/school/useSchoolQueries';
import type { AdmissionSubmissionResponse } from '@/types/school.types';
import { PageIntro, Glass } from '../common/ModernCommon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowUpRight, CheckCircle, Printer, Sparkles, AlertCircle } from 'lucide-react';

const admissionSchema = z.object({
  studentName: z.string().min(2, 'Student full name is required'),
  classId: z.string().min(1, 'Please select a class'),
  fatherName: z.string().min(2, "Father's name is required"),
  motherName: z.string().min(2, "Mother's name is required"),
  phone: z.string().min(10, 'Valid contact phone number is required'),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  previousSchool: z.string().optional(),
  address: z.string().optional(),
});

type AdmissionFormValues = z.infer<typeof admissionSchema>;

export function ModernAdmissions() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data: classes = [] } = useGetClasses(school_id);
  const submitAdmissionMutation = useSubmitAdmission(school_id);

  const [submittedData, setSubmittedData] = useState<AdmissionSubmissionResponse | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      studentName: '',
      classId: '',
      fatherName: '',
      motherName: '',
      phone: '',
      dateOfBirth: '',
      gender: 'Male',
      previousSchool: '',
      address: '',
    },
  });

  const onSubmit = async (values: AdmissionFormValues) => {
    try {
      const res = await submitAdmissionMutation.mutateAsync(values);
      setSubmittedData(res);
      toast.success('Online admission application submitted successfully!');
      reset();
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit application. Please check your connection and try again.');
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-12 sm:space-y-16">
      <PageIntro title={t('admissions_title')} intro={t('admissions_intro')} />

      {/* Notice: Online Admissions Currently Inactive */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-950 dark:text-amber-200 shadow-sm backdrop-blur">
        <div className="flex items-start gap-3.5">
          <AlertCircle className="size-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm">Notice: Online Admissions Currently Inactive</h3>
            <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
              Direct online admission submissions are currently paused on this website portal. For enrollment inquiries, prospectus information, or campus visits, please contact our administrative desk.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="shrink-0 rounded-2xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md hover:opacity-90 transition-opacity"
        >
          Contact Administrative Desk
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        {/* Left Side: Admission Steps & Guide */}
        <Glass className="from-primary/15 to-secondary/10 flex flex-col justify-between bg-gradient-to-br">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background/50 px-3 py-1 text-xs font-semibold text-primary backdrop-blur mb-4">
              <Sparkles className="size-3.5" /> New Session Admissions
            </div>
            <h2 className="text-3xl font-black">
              A confident academic start for every student.
            </h2>
            <p className="text-muted-foreground mt-3 leading-7 text-sm">
              Explore our curriculum, submit student records online, and receive your application tracking reference instantly.
            </p>

            <div className="mt-8 space-y-3">
              {[
                {
                  step: '01',
                  title: 'Select Class & Apply',
                  desc: 'Submit student details, previous school history, and guardian contact.',
                },
                {
                  step: '02',
                  title: 'Review & Written Assessment',
                  desc: 'Admissions team evaluates records and schedules an interaction.',
                },
                {
                  step: '03',
                  title: 'Enrollment & Welcome',
                  desc: 'Complete fee payment and receive student ID and orientation kit.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-background/60 flex items-start gap-4 rounded-2xl p-4 border border-border/40"
                >
                  <span className="bg-primary text-primary-foreground grid size-9 shrink-0 place-items-center rounded-xl text-sm font-bold">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-border/50 mt-6 border-t pt-6">
            <Link
              href="/admissions/info"
              className="text-primary inline-flex items-center gap-2 text-sm font-bold hover:underline"
            >
              Read Admission Policy, Dates & Guidelines <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Glass>

        {/* Right Side: Interactive Admission Application Form */}
        <Glass>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Online Admission Application</h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Fill in all required fields accurately. You will receive an official application reference number.
            </p>
          </div>

          {submittedData?.success ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
              <CheckCircle className="mx-auto size-12 text-emerald-500" />
              <h3 className="mt-4 text-xl font-bold text-emerald-600 dark:text-emerald-400">
                Application Received!
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Your application has been received and queued for review.
              </p>

              <div className="bg-background/60 border border-emerald-500/30 mx-auto mt-5 max-w-sm rounded-xl p-4 text-start text-xs space-y-1.5">
                <p>
                  <span className="text-muted-foreground">Tracking Reference:</span>{' '}
                  <span className="font-mono font-bold text-sm text-primary">{submittedData.applicationRef}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Applicant Name:</span>{' '}
                  <span className="font-semibold">{submittedData.applicantName}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Contact Phone:</span>{' '}
                  <span className="font-semibold">{submittedData.phone}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Status:</span>{' '}
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{submittedData.status}</span>
                </p>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
                  <Printer className="me-2 size-4" /> Print Receipt
                </Button>
                <Button onClick={() => setSubmittedData(null)} className="rounded-xl">
                  Submit Another Application
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-muted-foreground text-xs font-semibold">
                    Student Full Name *
                  </label>
                  <Input
                    {...register('studentName')}
                    placeholder="e.g. Abrar Fahim"
                    className="bg-background/50 mt-1 rounded-xl"
                  />
                  {errors.studentName && (
                    <p className="text-destructive mt-1 text-xs">
                      {errors.studentName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-muted-foreground text-xs font-semibold">
                    Class Applying For *
                  </label>
                  <select
                    {...register('classId')}
                    className="bg-background/50 border-input h-10 w-full rounded-xl border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary mt-1"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                  {errors.classId && (
                    <p className="text-destructive mt-1 text-xs">
                      {errors.classId.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-muted-foreground text-xs font-semibold">
                    Father's Name *
                  </label>
                  <Input
                    {...register('fatherName')}
                    placeholder="Father's Full Name"
                    className="bg-background/50 mt-1 rounded-xl"
                  />
                  {errors.fatherName && (
                    <p className="text-destructive mt-1 text-xs">
                      {errors.fatherName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-muted-foreground text-xs font-semibold">
                    Mother's Name *
                  </label>
                  <Input
                    {...register('motherName')}
                    placeholder="Mother's Full Name"
                    className="bg-background/50 mt-1 rounded-xl"
                  />
                  {errors.motherName && (
                    <p className="text-destructive mt-1 text-xs">
                      {errors.motherName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-muted-foreground text-xs font-semibold">
                    Guardian Contact Phone *
                  </label>
                  <Input
                    {...register('phone')}
                    placeholder="+880 1..."
                    className="bg-background/50 mt-1 rounded-xl"
                  />
                  {errors.phone && (
                    <p className="text-destructive mt-1 text-xs">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-muted-foreground text-xs font-semibold">
                    Gender
                  </label>
                  <select
                    {...register('gender')}
                    className="bg-background/50 border-input h-10 w-full rounded-xl border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary mt-1"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-muted-foreground text-xs font-semibold">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    {...register('dateOfBirth')}
                    className="bg-background/50 mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-muted-foreground text-xs font-semibold">
                    Previous School (Optional)
                  </label>
                  <Input
                    {...register('previousSchool')}
                    placeholder="Previous School Name"
                    className="bg-background/50 mt-1 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted-foreground text-xs font-semibold">
                  Residential Address (Optional)
                </label>
                <Input
                  {...register('address')}
                  placeholder="Street, City, Postal Code"
                  className="bg-background/50 mt-1 rounded-xl"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={submitAdmissionMutation.isPending}
                  className="w-full rounded-xl py-6 font-bold text-base"
                >
                  {submitAdmissionMutation.isPending
                    ? 'Submitting Application...'
                    : 'Submit Online Application'}
                </Button>
              </div>
            </form>
          )}
        </Glass>
      </div>
    </div>
  );
}
