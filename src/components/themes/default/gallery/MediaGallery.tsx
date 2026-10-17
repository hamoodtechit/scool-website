"use client";

import React, { useState } from "react";
import { useSchool } from "@/components/providers/school-provider";
import { useGetGalleries } from "@/hooks/api/school/useSchoolQueries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, Maximize2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractErrorMessage } from "@/utils/error";

export function MediaGallery() {
  const { school_id } = useSchool();
  const { data: galleries, isLoading, isError, error } = useGetGalleries(school_id);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImg, setLightboxImg] = useState<any | null>(null);

  const categories = ["All", ...Array.from(new Set(galleries?.map(g => g.category).filter(Boolean) as string[]))];
  const filteredGalleries = galleries?.filter(g => activeCategory === "All" || g.category === activeCategory);

  return (
    <Section>
      <SectionHeading 
        title="Media Gallery" 
        subtitle="Explore moments, events, and memories from our campus."
      />

      <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 px-4">
        {categories.map(cat => (
          <Button 
            key={cat} 
            variant={activeCategory === cat ? "default" : "outline"}
            onClick={() => setActiveCategory(cat)}
            className="rounded-full whitespace-nowrap"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 md:px-0">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-[4/3] rounded-xl" />
          ))
        ) : isError ? (
          <div className="col-span-full text-center py-12 bg-destructive/10 rounded-xl border border-destructive/20">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-destructive font-medium">{extractErrorMessage(error)}</p>
          </div>
        ) : filteredGalleries?.length ? (
          filteredGalleries.map((gallery) => (
            <Card 
              key={gallery.id} 
              className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-transparent"
              onClick={() => setSelectedAlbum(gallery)}
            >
              <CardContent className="p-0 relative aspect-[4/3] overflow-hidden rounded-xl">
                <img 
                  src={gallery.cover_image_url} 
                  alt={gallery.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-primary font-medium text-sm mb-1">{gallery.category || new Date(gallery.date).getFullYear()}</p>
                    <h3 className="text-white font-bold text-xl">{gallery.title}</h3>
                    <p className="text-white/70 text-sm mt-1">{gallery.items?.length || 0} items</p>
                  </div>
                  
                  {/* Expand Icon */}
                  <div className="absolute top-4 end-4 bg-white/20 backdrop-blur rounded-full p-2 text-white">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No galleries available at this time.</p>
          </div>
        )}
      </div>

      {/* Album View Modal */}
      {selectedAlbum && (
        <div 
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col overflow-y-auto"
        >
          <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-background/80 backdrop-blur-md border-b">
            <div>
              <h2 className="text-2xl font-bold">{selectedAlbum.title}</h2>
              <p className="text-muted-foreground">{selectedAlbum.items?.length || 0} Items • {new Date(selectedAlbum.date).toLocaleDateString()}</p>
            </div>
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => setSelectedAlbum(null)}
            >
              Close Album
            </Button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {selectedAlbum.items?.map((item: any, idx: number) => (
                <div key={item.id} className="relative aspect-video rounded-xl overflow-hidden bg-muted group cursor-pointer" onClick={() => setLightboxImg(item)}>
                  {item.type === 'video' ? (
                     <div className="w-full h-full bg-black flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center text-white backdrop-blur">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>
                     </div>
                  ) : (
                    <img src={item.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Album item ${idx}`} />
                  )}
                </div>
              ))}
              {!selectedAlbum.items?.length && (
                <div className="col-span-full text-center py-12">
                   <p className="text-muted-foreground">This album is empty.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          {lightboxImg.type === 'video' ? (
            <iframe 
               src={lightboxImg.url} 
               className="w-full max-w-4xl aspect-video rounded-lg shadow-2xl animate-in zoom-in-95 duration-200" 
               allowFullScreen
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <img 
              src={lightboxImg.url} 
              className="max-w-full max-h-full object-contain rounded-md shadow-2xl animate-in zoom-in-95 duration-200"
              alt="Expanded gallery"
            />
          )}
          <Button 
            variant="ghost" 
            className="absolute top-4 end-4 text-white hover:bg-white/20 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImg(null);
            }}
          >
            Close
          </Button>
        </div>
      )}
    </Section>
  );
}
