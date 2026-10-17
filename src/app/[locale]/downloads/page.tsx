import { setRequestLocale } from 'next-intl/server';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { DownloadsRepository } from '@/components/themes/default/downloads/DownloadsRepository';
import { ModernDownloads } from '@/components/themes/modern/downloads/ModernDownloads';

export default async function DownloadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ThemePageRenderer 
      defaultComponent={<DownloadsRepository />}
      modernComponent={<ModernDownloads />}
    />
  );
}
