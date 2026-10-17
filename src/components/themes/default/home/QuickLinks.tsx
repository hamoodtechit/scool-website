"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, GraduationCap, Calendar, Image as ImageIcon, Users, FileText } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useTranslations } from "next-intl";

const LINKS = [
  { href: "/about", translationKey: "about", icon: GraduationCap, color: "bg-blue-500/10 text-blue-500", colSpan: "col-span-1 md:col-span-2" },
  { href: "/academics", translationKey: "academics", icon: BookOpen, color: "bg-emerald-500/10 text-emerald-500", colSpan: "col-span-1" },
  { href: "/notices", translationKey: "notices", icon: FileText, color: "bg-amber-500/10 text-amber-500", colSpan: "col-span-1" },
  { href: "/events", translationKey: "calendar", icon: Calendar, color: "bg-purple-500/10 text-purple-500", colSpan: "col-span-1" },
  { href: "/staff", translationKey: "staff", icon: Users, color: "bg-pink-500/10 text-pink-500", colSpan: "col-span-1 md:col-span-2" },
  { href: "/gallery", translationKey: "gallery", icon: ImageIcon, color: "bg-orange-500/10 text-orange-500", colSpan: "col-span-1" },
];

export function QuickLinks() {
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  return (
    <Section className="bg-muted/30">
      <SectionHeading 
        title={tCommon("explore_campus")} 
        subtitle={tCommon("explore_campus_desc")} 
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {LINKS.map((item, idx) => (
          <Link key={idx} href={item.href} className={item.colSpan}>
            <Card className="h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card hover:bg-accent group overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center justify-center h-32 md:h-40 text-center relative z-10">
                <div className={`p-4 rounded-full mb-4 transition-transform group-hover:scale-110 ${item.color}`}>
                  <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors">
                  {tNav(item.translationKey as Parameters<typeof tNav>[0])}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
