"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, XCircle, Printer, Award, User, Calendar, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useSchool } from "@/components/providers/school-provider";
import { SchoolService } from "@/services/school.service";
import type { CertificateVerificationResponse } from "@/types/school.types";

export function CertificateVerification() {
  const { school_id } = useSchool();
  const [refId, setRefId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationData, setVerificationData] = useState<CertificateVerificationResponse | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  
  // CAPTCHA State
  const [captchaExpected, setCaptchaExpected] = useState({ 
    num1: Math.floor(Math.random() * 9) + 1, 
    num2: Math.floor(Math.random() * 9) + 1 
  });
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const resetCaptcha = () => {
    setCaptchaExpected({
      num1: Math.floor(Math.random() * 9) + 1,
      num2: Math.floor(Math.random() * 9) + 1,
    });
    setCaptchaAnswer("");
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refId.trim()) {
      toast.error("Please enter a valid Reference ID or Certificate Number");
      return;
    }
    
    if (parseInt(captchaAnswer) !== (captchaExpected.num1 + captchaExpected.num2)) {
      toast.error("Incorrect security check answer");
      resetCaptcha();
      return;
    }

    setIsVerifying(true);
    setHasChecked(true);

    try {
      const res = await SchoolService.verifyCertificate(school_id, refId.trim());
      setVerificationData(res);
      if (res.isValid) {
        toast.success("Certificate authenticity confirmed!");
      } else {
        toast.error(res.message || "Certificate record not found in the registry.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to verify certificate. Please try again.");
    } finally {
      setIsVerifying(false);
      resetCaptcha();
    }
  };

  return (
    <Section className="min-h-[75vh] flex items-center bg-muted/5">
      <div className="max-w-xl mx-auto w-full">
        <div className="text-center mb-8">
          <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
          <SectionHeading 
            title="Verify Certificate" 
            subtitle="Enter the unique reference ID or Student ID Card printed on your certificate to verify its authenticity."
            className="mb-0"
          />
        </div>

        <Card className="border-border/50 shadow-lg bg-white dark:bg-card">
          <CardHeader>
            <CardTitle>Official Authentication Portal</CardTitle>
            <CardDescription>
              Our verification system checks directly against the central school student registry.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                  Reference ID / Student ID *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. 123-ABCD-4567 or S1001"
                  value={refId}
                  onChange={(e) => setRefId(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center bg-muted/40 p-3 rounded-lg border border-border">
                <span className="text-sm font-medium whitespace-nowrap">
                  Security Check: {captchaExpected.num1} + {captchaExpected.num2} = 
                </span>
                <Input 
                  type="number" 
                  value={captchaAnswer} 
                  onChange={(e) => setCaptchaAnswer(e.target.value)} 
                  className="w-24 h-9"
                  placeholder="?"
                  required
                />
                <Button type="submit" disabled={isVerifying} className="w-full sm:w-auto sm:ms-auto font-bold">
                  {isVerifying ? "Verifying..." : "Verify Now"}
                </Button>
              </div>
            </form>

            {/* Results Area */}
            {hasChecked && verificationData?.isValid && (
              <div className="mt-6 border-2 border-emerald-500/30 bg-emerald-500/5 p-6 rounded-2xl animate-in slide-in-from-bottom-2 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-lg text-emerald-700 dark:text-emerald-300">
                        Official Authentic Certificate
                      </h4>
                      <span className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {verificationData.status || "Verified"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Registry Code: <span className="font-mono font-semibold text-foreground">{verificationData.verificationCode || verificationData.refId}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-500/20 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Student Name</span>
                    <p className="font-bold text-foreground">{verificationData.studentName}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-semibold">ID Card / Roll</span>
                    <p className="font-bold text-foreground">{verificationData.idCardNo || verificationData.rollNumber}</p>
                  </div>
                  {verificationData.className && (
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-semibold">Class</span>
                      <p className="font-bold text-foreground">{verificationData.className}</p>
                    </div>
                  )}
                  {verificationData.academicYear && (
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-semibold">Academic Year</span>
                      <p className="font-bold text-foreground">{verificationData.academicYear}</p>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10"
                    onClick={() => window.print()}
                  >
                    <Printer className="w-4 h-4 me-2" /> Print Verification Certificate
                  </Button>
                </div>
              </div>
            )}

            {hasChecked && verificationData && !verificationData.isValid && (
              <div className="mt-6 bg-destructive/10 border border-destructive/20 p-5 rounded-2xl flex items-start gap-4 animate-in slide-in-from-bottom-2">
                <XCircle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-destructive">Verification Failed</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {verificationData.message || "We could not find any matching student record in the registry for this reference number. Please check the code and try again."}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}


