'use client';

import React, { ComponentType } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetPrograms } from '@/hooks/api/school/useSchoolQueries';
import { PageIntro, Glass } from '../common/ModernCommon';
import { Library, FileText, CheckCircle2, ArrowUpRight } from 'lucide-react';

export function ModernAcademics() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data: programs = [] } = useGetPrograms(school_id);

  const cards: Array<[ComponentType<{ className?: string }>, string, string, string]> = [
    [Library, t('schedule_title'), '/academics/schedule', 'View daily period routines, timings, and room schedules.'],
    [FileText, t('rules_title'), '/academics/rules', 'Code of conduct, student discipline guidelines, and syllabuses.'],
    [CheckCircle2, t('attendance_title'), '/academics/attendance', 'Institutional attendance requirements and leave policies.'],
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-14 sm:space-y-20">
      <div>
        <PageIntro title={t('academics_title')} intro={t('academics_intro')} />

        {/* Dynamic Academic Programs */}
        {programs.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              Academic Pathways
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {programs.map((program) => (
                <Glass
                  key={program.id}
                  className="group hover:border-primary/40 overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={program.image_url}
                      alt={program.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold">{program.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      {program.description}
                    </p>
                  </div>
                </Glass>
              ))}
            </div>
          </div>
        )}

        {/* Academic Quick Portals */}
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map(([Icon, title, href, desc]) => (
            <Link
              key={href}
              href={href}
              className="group border-border/60 bg-card/75 shadow-primary/5 hover:border-primary/40 rounded-3xl border p-6 shadow-xl backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <Icon className="text-primary size-7 transition-transform group-hover:scale-110" />
              <h2 className="mt-6 text-xl font-bold">{title}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {desc}
              </p>
              <ArrowUpRight className="text-primary mt-6 size-5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
