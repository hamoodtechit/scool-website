"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetStats } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCounter() {
  const { school_id } = useSchool();
  const { data: stats, isLoading } = useGetStats(school_id);

  if (isLoading) {
    return (
      <Section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full bg-primary-foreground/20 rounded-xl" />
          ))}
        </div>
      </Section>
    );
  }

  if (!stats || stats.length === 0) return null;

  return (
    <Section className="bg-primary text-primary-foreground py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(stat => (
          <div key={stat.id} className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-primary-foreground/80 font-medium text-sm md:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
