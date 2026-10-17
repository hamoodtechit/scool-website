'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetDownloads } from '@/hooks/api/school/useSchoolQueries';
import { PageIntro, Glass } from '../common/ModernCommon';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

export function ModernRules() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data: downloads = [] } = useGetDownloads(school_id);

  // Filter downloadable syllabuses
  const syllabusDocs = downloads.filter((d) =>
    d.category.toLowerCase().includes('syllabus') || d.category.toLowerCase().includes('academic')
  );

  return (
    <div className="mx-auto max-w-5xl space-y-10 sm:space-y-14">
      <PageIntro title={t('rules_title')} subtitle="Student Guidelines & Curriculum" />

      {/* Code of Conduct Guidelines */}
      <Glass>
        <h2 className="text-xl font-bold mb-4">Student Code of Conduct</h2>
        <div className="space-y-3">
          {[
            'Arrive on campus punctually, fully equipped with required learning materials.',
            'Maintain respect and integrity within our academic and diverse community.',
            'Exercise digital discipline and uphold care for school science laboratories and libraries.',
            'Wear the prescribed institutional uniform with dignity throughout school hours.',
            'Active participation in collaborative co-curricular clubs and community services.',
          ].map((item, index) => (
            <div
              key={item}
              className="border-border/50 bg-background/50 flex items-center gap-4 rounded-2xl border p-4"
            >
              <span className="bg-primary text-primary-foreground grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold">
                {index + 1}
              </span>
              <p className="font-semibold text-sm leading-6">{item}</p>
            </div>
          ))}
        </div>
      </Glass>

      {/* Dynamic Class Syllabuses Downloads */}
      {syllabusDocs.length > 0 && (
        <Glass>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Download Class Syllabuses</h2>
              <p className="text-muted-foreground text-xs mt-0.5">
                Official curriculum breakdowns and exam syllabuses.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {syllabusDocs.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border/50 hover:border-primary/40 bg-background/50 flex items-center justify-between rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <FileText className="text-primary size-5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">{doc.title}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {doc.size} · {doc.date}
                    </p>
                  </div>
                </div>
                <Download className="text-primary size-4 shrink-0" />
              </a>
            ))}
          </div>
        </Glass>
      )}
    </div>
  );
}
