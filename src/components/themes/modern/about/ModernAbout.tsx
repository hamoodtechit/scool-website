'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetSchoolProfile } from '@/hooks/api/school/useSchoolQueries';
import { PageIntro, Glass } from '../common/ModernCommon';
import { MapPin, Phone, Mail, Users, ArrowUpRight } from 'lucide-react';

export function ModernAbout() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data } = useGetSchoolProfile(school_id);

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <PageIntro title={t('about_title')} intro={t('about_intro')} />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <Glass>
          <h2 className="text-2xl font-bold">{t('history')}</h2>
          <p className="text-muted-foreground mt-4 leading-8 whitespace-pre-wrap">
            {data?.history || t('about_intro')}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="bg-primary/10 rounded-2xl p-5">
              <h3 className="text-primary font-bold">{t('mission')}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {data?.mission ||
                  'Learning that builds confidence, character, and a lifelong appetite for discovery.'}
              </p>
            </div>
            <div className="bg-secondary/10 rounded-2xl p-5">
              <h3 className="text-secondary font-bold">{t('vision')}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {data?.vision ||
                  'A future where every learner has the tools to make a meaningful difference.'}
              </p>
            </div>
          </div>
        </Glass>
        <Glass className="from-primary/15 to-secondary/10 relative overflow-hidden bg-gradient-to-br">
          <div className="bg-primary/20 absolute -end-10 -top-10 size-40 rounded-full blur-3xl" />
          <h2 className="relative text-2xl font-bold">
            {data?.name || 'Our School'}
          </h2>
          <div className="text-muted-foreground relative mt-6 space-y-4 text-sm">
            <p className="flex gap-3">
              <MapPin className="text-primary size-4 shrink-0" />
              {data?.address || 'Learning City'}
            </p>
            <p className="flex gap-3">
              <Phone className="text-primary size-4 shrink-0" />
              {data?.phone || '+880 0000 000000'}
            </p>
            <p className="flex gap-3">
              <Mail className="text-primary size-4 shrink-0" />
              {data?.email || 'hello@school.edu'}
            </p>
            <p className="flex gap-3">
              <Users className="text-primary size-4 shrink-0" />A connected
              learning community
            </p>
          </div>
          <Link
            href="/contact"
            className="text-primary relative mt-8 inline-flex items-center gap-2 text-sm font-bold"
          >
            Connect with us <ArrowUpRight className="size-4" />
          </Link>
        </Glass>
      </div>
    </div>
  );
}
