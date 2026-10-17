import { setRequestLocale } from 'next-intl/server';
import { AdmissionInfo } from '@/components/themes/default/admissions/AdmissionInfo';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernAdmissionInfo } from '@/components/themes/modern/ModernSecondaryPages';

export default async function AdmissionInfoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemePageRenderer defaultComponent={<AdmissionInfo />} modernComponent={<ModernAdmissionInfo />} />;
}
