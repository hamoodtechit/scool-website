'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetOfficialDocuments } from '@/hooks/api/school/useSchoolQueries';
import { PageIntro, Glass, Empty } from '../common/ModernCommon';
import { Button } from '@/components/ui/button';
import { FileCheck2, Download } from 'lucide-react';
import { toast } from 'sonner';

export function ModernOfficialInfo() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data = [] } = useGetOfficialDocuments(school_id);

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <PageIntro title={t('official_title')} subtitle="Accreditations & Certificates" />
      <Glass>
        <div className="space-y-3">
          {data.map((doc: any) => (
            <div
              key={doc.id}
              className="border-border/50 bg-background/50 flex items-center justify-between gap-4 rounded-2xl border p-4"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl shrink-0">
                  <FileCheck2 className="size-4" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{doc.title}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {doc.type} · {doc.date} · {doc.size}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl"
                aria-label={t('download')}
                onClick={() =>
                  doc.url && doc.url !== '#'
                    ? window.open(doc.url, '_blank')
                    : toast.info('Document copy will be available shortly from administration.')
                }
              >
                <Download className="size-4" />
              </Button>
            </div>
          ))}
        </div>
        {!data.length && <Empty text={t('no_items')} />}
      </Glass>
    </div>
  );
}
