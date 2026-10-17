'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetNotices } from '@/hooks/api/school/useSchoolQueries';
import type { Notice } from '@/types/school.types';
import { PageIntro, Glass, Empty } from '../common/ModernCommon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, FileText, Search, X } from 'lucide-react';

export function ModernNotices() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data: notices = [] } = useGetNotices(school_id, 50);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  const categories = [
    'All',
    ...Array.from(new Set(notices.map((n) => n.category || 'General').filter(Boolean))),
  ];

  const filteredNotices = notices.filter((notice: Notice) => {
    const category = notice.category || 'General';
    const matchesCat = selectedCategory === 'All' || category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageIntro title={t('notices_title')} subtitle="Official Notice Board" />
        <div className="relative w-full max-w-xs self-start sm:self-center">
          <Search className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars..."
            className="bg-card/70 ps-9 rounded-xl"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
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

      {/* Notices List */}
      <Glass>
        <div className="space-y-3">
          {filteredNotices.map((notice: Notice) => (
            <article
              key={notice.id}
              onClick={() => setActiveNotice(notice)}
              className="group border-border/50 bg-background/50 hover:border-primary/30 cursor-pointer rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
                      {notice.date}
                    </p>
                    {notice.category && (
                      <span className="bg-primary/10 text-primary rounded px-2 py-0.5 text-[10px] font-bold">
                        {notice.category}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 text-lg font-bold group-hover:text-primary transition-colors">
                    {notice.title}
                  </h2>
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">
                    {notice.content}
                  </p>
                  {notice.pdf_url && (
                    <a
                      href={notice.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary mt-3 inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                    >
                      <Download className="size-3.5" /> Download Attachment
                    </a>
                  )}
                </div>
                <FileText className="text-primary size-5 shrink-0" />
              </div>
            </article>
          ))}
        </div>
        {!filteredNotices.length && <Empty text={t('no_items')} />}
      </Glass>

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div
          className="bg-background/80 fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setActiveNotice(null)}
        >
          <div
            className="border-border bg-card relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-4 border-border/50">
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                {activeNotice.date} · {activeNotice.category || 'Notice'}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveNotice(null)}
                className="rounded-full"
              >
                <X className="size-4" />
              </Button>
            </div>

            <h3 className="mt-4 text-2xl font-black">{activeNotice.title}</h3>
            <div className="text-muted-foreground mt-4 whitespace-pre-wrap text-sm leading-7">
              {activeNotice.content}
            </div>

            {activeNotice.pdf_url && (
              <div className="border-border/50 mt-6 border-t pt-4">
                <a
                  href={activeNotice.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow"
                >
                  <Download className="size-4" /> Download Official Circular
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
