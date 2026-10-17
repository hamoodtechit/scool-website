'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetGovernance } from '@/hooks/api/school/useSchoolQueries';
import { PageIntro, Glass, Empty } from '../common/ModernCommon';
import { Users } from 'lucide-react';

export function ModernGovernance() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data = [] } = useGetGovernance(school_id);

  const [selectedType, setSelectedType] = useState('ALL');

  const filteredMembers = data.filter((person: any) => {
    if (selectedType === 'ALL') return true;
    return person.type?.toUpperCase() === selectedType;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageIntro title={t('governance_title')} subtitle="School Management & Trustees" />
        <div className="flex gap-2">
          {[
            { id: 'ALL', label: 'All Members' },
            { id: 'GOVERNING_BODY', label: 'Governing Body' },
            { id: 'FOUNDER', label: 'Founders' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedType === tab.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card/70 border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((person: any) => (
          <Glass
            key={person.id}
            className="hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary grid size-14 place-items-center overflow-hidden rounded-2xl shrink-0">
                {person.image ? (
                  <img
                    src={person.image}
                    alt={person.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <Users className="size-6" />
                )}
              </div>
              <div>
                <h2 className="font-bold text-base">{person.name}</h2>
                <p className="text-primary text-xs font-semibold mt-0.5">{person.role}</p>
              </div>
            </div>
          </Glass>
        ))}
      </div>
      {!filteredMembers.length && <Empty text={t('no_items')} />}
    </div>
  );
}
