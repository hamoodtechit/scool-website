"use client";

import React from "react";
import { HeroBanner } from "@/components/themes/default/home/HeroBanner";
import { NoticeMarquee } from "@/components/themes/default/home/NoticeMarquee";
import { QuickLinks } from "@/components/themes/default/home/QuickLinks";
import { PrincipalSpeech } from "@/components/themes/default/home/PrincipalSpeech";
import { StatsCounter } from "@/components/themes/default/home/StatsCounter";
import { AcademicPrograms } from "@/components/themes/default/home/AcademicPrograms";
import { NewsAndEvents } from "@/components/themes/default/home/NewsAndEvents";
import { TestimonialSlider } from "@/components/themes/default/home/TestimonialSlider";
import { AdmissionsBanner } from "@/components/themes/default/home/AdmissionsBanner";
import { MediaGallery } from "@/components/themes/default/gallery/MediaGallery"; // Use existing for Campus Life

export function DefaultHome() {
  return (
    <>
      <NoticeMarquee />
      <HeroBanner />
      <QuickLinks />
      <StatsCounter />
      <PrincipalSpeech />
      <AcademicPrograms />
      <NewsAndEvents />
      <TestimonialSlider />
      <AdmissionsBanner />
    </>
  );
}
