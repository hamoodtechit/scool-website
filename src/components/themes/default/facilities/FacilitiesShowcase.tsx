"use client";

import React from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Monitor, FlaskConical, Trophy, Users, Utensils, Star, Building2 } from "lucide-react";
import * as Icons from "lucide-react";

interface FacilityItem {
  id?: string;
  name: string;
  description: string;
  photoUrl?: string;
  icon?: string;
}

const fallbackFacilities: FacilityItem[] = [
  {
    id: "f1",
    name: "Central Academic Library",
    description: "Extensive repository of curricula reference books, international journals, digital catalogs, and quiet study pods.",
    photoUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
    icon: "BookOpen"
  },
  {
    id: "f2",
    name: "Modern Science & Robotics Lab",
    description: "Fully equipped physics, chemistry, and biology research laboratories allowing experimental discovery and robotics practice.",
    photoUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
    icon: "FlaskConical"
  },
  {
    id: "f3",
    name: "Digital Computing Lab",
    description: "High-speed workstations equipped with modern programming suites, AI learning modules, and high-speed fiber internet.",
    photoUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop",
    icon: "Monitor"
  },
  {
    id: "f4",
    name: "Sports Complex & Gymnasium",
    description: "Spacious outdoor playing fields for football and cricket, accompanied by indoor basketball and badminton courts.",
    photoUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    icon: "Trophy"
  },
  {
    id: "f5",
    name: "Multipurpose Auditorium",
    description: "Acoustically treated auditorium with 500+ seating capacity for conferences, debates, and annual cultural performances.",
    photoUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    icon: "Users"
  },
  {
    id: "f6",
    name: "Hygienic Campus Cafeteria",
    description: "Nutritious and balanced breakfast and lunch meals prepared under strict quality and sanitation guidelines.",
    photoUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    icon: "Utensils"
  }
];

export function FacilitiesShowcase({ facilities = [] }: { facilities?: FacilityItem[] }) {
  // Use real data if provided; otherwise render institutional fallback facilities
  const displayFacilities = facilities.length > 0 ? facilities : fallbackFacilities;

  return (
    <Section className="bg-muted/10 min-h-screen">
      <SectionHeading 
        title="Campus Facilities" 
        subtitle="Explore our world-class infrastructure designed to foster academic excellence, physical well-being, and personal growth."
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
        {displayFacilities.map((facility, index) => {
          const IconComponent = (Icons as any)[facility.icon || 'Building2'] || Building2;
          return (
            <Card 
              key={facility.id || index} 
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 border border-border/70 bg-card hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="relative h-60 overflow-hidden bg-muted">
                  <img 
                    src={facility.photoUrl || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070"} 
                    alt={facility.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-colors" />
                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur p-3 rounded-full shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2.5 text-foreground group-hover:text-primary transition-colors">
                    {facility.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
