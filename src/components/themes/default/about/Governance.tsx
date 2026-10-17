"use client";

import React, { useState } from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetGovernance } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function Governance() {
  const { school_id } = useSchool();
  const { data: members, isLoading } = useGetGovernance(school_id);
  const [activeTab, setActiveTab] = useState<"current" | "ex" | "founders">("current");

  const currentMembers = members?.filter(m => m.type === "governing_body") || [];
  const founders = members?.filter(m => m.type === "founder") || [];

  return (
    <Section className="bg-muted/10 min-h-screen">
      <SectionHeading 
        title="School Governance" 
        subtitle="Meet the visionaries and leaders who shape the future of our institution."
      />

      <div className="max-w-6xl mx-auto px-4 md:px-0">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            variant={activeTab === "current" ? "default" : "outline"} 
            onClick={() => setActiveTab("current")}
            className="rounded-full px-8"
          >
            Current Governing Body
          </Button>
          <Button 
            variant={activeTab === "ex" ? "default" : "outline"} 
            onClick={() => setActiveTab("ex")}
            className="rounded-full px-8"
          >
            Ex-Governing Body
          </Button>
          <Button 
            variant={activeTab === "founders" ? "default" : "outline"} 
            onClick={() => setActiveTab("founders")}
            className="rounded-full px-8"
          >
            Founders & Donors
          </Button>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {isLoading && (
            <div className="flex justify-center"><Skeleton className="w-full max-w-2xl h-64 rounded-xl" /></div>
          )}

          {!isLoading && activeTab === "current" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentMembers.map((member, idx) => (
                <Card key={idx} className="border-0 shadow-lg overflow-hidden group">
                  <div className="h-32 bg-primary/20 relative">
                     <div className="absolute -bottom-10 -end-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                  </div>
                  <CardContent className="p-8 pt-0 text-center relative -mt-16">
                    <div className="w-32 h-32 mx-auto bg-background rounded-full p-2 shadow-xl mb-4">
                      <div className="w-full h-full bg-muted rounded-full flex items-center justify-center overflow-hidden">
                        <img src={member.image || `https://placehold.co/200x200/e2e8f0/64748b?text=${member.name.charAt(0)}`} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && activeTab === "ex" && (
            <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
              <div className="space-y-6">
                {members?.filter((m: any) => m.type === "ex_governing_body").map((member: any, idx: number) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl hover:bg-muted/50 transition-colors border-l-4 border-l-primary/30 border-s-4 border-s-primary/30">
                    <div>
                      <h4 className="text-lg font-bold">{member.name}</h4>
                      <p className="text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
                      {member.period || "Past"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && activeTab === "founders" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {founders.map((founder: any, idx: number) => (
                <div key={idx} className="bg-gradient-to-br from-primary/5 to-transparent p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{founder.name}</h4>
                  <p className="text-muted-foreground">{founder.role}</p>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </div>
    </Section>
  );
}

