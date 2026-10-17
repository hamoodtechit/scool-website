"use client";

import React from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck, ShieldCheck, FileText, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useSchool } from "@/components/providers/school-provider";
import { useGetOfficialDocuments } from "@/hooks/api/school/useSchoolQueries";
import { Skeleton } from "@/components/ui/skeleton";

export function OfficialInformation() {
  const { school_id } = useSchool();
  const { data: documents = [], isLoading } = useGetOfficialDocuments(school_id);

  const docs = [
    {
      category: "Teaching Permissions & Approvals",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      files: documents?.filter(d => 
        d.type?.toLowerCase().includes("approval") || 
        d.title?.toLowerCase().includes("approval") ||
        d.title?.toLowerCase().includes("permission")
      ) || []
    },
    {
      category: "Recognition & Affiliations",
      icon: <FileCheck className="w-8 h-8 text-primary" />,
      files: documents?.filter(d => 
        d.type?.toLowerCase().includes("affiliation") || 
        d.title?.toLowerCase().includes("affiliation") || 
        d.type?.toLowerCase().includes("official")
      ) || []
    },
    {
      category: "Statistics & Annual Reports",
      icon: <FileText className="w-8 h-8 text-primary" />,
      files: documents?.filter(d => 
        d.type?.toLowerCase().includes("report") || 
        d.title?.toLowerCase().includes("report") || 
        d.type?.toLowerCase().includes("academic")
      ) || []
    }
  ];

  return (
    <Section className="bg-muted/5 min-h-screen">
      <SectionHeading 
        title="Official Information" 
        subtitle="Government approvals, institutional accreditations, and official documentation."
      />

      <div className="max-w-5xl mx-auto space-y-10 px-4 md:px-0">
        <div className="bg-card border border-primary/20 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-sm">
           <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
             <ShieldCheck className="w-8 h-8" />
           </div>
           <h2 className="text-2xl font-bold mb-3 text-foreground">Fully Accredited Institution</h2>
           <p className="text-muted-foreground leading-relaxed text-sm max-w-2xl mx-auto">
             Our school operates under the strict guidelines, curriculum directives, and statutory approvals of the Ministry of Education and Secondary Education Board. 
             All educational programs are fully recognized and routinely audited for instructional excellence.
           </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {docs.map((section, idx) => (
              <Card key={idx} className="border border-border/70 shadow-sm hover:shadow-md transition-shadow bg-card flex flex-col justify-between">
                <CardContent className="p-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="bg-primary/10 w-14 h-14 flex items-center justify-center rounded-xl mb-5">
                      {section.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-4 border-b border-border/60 pb-3 text-foreground">
                      {section.category}
                    </h3>
                    
                    {section.files.length > 0 ? (
                      <ul className="space-y-3.5">
                        {section.files.map((file: any, fIdx: number) => {
                          const downloadUrl = file.url || file.fileUrl || file.file_url || "#";
                          return (
                            <li key={fIdx} className="group flex items-start justify-between gap-3 p-2.5 rounded-lg hover:bg-muted/40 transition-colors">
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium leading-tight group-hover:text-primary transition-colors block text-foreground truncate">
                                  {file.title}
                                </span>
                                {file.size && (
                                  <span className="text-xs text-muted-foreground mt-0.5 block">
                                    {file.size} {file.date ? `· ${file.date}` : ''}
                                  </span>
                                )}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                asChild
                                className="shrink-0 h-8 w-8 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 rounded-full"
                              >
                                <a 
                                  href={downloadUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  download={file.title || "document"}
                                  title="Download Document"
                                >
                                  <Download className="w-4 h-4" />
                                </a>
                              </Button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <div className="py-6 text-center text-xs text-muted-foreground bg-muted/20 rounded-lg">
                        No public circulars currently filed under this category.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
