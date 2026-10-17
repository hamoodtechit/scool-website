'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetExams } from '@/hooks/api/school/useSchoolQueries';
import { SchoolService } from '@/services/school.service';
import type { StudentResultResponse } from '@/types/school.types';
import { PageIntro, Glass } from '../common/ModernCommon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trophy, Printer, CheckCircle2, AlertCircle, Award } from 'lucide-react';
import { toast } from 'sonner';

export function ModernResults() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data: exams = [] } = useGetExams(school_id);

  const [tab, setTab] = useState<'internal' | 'board'>('internal');
  const [studentId, setStudentId] = useState('');
  const [selectedExamId, setSelectedExamId] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<StudentResultResponse | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) {
      toast.error('Please enter a valid Student ID or Roll Number');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const res = await SchoolService.getStudentResults(
        school_id,
        studentId.trim(),
        selectedExamId || undefined
      );
      setResultData(res);
      if (res.found) {
        toast.success('Examination marksheet retrieved successfully!');
      } else {
        toast.info(res.message || 'No matching student record found.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to retrieve marksheet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-10 sm:space-y-14">
      <PageIntro title={t('results_title')} subtitle="Academic Evaluation Portal" />

      <Glass>
        {/* Navigation Tabs */}
        <div className="border-border/50 flex gap-2 border-b pb-4">
          <Button
            variant={tab === 'internal' ? 'default' : 'outline'}
            onClick={() => {
              setTab('internal');
              setSearched(false);
            }}
            className="rounded-xl font-bold"
          >
            Internal Term Examinations
          </Button>
          <Button
            variant={tab === 'board' ? 'default' : 'outline'}
            onClick={() => {
              setTab('board');
              setSearched(false);
            }}
            className="rounded-xl font-bold"
          >
            Board Examination Records
          </Button>
        </div>

        {tab === 'internal' ? (
          <>
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mt-6 space-y-4">
              <div className="grid gap-3 sm:grid-cols-[1.5fr_1fr_auto]">
                <Input
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter Student ID / Roll (e.g. S1001)"
                  className="bg-background/50 h-12 rounded-xl text-base"
                  required
                />

                <select
                  value={selectedExamId}
                  onChange={(e) => setSelectedExamId(e.target.value)}
                  className="bg-background/50 border-input h-12 rounded-xl border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Examinations</option>
                  {exams.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name}
                    </option>
                  ))}
                </select>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 rounded-xl px-8 font-bold"
                >
                  <Search className="me-2 size-4" />
                  {loading ? 'Searching...' : 'Search Result'}
                </Button>
              </div>
            </form>

            {/* Results Display */}
            {searched && (
              <div className="border-border/50 mt-8 border-t pt-6">
                {resultData?.found && resultData.student ? (
                  <div className="space-y-6">
                    {/* Student Information Banner */}
                    <div className="bg-primary/5 border-primary/20 flex flex-col justify-between gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black">{resultData.student.name}</h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              resultData.summary?.status === 'Passed'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : 'bg-destructive/10 text-destructive'
                            }`}
                          >
                            {resultData.summary?.status || 'Evaluated'}
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Student ID: <span className="font-semibold text-foreground">{resultData.student.idCardNo}</span>
                          {resultData.student.rollNumber && ` · Roll: ${resultData.student.rollNumber}`}
                          {resultData.student.className && ` · Class: ${resultData.student.className}`}
                          {resultData.student.sectionName && ` · Section: ${resultData.student.sectionName}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-end">
                          <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                            Overall GPA
                          </p>
                          <p className="text-primary text-3xl font-black">
                            {resultData.summary?.gpa || '0.00'}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.print()}
                          className="rounded-xl"
                        >
                          <Printer className="me-1.5 size-3.5" /> Print Marksheet
                        </Button>
                      </div>
                    </div>

                    {/* Subject-Wise Marks Breakdown Table */}
                    {resultData.marks && resultData.marks.length > 0 ? (
                      <div className="overflow-x-auto rounded-2xl border border-border/50">
                        <table className="w-full min-w-[34rem] text-sm">
                          <thead>
                            <tr className="border-border/60 bg-muted/40 text-muted-foreground border-b text-xs uppercase">
                              <th className="p-3.5 text-start">Subject</th>
                              <th className="p-3.5 text-center">Written</th>
                              <th className="p-3.5 text-center">MCQ</th>
                              <th className="p-3.5 text-center">Practical</th>
                              <th className="p-3.5 text-center font-bold">Total</th>
                              <th className="p-3.5 text-center font-bold">Grade</th>
                              <th className="p-3.5 text-center font-bold">Point</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultData.marks.map((mark) => (
                              <tr
                                key={mark.id}
                                className="border-border/40 border-b last:border-0 hover:bg-muted/20"
                              >
                                <td className="p-3.5 font-bold">{mark.subjectName}</td>
                                <td className="p-3.5 text-center text-muted-foreground">
                                  {mark.writtenObtained ?? '-'}
                                </td>
                                <td className="p-3.5 text-center text-muted-foreground">
                                  {mark.mcqObtained ?? '-'}
                                </td>
                                <td className="p-3.5 text-center text-muted-foreground">
                                  {mark.practicalObtained ?? '-'}
                                </td>
                                <td className="p-3.5 text-center font-bold">
                                  {mark.totalObtained}
                                </td>
                                <td className="p-3.5 text-center">
                                  <span
                                    className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${
                                      mark.isPassed
                                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-destructive/10 text-destructive'
                                    }`}
                                  >
                                    {mark.grade || 'F'}
                                  </span>
                                </td>
                                <td className="p-3.5 text-center font-bold text-primary">
                                  {mark.point?.toFixed(1) || '0.0'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-muted-foreground py-6 text-center text-sm">
                        No subject marks entered for this term yet.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-muted/40 text-muted-foreground rounded-2xl p-8 text-center">
                    <AlertCircle className="mx-auto mb-2 size-8 text-amber-500" />
                    <p className="font-semibold">No matching records found for "{studentId}".</p>
                    <p className="mt-1 text-xs">
                      Please verify the student ID card number or contact the examination controller office.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* Board Examinations Information Tab */
          <div className="mt-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="bg-primary/10 rounded-2xl p-5 text-center">
                <Trophy className="text-primary mx-auto mb-2 size-8" />
                <p className="text-3xl font-black text-primary">100%</p>
                <p className="text-muted-foreground mt-1 text-xs font-semibold uppercase">
                  Board Exam Pass Rate
                </p>
              </div>
              <div className="bg-secondary/10 rounded-2xl p-5 text-center">
                <Award className="text-secondary mx-auto mb-2 size-8" />
                <p className="text-3xl font-black text-secondary">85%+</p>
                <p className="text-muted-foreground mt-1 text-xs font-semibold uppercase">
                  GPA 5.0 Golden Achievers
                </p>
              </div>
              <div className="bg-emerald-500/10 rounded-2xl p-5 text-center">
                <CheckCircle2 className="mx-auto mb-2 size-8 text-emerald-500" />
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">Top 10</p>
                <p className="text-muted-foreground mt-1 text-xs font-semibold uppercase">
                  Education Board Ranking
                </p>
              </div>
            </div>

            <div className="border-border/50 rounded-2xl border p-5 bg-background/50 text-sm space-y-2">
              <h4 className="font-bold text-base">Board Examination Verification</h4>
              <p className="text-muted-foreground leading-6">
                Official public board transcripts and certificates for SSC, HSC, or Cambridge examinations are issued directly through respective educational boards. For authenticated copies, please visit our school administration registrar desk.
              </p>
            </div>
          </div>
        )}
      </Glass>
    </div>
  );
}
