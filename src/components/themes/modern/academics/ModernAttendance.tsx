'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { PageIntro, Glass } from '../common/ModernCommon';
import { CheckCircle2, Clock, AlertTriangle, FileText, ArrowUpRight } from 'lucide-react';

export function ModernAttendance() {
  const t = useTranslations('ModernPages');

  return (
    <div className="mx-auto max-w-5xl space-y-10 sm:space-y-14">
      <PageIntro title={t('attendance_title')} subtitle="Academic Regulations" />
      <Glass>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: 'Attendance Policy',
              desc: 'Minimum 75% attendance is required across all subjects for term and board examination eligibility.',
              icon: CheckCircle2,
            },
            {
              title: 'Leave Application',
              desc: 'Medical or emergency leave requests must be submitted through guardian notification with medical certificate.',
              icon: FileText,
            },
            {
              title: 'Late Arrival Rules',
              desc: 'Late arrival after morning assembly requires administrative gate clearance and principal endorsement.',
              icon: Clock,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-muted/40 border-border/50 rounded-2xl border p-5">
                <Icon className="text-primary size-6 mb-3" />
                <h3 className="font-bold text-base">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-xs leading-6">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="border-border/50 mt-8 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            Need an official Leave Application format? Download standard institutional forms directly.
          </p>
          <Link
            href="/downloads"
            className="text-primary text-xs font-bold inline-flex items-center gap-1.5 hover:underline shrink-0"
          >
            Go to Downloads & Forms <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </Glass>
    </div>
  );
}
