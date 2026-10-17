import { setRequestLocale } from 'next-intl/server';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { StaffDirectory } from '@/components/themes/default/staff/StaffDirectory';
import { ModernStaff } from '@/components/themes/modern/staff/ModernStaff';

export default async function StaffPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ThemePageRenderer 
      defaultComponent={<StaffDirectory />}
      modernComponent={<ModernStaff />}
    />
  );
}
