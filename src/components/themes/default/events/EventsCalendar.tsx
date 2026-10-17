"use client";

import React, { useState } from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetEvents } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, ArrowRight, AlertCircle, X, ExternalLink, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { extractErrorMessage } from "@/utils/error";
import { Event } from "@/types/school.types";

export function EventsCalendar() {
  const { school_id } = useSchool();
  const { data: events, isLoading, isError, error } = useGetEvents(school_id);
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const today = new Date();
  
  const filteredEvents = events?.filter(e => {
    const eventDate = new Date(e.date);
    return filter === "upcoming" ? eventDate >= today : eventDate < today;
  }).sort((a, b) => {
    return filter === "upcoming" 
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const getGoogleCalendarUrl = (event: Event) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description || "");
    const location = encodeURIComponent(event.location || "");
    const dateFormatted = event.date.replace(/-/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}/${dateFormatted}`;
  };

  return (
    <Section className="bg-muted/10 min-h-screen">
      <SectionHeading 
        title="Events Calendar" 
        subtitle="Stay updated with our upcoming seminars, cultural festivals, academic workshops, and activities."
      />

      <div className="max-w-5xl mx-auto px-4 md:px-0">
        
        <div className="flex justify-center gap-4 mb-10">
          <Button 
            variant={filter === "upcoming" ? "default" : "outline"} 
            onClick={() => setFilter("upcoming")}
            className="rounded-full px-8 shadow-sm"
          >
            Upcoming Events
          </Button>
          <Button 
            variant={filter === "past" ? "default" : "outline"} 
            onClick={() => setFilter("past")}
            className="rounded-full px-8 shadow-sm"
          >
            Past Events
          </Button>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-32 rounded-2xl" />
            ))
          ) : isError ? (
            <div className="text-center py-12 bg-destructive/10 rounded-xl border border-destructive/20">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <p className="text-destructive font-medium">{extractErrorMessage(error)}</p>
            </div>
          ) : filteredEvents?.length ? (
            filteredEvents.map((event) => {
              const date = new Date(event.date);
              const month = date.toLocaleString('default', { month: 'short' });
              const day = isNaN(date.getDate()) ? "—" : date.getDate();
              const eventTime = event.time || "All Day";

              return (
                <Card 
                  key={event.id} 
                  className="border border-border/70 shadow-sm hover:shadow-md transition-all group overflow-hidden cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <CardContent className="p-0 flex flex-col md:flex-row">
                    
                    {/* Date Block */}
                    <div className="bg-primary/5 border-b md:border-b-0 md:border-r border-border p-6 flex flex-col items-center justify-center min-w-[140px] group-hover:bg-primary transition-colors">
                      <span className="text-sm font-bold uppercase text-primary group-hover:text-primary-foreground">
                        {month}
                      </span>
                      <span className="text-4xl font-black text-foreground group-hover:text-white">
                        {day}
                      </span>
                    </div>
                    
                    {/* Event Details */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-4 mb-2 text-sm font-medium text-muted-foreground">
                        {event.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-primary" /> {event.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-primary" /> {eventTime}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors text-foreground">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="p-6 md:p-8 flex items-center justify-center bg-muted/20">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-12 h-12 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </Button>
                    </div>

                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl border border-dashed border-border shadow-sm">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-bold text-foreground mb-2">No {filter} events found</h3>
              <p className="text-muted-foreground">Check back later for updates on our upcoming school events schedule.</p>
            </div>
          )}
        </div>

      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-background max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden cursor-auto animate-in zoom-in-95 duration-200 border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 p-6 border-b border-border/60 flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-2">
                  <Calendar className="w-3.5 h-3.5" /> Event Announcement
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  {selectedEvent.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/60 hover:bg-background shadow-sm shrink-0"
                onClick={() => setSelectedEvent(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-xl border border-border/50">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Date</span>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(selectedEvent.date).toLocaleDateString('default', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Time</span>
                    <p className="text-sm font-medium text-foreground">
                      {selectedEvent.time || "All Day Event"}
                    </p>
                  </div>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-semibold">Venue / Location</span>
                      <p className="text-sm font-medium text-foreground">
                        {selectedEvent.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                  Event Description & Agenda
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {selectedEvent.description || "No additional event details provided."}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button 
                  asChild 
                  className="w-full flex-1"
                >
                  <a 
                    href={getGoogleCalendarUrl(selectedEvent)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <CalendarPlus className="w-4 h-4 mr-2" />
                    Add to Google Calendar
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedEvent(null)}
                  className="sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
