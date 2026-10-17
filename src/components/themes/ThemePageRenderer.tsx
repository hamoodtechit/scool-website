"use client";

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
