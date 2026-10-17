'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { PageIntro, Glass } from '../common/ModernCommon';
import { Users, Trophy, HeartHandshake, Sparkles } from 'lucide-react';

export function ModernStudentLife() {
  const t = useTranslations('ModernPages');

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <PageIntro title={t('student_life_title')} subtitle="Campus Experience & Societies" />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Student Clubs & Societies',
            desc: 'Debate, Robotics & Coding, Science Olympiad, Arts & Culture, and English Language societies.',
            icon: Users,
          },
          {
            title: 'Athletics & Physical Wellbeing',
            desc: 'Annual sports meet, inter-school football, basketball, badminton tournaments, and yoga sessions.',
            icon: Trophy,
          },
          {
            title: 'Community & Leadership',
            desc: 'Student prefect councils, environmental campaigns, disaster relief volunteering, and peer mentorship.',
            icon: HeartHandshake,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Glass key={item.title}>
              <div className="bg-primary/10 text-primary grid size-12 place-items-center rounded-2xl mb-4">
                <Icon className="size-6" />
              </div>
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {item.desc}
              </p>
            </Glass>
          );
        })}
      </div>
    </div>
  );
}
