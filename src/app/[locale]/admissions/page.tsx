import { setRequestLocale } from 'next-intl/server';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { AdmissionsForm } from '@/components/themes/default/admissions/AdmissionsForm';
import { ModernAdmissions } from '@/components/themes/modern/admissions/ModernAdmissions';

export default async function AdmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ThemePageRenderer 
      defaultComponent={<AdmissionsForm />}
      modernComponent={<ModernAdmissions />}
    />
  );
}
