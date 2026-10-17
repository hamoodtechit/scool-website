"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, AlertCircle, Download, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSchool } from "@/components/providers/school-provider";
import { useGetDownloads } from "@/hooks/api/school/useSchoolQueries";
import { Skeleton } from "@/components/ui/skeleton";

const fallbackSyllabusDocs = [
  { id: "s1", title: "Class 6 Comprehensive Syllabus", category: "Syllabus", url: "#", size: "1.2 MB", date: "Academic Session 2026" },
  { id: "s2", title: "Class 7 Comprehensive Syllabus", category: "Syllabus", url: "#", size: "1.4 MB", date: "Academic Session 2026" },
  { id: "s3", title: "Class 8 Junior Secondary Syllabus", category: "Syllabus", url: "#", size: "1.5 MB", date: "Academic Session 2026" },
  { id: "s4", title: "Class 9 Secondary Curriculum Syllabus", category: "Syllabus", url: "#", size: "2.1 MB", date: "Academic Session 2026" },
  { id: "s5", title: "Class 10 SSC Candidate Test Syllabus", category: "Syllabus", url: "#", size: "2.5 MB", date: "Academic Session 2026" },
];

const rules = [
  {
    title: "Attendance Requirements",
    content: "Students must maintain a minimum of 80% classroom attendance to be eligible for terminal examinations and formal evaluations. Leave of absence must be applied for in advance through guardian endorsement."
  },
  {
    title: "Code of Conduct & Institutional Ethics",
    content: "Respect for teachers, peers, and school property is mandatory. Any form of harassment, bullying, vandalism, or disruptive conduct is strictly prohibited and subject to institutional disciplinary committee review."
  },
  {
    title: "Examinations & Continuous Grading",
    content: "The academic year is organized into two terms. Final performance reports are determined by Mid-Term (40%), Final Examinations (40%), and Continuous Classroom Assessment & Projects (20%)."
  },
  {
    title: "Uniform & Personal Appearance",
    content: "Students must wear the designated school uniform, identity badge, and polished shoes at all times during school hours. Hair must be neatly groomed, and prohibited personal electronics are not permitted."
  }
];

export function RulesSyllabus() {
  const { school_id } = useSchool();
  const { data: downloads = [], isLoading } = useGetDownloads(school_id);
  const [activeTab, setActiveTab] = useState<"rules" | "syllabus">("rules");

  const dynamicSyllabus = downloads.filter((d) => 
    d.category?.toLowerCase().includes("syllabus") ||
    d.category?.toLowerCase().includes("academic") ||
    d.title?.toLowerCase().includes("syllabus")
  );

  const displaySyllabus = dynamicSyllabus.length > 0 ? dynamicSyllabus : fallbackSyllabusDocs;

  return (
    <Section className="bg-muted/10 min-h-screen">
      <SectionHeading 
        title="Academic Rules & Syllabus" 
        subtitle="Important institutional guidelines, disciplinary policies, and official curriculum syllabuses."
      />

      <div className="max-w-4xl mx-auto px-4 md:px-0">
        
        <div className="flex justify-center gap-4 mb-10">
          <Button 
            variant={activeTab === "rules" ? "default" : "outline"} 
            onClick={() => setActiveTab("rules")}
            className="rounded-full px-8 h-12 text-base font-semibold shadow-sm"
          >
            Academic Rules & Conduct
          </Button>
          <Button 
            variant={activeTab === "syllabus" ? "default" : "outline"} 
            onClick={() => setActiveTab("syllabus")}
            className="rounded-full px-8 h-12 text-base font-semibold shadow-sm"
          >
            Download Syllabus
          </Button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {activeTab === "rules" && (
            <div className="space-y-6">
              {rules.map((rule, idx) => (
                <Card key={idx} className="border border-border/70 shadow-sm hover:shadow-md transition-shadow bg-card">
                  <CardContent className="p-6 md:p-8 flex items-start gap-6">
                    <div className="bg-primary/10 text-primary p-3.5 rounded-2xl shrink-0">
                      <AlertCircle className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{rule.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{rule.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "syllabus" && (
            <Card className="border border-border/70 shadow-md bg-card overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border/60 p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Curriculum Syllabus Repository</h3>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                    Download authentic subject-wise syllabuses, learning outcomes, and examination formats for your enrolled class.
                  </p>
                </div>

                {isLoading ? (
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-16 w-full rounded-xl" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                  </div>
                ) : (
                  <div className="divide-y divide-border/60">
                    {displaySyllabus.map((doc: any) => {
                      const downloadUrl = doc.url || doc.fileUrl || doc.file_url || "#";
                      return (
                        <div 
                          key={doc.id} 
                          className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-muted/30 transition-colors gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-bold text-base md:text-lg text-foreground">{doc.title}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                PDF Syllabus • {doc.size || "Standard Size"} {doc.date ? `• ${doc.date}` : ""}
                              </p>
                            </div>
                          </div>
                          <Button asChild className="w-full sm:w-auto shadow-sm">
                            <a 
                              href={downloadUrl} 
                              download={doc.title}
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Download className="w-4 h-4 mr-2" /> Download Syllabus
                            </a>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </Section>
  );
}
