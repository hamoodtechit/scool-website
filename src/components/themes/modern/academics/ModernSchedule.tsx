'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetClasses, useGetClassRoutines } from '@/hooks/api/school/useSchoolQueries';
import { PageIntro, Glass, Empty } from '../common/ModernCommon';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Printer, User } from 'lucide-react';

export function ModernSchedule() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data: classes = [], isLoading: classesLoading } = useGetClasses(school_id);

  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('');

  // Active class or fallback to first
  const activeClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const activeClassId = selectedClassId || activeClass?.id || '';

  const { data: routines = [], isLoading: routinesLoading } = useGetClassRoutines(
    school_id,
    activeClassId,
    selectedSectionId || undefined
  );

  // Group slots by day
  const allSlots = routines.flatMap((r) => r.classRoutineSlots || []);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

  const slotsByDay = daysOfWeek.map((day) => {
    const slots = allSlots
      .filter((s) => s.day?.toLowerCase() === day.toLowerCase())
      .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
    return { day, slots };
  });

  const hasAnySlots = allSlots.length > 0;

  // Fallback demo routine if school has not populated routine slots yet
  const fallbackSchedule = [
    { day: 'Sunday', periods: ['08:30 - 09:15 · Mathematics (Room 101)', '09:15 - 10:00 · English (Room 101)', '10:00 - 10:45 · Science (Lab A)', '11:15 - 12:00 · History (Room 101)'] },
    { day: 'Monday', periods: ['08:30 - 09:15 · Science (Lab A)', '09:15 - 10:00 · Mathematics (Room 101)', '10:00 - 10:45 · Bangla (Room 101)', '11:15 - 12:00 · Geography (Room 101)'] },
    { day: 'Tuesday', periods: ['08:30 - 09:15 · English (Room 101)', '09:15 - 10:00 · ICT & Computing (Lab C)', '10:00 - 10:45 · Mathematics (Room 101)', '11:15 - 12:00 · Art & Culture (Studio)'] },
    { day: 'Wednesday', periods: ['08:30 - 09:15 · Bangla (Room 101)', '09:15 - 10:00 · Science (Lab A)', '10:00 - 10:45 · Religion (Room 101)', '11:15 - 12:00 · Physical Ed. (Ground)'] },
    { day: 'Thursday', periods: ['08:30 - 09:15 · History (Room 101)', '09:15 - 10:00 · Mathematics (Room 101)', '10:00 - 10:45 · Library & Research', '11:15 - 12:00 · Club Activities'] },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageIntro title={t('schedule_title')} subtitle="Academic Class Routines" />
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="self-start rounded-xl sm:self-center"
        >
          <Printer className="me-2 size-4" /> Print Schedule
        </Button>
      </div>

      {/* Class Selector Filters */}
      {classes.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground me-2 text-xs font-bold uppercase tracking-wider">
            Select Class:
          </span>
          {classes.map((cls) => {
            const isSelected = activeClassId === cls.id;
            return (
              <button
                key={cls.id}
                onClick={() => {
                  setSelectedClassId(cls.id);
                  setSelectedSectionId('');
                }}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card/70 border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground border'
                }`}
              >
                {cls.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Routine Display */}
      <Glass>
        <div className="mb-4 flex items-center justify-between border-b pb-4 border-border/50">
          <div>
            <h2 className="text-xl font-bold">
              {activeClass?.name || 'Class'} Routine Schedule
            </h2>
            <p className="text-muted-foreground text-xs mt-0.5">
              Weekly period allocations, timings, and classroom assignments.
            </p>
          </div>
          <div className="text-primary flex items-center gap-1.5 text-xs font-semibold">
            <Calendar className="size-4" /> Active Term Routine
          </div>
        </div>

        {routinesLoading ? (
          <p className="text-muted-foreground py-12 text-center text-sm">Loading routine schedule...</p>
        ) : hasAnySlots ? (
          <div className="space-y-4">
            {slotsByDay.map(({ day, slots }) => (
              <div key={day} className="border-border/40 rounded-2xl border p-4 bg-background/40">
                <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-3">
                  {day}
                </h3>
                {slots.length > 0 ? (
                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                    {slots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`rounded-xl border p-3 ${
                          slot.isBreak
                            ? 'border-amber-500/30 bg-amber-500/10'
                            : 'border-border/60 bg-card/80'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm">
                            {slot.isBreak ? 'Break / Recess' : slot.subject?.name || 'Subject'}
                          </span>
                          {slot.roomNumber && (
                            <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                              <MapPin className="size-3" /> {slot.roomNumber}
                            </span>
                          )}
                        </div>
                        <div className="text-muted-foreground mt-2 flex items-center gap-1.5 text-xs">
                          <Clock className="size-3 text-primary" />
                          <span>
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                        {slot.teacher?.fullName && (
                          <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
                            <User className="size-3" />
                            <span>{slot.teacher.fullName}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-xs italic">No scheduled periods on this day.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-start text-sm">
              <thead>
                <tr className="border-border/60 text-muted-foreground border-b">
                  <th className="p-3 text-start">Day</th>
                  <th className="p-3 text-start">Periods & Subjects</th>
                </tr>
              </thead>
              <tbody>
                {fallbackSchedule.map((row) => (
                  <tr key={row.day} className="border-border/40 border-b last:border-0">
                    <td className="text-primary p-3 font-bold">{row.day}</td>
                    <td className="text-muted-foreground p-3">
                      {row.periods.join('  |  ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Glass>
    </div>
  );
}
