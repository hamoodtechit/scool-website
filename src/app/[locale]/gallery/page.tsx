import { setRequestLocale } from 'next-intl/server';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { MediaGallery } from '@/components/themes/default/gallery/MediaGallery';
import { ModernGallery } from '@/components/themes/modern/gallery/ModernGallery';

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ThemePageRenderer 
      defaultComponent={<MediaGallery />}
      modernComponent={<ModernGallery />}
    />
  );
}
