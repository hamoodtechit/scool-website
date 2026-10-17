'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetStaff } from '@/hooks/api/school/useSchoolQueries';
import type { Staff } from '@/types/school.types';
import { PageIntro, Glass, Empty } from '../common/ModernCommon';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function ModernStaff() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data: staffList = [] } = useGetStaff(school_id);

  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique departments dynamically from staffList
  const departments = [
    'All',
    ...Array.from(new Set(staffList.map((s) => s.department).filter(Boolean))),
  ];

  const filteredStaff = staffList.filter((person: Staff) => {
    const matchesDept = selectedDept === 'All' || person.department === selectedDept;
    const matchesSearch =
      !searchQuery.trim() ||
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.designation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageIntro title={t('staff_title')} intro={t('staff_intro')} />
        <div className="relative w-full max-w-xs self-start sm:self-center">
          <Search className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teachers by name..."
            className="bg-card/70 ps-9 rounded-xl"
          />
        </div>
      </div>

      {/* Dynamic Department Filter Pills */}
      {departments.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => {
            const isSelected = selectedDept === dept;
            return (
              <button
                key={dept as string}
                onClick={() => setSelectedDept(dept as string)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card/70 border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground border'
                }`}
              >
                {dept}
              </button>
            );
          })}
        </div>
      )}

      {/* Staff Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStaff.map((person: Staff) => (
          <Glass
            key={person.id}
            className="hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="bg-primary/10 text-primary grid size-16 place-items-center overflow-hidden rounded-2xl text-xl font-black">
              {person.image_url ? (
                <img
                  src={person.image_url}
                  alt={person.name}
                  className="size-full object-cover"
                />
              ) : (
                person.name.slice(0, 1)
              )}
            </div>
            <h2 className="mt-5 text-xl font-bold">{person.name}</h2>
            <p className="text-primary mt-1 text-sm font-semibold">{person.designation}</p>
            <p className="text-muted-foreground mt-2 text-xs">
              {person.department || 'Academic Faculty'}
            </p>
          </Glass>
        ))}
      </div>

      {!filteredStaff.length && <Empty text={t('no_items')} />}
    </div>
  );
}
