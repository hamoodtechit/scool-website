import { setRequestLocale } from 'next-intl/server';
import { EventsCalendar } from '@/components/themes/default/events/EventsCalendar';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernEvents } from '@/components/themes/modern/ModernSecondaryPages';

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemePageRenderer defaultComponent={<EventsCalendar />} modernComponent={<ModernEvents />} />;
}
