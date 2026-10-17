"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarCheck, FileSignature, CheckCircle, Clock } from "lucide-react";

export function AttendanceLeave() {
  const [activeTab, setActiveTab] = useState<"attendance" | "leave">("attendance");
  const [studentId, setStudentId] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId) setShowResult(true);
  };

  return (
    <Section className="bg-muted/10 min-h-screen">
      <SectionHeading 
        title="Attendance & Leave Portal" 
        subtitle="Track student attendance or apply for a leave of absence."
      />

      <div className="max-w-4xl mx-auto px-4 md:px-0">
        
        <div className="flex justify-center gap-4 mb-10">
          <Button 
            variant={activeTab === "attendance" ? "default" : "outline"} 
            onClick={() => { setActiveTab("attendance"); setShowResult(false); }}
            className="rounded-full px-8 h-12 text-lg"
          >
            Check Attendance
          </Button>
          <Button 
            variant={activeTab === "leave" ? "default" : "outline"} 
            onClick={() => setActiveTab("leave")}
            className="rounded-full px-8 h-12 text-lg"
          >
            Apply for Leave
          </Button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {activeTab === "attendance" && (
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-primary/5 p-8 text-center border-b border-border">
                <CalendarCheck className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Student Attendance Tracker</h3>
                <p className="text-muted-foreground">Enter your Student ID to view your monthly attendance percentage.</p>
              </div>
              <CardContent className="p-8">
                {!showResult ? (
                  <form onSubmit={handleCheck} className="max-w-md mx-auto flex flex-col gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Student ID</label>
                      <Input 
                        placeholder="e.g. S1002" 
                        value={studentId} 
                        onChange={(e) => setStudentId(e.target.value)}
                        className="h-12"
                        required 
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full h-12">
                      View Attendance Record
                    </Button>
                  </form>
                ) : (
                  <div className="text-center space-y-6 max-w-sm mx-auto">
                    <div className="w-32 h-32 mx-auto relative flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-muted stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-primary stroke-current" strokeWidth="3" strokeDasharray="85, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">85%</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground">Status: Excellent</h4>
                      <p className="text-muted-foreground mt-1">You meet the 80% requirement.</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setShowResult(false)}>
                      Check Another ID
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "leave" && (
            <Card className="border-0 shadow-lg">
              <div className="bg-primary/5 p-8 text-center border-b border-border">
                <FileSignature className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Leave Application</h3>
                <p className="text-muted-foreground">Submit a formal request for a leave of absence.</p>
              </div>
              <CardContent className="p-8">
                <form className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); alert("Leave application submitted successfully."); }}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Student Name *</label>
                    <Input placeholder="Full Name" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Student ID *</label>
                    <Input placeholder="e.g. S1001" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date *</label>
                    <Input type="date" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date *</label>
                    <Input type="date" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Reason for Leave *</label>
                    <textarea className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]" placeholder="Briefly explain the reason..." required />
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <Button type="submit" size="lg" className="w-full">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </Section>
  );
}
