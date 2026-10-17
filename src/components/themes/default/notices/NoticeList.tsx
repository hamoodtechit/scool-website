"use client";

import React, { useState } from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetNotices } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Calendar, Download, AlertCircle, Search, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/routing";
import { extractErrorMessage } from "@/utils/error";

export function NoticeList() {
  const { school_id } = useSchool();
  const { data: notices, isLoading, isError, error } = useGetNotices(school_id, 20);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<any | null>(null);

  const filteredNotices = notices?.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "All" || notice.category === category;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <Section>
      <SectionHeading 
        title="Notices & Circulars" 
        subtitle="Stay updated with the latest announcements from the school administration."
      />
      
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-border">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Button variant={category === "All" ? "default" : "outline"} onClick={() => setCategory("All")} className="rounded-full">All Notices</Button>
            <Button variant={category === "Urgent" ? "destructive" : "outline"} onClick={() => setCategory("Urgent")} className="rounded-full">Urgent</Button>
            <Button variant={category === "General" ? "default" : "outline"} onClick={() => setCategory("General")} className="rounded-full">General</Button>
            <Button variant={category === "Exam" ? "default" : "outline"} onClick={() => setCategory("Exam")} className="rounded-full">Exams</Button>
          </div>
          <div className="w-full md:w-64 relative">
            <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search old notices..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 rounded-full"
            />
          </div>
        </div>

        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-24 rounded-xl" />
          ))
        ) : isError ? (
          <div className="text-center py-12 bg-destructive/10 rounded-xl border border-destructive/20">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-destructive font-medium">{extractErrorMessage(error)}</p>
          </div>
        ) : filteredNotices?.length ? (
          filteredNotices.map((notice) => (
            <Card key={notice.id} className={`hover:shadow-md transition-shadow group overflow-hidden ${notice.isPinned ? 'border-s-4 border-s-primary bg-primary/5' : ''}`}>
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 gap-4">
                  {/* Icon / Date Box */}
                  <div className={`flex-shrink-0 p-3 rounded-lg flex flex-col items-center justify-center min-w-[80px] ${notice.isPinned ? 'bg-primary text-primary-foreground' : 'bg-primary/10'}`}>
                    <Calendar className={`w-6 h-6 mb-1 ${notice.isPinned ? 'text-primary-foreground' : 'text-primary'}`} />
                    <span className={`text-xs font-bold text-center ${notice.isPinned ? 'text-primary-foreground' : 'text-primary'}`}>
                      {new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 relative cursor-pointer" onClick={() => setSelectedNotice(notice)}>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {notice.title}
                      </h3>
                      {notice.isPinned && <Pin className="w-4 h-4 text-primary fill-primary" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1 mb-2">
                       {notice.category && (
                         <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${notice.category === 'Urgent' ? 'bg-destructive/10 text-destructive' : 'bg-secondary text-secondary-foreground'}`}>
                           {notice.category}
                         </span>
                       )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notice.content}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex-shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedNotice(notice)}
                      className="w-full sm:w-auto bg-background"
                    >
                      <FileText className="w-4 h-4 me-2" />
                      View
                    </Button>
                    {notice.pdf_url && (
                      <Button variant="default" size="sm" asChild className="w-full sm:w-auto">
                        <a href={notice.pdf_url} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 me-2" />
                          PDF
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed border-border">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No notices found matching your search.</p>
          </div>
        )}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div 
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedNotice(null)}
        >
          <div 
            className="bg-background max-w-2xl w-full rounded-2xl shadow-2xl border border-border p-6 md:p-8 cursor-auto animate-in zoom-in-95 duration-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b pb-4 border-border">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {selectedNotice.category || "General Notice"}
                  </span>
                  {selectedNotice.isPinned && (
                    <span className="bg-amber-500/10 text-amber-600 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Pin className="w-3 h-3 fill-amber-600" /> Pinned
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-foreground">{selectedNotice.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Published on {new Date(selectedNotice.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full shrink-0"
                onClick={() => setSelectedNotice(null)}
              >
                ✕
              </Button>
            </div>

            <div className="prose dark:prose-invert max-w-none text-foreground/90 text-sm md:text-base leading-relaxed whitespace-pre-wrap max-h-[50vh] overflow-y-auto pr-2">
              {selectedNotice.content}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              {selectedNotice.pdf_url ? (
                <Button asChild size="sm">
                  <a href={selectedNotice.pdf_url} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 me-2" /> Download Official Circular (PDF)
                  </a>
                </Button>
              ) : <div />}
              <Button variant="outline" size="sm" onClick={() => setSelectedNotice(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}


