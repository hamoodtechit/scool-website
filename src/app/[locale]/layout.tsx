import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { generateDynamicThemeCss } from "@/lib/color";

import { headers, cookies } from "next/headers";
import { resolveDomain } from "@/services/domain.service";
import { SchoolService } from "@/services/school.service";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost";
  
  try {
    const schoolData = await resolveDomain(host);
    const profile = await SchoolService.getProfile(schoolData.school_id);
    
    return {
      title: {
        template: `%s | ${schoolData.seo?.title || profile.name}`,
        default: schoolData.seo?.title || profile.name,
      },
      description: schoolData.seo?.description || profile.history?.substring(0, 160) || "School Portal",
      icons: (schoolData.branding?.logo_url || profile.logoUrl) ? [{ url: (schoolData.branding?.logo_url || profile.logoUrl)! }] : [],
    };
  } catch (error) {
    return {
      title: "School Portal",
      description: "Welcome to the School Portal.",
    };
  }
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "sonner";
import { SchoolProvider } from "@/components/providers/school-provider";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // Fetch domain config
  const headersList = await headers();
  const host = headersList.get("host") || "localhost";
  const schoolData = await resolveDomain(host);

  // Check for test/preview theme cookie override
  try {
    const cookieStore = await cookies();
    const previewTheme = cookieStore.get("school_active_theme")?.value;
    if (previewTheme && (previewTheme === "default" || previewTheme === "modern")) {
      schoolData.theme_id = previewTheme;
    }
  } catch (err) {
    // cookies read fallback
  }

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: generateDynamicThemeCss(
              schoolData.branding?.primary_color,
              schoolData.branding?.secondary_color
            ),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <SchoolProvider schoolData={schoolData}>
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem={false}
                disableTransitionOnChange
              >
                {children}
                <Toaster position="top-center" richColors />
              </ThemeProvider>
            </QueryProvider>
          </SchoolProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
