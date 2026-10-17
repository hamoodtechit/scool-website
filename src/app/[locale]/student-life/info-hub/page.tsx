import { setRequestLocale } from 'next-intl/server';
import { InfoHub } from '@/components/themes/default/student-life/InfoHub';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernStudentLife } from '@/components/themes/modern/ModernSecondaryPages';

export default async function InfoHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemePageRenderer defaultComponent={<InfoHub />} modernComponent={<ModernStudentLife />} />;
}
