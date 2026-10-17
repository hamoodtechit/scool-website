"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetSchoolProfile, useGetBanners } from "@/hooks/api/school/useSchoolQueries";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ArrowRight, Play, Sparkles } from "lucide-react";
import { extractErrorMessage } from "@/utils/error";
import type { Banner } from "@/types/school.types";

export function HeroBanner() {
  const { school_id, seo } = useSchool();
  const { data: profile, isLoading: isProfileLoading, isError: isProfileError, error: profileError } = useGetSchoolProfile(school_id);
  const { data: bannersData = [], isLoading: isBannersLoading } = useGetBanners(school_id);
  const t = useTranslations("Common");

  const isLoading = isProfileLoading && isBannersLoading;

  if (isLoading) {
    return <Skeleton className="w-full h-[65vh] min-h-[480px] max-h-[820px]" />;
  }

  if (isProfileError && bannersData.length === 0) {
    return (
      <div className="w-full h-[60vh] min-h-[420px] flex items-center justify-center bg-destructive/10">
        <div className="text-center px-4">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive font-medium">{extractErrorMessage(profileError)}</p>
        </div>
      </div>
    );
  }

  // Determine dynamic slides: priority to banners API, then profile banners, then fallback dynamic slide
  let slides: Banner[] = [];
  if (bannersData && bannersData.length > 0) {
    slides = bannersData;
  } else if (profile?.banners && profile.banners.length > 0) {
    slides = profile.banners;
  } else {
    // Elegant fallback based on actual school profile data
    slides = [
      {
        id: "default-hero",
        title: profile?.name || seo?.title || "Excellence in Education & Character",
        subtitle: "Welcome to Our Academic Community",
        description:
          profile?.history?.slice(0, 180) ||
          "Empowering young minds with innovative knowledge, holistic values, and technological leadership.",
        badge: "Excellence in Education",
        mediaType: "IMAGE",
        imageUrl:
          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2064&auto=format&fit=crop",
        primaryBtnText: t("contact_us"),
        primaryBtnUrl: "/contact",
        secondaryBtnText: t("learn_more"),
        secondaryBtnUrl: "/about",
      },
    ];
  }

  return (
    <div className="relative w-full overflow-hidden bg-slate-950">
      <Carousel
        opts={{
          loop: slides.length > 1,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ms-0">
          {slides.map((slide, index) => {
            const bgImage = slide.imageUrl || slide.image_url;
            const bgVideo = slide.videoUrl || slide.video_url;
            const isVideo = slide.mediaType === "VIDEO" && !!bgVideo;

            const rawPrimaryUrl = slide.primaryBtnUrl || "/contact";
            const primaryUrl = rawPrimaryUrl === "/admissions" ? "/contact" : rawPrimaryUrl;
            const primaryText =
              slide.primaryBtnText === "Apply Now" || rawPrimaryUrl === "/admissions"
                ? t("contact_us")
                : (slide.primaryBtnText || t("contact_us"));
            const secondaryText = slide.secondaryBtnText || t("learn_more");
            const secondaryUrl = slide.secondaryBtnUrl || "/about";
            const badgeText =
              slide.badge && slide.badge.toLowerCase().includes("admission")
                ? "Excellence in Education"
                : slide.badge;

            return (
              <CarouselItem
                key={slide.id || index}
                className="relative h-[65vh] min-h-[480px] max-h-[820px] w-full ps-0 overflow-hidden"
              >
                {/* Background Media */}
                {isVideo ? (
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={bgImage || undefined}
                      className="absolute inset-0 w-full h-full object-cover scale-105"
                    >
                      <source src={bgVideo!} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
                    style={{
                      backgroundImage: bgImage
                        ? `url("${bgImage}")`
                        : `url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop")`,
                    }}
                  />
                )}

                {/* Layered Gradient & Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                {/* Video Indicator Pill */}
                {isVideo && (
                  <div className="absolute top-6 end-6 z-20 hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <Play className="w-3 h-3 fill-white" />
                    <span>Campus Video</span>
                  </div>
                )}

                {/* Hero Foreground Content */}
                <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-start px-6 sm:px-10 lg:px-16 text-start">
                  
                  {/* Eyebrow / Badge */}
                  {badgeText && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 text-primary-foreground text-xs md:text-sm font-semibold mb-4 animate-in slide-in-from-bottom-3 duration-500">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span>{badgeText}</span>
                    </div>
                  )}

                  {/* Heading */}
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] max-w-4xl mb-4 tracking-tight animate-in slide-in-from-bottom-4 duration-700">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="text-lg sm:text-2xl font-semibold text-emerald-400/90 mb-3 max-w-3xl animate-in slide-in-from-bottom-6 duration-700 delay-100">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  {slide.description && (
                    <p className="text-sm sm:text-base md:text-lg text-gray-200/90 max-w-2xl mb-8 leading-relaxed line-clamp-3 animate-in slide-in-from-bottom-8 duration-700 delay-150">
                      {slide.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 animate-in slide-in-from-bottom-10 duration-700 delay-200">
                    {primaryUrl && (
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-bold rounded-full shadow-xl shadow-primary/30 transition-all duration-300 hover:-translate-y-1 group border border-primary-foreground/20"
                        asChild
                      >
                        <Link href={primaryUrl}>
                          {primaryText}
                          <ArrowRight className="ms-2 w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                        </Link>
                      </Button>
                    )}

                    {secondaryUrl && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/40 bg-white/10 text-white hover:text-white backdrop-blur-md hover:bg-white/20 hover:border-white/60 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 shadow-sm"
                        asChild
                      >
                        <Link href={secondaryUrl}>
                          {secondaryText}
                        </Link>
                      </Button>
                    )}
                  </div>

                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Carousel Navigation Arrows */}
        {slides.length > 1 && (
          <div className="hidden md:block">
            <CarouselPrevious className="start-6 bg-black/40 text-white border-white/20 hover:bg-black/70 hover:border-white/40 size-12" />
            <CarouselNext className="end-6 bg-black/40 text-white border-white/20 hover:bg-black/70 hover:border-white/40 size-12" />
          </div>
        )}
      </Carousel>
    </div>
  );
}
