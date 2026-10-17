'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { PageIntro, Glass } from '../common/ModernCommon';
import { CheckCircle2, FileText, Calendar, ArrowUpRight } from 'lucide-react';

export function ModernAdmissionInfo() {
  const t = useTranslations('ModernPages');

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <PageIntro
        title={t('admission_info_title')}
        intro={t('admissions_intro')}
        subtitle="Policy & Criteria"
      />

      <Glass>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Why Choose Us',
              desc: 'Proven academic board track record, holistic personality development, and contemporary STEM research facilities.',
              icon: CheckCircle2,
            },
            {
              title: 'Eligibility & Requirements',
              desc: 'Original birth certificate copy, previous grade academic transcripts, transfer certificate, and passport-size photographs.',
              icon: FileText,
            },
            {
              title: 'Evaluation Criteria',
              desc: 'Merit-based written evaluation and interaction session ensuring transparent, equal academic opportunity for all learners.',
              icon: Calendar,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-muted/40 border-border/50 rounded-2xl border p-5">
                <Icon className="text-primary size-6 mb-3" />
                <h3 className="font-bold text-base">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-xs leading-6">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="border-border/50 mt-8 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            Have questions about upcoming admissions, schedules, or requirements? Contact our administration office.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold shadow hover:opacity-90"
          >
            Contact Admissions Office <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Glass>
    </div>
  );
}
