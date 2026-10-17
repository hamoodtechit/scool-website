import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactUs } from "@/components/themes/default/contact/ContactUs";
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernContact } from '@/components/themes/modern/ModernSecondaryPages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Common" });
  return {
    title: `Contact Us | Official School Portal`,
    description: "Get in touch with us for admissions, general inquiries, and official school administration.",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemePageRenderer defaultComponent={<ContactUs />} modernComponent={<ModernContact />} />;
}
