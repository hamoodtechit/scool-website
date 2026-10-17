import { setRequestLocale } from 'next-intl/server';
import { HomeThemeRenderer } from '@/components/themes/HomeThemeRenderer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Phase 5: The HomeThemeRenderer Client Component reads the DomainResolver's 
  // theme_id context and dynamically serves either the 'Default' or 'Modern' theme!
  return <HomeThemeRenderer />;
}
