"use client";

import React, { useState } from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetExams } from "@/hooks/api/school/useSchoolQueries";
import { SchoolService } from "@/services/school.service";
import type { StudentResultResponse } from "@/types/school.types";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle, Printer, Award, CheckCircle2, Trophy } from "lucide-react";
import { toast } from "sonner";

export function ResultsPortal() {
  const { school_id } = useSchool();
  const { data: exams = [] } = useGetExams(school_id);

  const [activeTab, setActiveTab] = useState<"internal" | "board">("internal");
  const [studentId, setStudentId] = useState("");
  const [selectedExamId, setSelectedExamId] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<StudentResultResponse | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) {
      toast.error("Please enter a valid Student ID or Roll Number");
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await SchoolService.getStudentResults(
        school_id,
        studentId.trim(),
        selectedExamId || undefined
      );
      setResultData(res);
      if (res.found) {
        toast.success("Examination marksheet retrieved successfully!");
      } else {
        toast.info(res.message || "No matching student record found.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to retrieve examination results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="bg-muted/10 min-h-screen">
      <SectionHeading 
        title="Exam Results Portal" 
        subtitle="Check academic term results, download marksheets, and view performance records."
      />

      <div className="max-w-4xl mx-auto mb-10">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            variant={activeTab === "internal" ? "default" : "outline"} 
            onClick={() => { setActiveTab("internal"); setHasSearched(false); setResultData(null); }}
            className="rounded-full px-8 h-12"
          >
            Internal Term Exams
          </Button>
          <Button 
            variant={activeTab === "board" ? "default" : "outline"} 
            onClick={() => { setActiveTab("board"); setHasSearched(false); setResultData(null); }}
            className="rounded-full px-8 h-12"
          >
            Board Examination Records
          </Button>
        </div>

        {activeTab === "internal" ? (
          <form onSubmit={handleSearch} className="bg-white dark:bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-2">
              <h3 className="text-xl font-bold">Search Student Evaluation</h3>
              <span className="text-xs text-muted-foreground">Official Examination Registry</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Examination Term</label>
                <select 
                  value={selectedExamId} 
                  onChange={(e) => setSelectedExamId(e.target.value)}
                  className="w-full h-12 px-4 rounded-md border border-input bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">All Published Exams</option>
                  {exams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Student ID / Roll No *</label>
                <Input 
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. S1001 or Roll No" 
                  className="h-12 shadow-none"
                  required
                />
              </div>
              
              <Button type="submit" size="lg" className="h-12 w-full font-bold" disabled={loading}>
                {loading ? "Searching..." : <><Search className="w-5 h-5 me-2" /> Search Results</>}
              </Button>
            </div>
          </form>
        ) : (
          /* Board Exam Highlights */
          <Card className="border border-border shadow-sm p-6 sm:p-8 bg-white dark:bg-card">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-2xl font-bold">Public Board Examinations</h3>
                <p className="text-sm text-muted-foreground">
                  Official SSC & HSC institutional results history and statistics.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 text-center">
                <p className="text-3xl font-black text-primary">100%</p>
                <p className="text-xs font-semibold text-muted-foreground mt-1">Pass Rate (SSC 2025)</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 text-center">
                <p className="text-3xl font-black text-primary">92%</p>
                <p className="text-xs font-semibold text-muted-foreground mt-1">GPA 5.00 Achievers</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 text-center">
                <p className="text-3xl font-black text-primary">#1</p>
                <p className="text-xs font-semibold text-muted-foreground mt-1">District Merit Ranking</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              For public national board exams (SSC / HSC / JSC), transcripts and certificate copies are published by the Education Board Registry. For internal institution transcripts, please search using the Internal Term Exams portal.
            </p>
          </Card>
        )}
      </div>

      {/* Results Display Area */}
      {activeTab === "internal" && hasSearched && (
        <div className="max-w-4xl mx-auto">
          {resultData?.found && resultData.student ? (
            <Card className="shadow-lg border border-primary/20 overflow-hidden bg-white dark:bg-card animate-in fade-in slide-in-from-bottom-2">
              {/* Header / Student Summary */}
              <div className="p-6 md:p-8 bg-primary/5 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {resultData.marks?.[0]?.examName || "Term Exam"}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      resultData.summary?.status === "Passed"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {resultData.summary?.status || "Evaluated"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{resultData.student.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Student ID: <span className="font-semibold text-foreground">{resultData.student.idCardNo || resultData.student.id}</span>
                    {resultData.student.rollNumber && <> • Roll: <span className="font-semibold text-foreground">{resultData.student.rollNumber}</span></>}
                    {resultData.student.className && <> • Class: <span className="font-semibold text-foreground">{resultData.student.className}</span></>}
                    {resultData.student.sectionName && <> • Section: <span className="font-semibold text-foreground">{resultData.student.sectionName}</span></>}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                  <div className="text-start sm:text-end">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">GPA Score</span>
                    <p className="text-4xl font-black text-primary">{resultData.summary?.gpa ?? "N/A"}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.print()} className="mt-2">
                    <Printer className="w-4 h-4 me-2" /> Print Marksheet
                  </Button>
                </div>
              </div>

              {/* Subject Breakdown Table */}
              <CardContent className="p-6 md:p-8">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" /> Subject-Wise Mark Breakdown
                </h4>

                {resultData.marks && resultData.marks.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-start border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground bg-muted/20">
                          <th className="p-3 font-semibold text-start">Subject</th>
                          <th className="p-3 font-semibold text-center">Written</th>
                          <th className="p-3 font-semibold text-center">MCQ</th>
                          <th className="p-3 font-semibold text-center">Practical</th>
                          <th className="p-3 font-semibold text-center">Total</th>
                          <th className="p-3 font-semibold text-center">Grade</th>
                          <th className="p-3 font-semibold text-center">Point</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {resultData.marks.map((m, idx) => (
                          <tr key={idx} className="hover:bg-muted/30 transition-colors">
                            <td className="p-3 font-semibold text-foreground">{m.subjectName}</td>
                            <td className="p-3 text-center">{m.writtenObtained ?? "-"}</td>
                            <td className="p-3 text-center">{m.mcqObtained ?? "-"}</td>
                            <td className="p-3 text-center">{m.practicalObtained ?? "-"}</td>
                            <td className="p-3 text-center font-bold text-foreground">{m.totalObtained}</td>
                            <td className="p-3 text-center">
                              <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded text-xs">
                                {m.grade}
                              </span>
                            </td>
                            <td className="p-3 text-center font-semibold">{m.point}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm italic">
                    Overall term evaluation recorded. Detailed subject itemization will be available upon official publishing.
                  </p>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-card rounded-2xl border border-dashed border-border shadow-sm">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-bold text-foreground mb-2">No Results Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                No examination records matching Student ID <span className="font-bold text-foreground">{studentId}</span>. Please verify the student ID or contact the academic office.
              </p>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}

