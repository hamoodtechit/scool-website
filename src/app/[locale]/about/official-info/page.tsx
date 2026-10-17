import { OfficialInformation } from '@/components/themes/default/about/OfficialInformation';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernOfficialInfo } from '@/components/themes/modern/ModernSecondaryPages';
import { setRequestLocale } from 'next-intl/server';

export default async function OfficialInfoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemePageRenderer defaultComponent={<OfficialInformation />} modernComponent={<ModernOfficialInfo />} />;
}
