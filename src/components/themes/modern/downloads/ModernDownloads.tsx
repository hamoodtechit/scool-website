'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetDownloads } from '@/hooks/api/school/useSchoolQueries';
import { PageIntro, Glass, Empty } from '../common/ModernCommon';
import { Input } from '@/components/ui/input';
import { Download, FileText, Search } from 'lucide-react';

export function ModernDownloads() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data: downloads = [] } = useGetDownloads(school_id);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    ...Array.from(new Set(downloads.map((d) => d.category).filter(Boolean))),
  ];

  const filteredDocs = downloads.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageIntro title={t('downloads_title')} subtitle="Resource Center" />
        <div className="relative w-full max-w-xs self-start sm:self-center">
          <Search className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search forms, syllabus..."
            className="bg-card/70 ps-9 rounded-xl"
          />
        </div>
      </div>

      {/* Category Tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat as string}
                onClick={() => setSelectedCategory(cat as string)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card/70 border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground border'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Downloads List */}
      <Glass>
        <div className="space-y-3">
          {filteredDocs.map((doc) => (
            <a
              href={doc.url}
              key={doc.id}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/50 hover:border-primary/30 flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg bg-background/50"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl shrink-0">
                  <FileText className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{doc.title}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {doc.category} · {doc.size} · {doc.date}
                  </p>
                </div>
              </div>
              <Download className="text-primary size-4 shrink-0" />
            </a>
          ))}
        </div>
        {!filteredDocs.length && <Empty text={t('no_items')} />}
      </Glass>
    </div>
  );
}
