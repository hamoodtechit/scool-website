"use client";

import React, { useState } from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetDownloads } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, FileText, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { extractErrorMessage } from "@/utils/error";

export function DownloadsRepository() {
  const { school_id } = useSchool();
  const { data: downloads, isLoading, isError, error } = useGetDownloads(school_id);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (isError) {
    return (
      <Section className="bg-muted/10 min-h-screen">
        <div className="bg-destructive/10 p-6 rounded-xl border border-destructive/20 text-center max-w-2xl mx-auto mt-10">
          <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
          <h3 className="text-lg font-bold text-destructive">Failed to load downloads</h3>
          <p className="text-destructive font-medium">{extractErrorMessage(error)}</p>
        </div>
      </Section>
    );
  }

  const categories = ["All", ...Array.from(new Set(downloads?.map((d) => d.category) || []))];

  let filteredDownloads = downloads?.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || d.category === activeCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  if (sortBy === "date") {
    filteredDownloads.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (sortBy === "name") {
    filteredDownloads.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "size") {
    // simplified sort for size assuming format like "1.2 MB"
    filteredDownloads.sort((a, b) => parseFloat(a.size) - parseFloat(b.size));
  }

  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage);
  const paginatedDownloads = filteredDownloads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Section className="bg-muted/5 min-h-screen">
      <SectionHeading 
        title="Downloads Repository" 
        subtitle="Access school forms, syllabus, academic calendar, and other resources."
      />

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search downloads..." 
              className="ps-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full flex-1">
            {categories.map(cat => (
              <Button 
                key={cat} 
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-sm font-medium text-muted-foreground">Sort By:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-border rounded-md px-3 py-1.5 text-sm bg-transparent"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-32 rounded-xl" />
            ))
          ) : paginatedDownloads.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-border shadow-sm">
              <p className="text-muted-foreground text-lg">No downloads found for your search criteria.</p>
            </div>
          ) : (
            paginatedDownloads.map(file => (
              <Card key={file.id} className="hover:shadow-md transition-shadow group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 line-clamp-2">{file.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        <span className="bg-muted px-2 py-0.5 rounded">{file.category}</span>
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.date}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={file.url} download>
                          <Download className="w-4 h-4 me-2" /> Download
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button 
              variant="outline" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button 
              variant="outline" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
