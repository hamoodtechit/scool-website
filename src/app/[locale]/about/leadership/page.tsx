import { getTranslations, setRequestLocale } from "next-intl/server";
import { LeadershipSpeeches } from "@/components/themes/default/about/LeadershipSpeeches";
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernLeadership } from '@/components/themes/modern/ModernSecondaryPages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Common" });
  return {
    title: `Institutional Leadership | School Administration`,
    description: "Executive messages from our Governing Body Chairman and School Principal.",
  };
}

export default async function LeadershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemePageRenderer defaultComponent={<LeadershipSpeeches />} modernComponent={<ModernLeadership />} />;
}
