"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetSchoolProfile } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { Quote, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { extractErrorMessage } from "@/utils/error";

export function PrincipalSpeech() {
  const { school_id } = useSchool();
  const { data: profile, isLoading, isError, error } = useGetSchoolProfile(school_id);

  if (isLoading) {
    return (
      <Section>
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl mx-auto">
          <Skeleton className="w-64 h-64 md:w-80 md:h-80 rounded-full" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section>
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl mx-auto bg-destructive/10 p-8 rounded-2xl border border-destructive/20">
          <AlertCircle className="w-16 h-16 text-destructive flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-destructive">Failed to load Principal's Message</h3>
            <p className="text-destructive/80 font-medium">{extractErrorMessage(error)}</p>
          </div>
        </div>
      </Section>
    );
  }

  if (!profile) return null;

  return (
    <Section>
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center max-w-5xl mx-auto">
        
        {/* Principal Image */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
          <div className="absolute inset-0 bg-primary/10 rounded-full transform translate-x-4 translate-y-4 -z-10" />
          <img 
            src={profile.principal_image_url || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop"} 
            alt={profile.principal_name}
            className="w-full h-full object-cover rounded-full border-4 border-background shadow-xl"
          />
        </div>

        {/* Speech Content */}
        <div className="flex-1 text-center md:text-start relative">
          <Quote className="absolute -top-6 -start-6 md:-start-10 w-16 h-16 text-primary/10 rotate-180" />
          <h2 className="text-3xl font-bold mb-2">Message from the Principal</h2>
          <h3 className="text-xl text-primary font-semibold mb-6">{profile.principal_name}</h3>
          
          <div className="prose dark:prose-invert prose-lg text-muted-foreground relative z-10">
            <p className="italic">
              "{profile.principal_message}"
            </p>
          </div>
        </div>

      </div>
    </Section>
  );
}
