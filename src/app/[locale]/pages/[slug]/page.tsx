import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { SchoolService } from "@/services/school.service";
import { resolveDomain } from "@/services/domain.service";
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
import { SectionHeading } from "@/components/ui/section-heading";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const headersList = await headers();
  const host = headersList.get("host") || "localhost";
  const domainConfig = await resolveDomain(host);
  const page = await SchoolService.getPageBySlug(domainConfig.school_id, slug);
  if (!page) return { title: "Page Not Found" };
  
  return {
    title: `${page.title} | ${domainConfig.branding.primary_color ? 'School Portal' : 'School'}`,
    description: page.title,
  };
}

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const headersList = await headers();
  const host = headersList.get("host") || "localhost";
  const domainConfig = await resolveDomain(host);
  const page = await SchoolService.getPageBySlug(domainConfig.school_id, slug);

  if (!page) {
    notFound();
  }

  // A generic renderer for custom pages
  const PageContent = (
    <main className="min-h-screen py-16 px-4 md:px-8 max-w-5xl mx-auto">
      <SectionHeading title={page.title} />
      <div 
        className="mt-8 prose prose-lg prose-primary max-w-none" 
        dangerouslySetInnerHTML={{ __html: page.content }} 
      />
    </main>
  );

  return (
    <ThemePageRenderer 
      defaultComponent={PageContent} 
      modernComponent={
        <div className="mx-auto max-w-4xl py-16 px-4">
          <div className="mb-8">
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{page.title}</h1>
          </div>
          <div 
            className="rounded-3xl border border-border/60 bg-card/75 p-6 shadow-xl shadow-primary/5 backdrop-blur sm:p-8"
            dangerouslySetInnerHTML={{ __html: page.content }} 
          />
        </div>
      } 
    />
  );
}
