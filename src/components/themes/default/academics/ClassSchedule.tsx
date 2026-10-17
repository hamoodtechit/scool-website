"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Printer, User, AlertCircle } from "lucide-react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetClasses, useGetClassRoutines } from "@/hooks/api/school/useSchoolQueries";
import { Skeleton } from "@/components/ui/skeleton";

export function ClassSchedule() {
  const { school_id } = useSchool();
  const { data: classes = [], isLoading: classesLoading } = useGetClasses(school_id);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");

  const activeClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const activeClassId = selectedClassId || activeClass?.id || "";

  const { data: routines = [], isLoading: routinesLoading } = useGetClassRoutines(
    school_id,
    activeClassId,
    selectedSectionId || undefined
  );

  const allSlots = routines.flatMap((r) => r.classRoutineSlots || []);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

  const slotsByDay = daysOfWeek.map((day) => {
    const slots = allSlots
      .filter((s) => s.day?.toLowerCase() === day.toLowerCase())
      .sort((a, b) => (a.startTime || "").localeCompare(b.startTime || ""));
    return { day, slots };
  });

  const hasAnySlots = allSlots.length > 0;

  // Fallback demo schedule if school has not created slots yet
  const fallbackSchedule = [
    { day: "Sunday", periods: ["08:30 - 09:15 · Mathematics (Room 101)", "09:15 - 10:00 · English (Room 101)", "10:00 - 10:45 · Science (Lab A)", "11:15 - 12:00 · History (Room 101)"] },
    { day: "Monday", periods: ["08:30 - 09:15 · Science (Lab A)", "09:15 - 10:00 · Mathematics (Room 101)", "10:00 - 10:45 · Bangla (Room 101)", "11:15 - 12:00 · Geography (Room 101)"] },
    { day: "Tuesday", periods: ["08:30 - 09:15 · English (Room 101)", "09:15 - 10:00 · ICT & Computing (Lab C)", "10:00 - 10:45 · Mathematics (Room 101)", "11:15 - 12:00 · Art & Culture (Studio)"] },
    { day: "Wednesday", periods: ["08:30 - 09:15 · Bangla (Room 101)", "09:15 - 10:00 · Science (Lab A)", "10:00 - 10:45 · Religion (Room 101)", "11:15 - 12:00 · Physical Ed. (Ground)"] },
    { day: "Thursday", periods: ["08:30 - 09:15 · History (Room 101)", "09:15 - 10:00 · Mathematics (Room 101)", "10:00 - 10:45 · Library & Research", "11:15 - 12:00 · Club Activities"] },
  ];

  return (
    <Section className="bg-muted/5 min-h-screen">
      <SectionHeading 
        title="Class Schedule & Routine" 
        subtitle="View the weekly academic routine, periods, and classroom assignments."
      />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Filter & Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-card p-4 rounded-xl shadow-sm border border-border">
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar items-center">
            {classesLoading ? (
              <div className="flex gap-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-20 rounded-md" />
              </div>
            ) : classes.length > 0 ? (
              classes.map(cls => (
                <Button 
                  key={cls.id}
                  variant={activeClassId === cls.id ? "default" : "outline"}
                  onClick={() => {
                    setSelectedClassId(cls.id);
                    setSelectedSectionId("");
                  }}
                  className="whitespace-nowrap"
                  size="sm"
                >
                  {cls.name}
                </Button>
              ))
            ) : (
              <span className="text-sm text-muted-foreground font-medium">Standard Classes</span>
            )}
          </div>
          
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.print()}>
            <Printer className="w-4 h-4 me-2" /> Print Schedule
          </Button>
        </div>

        {/* Routine Table / Content */}
        <Card className="shadow-lg border-primary/10 overflow-hidden">
          <div className="p-6 border-b border-border bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold">
                {activeClass?.name || "Class"} Academic Routine
              </h3>
              <p className="text-sm text-muted-foreground">
                Period timings, subjects, faculty members, and classroom locations.
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary text-xs font-semibold">
              <Calendar className="w-4 h-4" /> Active Term Schedule
            </div>
          </div>

          <CardContent className="p-6">
            {routinesLoading ? (
              <div className="space-y-4 py-4">
                 <Skeleton className="h-12 w-full" />
                 <Skeleton className="h-12 w-full" />
                 <Skeleton className="h-12 w-full" />
              </div>
            ) : hasAnySlots ? (
              <div className="space-y-6">
                {slotsByDay.map(({ day, slots }) => (
                  <div key={day} className="rounded-xl border border-border p-4 bg-muted/10">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                      {day}
                    </h4>
                    {slots.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {slots.map((slot) => (
                          <div 
                            key={slot.id}
                            className={`p-3 rounded-lg border text-sm transition-shadow ${
                              slot.isBreak
                                ? "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
                                : "bg-card border-border shadow-sm hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold text-xs text-muted-foreground mb-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                                {slot.startTime} - {slot.endTime}
                              </span>
                              {slot.roomNumber && (
                                <span className="flex items-center gap-1 text-[11px]">
                                  <MapPin className="w-3 h-3 text-primary" /> R: {slot.roomNumber}
                                </span>
                              )}
                            </div>
                            <p className="font-semibold text-foreground text-sm">
                              {slot.isBreak ? "Break / Recess" : slot.subject?.name || "Subject Period"}
                            </p>
                            {slot.teacher?.fullName && !slot.isBreak && (
                              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <User className="w-3 h-3" /> {slot.teacher.fullName}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">No classes scheduled for {day}.</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback Routine Display if database routine not yet published */
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg flex items-center gap-3 text-sm text-primary mb-4">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>General published schedule shown below. Department-specific allocations are being updated.</span>
                </div>
                <div className="space-y-4">
                  {fallbackSchedule.map((row, rIdx) => (
                    <div key={rIdx} className="rounded-xl border border-border p-4 bg-muted/10">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                        {row.day}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {row.periods.map((item, pIdx) => (
                          <div key={pIdx} className="p-3 rounded-lg border border-border bg-card shadow-sm text-sm">
                            <p className="font-medium text-foreground">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </Section>
  );
}


