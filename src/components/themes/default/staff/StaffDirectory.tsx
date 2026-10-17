"use client";

import React, { useState, useMemo } from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetStaff } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, AlertCircle, X, Search, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractErrorMessage } from "@/utils/error";

export function StaffDirectory() {
  const { school_id } = useSchool();
  const [filter, setFilter] = useState("teacher");
  const { data: staffList, isLoading, isError, error } = useGetStaff(school_id, filter);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);

  // Dynamically extract unique departments from the loaded staff
  const departments = useMemo(() => {
    if (!staffList) return [];
    const depts = new Set<string>();
    staffList.forEach((s) => {
      if (s.department && s.department.trim()) {
        depts.add(s.department.trim());
      }
    });
    return Array.from(depts);
  }, [staffList]);

  const filteredStaff = staffList?.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (staff.department && staff.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (staff.designation && staff.designation.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDept = selectedDept === "All" || staff.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <Section className="bg-muted/30 min-h-screen">
      <SectionHeading 
        title="Staff Directory" 
        subtitle="Meet the dedicated educators and professionals guiding our students."
      />
      
      {/* Role Filters & Search */}
      <div className="max-w-7xl mx-auto space-y-4 mb-8 px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <Button 
              variant={filter === "teacher" ? "default" : "outline"} 
              onClick={() => { setFilter("teacher"); setSelectedDept("All"); }}
              className="rounded-full text-sm"
              size="sm"
            >
              Teachers
            </Button>
            <Button 
              variant={filter === "admin" ? "default" : "outline"} 
              onClick={() => { setFilter("admin"); setSelectedDept("All"); }}
              className="rounded-full text-sm"
              size="sm"
            >
              Administration
            </Button>
            <Button 
              variant={filter === "support" ? "default" : "outline"} 
              onClick={() => { setFilter("support"); setSelectedDept("All"); }}
              className="rounded-full text-sm"
              size="sm"
            >
              Support Staff
            </Button>
            <Button 
              variant={filter === "former_teacher" ? "default" : "outline"} 
              onClick={() => { setFilter("former_teacher"); setSelectedDept("All"); }}
              className="rounded-full text-sm"
              size="sm"
            >
              Former Teachers
            </Button>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name, subject..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Dynamic Department Pills if any are extracted */}
        {departments.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
              Department:
            </span>
            <button
              onClick={() => setSelectedDept("All")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                selectedDept === "All"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent"
              }`}
            >
              All Departments
            </button>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  selectedDept === dept
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 md:px-0">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-[320px] rounded-xl" />
          ))
        ) : isError ? (
          <div className="col-span-full text-center py-12 bg-destructive/10 rounded-xl border border-destructive/20">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-destructive font-medium">{extractErrorMessage(error)}</p>
          </div>
        ) : filteredStaff?.length ? (
          filteredStaff.map((staff) => (
            <Card 
              key={staff.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer border-border/70"
              onClick={() => setSelectedStaff(staff)}
            >
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img 
                    src={staff.image_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"} 
                    alt={staff.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                    {staff.email && (
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="rounded-full w-9 h-9 hover:bg-primary hover:text-primary-foreground shadow"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${staff.email}`;
                        }}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    )}
                    {staff.phone && (
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="rounded-full w-9 h-9 hover:bg-primary hover:text-primary-foreground shadow"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `tel:${staff.phone}`;
                        }}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {staff.name}
                  </h3>
                  <p className="text-primary font-medium text-sm mt-1">{staff.designation}</p>
                  {staff.department && (
                    <p className="text-muted-foreground text-xs mt-1 bg-muted/60 inline-block px-2.5 py-0.5 rounded-full">
                      {staff.department}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-card rounded-2xl border border-dashed border-border p-8">
            <GraduationCap className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <h4 className="font-semibold text-foreground">No staff members found</h4>
            <p className="text-muted-foreground text-sm mt-1">Try adjusting your department filter or search keywords.</p>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {selectedStaff && (
        <div 
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedStaff(null)}
        >
          <div 
            className="bg-background max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden cursor-auto animate-in zoom-in-95 duration-200 border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-44 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5">
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute top-4 right-4 text-foreground/80 hover:text-foreground bg-background/70 backdrop-blur rounded-full shadow"
                onClick={() => setSelectedStaff(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start -mt-20">
                <div className="w-36 h-36 rounded-full border-4 border-background overflow-hidden bg-muted shadow-xl shrink-0">
                  <img 
                    src={selectedStaff.image_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"} 
                    alt={selectedStaff.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="mt-4 md:mt-24 text-center md:text-left flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">{selectedStaff.name}</h2>
                  <p className="text-primary font-medium text-lg mt-0.5">{selectedStaff.designation}</p>
                  {selectedStaff.department && (
                    <p className="text-muted-foreground text-sm">{selectedStaff.department} Department</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-muted/20 p-5 rounded-xl border border-border/50">
                  <h3 className="font-bold text-base mb-3 border-b border-border/50 pb-2 text-foreground">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      {selectedStaff.email ? (
                        <a href={`mailto:${selectedStaff.email}`} className="text-sm text-primary hover:underline truncate">
                          {selectedStaff.email}
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground">Not publicly listed</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      {selectedStaff.phone ? (
                        <a href={`tel:${selectedStaff.phone}`} className="text-sm text-primary hover:underline">
                          {selectedStaff.phone}
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground">Contact school administration</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/20 p-5 rounded-xl border border-border/50">
                  <h3 className="font-bold text-base mb-3 border-b border-border/50 pb-2 text-foreground">
                    Academic Background
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Qualifications</h4>
                      <p className="text-sm text-foreground mt-0.5">
                        {selectedStaff.qualification || "Verified Faculty Member"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Role & Scope</h4>
                      <p className="text-sm text-foreground mt-0.5">
                        {selectedStaff.designation} ({selectedStaff.department || "Faculty"})
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
