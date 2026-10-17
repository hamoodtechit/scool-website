import { setRequestLocale } from 'next-intl/server';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { AboutSchool } from '@/components/themes/default/about/AboutSchool';
import { ModernAbout } from '@/components/themes/modern/about/ModernAbout';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ThemePageRenderer 
      defaultComponent={<AboutSchool />}
      modernComponent={<ModernAbout />}
    />
  );
}
