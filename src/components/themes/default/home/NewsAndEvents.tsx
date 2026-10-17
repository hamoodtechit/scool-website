"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetEvents, useGetNotices } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Calendar, FileText, ChevronRight } from "lucide-react";

export function NewsAndEvents() {
  const { school_id } = useSchool();
  const { data: events } = useGetEvents(school_id);
  const { data: notices } = useGetNotices(school_id, 3);

  return (
    <Section>
      <SectionHeading title="News & Events" subtitle="Stay updated with the latest happenings at our school." />
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Events */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2"><Calendar className="text-primary" /> Upcoming Events</h3>
            <Button variant="ghost" className="font-semibold text-foreground hover:text-primary hover:bg-muted" asChild>
              <Link href="/events">View All <ChevronRight className="w-4 h-4 ms-1" /></Link>
            </Button>
          </div>
          <div className="space-y-4">
            {events?.slice(0, 3).map(event => (
              <Card key={event.id} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex gap-4">
                  <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-lg min-w-[80px] p-2 text-center">
                    <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-2xl font-black">{new Date(event.date).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight mb-1">{event.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2"><FileText className="text-secondary" /> Recent Notices</h3>
            <Button variant="ghost" className="font-semibold text-foreground hover:text-primary hover:bg-muted" asChild>
              <Link href="/notices">View All <ChevronRight className="w-4 h-4 ms-1" /></Link>
            </Button>
          </div>
          <div className="space-y-4">
            {notices?.slice(0, 3).map(notice => (
              <div key={notice.id} className="flex gap-4 items-start border-b border-border/50 pb-4 last:border-0">
                <div className="mt-1 bg-secondary/10 p-2 rounded-full text-secondary">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold hover:text-primary transition-colors cursor-pointer leading-tight mb-1">{notice.title}</h4>
                  <p className="text-xs font-medium text-muted-foreground">{notice.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}

