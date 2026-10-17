'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { SchoolService } from '@/services/school.service';
import type { CertificateVerificationResponse } from '@/types/school.types';
import { PageIntro, Glass } from '../common/ModernCommon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Search, CheckCircle, XCircle, Printer, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function ModernCertificate() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const [refId, setRefId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<CertificateVerificationResponse | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refId.trim()) {
      toast.error('Please enter a valid Reference ID or Student ID');
      return;
    }

    setVerifying(true);
    setResult(null);

    try {
      const data = await SchoolService.verifyCertificate(school_id, refId.trim());
      setResult(data);
      if (data.isValid) {
        toast.success('Certificate record verified successfully!');
      } else {
        toast.error(data.message || 'Certificate record not found in the registry.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to verify certificate. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-10 sm:space-y-14">
      <PageIntro title={t('certificate_title')} subtitle="Authenticity Verification Portal" />

      <Glass className="text-center">
        <div className="bg-primary/10 text-primary mx-auto grid size-16 place-items-center rounded-2xl">
          <ShieldCheck className="size-8" />
        </div>
        <h2 className="mt-6 text-2xl font-bold">
          Verify Institutional Documents Instantly
        </h2>
        <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto">
          Enter the unique Student ID Card No or printed Document Reference ID to verify against the school registry.
        </p>

        {/* Search Input Form */}
        <form onSubmit={handleVerify} className="mx-auto mt-7 flex max-w-md gap-2">
          <Input
            value={refId}
            onChange={(e) => setRefId(e.target.value)}
            placeholder="e.g. S1001 or ID Card No"
            className="bg-background/60 h-12 rounded-xl text-base"
            required
          />
          <Button
            type="submit"
            className="h-12 rounded-xl px-6 font-bold"
            disabled={verifying || !refId.trim()}
          >
            {verifying ? (
              'Verifying...'
            ) : (
              <>
                <Search className="me-2 size-4" />
                {t('search')}
              </>
            )}
          </Button>
        </form>

        {/* Verification Success Result */}
        {result?.isValid && (
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-start">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle className="size-6 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-lg text-emerald-600 dark:text-emerald-400">
                    Authentic Institutional Record
                  </h4>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Verified directly against central school student registry.
                  </p>

                  <div className="mt-4 grid gap-1.5 text-sm">
                    <p>
                      <span className="text-muted-foreground">Student Name:</span>{' '}
                      <span className="font-bold text-foreground">{result.studentName}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Student ID / Roll:</span>{' '}
                      <span className="font-semibold text-foreground">
                        {result.idCardNo} {result.rollNumber ? `(Roll: ${result.rollNumber})` : ''}
                      </span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Class & Session:</span>{' '}
                      <span className="font-semibold text-foreground">
                        {result.className} · {result.academicYear}
                      </span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Enrollment Status:</span>{' '}
                      <span className="inline-block rounded px-2 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                        {result.status || 'Active'}
                      </span>
                    </p>
                    {result.verificationCode && (
                      <p className="text-xs text-muted-foreground mt-2 font-mono">
                        Security Hash: {result.verificationCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="rounded-xl shrink-0 self-start border-emerald-500/30 hover:bg-emerald-500/10"
              >
                <Printer className="me-1.5 size-3.5" /> Print Verification
              </Button>
            </div>
          </div>
        )}

        {/* Verification Failed Result */}
        {result && !result.isValid && (
          <div className="border-destructive/30 bg-destructive/10 mt-8 rounded-2xl border p-6 text-start">
            <div className="flex items-start gap-3">
              <XCircle className="text-destructive size-6 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-destructive font-bold text-lg">Record Not Found</h4>
                <p className="text-muted-foreground text-sm mt-1">
                  We could not verify any official certificate or student record matching reference ID "{refId}".
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  Please verify the reference ID printed on the document or contact the registrar office during working hours.
                </p>
              </div>
            </div>
          </div>
        )}
      </Glass>
    </div>
  );
}
