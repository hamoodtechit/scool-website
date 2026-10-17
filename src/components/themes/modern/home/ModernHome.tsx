"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSchool } from "@/components/providers/school-provider";
import { useGetEvents, useGetGalleries, useGetNotices, useGetSchoolProfile, useGetStats } from "@/hooks/api/school/useSchoolQueries";
import { ArrowUpRight, CalendarDays, ChevronRight, MapPin, Quote, Sparkles } from "lucide-react";

const fallbackImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop";

export function ModernHome() {
  const t = useTranslations("Modern");
  const nav = useTranslations("Navigation");
  const { school_id } = useSchool();
  const { data: profile } = useGetSchoolProfile(school_id);
  const { data: notices = [] } = useGetNotices(school_id, 4);
  const { data: events = [] } = useGetEvents(school_id);
  const { data: galleries = [] } = useGetGalleries(school_id);
  const { data: stats = [] } = useGetStats(school_id);
  const hero = profile?.banners?.[0];
  const heroImage = hero?.imageUrl || hero?.image_url || fallbackImage;
  const isVideo = hero?.mediaType === "VIDEO" && !!(hero?.videoUrl || hero?.video_url);

  const heroPrimaryUrl =
    !hero?.primaryBtnUrl || hero.primaryBtnUrl === "/admissions"
      ? "/contact"
      : hero.primaryBtnUrl;
  const heroPrimaryText =
    !hero?.primaryBtnText || hero.primaryBtnText === "Apply Now" || hero.primaryBtnUrl === "/admissions"
      ? nav("contact")
      : hero.primaryBtnText;
  const heroBadge =
    hero?.badge && hero.badge.toLowerCase().includes("admission")
      ? t("eyebrow")
      : (hero?.badge || t("eyebrow"));

  return <div className="space-y-16 sm:space-y-20 lg:space-y-28">
    <section className="relative isolate -mx-4 -mt-4 flex min-h-[36rem] items-center overflow-hidden rounded-none border border-primary/20 bg-gradient-to-br from-primary/20 via-card/90 to-secondary/20 p-6 shadow-2xl shadow-primary/10 sm:-mx-6 sm:-mt-6 sm:min-h-[38rem] sm:rounded-b-[2rem] sm:p-10 lg:-mx-10 lg:-mt-10 lg:min-h-[40rem] lg:p-14">
      <div className="absolute -end-16 -top-20 -z-10 size-72 rounded-full bg-primary/20 blur-3xl" /><div className="absolute bottom-0 end-0 -z-10 h-2/3 w-1/2 bg-gradient-to-tl from-secondary/20 to-transparent blur-2xl" />
      <div className="mx-auto grid w-full max-w-7xl translate-y-4 items-center gap-10 lg:translate-y-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="max-w-2xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur"><Sparkles className="size-3.5" />{heroBadge}</div><h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">{hero?.title || t("hero_title")}</h1><p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{hero?.description || profile?.history || t("hero_description")}</p><div className="mt-8 flex flex-wrap gap-3"><Link href={heroPrimaryUrl} className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">{heroPrimaryText}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" /></Link><Link href={hero?.secondaryBtnUrl || "/about"} className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 text-foreground hover:text-primary px-5 py-3 text-sm font-bold backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">{hero?.secondaryBtnText || t("discover_school")}<ChevronRight className="size-4 rtl:rotate-180" /></Link></div></div>
        <div className="relative hidden min-h-64 lg:block"><div className="absolute inset-5 overflow-hidden rounded-[2rem] border border-white/30 shadow-2xl shadow-primary/20">{isVideo ? (<video autoPlay loop muted playsInline poster={heroImage} className="size-full object-cover transition-transform duration-700 hover:scale-105"><source src={(hero?.videoUrl || hero?.video_url)!} type="video/mp4" /></video>) : (<img src={heroImage} alt={hero?.title || "School campus"} className="size-full object-cover transition-transform duration-700 hover:scale-105" />)}</div><div className="absolute -bottom-1 start-0 max-w-[14rem] rounded-2xl border border-border/60 bg-card/90 p-4 shadow-xl backdrop-blur"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{t("active_today")}</p><p className="mt-1 text-sm font-bold">{profile?.name || "Our school community"}</p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3" />{profile?.address || "Learning City"}</p></div></div>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.slice(0, 4).map((stat) => <div key={stat.id} className="group rounded-3xl border border-border/60 bg-card/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"><p className="text-3xl font-black tracking-tight text-primary">{stat.value}<span className="text-lg">{stat.suffix}</span></p><p className="mt-1 text-sm text-muted-foreground">{stat.label}</p></div>)}</section>

    <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="rounded-3xl border border-border/60 bg-card/75 p-6 shadow-xl shadow-primary/5 backdrop-blur sm:p-8 flex flex-col justify-between">
        <div>
          {/* Header with Principal Avatar, Designation & Badge */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-border/50">
            <div className="flex items-center gap-3.5">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-primary/10 ring-2 ring-primary/20 shadow-md">
                {profile?.principal_image_url ? (
                  <img
                    src={profile.principal_image_url}
                    alt={profile.principal_name || "Principal"}
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="grid size-full place-items-center text-lg font-black text-primary">
                    {profile?.principal_name?.slice(0, 1) || "P"}
                  </div>
                )}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary mb-0.5">
                  <Quote className="size-3.5" />
                  <span>{t("principal_message")}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground leading-snug">
                  {profile?.principal_name || "Principal"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {profile?.name || "School Leadership"}
                </p>
              </div>
            </div>

            <div className="hidden sm:grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Quote className="size-5 rotate-180" />
            </div>
          </div>

          {/* Speech Text (Optimized readable font size) */}
          <div className="relative mt-5">
            <blockquote className="text-sm sm:text-base text-foreground/85 leading-relaxed font-normal italic relative z-10">
              “{profile?.principal_message || t("hero_description")}”
            </blockquote>
          </div>
        </div>

        {/* Card Footer with Read More Link */}
        <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-medium truncate max-w-[200px]">
            {profile?.name || "Institutional Message"}
          </span>
          <Link
            href="/about/leadership"
            className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary/80 transition-colors group"
          >
            {t("read_more")}
            <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
      <div className="rounded-3xl border border-border/60 bg-card/75 p-6 shadow-xl shadow-primary/5 backdrop-blur sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("latest_notices")}</p>
            <h2 className="mt-1 text-2xl font-bold">{t("view_notices")}</h2>
          </div>
          <Link href="/notices" className="text-sm font-semibold text-primary transition-colors hover:text-foreground">
            {t("explore_all")}
          </Link>
        </div>
        <div className="space-y-3">
          {notices.slice(0, 3).map((notice) => (
            <Link href="/notices" key={notice.id} className="group flex items-start justify-between gap-3 rounded-2xl border border-border/50 bg-background/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
              <div>
                <p className="text-xs font-semibold text-primary">{notice.date}</p>
                <p className="mt-1 line-clamp-2 text-sm font-semibold">{notice.title}</p>
              </div>
              <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
          {notices.length === 0 && <p className="py-5 text-sm text-muted-foreground">{t("no_items")}</p>}
        </div>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.85fr_1.15fr]">
      <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("upcoming")}</p>
        <h2 className="mt-2 text-3xl font-black">{nav("calendar")}</h2>
        <div className="mt-6 space-y-3">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="flex gap-3 rounded-2xl bg-background/60 p-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <CalendarDays className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.date}{event.location ? ` · ${event.location}` : ""}</p>
              </div>
            </div>
          ))}
          {events.length === 0 && <p className="py-4 text-sm text-muted-foreground">{t("no_items")}</p>}
        </div>
        <Link href="/events" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
          {nav("calendar")}<ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/75 p-6 shadow-xl shadow-primary/5 backdrop-blur sm:p-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("campus_moments")}</p>
            <h2 className="mt-1 text-2xl font-bold">{nav("gallery")}</h2>
          </div>
          <Link href="/gallery" className="text-sm font-semibold text-primary">
            {t("explore_all")}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {galleries.slice(0, 3).map((gallery) => (
            <Link href="/gallery" key={gallery.id} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img src={gallery.cover_image_url} alt={gallery.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute inset-x-3 bottom-3 line-clamp-1 text-xs font-bold text-white">{gallery.title}</p>
            </Link>
          ))}
          {galleries.length === 0 && <p className="col-span-full py-6 text-center text-sm text-muted-foreground">{t("no_items")}</p>}
        </div>
      </div>
    </section>
  </div>;
}
