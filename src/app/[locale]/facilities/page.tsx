import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { FacilitiesShowcase } from "@/components/themes/default/facilities/FacilitiesShowcase";
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { ModernFacilities } from '@/components/themes/modern/ModernSecondaryPages';

import { resolveDomain } from '@/services/domain.service';
import { SchoolService } from '@/services/school.service';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Common" });
  return {
    title: `Campus Facilities | School Portal`,
    description: "Explore our world-class library, science labs, and sports infrastructure.",
  };
}

export default async function FacilitiesPage() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost";
  const domainConfig = await resolveDomain(host);
  const facilities = await SchoolService.getFacilities(domainConfig.school_id);
  
  return <ThemePageRenderer 
    defaultComponent={<main><FacilitiesShowcase facilities={facilities} /></main>} 
    modernComponent={<ModernFacilities facilities={facilities} />} 
  />;
}
