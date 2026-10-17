const fs = require('fs');
const path = require('path');

const basePath = 'd:/Projects/hamoodtech/school/front-side';
const homePath = path.join(basePath, 'src/components/themes/default/home');

// 1. StatsCounter.tsx
const statsCode = `"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetStats } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCounter() {
  const { school_id } = useSchool();
  const { data: stats, isLoading } = useGetStats(school_id);

  if (isLoading) {
    return (
      <Section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full bg-primary-foreground/20 rounded-xl" />
          ))}
        </div>
      </Section>
    );
  }

  if (!stats || stats.length === 0) return null;

  return (
    <Section className="bg-primary text-primary-foreground py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(stat => (
          <div key={stat.id} className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-primary-foreground/80 font-medium text-sm md:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
`;
fs.writeFileSync(path.join(homePath, 'StatsCounter.tsx'), statsCode);

// 2. AcademicPrograms.tsx
const programsCode = `"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetPrograms } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";

export function AcademicPrograms() {
  const { school_id } = useSchool();
  const { data: programs, isLoading } = useGetPrograms(school_id);

  if (isLoading) {
    return (
      <Section className="bg-muted/10">
        <SectionHeading title="Our Academic Pillars" subtitle="Discover our comprehensive educational journey." />
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[300px] w-full rounded-2xl" />
          ))}
        </div>
      </Section>
    );
  }

  if (!programs || programs.length === 0) return null;

  return (
    <Section className="bg-muted/10">
      <SectionHeading title="Our Academic Pillars" subtitle="Discover our comprehensive educational journey from early years to graduation." />
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map(program => (
          <Link key={program.id} href={program.href}>
            <Card className="h-[320px] overflow-hidden group cursor-pointer border-0 shadow-md relative rounded-2xl">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: \`url(\${program.image_url})\` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <CardContent className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{program.title}</h3>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 line-clamp-3">
                  {program.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
`;
fs.writeFileSync(path.join(homePath, 'AcademicPrograms.tsx'), programsCode);

// 3. NewsAndEvents.tsx
const newsCode = `"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetEvents, useGetNotices } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Calendar, FileText, ChevronRight } from "lucide-react";

export function NewsAndEvents() {
  const { school_id } = useSchool();
  const { data: events } = useGetEvents(school_id);
  const { data: notices } = useGetNotices(school_id, 3);

  return (
    <Section>
      <SectionHeading title="News & Events" subtitle="Stay updated with the latest happenings at our school." />
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Events */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2"><Calendar className="text-primary" /> Upcoming Events</h3>
            <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
              <Link href="/calendar">View All <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="space-y-4">
            {events?.slice(0, 3).map(event => (
              <Card key={event.id} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex gap-4">
                  <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-lg min-w-[80px] p-2 text-center">
                    <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-2xl font-black">{new Date(event.date).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight mb-1">{event.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2"><FileText className="text-secondary" /> Recent Notices</h3>
            <Button variant="ghost" className="text-secondary hover:text-secondary/80" asChild>
              <Link href="/notices">View All <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="space-y-4">
            {notices?.slice(0, 3).map(notice => (
              <div key={notice.id} className="flex gap-4 items-start border-b border-border/50 pb-4 last:border-0">
                <div className="mt-1 bg-secondary/10 p-2 rounded-full text-secondary">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold hover:text-primary transition-colors cursor-pointer leading-tight mb-1">{notice.title}</h4>
                  <p className="text-xs font-medium text-muted-foreground">{notice.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}
`;
fs.writeFileSync(path.join(homePath, 'NewsAndEvents.tsx'), newsCode);

// 4. TestimonialSlider.tsx
const testCode = `"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetTestimonials } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function TestimonialSlider() {
  const { school_id } = useSchool();
  const { data: testimonials } = useGetTestimonials(school_id);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <Section className="bg-muted/30">
      <SectionHeading title="Community Voices" subtitle="Hear what our students, parents, and alumni have to say." />
      <div className="max-w-4xl mx-auto px-12">
        <Carousel opts={{ loop: true, align: "center" }} className="w-full">
          <CarouselContent>
            {testimonials.map((test) => (
              <CarouselItem key={test.id} className="md:basis-1/1 lg:basis-1/1">
                <Card className="border-0 shadow-lg bg-background relative mt-8">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground p-3 rounded-full shadow-md">
                    <Quote className="w-6 h-6 rotate-180" />
                  </div>
                  <CardContent className="pt-10 pb-8 px-6 md:px-12 text-center">
                    <p className="text-lg md:text-xl text-muted-foreground italic mb-6 leading-relaxed">"{test.quote}"</p>
                    <h4 className="font-bold text-lg">{test.name}</h4>
                    <p className="text-sm font-medium text-primary">{test.role}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Section>
  );
}
`;
fs.writeFileSync(path.join(homePath, 'TestimonialSlider.tsx'), testCode);

// 5. AdmissionsBanner.tsx
const bannerCode = `"use client";

import React from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export function AdmissionsBanner() {
  return (
    <Section className="bg-secondary text-secondary-foreground py-20 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Join Our Community?</h2>
        <p className="text-lg md:text-xl text-secondary-foreground/80 mb-10 max-w-2xl mx-auto">
          Take the first step towards a brighter future. Applications for the upcoming academic year are now open.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-secondary hover:bg-white/90 text-lg h-14 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1" asChild>
            <Link href="/admissions">
              Apply Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg h-14 px-8 rounded-full" asChild>
            <Link href="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
`;
fs.writeFileSync(path.join(homePath, 'AdmissionsBanner.tsx'), bannerCode);

// 6. DefaultHome.tsx
const defaultHomeCode = `"use client";

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
`;
fs.writeFileSync(path.join(homePath, 'DefaultHome.tsx'), defaultHomeCode);

// 7. Update HomeThemeRenderer.tsx
const rendererPath = path.join(basePath, 'src/components/themes/HomeThemeRenderer.tsx');
let rendererContent = fs.readFileSync(rendererPath, 'utf8');
rendererContent = rendererContent.replace(
  /import { HeroBanner } from ".*?HeroBanner";\nimport { NoticeMarquee } from ".*?NoticeMarquee";\nimport { QuickLinks } from ".*?QuickLinks";\nimport { PrincipalSpeech } from ".*?PrincipalSpeech";/,
  `import { DefaultHome } from "@/components/themes/default/home/DefaultHome";`
);
rendererContent = rendererContent.replace(
  /<NoticeMarquee \/>\s*<HeroBanner \/>\s*<QuickLinks \/>\s*<PrincipalSpeech \/>/,
  `<DefaultHome />`
);
fs.writeFileSync(rendererPath, rendererContent);

console.log('Homepage expansion script completed.');
