'use client';

import React, { ReactNode } from 'react';
import { useSchool } from '@/components/providers/school-provider';
import { useGetSchoolProfile } from '@/hooks/api/school/useSchoolQueries';

export function PageIntro({
  title,
  intro,
  subtitle,
}: {
  title: string;
  intro?: string;
  subtitle?: string;
}) {
  const { school_id } = useSchool();
  const { data: profile } = useGetSchoolProfile(school_id);
  const tag = subtitle || profile?.name || 'Campus Portal';

  return (
    <div className="mb-10 sm:mb-12 lg:mb-14 max-w-3xl">
      <p className="text-primary text-xs font-bold tracking-[0.22em] uppercase">
        {tag}
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
        {title}
      </h1>
      {intro && (
        <p className="text-muted-foreground mt-4 text-lg leading-8">{intro}</p>
      )}
    </div>
  );
}

export function Glass({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-border/60 bg-card/75 shadow-primary/5 rounded-3xl border p-6 shadow-xl backdrop-blur sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function Empty({ text }: { text: string }) {
  return (
    <p className="text-muted-foreground py-10 text-center text-sm">{text}</p>
  );
}
