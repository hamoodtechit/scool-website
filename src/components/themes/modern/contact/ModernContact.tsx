'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetSchoolProfile, useSubmitContact } from '@/hooks/api/school/useSchoolQueries';
import type { ContactSubmissionResponse } from '@/types/school.types';
import { PageIntro, Glass } from '../common/ModernCommon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Send, Clock, CheckCircle } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ModernContact() {
  const t = useTranslations('Modern');
  const p = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data: profile } = useGetSchoolProfile(school_id);
  const submitContactMutation = useSubmitContact(school_id);

  const [submittedData, setSubmittedData] = useState<ContactSubmissionResponse | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (formData: ContactFormValues) => {
    try {
      const res = await submitContactMutation.mutateAsync(formData);
      setSubmittedData(res);
      toast.success('Your message has been sent to our administration.');
      reset();
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const lat = profile?.latitude || '23.8103';
  const lng = profile?.longitude || '90.4125';

  return (
    <div className="mx-auto max-w-6xl space-y-10 sm:space-y-14">
      <PageIntro title={p('contact_title')} intro={t('contact_description')} />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        {/* Left Side: Contact Details & Map */}
        <Glass className="flex flex-col justify-between">
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
              {t('contact_cta')}
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Let’s make the next step simple.
            </h2>
            <p className="text-muted-foreground mt-4 leading-7 text-sm">
              Our campus administration office is ready to assist you with inquiries, campus visits, and academic admissions.
            </p>

            <div className="mt-8 space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Campus Address</h4>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {profile?.address || 'Main Campus'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
                  <Phone className="size-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Contact Telephone</h4>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {profile?.phone || '+880 0000 000000'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Official Email</h4>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {profile?.email || 'hello@school.edu'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Office Hours</h4>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Sunday – Thursday: 8:00 AM – 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Campus Map Embed */}
          <div className="border-border/50 mt-8 overflow-hidden rounded-2xl border">
            <iframe
              src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Campus Location Map"
            />
          </div>
        </Glass>

        {/* Right Side: Message Submission Form */}
        <Glass>
          <h2 className="text-2xl font-bold">Send an Inquiry</h2>
          <p className="text-muted-foreground mt-1 text-xs">
            Have questions about admissions, fees, or academics? Leave us a message.
          </p>

          {submittedData?.success ? (
            <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
              <CheckCircle className="mx-auto size-12 text-emerald-500" />
              <h3 className="mt-4 text-xl font-bold text-emerald-600 dark:text-emerald-400">
                Message Delivered!
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Thank you, {submittedData.name}. Your inquiry has been routed to administration.
              </p>
              <p className="text-muted-foreground text-xs mt-2 font-mono">
                Ticket Reference: {submittedData.ticketId}
              </p>
              <Button
                onClick={() => setSubmittedData(null)}
                className="mt-6 rounded-xl"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-muted-foreground text-xs font-semibold">
                    Your Name *
                  </label>
                  <Input
                    {...register('name')}
                    placeholder="Full Name"
                    className="bg-background/50 mt-1 rounded-xl"
                  />
                  {errors.name && (
                    <p className="text-destructive mt-1 text-xs">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-muted-foreground text-xs font-semibold">
                    Email Address *
                  </label>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    className="bg-background/50 mt-1 rounded-xl"
                  />
                  {errors.email && (
                    <p className="text-destructive mt-1 text-xs">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-muted-foreground text-xs font-semibold">
                  Subject *
                </label>
                <Input
                  {...register('subject')}
                  placeholder="General Inquiry / Admission Question"
                  className="bg-background/50 mt-1 rounded-xl"
                />
                {errors.subject && (
                  <p className="text-destructive mt-1 text-xs">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="text-muted-foreground text-xs font-semibold">
                  Your Message *
                </label>
                <Textarea
                  {...register('message')}
                  placeholder="Write your message or inquiry here..."
                  className="bg-background/50 mt-1 min-h-[140px] rounded-xl"
                />
                {errors.message && (
                  <p className="text-destructive mt-1 text-xs">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitContactMutation.isPending}
                className="w-full rounded-xl py-6 font-bold text-base"
              >
                {submitContactMutation.isPending ? (
                  'Sending Message...'
                ) : (
                  <>
                    <Send className="me-2 size-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </Glass>
      </div>
    </div>
  );
}
