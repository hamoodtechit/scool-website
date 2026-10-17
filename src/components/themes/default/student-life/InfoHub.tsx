"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { 
  Users, 
  CreditCard, 
  Calendar, 
  Shirt, 
  BookOpen, 
  CheckCircle, 
  Search, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Sparkles,
  Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useSchool } from "@/components/providers/school-provider";
import { useGetExams } from "@/hooks/api/school/useSchoolQueries";
import { Skeleton } from "@/components/ui/skeleton";

export function InfoHub() {
  const { school_id } = useSchool();
  const { data: exams = [], isLoading: examsLoading } = useGetExams(school_id);
  const [activeTab, setActiveTab] = useState("students");
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "students", label: "Student Verification", icon: <Users className="w-5 h-5" /> },
    { id: "fees", label: "Tuition & Fees", icon: <CreditCard className="w-5 h-5" /> },
    { id: "exams", label: "Exam Schedule", icon: <Calendar className="w-5 h-5" /> },
    { id: "uniform", label: "Uniform Guidelines", icon: <Shirt className="w-5 h-5" /> },
    { id: "rules", label: "Code of Conduct", icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <Section className="bg-muted/10 min-h-screen">
      <SectionHeading 
        title="Student Information Hub" 
        subtitle="A centralized informational portal for academic records, fees structure, examination calendars, and campus guidelines."
      />

      <div className="max-w-6xl mx-auto px-4 md:px-0 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible shrink-0 pb-4 md:pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left font-medium transition-all whitespace-nowrap text-sm ${
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-card hover:bg-muted text-foreground border border-border/60"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4 animate-in fade-in slide-in-from-right-2 duration-300">
          
          {/* Tab 1: Student Verification */}
          {activeTab === "students" && (
            <Card className="border border-border/70 shadow-sm bg-card overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b border-border/60">
                <h3 className="text-xl font-bold text-foreground">Student Registry & Record Lookup</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Securely access individual student marksheets, enrollment verification, and academic transcripts.
                </p>
              </div>

              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/60 space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Protected Institutional Student Registry</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                        In adherence to institutional privacy and education data regulations, full student directories are not publicly broadcasted. Students and guardians can look up academic records using authenticated student identification numbers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-card p-5 rounded-xl border border-border/80 flex flex-col justify-between hover:border-primary/40 transition-colors">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <Award className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-foreground text-base">Examination Results Portal</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Search by Student ID (e.g., S1001) and exam session to inspect comprehensive subject-wise marks, grades, and GPA.
                      </p>
                    </div>
                    <Button asChild className="mt-5 w-full justify-between" size="sm">
                      <Link href="/results">
                        <span>Check Results</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* Certificate Verification card - temporarily hidden */}
                  {/* <div className="bg-card p-5 rounded-xl border border-border/80 flex flex-col justify-between hover:border-primary/40 transition-colors">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-foreground text-base">Certificate Verification</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Authenticate student bona fide certificates, transfer certificates, and graduation credentials using official security reference IDs.
                      </p>
                    </div>
                    <Button asChild variant="outline" className="mt-5 w-full justify-between" size="sm">
                      <Link href="/certificate">
                        <span>Verify Certificate</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tab 2: Fees Structure */}
          {activeTab === "fees" && (
            <div className="space-y-6">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-2xl font-bold text-foreground">Tuition & Institutional Fee Schedule</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Approved fee breakdown for the current academic session.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="border border-border/70 shadow-sm bg-card border-t-4 border-t-primary">
                  <CardContent className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Primary Section</span>
                    <h4 className="text-xl font-bold mt-1 mb-2 text-foreground">Class 1 to Class 5</h4>
                    <p className="text-3xl font-black text-primary mb-4">
                      $50 <span className="text-sm font-normal text-muted-foreground">/ month</span>
                    </p>
                    <ul className="space-y-2.5 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Monthly Tuition Fee: $40
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Co-curricular & Sports: $10
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Library & Reading Pass Included
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-border/70 shadow-sm bg-card border-t-4 border-t-primary">
                  <CardContent className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Secondary Section</span>
                    <h4 className="text-xl font-bold mt-1 mb-2 text-foreground">Class 6 to Class 10</h4>
                    <p className="text-3xl font-black text-primary mb-4">
                      $75 <span className="text-sm font-normal text-muted-foreground">/ month</span>
                    </p>
                    <ul className="space-y-2.5 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Monthly Tuition Fee: $60
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Science & Computer Lab Fee: $15
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Continuous Evaluation Materials Included
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted/20 p-4 rounded-xl border border-border/60 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Payment Notice: </span>
                Tuition fees must be settled by the 10th of each running calendar month via the campus accounts counter or online digital banking portal.
              </div>
            </div>
          )}

          {/* Tab 3: Exam Schedule (Dynamic) */}
          {activeTab === "exams" && (
            <div className="space-y-6">
              <div className="border-b border-border/60 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Examination Cycles & Schedules</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">Term examinations and continuous assessments for the active academic year.</p>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href="/results">Results Portal</Link>
                </Button>
              </div>

              <Card className="border border-border/70 shadow-sm bg-card">
                <CardContent className="p-6">
                  <h4 className="font-bold text-sm text-foreground uppercase tracking-wider mb-2">Weightage Distribution</h4>
                  <div className="w-full bg-muted rounded-full h-7 mb-2 overflow-hidden flex">
                    <div className="bg-primary/70 h-full w-[40%] flex items-center justify-center text-[11px] text-white font-bold">Mid-Term (40%)</div>
                    <div className="bg-primary/90 h-full w-[40%] flex items-center justify-center text-[11px] text-white font-bold">Final Term (40%)</div>
                    <div className="bg-primary h-full w-[20%] flex items-center justify-center text-[11px] text-white font-bold">Class Assessments (20%)</div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h4 className="font-bold text-lg mb-4 text-foreground">Published Examination Series</h4>

                {examsLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-16 w-full rounded-xl" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                  </div>
                ) : exams.length > 0 ? (
                  <div className="space-y-3">
                    {exams.map((exam, i) => (
                      <div 
                        key={exam.id || i} 
                        className="flex justify-between items-center p-4 bg-card rounded-xl shadow-sm border border-border/70 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-bold text-base text-foreground">{exam.name}</h5>
                            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                              <Clock className="w-3.5 h-3.5" /> Official Institutional Assessment
                            </p>
                          </div>
                        </div>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                          Published
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[
                      { name: "1st Term Examination", dates: "April Session", status: "Completed" },
                      { name: "Mid-Term Examination", dates: "October Session", status: "Upcoming" },
                      { name: "Final Annual Examination", dates: "December Session", status: "Scheduled" }
                    ].map((exam, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-card rounded-xl shadow-sm border border-border/70">
                        <div>
                          <h5 className="font-bold text-base text-foreground">{exam.name}</h5>
                          <p className="text-xs text-muted-foreground mt-0.5">{exam.dates}</p>
                        </div>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase">
                          {exam.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Uniform Guidelines */}
          {activeTab === "uniform" && (
            <div className="space-y-6">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-2xl font-bold text-foreground">Standardized Uniform Guidelines</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Proper attire instills discipline, unity, and equality among learners.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-border/70 shadow-sm bg-card">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
                      <Shirt className="w-5 h-5" /> Boys Uniform
                    </h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> 
                        <span>White formal collared shirt with institutional embroidered monogram badge.</span>
                      </li>
                      <li className="flex gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> 
                        <span>Navy blue tailored trousers with plain black formal belt.</span>
                      </li>
                      <li className="flex gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> 
                        <span>Clean black formal leather shoes with white cotton socks.</span>
                      </li>
                      <li className="flex gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> 
                        <span>Navy blue V-neck woolen sweater or blazer during winter months.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-border/70 shadow-sm bg-card">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
                      <Shirt className="w-5 h-5" /> Girls Uniform
                    </h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> 
                        <span>Navy blue tunic / frock or prescribed salwar kameez with white orna/scarf.</span>
                      </li>
                      <li className="flex gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> 
                        <span>White blouse or shirt featuring the institutional embroidered insignia.</span>
                      </li>
                      <li className="flex gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> 
                        <span>Polished black leather flat shoes with white socks.</span>
                      </li>
                      <li className="flex gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> 
                        <span>Navy blue woolen cardigan or blazer during the winter period.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Tab 5: Code of Conduct */}
          {activeTab === "rules" && (
            <div className="space-y-6">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-2xl font-bold text-foreground">Code of Student Conduct & Ethics</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Institutional principles governing decorum, respect, and academic honesty.</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    title: "Punctuality & Morning Assembly",
                    desc: "Students must arrive at campus at least 15 minutes prior to the morning assembly bell. Continuous unexcused tardiness triggers automated guardian notification."
                  },
                  {
                    num: "02",
                    title: "Personal Electronics & Mobile Policy",
                    desc: "Personal smartphones, gaming hardware, and smartwatches are strictly restricted on campus to maintain undistracted academic focus."
                  },
                  {
                    num: "03",
                    title: "Campus Infrastructure & Laboratory Care",
                    desc: "Care and respect for science apparatus, computing terminals, library books, and sports assets is mandatory for all students."
                  },
                  {
                    num: "04",
                    title: "Zero Tolerance on Bullying & Harassment",
                    desc: "Our institution enforces strict zero-tolerance policies against verbal, physical, or online harassment. Fostering a supportive peer atmosphere is required."
                  }
                ].map((item) => (
                  <Card key={item.num} className="border border-border/70 shadow-sm bg-card">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                        {item.num}
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-foreground mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </Section>
  );
}
