import { setRequestLocale } from 'next-intl/server';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ResultsPortal } from '@/components/themes/default/results/ResultsPortal';
import { ModernResults } from '@/components/themes/modern/results/ModernResults';

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ThemePageRenderer 
      defaultComponent={<ResultsPortal />}
      modernComponent={<ModernResults />}
    />
  );
}
