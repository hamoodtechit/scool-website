"use client";

import React from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

import { useTranslations } from "next-intl";

export function AdmissionsBanner() {
  const tCommon = useTranslations("Common");

  return (
    <Section className="bg-secondary text-secondary-foreground py-20 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -top-24 -end-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -start-24 w-96 h-96 bg-black/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
          Have Questions or Want to Connect?
        </h2>
        <p className="text-lg md:text-xl text-secondary-foreground/85 mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover more about our academic programs, vibrant campus life, and school facilities. Reach out to our administrative team or explore our school community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA (Contact Administration) */}
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-primary-foreground/20 font-bold"
            asChild
          >
            <Link href="/contact">
              {tCommon("contact_us")} <ArrowRight className="ms-2 w-5 h-5 rtl:rotate-180" />
            </Link>
          </Button>

          {/* Secondary CTA (Ghost/Outline with 100% resilient contrast for any theme color) */}
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-secondary-foreground/35 text-secondary-foreground hover:bg-secondary-foreground/15 hover:border-secondary-foreground/70 hover:text-secondary-foreground text-lg h-14 px-8 rounded-full backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 font-semibold shadow-sm"
            asChild
          >
            <Link href="/about">
              {tCommon("learn_more")}
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

