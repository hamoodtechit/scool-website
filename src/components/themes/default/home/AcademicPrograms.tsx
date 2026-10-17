"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetPrograms } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";

export function AcademicPrograms() {
  const { school_id } = useSchool();
  const { data: programs, isLoading } = useGetPrograms(school_id);

  if (isLoading) {
    return (
      <Section className="bg-muted/10">
        <SectionHeading title="Our Academic Pillars" subtitle="Discover our comprehensive educational journey." />
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[300px] w-full rounded-2xl" />
          ))}
        </div>
      </Section>
    );
  }

  if (!programs || programs.length === 0) return null;

  return (
    <Section className="bg-muted/10">
      <SectionHeading title="Our Academic Pillars" subtitle="Discover our comprehensive educational journey from early years to graduation." />
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map(program => (
          <Link key={program.id} href={program.href}>
            <Card className="h-[320px] overflow-hidden group cursor-pointer border-0 shadow-md relative rounded-2xl">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${program.image_url})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <CardContent className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{program.title}</h3>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 line-clamp-3">
                  {program.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
