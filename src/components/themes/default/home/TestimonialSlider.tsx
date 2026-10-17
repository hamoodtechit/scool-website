"use client";

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
                  <div className="absolute -top-6 start-1/2 -translate-x-1/2 bg-primary text-primary-foreground p-3 rounded-full shadow-md">
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

