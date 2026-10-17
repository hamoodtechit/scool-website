"use client";

import React, { useState } from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetSchoolProfile, useSubmitContact } from "@/hooks/api/school/useSchoolQueries";
import type { ContactSubmissionResponse } from "@/types/school.types";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/error";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactUs() {
  const { school_id } = useSchool();
  const { data: profile, isLoading, isError, error } = useGetSchoolProfile(school_id);
  const submitContactMutation = useSubmitContact(school_id);
  const [submittedTicket, setSubmittedTicket] = useState<ContactSubmissionResponse | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await submitContactMutation.mutateAsync(data);
      setSubmittedTicket(res);
      toast.success("Message sent successfully! We will get back to you soon.");
      reset();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="bg-muted/10 min-h-screen pb-20">
      {/* Map Header */}
      <div className="w-full h-[400px] bg-muted relative">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-none" />
        ) : (
          <iframe 
            src={`https://www.google.com/maps?q=${profile?.latitude || '23.8103'},${profile?.longitude || '90.4125'}&z=15&output=embed`}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="School Location Map"
          ></iframe>
        )}
      </div>

      <Section className="-mt-16 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-primary/10 h-full bg-white dark:bg-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                {isLoading ? (
                  <div className="space-y-6">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : isError ? (
                  <div className="bg-destructive/10 p-4 rounded-lg flex gap-3 text-destructive">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{extractErrorMessage(error)}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Our Location</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {profile?.address || "123 Education Street, Knowledge City"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Phone Number</h4>
                        <p className="text-muted-foreground text-sm">
                          {profile?.phone || "+880 1234-567890"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email Address</h4>
                        <p className="text-muted-foreground text-sm">
                          {profile?.email || "info@school.edu"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Office Hours</h4>
                        <p className="text-muted-foreground text-sm">
                          Sun - Thu: 8:00 AM - 4:00 PM<br/>
                          Fri & Sat: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form / Confirmation */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-primary/10 bg-white dark:bg-card">
              <CardContent className="p-8">
                {submittedTicket ? (
                  <div className="text-center py-6 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                    <div className="mx-auto w-16 h-16 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-foreground">Message Dispatched!</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Thank you, <span className="font-bold text-foreground">{submittedTicket.name}</span>. Your message has been routed to our administrative desk.
                      </p>
                    </div>

                    <div className="inline-block bg-primary/5 border border-primary/20 px-6 py-3 rounded-2xl">
                      <span className="text-xs uppercase font-bold text-muted-foreground block">Inquiry Tracking Ticket</span>
                      <span className="font-mono text-2xl font-black text-primary tracking-wider">
                        {submittedTicket.ticketId}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      A copy of your inquiry ticket reference has been logged. Our helpdesk team typically responds within 1 business day.
                    </p>

                    <Button onClick={() => setSubmittedTicket(null)} className="mt-4">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <SectionHeading 
                      title="Send Us a Message" 
                      subtitle="Have a question or need more information? Fill out the form below."
                      className="mb-8 text-start items-start"
                    />
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Your Name *</label>
                          <Input {...register("name")} placeholder="John Doe" />
                          {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email Address *</label>
                          <Input {...register("email")} type="email" placeholder="john@example.com" />
                          {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subject *</label>
                        <Input {...register("subject")} placeholder="Admissions Inquiry" />
                        {errors.subject && <p className="text-destructive text-xs">{errors.subject.message}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Message *</label>
                        <Textarea 
                          {...register("message")} 
                          placeholder="Write your message here..." 
                          className="min-h-[150px]"
                        />
                        {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
                      </div>
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full md:w-auto font-bold" 
                        disabled={submitContactMutation.isPending}
                      >
                        {submitContactMutation.isPending ? (
                          "Sending Message..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 me-2" /> Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
        </div>
      </Section>
    </div>
  );
}

