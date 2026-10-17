'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetSchoolProfile } from '@/hooks/api/school/useSchoolQueries';
import { PageIntro, Glass } from '../common/ModernCommon';

export function ModernLeadership() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data } = useGetSchoolProfile(school_id);

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <PageIntro title={t('leadership_title')} subtitle="Institutional Messages" />
      <div className="grid gap-6 md:grid-cols-2">
        {/* Principal Message */}
        <Glass>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary grid size-16 place-items-center overflow-hidden rounded-2xl text-xl font-black">
              {data?.principal_image_url ? (
                <img
                  src={data.principal_image_url}
                  alt={data.principal_name || 'Principal'}
                  className="size-full object-cover"
                />
              ) : (
                data?.principal_name?.slice(0, 1) || 'P'
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {data?.principal_name || 'Principal'}
              </h2>
              <p className="text-muted-foreground text-sm">School Principal</p>
            </div>
          </div>
          <blockquote className="text-foreground/85 mt-6 text-sm sm:text-base leading-relaxed italic">
            “{data?.principal_message || t('about_intro')}”
          </blockquote>
        </Glass>

        {/* Chairman / Founder Message */}
        <Glass>
          <div className="flex items-center gap-4">
            <div className="bg-secondary/15 text-secondary grid size-16 place-items-center overflow-hidden rounded-2xl text-xl font-black">
              {data?.chairman_image_url ? (
                <img
                  src={data.chairman_image_url}
                  alt={data.chairman_name || 'Chairman'}
                  className="size-full object-cover"
                />
              ) : (
                data?.chairman_name?.slice(0, 1) || 'C'
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {data?.chairman_name || 'Chairman of the Board'}
              </h2>
              <p className="text-muted-foreground text-sm">Governing Body</p>
            </div>
          </div>
          <blockquote className="text-foreground/85 mt-6 text-sm sm:text-base leading-relaxed italic">
            “
            {data?.chairman_message ||
              'Dedicated to fostering world-class academic standards, personal integrity, and lifelong learning for every student.'}
            ”
          </blockquote>
        </Glass>
      </div>
    </div>
  );
}
