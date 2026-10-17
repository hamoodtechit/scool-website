import { setRequestLocale } from 'next-intl/server';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { NoticeList } from '@/components/themes/default/notices/NoticeList';
import { ModernNotices } from '@/components/themes/modern/notices/ModernNotices';

export default async function NoticesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ThemePageRenderer 
      defaultComponent={<NoticeList />}
      modernComponent={<ModernNotices />}
    />
  );
}
