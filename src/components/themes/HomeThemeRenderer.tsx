"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";

// Default Theme Components
import { DefaultThemeLayout } from "@/components/themes/default/DefaultThemeLayout";
import { DefaultHome } from "@/components/themes/default/home/DefaultHome";

// Modern Theme Components
import { ModernThemeLayout } from "@/components/themes/modern/ModernThemeLayout";
import { ModernHome } from "@/components/themes/modern/home/ModernHome";

export function HomeThemeRenderer() {
  const { theme_id } = useSchool();

  if (theme_id === "modern") {
    return (
      <ModernThemeLayout>
        <ModernHome />
      </ModernThemeLayout>
    );
  }

  // Fallback to "default" theme
  return (
    <DefaultThemeLayout>
      <DefaultHome />
    </DefaultThemeLayout>
  );
}
