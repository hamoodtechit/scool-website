"use client";

import React from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useSchool } from "@/components/providers/school-provider";
import { useGetPrograms, useGetSchoolProfile } from "@/hooks/api/school/useSchoolQueries";
import { 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  GraduationCap, 
  Sparkles, 
  Clock, 
  FileText 
} from "lucide-react";

export function DefaultAcademics() {
  const { school_id, seo } = useSchool();
  const { data: profile } = useGetSchoolProfile(school_id);
  const { data: programs = [], isLoading: programsLoading } = useGetPrograms(school_id);
  const schoolName = profile?.name || seo?.title || "our institution";

  const academicPortals = [
    {
      title: "Class Routine & Timetable",
      description: "Access weekly period routines, subject schedules, assigned faculty, and classroom allocations.",
      icon: Calendar,
      href: "/academics/schedule",
      cta: "View Timetable",
      badge: "Live Schedules"
    },
    {
      title: "Syllabus & Academic Rules",
      description: "Download curriculum syllabuses, learning objectives, exam marks distributions, and student code of conduct.",
      icon: BookOpen,
      href: "/academics/rules",
      cta: "Explore Syllabus",
      badge: "Curriculum"
    },
    {
      title: "Attendance & Leave Policies",
      description: "Understand institutional minimum attendance criteria (80%), digital tracking, and formal leave application procedures.",
      icon: CheckCircle2,
      href: "/academics/attendance",
      cta: "Check Policies",
      badge: "Policy"
    },
    {
      title: "Examination & Results Portal",
      description: "Look up authentic subject marks breakdown, terminal exam reports, GPA scores, and board exam statistics.",
      icon: Award,
      href: "/results",
      cta: "Check Marksheets",
      badge: "Evaluations"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/5">
      {/* Hero Banner Section */}
      <Section className="pb-8 pt-12 md:pt-16">
        <SectionHeading
          title="Academic Excellence"
          subtitle={`Fostering intellectual curiosity, moral integrity, and holistic student development at ${schoolName}.`}
        />

        {/* Dynamic Programs / Pathways */}
        {programs && programs.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">Academic Pathways & Programs</h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <Card key={program.id} className="overflow-hidden border-border/60 hover:shadow-md transition-all group">
                  {program.image_url && (
                    <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                      <img 
                        src={program.image_url} 
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Main Academic Portals Grid */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Academic Portals & Resources</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {academicPortals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Card 
                  key={portal.title}
                  className="hover:border-primary/50 transition-all duration-300 hover:shadow-md group flex flex-col justify-between"
                >
                  <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground border border-border/40">
                          {portal.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {portal.description}
                      </p>
                    </div>

                    <div>
                      <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors justify-between">
                        <Link href={portal.href}>
                          <span>{portal.cta}</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Core Pillars / Instructional Framework */}
        <div className="bg-card rounded-2xl border border-border/80 p-8 md:p-10 shadow-sm mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-2">Institutional Pedagogical Framework</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-3xl">
            Our multi-disciplinary curriculum combines foundational sciences, technological fluency, languages, and humanistic values.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="font-bold text-foreground">Standardized National Curriculum</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Adhering rigorously to modern secondary education directives with continuous evaluations and project-based assignments.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="font-bold text-foreground">STEM & Digital Literacy</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Equipped modern science laboratories and computer labs facilitating hands-on coding, robotics, and scientific inquiry.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="font-bold text-foreground">Continuous Monitoring & Feedback</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bi-weekly unit assessments, parent-teacher conferences, and digital performance reports keep learners on track.
              </p>
            </div>
          </div>
        </div>

        {/* Quick CTA to Academic Enquiries */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-start">
            <h3 className="text-2xl font-bold">Have Questions About Our Academic Curriculum?</h3>
            <p className="text-primary-foreground/90 text-sm max-w-xl">
              Our academic counselors and office staff are available to assist you with curriculum guidelines, class schedules, and student support.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="font-semibold shadow border border-secondary-foreground/20">
              <Link href="/contact">
                Contact Academic Office
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground border-primary-foreground/35 font-semibold">
              <Link href="/about">
                Explore About Us
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
