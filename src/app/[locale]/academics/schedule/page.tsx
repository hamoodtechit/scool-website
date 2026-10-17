import { getTranslations, setRequestLocale } from "next-intl/server";
import { ClassSchedule } from "@/components/themes/default/academics/ClassSchedule";
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernSchedule } from '@/components/themes/modern/ModernSecondaryPages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Common" });
  return {
    title: `Class Schedule | Academic Timetable`,
    description: "View the academic class schedule and weekly period routine.",
  };
}

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemePageRenderer defaultComponent={<ClassSchedule />} modernComponent={<ModernSchedule />} />;
}
