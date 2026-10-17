import { setRequestLocale } from 'next-intl/server';
import { AttendanceLeave } from '@/components/themes/default/academics/AttendanceLeave';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernAttendance } from '@/components/themes/modern/ModernSecondaryPages';

export default async function AttendancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemePageRenderer defaultComponent={<AttendanceLeave />} modernComponent={<ModernAttendance />} />;
}
