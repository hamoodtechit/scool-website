import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CertificateVerification } from '@/components/themes/default/certificate/CertificateVerification';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernCertificate } from '@/components/themes/modern/ModernSecondaryPages';

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Temporarily hidden as requested
  notFound();

  return (
    <ThemePageRenderer 
      defaultComponent={<CertificateVerification />} 
      modernComponent={<ModernCertificate />} 
    />
  );
}

