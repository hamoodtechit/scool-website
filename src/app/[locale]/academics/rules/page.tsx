import { setRequestLocale } from 'next-intl/server';
import { RulesSyllabus } from '@/components/themes/default/academics/RulesSyllabus';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernRules } from '@/components/themes/modern/ModernSecondaryPages';

export default async function RulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemePageRenderer defaultComponent={<RulesSyllabus />} modernComponent={<ModernRules />} />;
}
