"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetNotices } from "@/hooks/api/school/useSchoolQueries";
import { Megaphone } from "lucide-react";
import { Link } from "@/i18n/routing";

export function NoticeMarquee() {
  const { school_id } = useSchool();
  const { data: notices, isLoading, isError } = useGetNotices(school_id, 5);

  if (isLoading || isError || !notices || notices.length === 0) return null;

  return (
    <div className="bg-primary/10 border-y border-primary/20 py-2 flex items-center overflow-hidden">
      <div className="container mx-auto px-4 flex items-center">
        
        {/* Label Badge */}
        <div className="flex-shrink-0 z-10 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 me-4 shadow-sm">
          <Megaphone className="w-4 h-4 animate-pulse" />
          <span>Latest Updates</span>
        </div>

        {/* Marquee Content */}
        <div className="flex-1 overflow-hidden relative">
          <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex items-center hover:[animation-play-state:paused]">
            {notices.map((notice, index) => (
              <React.Fragment key={notice.id}>
                <Link 
                  href="/notices"
                  className="mx-4 text-sm font-medium hover:text-primary transition-colors hover:underline"
                >
                  <span className="text-muted-foreground me-2">[{notice.date}]</span>
                  {notice.title}
                </Link>
                {index < notices.length - 1 && (
                  <span className="text-primary/40">•</span>
                )}
              </React.Fragment>
            ))}
            
            {/* Duplicate for seamless looping */}
            {notices.map((notice, index) => (
              <React.Fragment key={`dup-${notice.id}`}>
                <Link 
                  href="/notices"
                  className="mx-4 text-sm font-medium hover:text-primary transition-colors hover:underline"
                >
                  <span className="text-muted-foreground me-2">[{notice.date}]</span>
                  {notice.title}
                </Link>
                {index < notices.length - 1 && (
                  <span className="text-primary/40">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
