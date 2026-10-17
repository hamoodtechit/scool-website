import { setRequestLocale } from 'next-intl/server';
import { Governance } from '@/components/themes/default/about/Governance';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernGovernance } from '@/components/themes/modern/ModernSecondaryPages';

export default async function GovernancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemePageRenderer defaultComponent={<Governance />} modernComponent={<ModernGovernance />} />;
}
