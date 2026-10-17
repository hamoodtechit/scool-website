"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetSchoolProfile } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { extractErrorMessage } from "@/utils/error";
import { AlertCircle } from "lucide-react";

export function AboutSchool() {
  const { school_id } = useSchool();
  const { data: profile, isLoading, isError, error } = useGetSchoolProfile(school_id);

  return (
    <Section>
      <SectionHeading 
        title="About Our School" 
        subtitle="Learn about our history, mission, and vision for the future."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : isError ? (
          <div className="bg-destructive/10 p-6 rounded-xl border border-destructive/20 text-center">
            <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
            <p className="text-destructive font-medium">{extractErrorMessage(error)}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <Card className="shadow-sm border-primary/10">
              <CardContent className="p-8 prose dark:prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-primary mb-4">Our History</h3>
                <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {profile?.history || "No history information available at this time."}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-sm border-primary/10">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To be a globally recognized institution that cultivates leadership, fosters innovation, and develops lifelong learners who are ready to face the challenges of the 21st century.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-primary/10">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 13-10.5 10.5a2.83 2.83 0 0 1-4 0l-4-4a2.83 2.83 0 0 1 0-4L14 5"/><path d="M18 14 10.5 6.5"/><path d="m15 11 3-3"/><path d="m11 15 3-3"/><path d="m7 19 3-3"/><path d="M4.5 4.5 6 6"/><path d="m11 2.5 1.5 1.5"/><path d="m21.5 11.5-1.5-1.5"/></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide a nurturing and dynamic learning environment where students are empowered to achieve academic excellence, embrace diversity, and contribute meaningfully to society.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-sm border-primary/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Core Values</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { title: "Excellence", desc: "Striving for the best in all endeavors." },
                    { title: "Integrity", desc: "Acting with honesty and strong moral principles." },
                    { title: "Respect", desc: "Valuing diversity and each individual." },
                    { title: "Innovation", desc: "Encouraging creative problem solving." }
                  ].map((value, i) => (
                    <div key={i} className="bg-muted/30 p-4 rounded-xl border border-border">
                      <h4 className="font-bold text-lg text-foreground mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Section>
  );
}
