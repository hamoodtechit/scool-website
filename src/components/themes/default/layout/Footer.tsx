"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useSchool } from "@/components/providers/school-provider";
import { useGetSchoolProfile } from "@/hooks/api/school/useSchoolQueries";

export function Footer() {
  const t = useTranslations("Navigation");
  const school = useSchool();
  const { data: profile } = useGetSchoolProfile(school.school_id);

  const schoolName = profile?.name || school.seo?.title || "School Portal";
  const logoSrc = school.branding?.logo_url || profile?.logoUrl || profile?.logo_url;

  return (
    <footer className="border-t border-border/40 bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
              {logoSrc ? (
                <img src={logoSrc} alt={schoolName} className="h-9 w-9 object-contain rounded" />
              ) : (
                <div className="h-9 w-9 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {schoolName.slice(0, 1).toUpperCase()}
                </div>
              )}
              <h3 className="text-lg font-bold tracking-tight">{schoolName}</h3>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {profile?.history || "Empowering education through technology. Excellence in every step of learning."}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{t("quick_links")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">{t("about")}</Link></li>
              <li><Link href="/academics" className="hover:text-primary transition-colors">{t("academics")}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t("contact")}</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">{t("calendar")}</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{t("portals_resources")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/notices" className="hover:text-primary transition-colors">{t("notices")}</Link></li>
              <li><Link href="/results" className="hover:text-primary transition-colors">{t("exam_results")}</Link></li>
              <li><Link href="/certificate" className="hover:text-primary transition-colors">{t("verify_certificate")}</Link></li>
              <li><Link href="/downloads" className="hover:text-primary transition-colors">{t("downloads_forms")}</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{t("campus_contact")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{profile?.phone || "+880 1234 567890"}</li>
              <li>{profile?.email || "info@school.edu"}</li>
              <li>{profile?.address || "Knowledge City, Dhaka, Bangladesh"}</li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {schoolName}. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Developed by{" "}
            <a
              href="https://hamoodtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Hamoodtech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

