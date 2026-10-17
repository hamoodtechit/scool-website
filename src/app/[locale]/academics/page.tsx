import { setRequestLocale } from 'next-intl/server';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';

import { ModernAcademics } from '@/components/themes/modern/academics/ModernAcademics';
import { DefaultAcademics } from '@/components/themes/default/academics/DefaultAcademics';

export default async function AcademicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ThemePageRenderer 
      defaultComponent={<DefaultAcademics />}
      modernComponent={<ModernAcademics />}
    />
  );
}
