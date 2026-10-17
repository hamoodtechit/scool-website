"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Star, FileSignature, BookOpen, Scale, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

const tabs = [
  { id: "why", label: "Why Study Here?", icon: <Star className="w-5 h-5" /> },
  { id: "how", label: "How to Apply", icon: <ArrowRight className="w-5 h-5" /> },
  { id: "test", label: "Admission Test Info", icon: <BookOpen className="w-5 h-5" /> },
  { id: "policy", label: "Admission Policy", icon: <Scale className="w-5 h-5" /> },
];

export function AdmissionInfo() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <Section className="bg-muted/10 min-h-[80vh]">
      <SectionHeading 
        title="Admission Information" 
        subtitle="Everything you need to know about joining our vibrant learning community."
      />

      <div className="max-w-6xl mx-auto px-4 md:px-0 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-1/3 flex flex-col gap-2 shrink-0">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="justify-start h-14 text-lg border-2 shadow-sm"
            >
              {tab.icon}
              <span className="ms-3">{tab.label}</span>
            </Button>
          ))}
          <div className="mt-8 p-6 bg-primary/10 rounded-2xl text-center border border-primary/20">
             <FileSignature className="w-12 h-12 text-primary mx-auto mb-4" />
             <h4 className="font-bold text-lg mb-2">Have Questions?</h4>
             <p className="text-sm text-muted-foreground mb-4">Contact our administrative office for inquiries and enrollment details.</p>
             <Button asChild className="w-full">
               <Link href="/contact">Contact Office</Link>
             </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border animate-in fade-in slide-in-from-end-4 duration-500">
          
          {activeTab === "why" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-4">Why Study Here?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-4 bg-muted/50 rounded-xl border border-border">
                  <h4 className="font-bold text-lg mb-2 text-primary">Academic Excellence</h4>
                  <p className="text-muted-foreground">Consistently ranked among top schools with a 100% board exam pass rate over the last decade.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-xl border border-border">
                  <h4 className="font-bold text-lg mb-2 text-primary">Holistic Development</h4>
                  <p className="text-muted-foreground">Over 50+ extracurricular clubs, world-class sports facilities, and leadership programs.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-xl border border-border">
                  <h4 className="font-bold text-lg mb-2 text-primary">Modern Infrastructure</h4>
                  <p className="text-muted-foreground">Smart classrooms, advanced science and ICT labs, and a fully digitized central library.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-xl border border-border">
                  <h4 className="font-bold text-lg mb-2 text-primary">Dedicated Faculty</h4>
                  <p className="text-muted-foreground">Learn from highly qualified educators who are passionate about nurturing young minds.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "how" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-4">How to Apply</h2>
              <div className="space-y-8 pt-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Fill the Online Registration Form</h4>
                    <p className="text-muted-foreground">Navigate to the Admissions page, fill in the student and guardian details, and upload the required documents (Birth Certificate, Photos).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Pay Application Fee</h4>
                    <p className="text-muted-foreground">Pay the non-refundable application fee securely via our online payment gateway.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Download Admit Card</h4>
                    <p className="text-muted-foreground">Once payment is verified, download your admit card for the upcoming admission test.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "test" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-4">Admission Test Info</h2>
              <p className="text-lg text-muted-foreground">All prospective students are required to sit for an entrance examination to evaluate their academic readiness.</p>
              
              <div className="bg-muted/30 p-6 rounded-xl border border-border mt-6">
                <h4 className="font-bold text-lg mb-4">Syllabus for Entrance Exam</h4>
                <ul className="list-disc ps-5 space-y-2 text-muted-foreground">
                  <li><strong>English:</strong> Reading comprehension, grammar, and basic essay writing.</li>
                  <li><strong>Mathematics:</strong> Arithmetic, basic algebra, and geometry concepts from the previous grade.</li>
                  <li><strong>Science/General Knowledge:</strong> Basic scientific principles and awareness of current events.</li>
                </ul>
              </div>
              
              <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 flex items-start gap-4 text-emerald-800">
                <BookOpen className="w-6 h-6 shrink-0 mt-1" />
                <p>The test duration is 2 hours. Students must bring their printed admit card, pens, and a valid photo ID.</p>
              </div>
            </div>
          )}

          {activeTab === "policy" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-4">Admission Policy</h2>
              <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground">
                <p>
                  Our institution is committed to a fair and transparent admission process. Admissions are granted strictly on the basis of merit, subject to the availability of seats in the respective classes.
                </p>
                <h4 className="text-foreground font-bold mt-6 mb-2">Age Criteria</h4>
                <p>
                  Students applying for Class 1 must be at least 6 years old by January 1st of the academic year. Appropriate age limits apply for subsequent classes.
                </p>
                <h4 className="text-foreground font-bold mt-6 mb-2">Non-Discrimination</h4>
                <p>
                  We do not discriminate on the basis of race, color, religion, or national origin in the administration of our educational policies and admission processes.
                </p>
                <h4 className="text-foreground font-bold mt-6 mb-2">Required Documentation</h4>
                <ul className="list-disc ps-5 space-y-1">
                  <li>Original Birth Certificate / Passport</li>
                  <li>Transfer Certificate (TC) from the previous school</li>
                  <li>Previous academic transcripts / report cards</li>
                  <li>Recent passport-sized photographs</li>
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </Section>
  );
}

