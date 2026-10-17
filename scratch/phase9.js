const fs = require('fs');
const path = require('path');

const basePath = 'd:/Projects/hamoodtech/school/front-side';

// 1. Create ThemePageRenderer
const rendererCode = `"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { DefaultThemeLayout } from "@/components/themes/default/DefaultThemeLayout";
import { ModernThemeLayout } from "@/components/themes/modern/ModernThemeLayout";

interface Props {
  defaultComponent: React.ReactNode;
  modernComponent: React.ReactNode;
}

export function ThemePageRenderer({ defaultComponent, modernComponent }: Props) {
  const { theme_id } = useSchool();

  if (theme_id === "modern") {
    return (
      <ModernThemeLayout>
        {modernComponent}
      </ModernThemeLayout>
    );
  }

  return (
    <DefaultThemeLayout>
      {defaultComponent}
    </DefaultThemeLayout>
  );
}
`;
fs.writeFileSync(path.join(basePath, 'src/components/themes/ThemePageRenderer.tsx'), rendererCode);

// 2. Create Modern Placeholders
const modules = [
  { name: 'notices', comp: 'ModernNotices', defaultComp: 'NoticeList', defaultPath: '@/components/themes/default/notices/NoticeList' },
  { name: 'staff', comp: 'ModernStaff', defaultComp: 'StaffDirectory', defaultPath: '@/components/themes/default/staff/StaffDirectory' },
  { name: 'gallery', comp: 'ModernGallery', defaultComp: 'MediaGallery', defaultPath: '@/components/themes/default/gallery/MediaGallery' },
  { name: 'about', comp: 'ModernAbout', defaultComp: 'AboutSchool', defaultPath: '@/components/themes/default/about/AboutSchool' },
  { name: 'academics', comp: 'ModernAcademics', defaultComp: 'div', defaultPath: null },
  { name: 'admissions', comp: 'ModernAdmissions', defaultComp: 'AdmissionsForm', defaultPath: '@/components/themes/default/admissions/AdmissionsForm' },
  { name: 'results', comp: 'ModernResults', defaultComp: 'ResultsPortal', defaultPath: '@/components/themes/default/results/ResultsPortal' },
];

modules.forEach(m => {
  const dirPath = path.join(basePath, `src/components/themes/modern/${m.name}`);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  
  const code = `import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function ${m.comp}() {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-foreground">${m.comp.replace('Modern', '')}</h1>
        <Card className="border-2 border-primary/20 bg-muted/30 shadow-sm">
          <CardContent className="p-12 text-center">
            <p className="text-lg text-muted-foreground">
              This is the Modern Theme specific layout for ${m.comp.replace('Modern', '')}.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(dirPath, `${m.comp}.tsx`), code);
});

// 3. Update app/[locale]/xxx/page.tsx
modules.forEach(m => {
  const pagePath = path.join(basePath, `src/app/[locale]/${m.name}/page.tsx`);
  // create route dir if not exist
  const routeDir = path.dirname(pagePath);
  if (!fs.existsSync(routeDir)) fs.mkdirSync(routeDir, { recursive: true });
  
  let defaultImport = m.defaultPath ? `import { ${m.defaultComp} } from '${m.defaultPath}';` : '';
  let defaultElement = m.defaultComp === 'div' 
    ? `<div className="min-h-screen py-24 flex items-center justify-center bg-muted/10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Academics</h1>
          <p className="text-xl text-muted-foreground">Class schedules, syllabus, and academic calendars will be displayed here.</p>
        </div>
      </div>`
    : `<${m.defaultComp} />`;

  const code = `import { setRequestLocale } from 'next-intl/server';
import { ThemePageRenderer } from '@/components/themes/ThemePageRenderer';
${defaultImport}
import { ${m.comp} } from '@/components/themes/modern/${m.name}/${m.comp}';

export default async function ${m.name.charAt(0).toUpperCase() + m.name.slice(1)}Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ThemePageRenderer 
      defaultComponent={${defaultElement}}
      modernComponent={<${m.comp} />}
    />
  );
}
`;
  fs.writeFileSync(pagePath, code);
});

console.log('Successfully created renderer, placeholders, and updated routes.');
