'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import { useGetGalleries } from '@/hooks/api/school/useSchoolQueries';
import type { Gallery } from '@/types/school.types';
import { PageIntro, Empty } from '../common/ModernCommon';
import { X, Images } from 'lucide-react';

export function ModernGallery() {
  const t = useTranslations('ModernPages');
  const { school_id } = useSchool();
  const { data: albums = [] } = useGetGalleries(school_id);
  const [activePhoto, setActivePhoto] = useState<Gallery | null>(null);

  return (
    <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
      <PageIntro title={t('gallery_title')} subtitle="Campus Moments & Archive" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((gallery: Gallery) => (
          <article
            key={gallery.id}
            onClick={() => setActivePhoto(gallery)}
            className="group border-border/60 bg-card/75 shadow-primary/5 hover:border-primary/40 cursor-pointer overflow-hidden rounded-3xl border shadow-xl backdrop-blur transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={gallery.cover_image_url}
                alt={gallery.title}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 end-3 bg-black/60 text-white rounded-full p-1.5 backdrop-blur">
                <Images className="size-4" />
              </div>
            </div>
            <div className="p-5">
              <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
                {gallery.date}
              </p>
              <h2 className="mt-2 font-bold text-base group-hover:text-primary transition-colors">
                {gallery.title}
              </h2>
              <p className="text-muted-foreground mt-1 text-xs">
                {gallery.category || 'Campus Life'}
              </p>
            </div>
          </article>
        ))}
      </div>
      {!albums.length && <Empty text={t('no_items')} />}

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="bg-background/90 fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="border-border bg-card relative max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl border p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="bg-background/80 text-foreground hover:bg-background absolute end-6 top-6 z-10 grid size-10 place-items-center rounded-full backdrop-blur shadow"
            >
              <X className="size-5" />
            </button>
            <img
              src={activePhoto.cover_image_url}
              alt={activePhoto.title}
              className="max-h-[70vh] w-full rounded-2xl object-contain"
            />
            <div className="mt-4 px-2">
              <h3 className="text-xl font-bold">{activePhoto.title}</h3>
              <p className="text-muted-foreground text-xs mt-1">
                {activePhoto.date} · {activePhoto.category || 'Campus Life'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
