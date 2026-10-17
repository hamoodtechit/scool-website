'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetEvents } from '@/hooks/api/school/useSchoolQueries';
import { PageIntro, Glass, Empty } from '../common/ModernCommon';
import { CalendarDays, MapPin } from 'lucide-react';

export function ModernEvents() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data: events = [] } = useGetEvents(school_id);

  const [tab, setTab] = useState<'all' | 'upcoming' | 'past'>('all');

  const today = new Date().toISOString().split('T')[0];

  const filteredEvents = events.filter((e) => {
    if (tab === 'upcoming') return e.date >= today;
    if (tab === 'past') return e.date < today;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageIntro title={t('events_title')} subtitle="Academic Calendar & Highlights" />
        <div className="flex gap-2">
          {(['all', 'upcoming', 'past'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-xl px-4 py-2 text-xs font-bold capitalize transition-all ${
                tab === key
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card/70 border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground border'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredEvents.map((event) => (
          <Glass
            key={event.id}
            className="hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex gap-4">
              <div className="bg-primary/10 text-primary grid size-12 shrink-0 place-items-center rounded-2xl">
                <CalendarDays className="size-5" />
              </div>
              <div>
                <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
                  {event.date}
                </p>
                <h2 className="mt-2 text-xl font-bold">{event.title}</h2>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {event.description}
                </p>
                {event.location && (
                  <p className="text-muted-foreground mt-3 flex items-center gap-2 text-xs">
                    <MapPin className="size-3" />
                    {event.location}
                  </p>
                )}
              </div>
            </div>
          </Glass>
        ))}
      </div>

      {!filteredEvents.length && <Empty text={t('no_items')} />}
    </div>
  );
}
