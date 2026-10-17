"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetSchoolProfile } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Quote } from "lucide-react";
import { extractErrorMessage } from "@/utils/error";
import { AlertCircle } from "lucide-react";

export function LeadershipSpeeches() {
  const { school_id } = useSchool();
  const { data: profile, isLoading, isError, error } = useGetSchoolProfile(school_id);

  if (isError) {
    return (
      <Section className="bg-muted/5 min-h-screen">
        <div className="bg-destructive/10 p-6 rounded-xl border border-destructive/20 text-center max-w-2xl mx-auto mt-10">
          <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
          <h3 className="text-lg font-bold text-destructive">Failed to load leadership profiles</h3>
          <p className="text-destructive font-medium">{extractErrorMessage(error)}</p>
        </div>
      </Section>
    );
  }

  return (
    <Section className="bg-muted/5 min-h-screen pb-20">
      <SectionHeading 
        title="Leadership Messages" 
        subtitle="Guiding our institution towards excellence and innovation."
      />

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Principal's Message */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-white p-8 rounded-2xl shadow-lg border border-primary/10">
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative rounded-full md:rounded-2xl overflow-hidden border-4 border-primary/20 shadow-inner">
            {isLoading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <img 
                src={profile?.principal_image_url || "https://placehold.co/400x400/1e293b/ffffff?text=Principal"} 
                alt={profile?.principal_name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div className="flex-1 space-y-4 relative">
            <Quote className="absolute -top-4 -start-4 w-12 h-12 text-primary/10 rotate-180" />
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-32 w-full mt-4" />
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-3xl font-bold text-foreground">{profile?.principal_name}</h3>
                  <p className="text-primary font-medium text-lg mt-1">Principal</p>
                </div>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed pt-2">
                  <p className="italic">
                    "{profile?.principal_message || "Welcome to our esteemed institution. We are committed to fostering a love for learning, encouraging critical thinking, and instilling strong moral values in our students."}"
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Chairman's Message (Mock Data for now since it's not in the API yet) */}
        <div className="flex flex-col md:flex-row-reverse gap-8 items-center md:items-start bg-white p-8 rounded-2xl shadow-lg border border-primary/10">
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative rounded-full md:rounded-2xl overflow-hidden border-4 border-primary/20 shadow-inner">
            <img 
              src="https://placehold.co/400x400/0f172a/ffffff?text=Chairman" 
              alt="Chairman"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 space-y-4 relative text-center md:text-end">
            <Quote className="absolute -top-4 -end-4 w-12 h-12 text-primary/10" />
            <div>
              <h3 className="text-3xl font-bold text-foreground">Dr. Ahmed Hasan</h3>
              <p className="text-primary font-medium text-lg mt-1">Chairman, Governing Body</p>
            </div>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed pt-2 ml-auto">
              <p className="italic">
                "Education is the most powerful weapon which you can use to change the world. Our vision is to provide world-class facilities and top-tier educators to ensure every child reaches their maximum potential."
              </p>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}

