'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { PageIntro, Glass } from '../common/ModernCommon';
import * as Icons from 'lucide-react';
import { Sparkles } from 'lucide-react';

export function ModernFacilities({ facilities = [] }: { facilities?: any[] }) {
  const t = useTranslations('ModernPages');
  const displayFacilities =
    facilities.length > 0
      ? facilities
      : [
          {
            name: 'Central Library',
            icon: 'Library',
            description:
              'Vast collection of academic reference books, digital archives, and quiet study spaces.',
          },
          {
            name: 'Science & Innovation Labs',
            icon: 'FlaskConical',
            description:
              'State-of-the-art physics, chemistry, and biology research equipment.',
          },
          {
            name: 'Sports Complex',
            icon: 'Trophy',
            description:
              'Full-size football pitch, indoor basketball court, and athletic track fields.',
          },
          {
            name: 'Digital Computing Centre',
            icon: 'Sparkles',
            description:
              'High-speed internet workstations with modern programming and robotics toolsets.',
          },
        ];

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <PageIntro title={t('facilities_title')} subtitle="Campus Infrastructure" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayFacilities.map((facility, idx) => {
          const Icon = (Icons as any)[facility.icon || 'Star'] || Sparkles;
          return (
            <Glass
              key={facility.id || idx}
              className="group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {facility.photoUrl ? (
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-4">
                    <img
                      src={facility.photoUrl}
                      alt={facility.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="bg-primary/10 text-primary grid size-12 place-items-center rounded-2xl mb-4">
                    <Icon className="size-6 transition-transform group-hover:scale-110" />
                  </div>
                )}
                <h2 className="font-bold text-lg">{facility.name}</h2>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {facility.description}
                </p>
              </div>
            </Glass>
          );
        })}
      </div>
    </div>
  );
}
