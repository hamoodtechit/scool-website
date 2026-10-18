"use client";

import React, { createContext, useContext, useState, useEffect, useTransition } from "react";
import { DomainResolution } from "@/services/domain.service";
import { toast } from "sonner";

export interface SchoolContextType extends DomainResolution {
  setThemeId: (themeId: string) => Promise<void>;
  toggleTheme: () => Promise<void>;
  isChangingTheme?: boolean;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export function SchoolProvider({
  children,
  schoolData,
}: {
  children: React.ReactNode;
  schoolData: DomainResolution;
}) {
  const [activeTheme, setActiveTheme] = useState<string>(schoolData.theme_id || "default");
  const [isPending, startTransition] = useTransition();

  // On mount, check if there's a stored theme in localStorage or URL search params for easy testing
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get("theme");
      if (urlTheme && (urlTheme === "default" || urlTheme === "modern")) {
        setActiveTheme(urlTheme);
        try {
          localStorage.setItem("school_active_theme", urlTheme);
          document.cookie = `school_active_theme=${urlTheme}; path=/; max-age=31536000; SameSite=Lax`;
        } catch {}
        return;
      }

      const storedTheme = localStorage.getItem("school_active_theme");
      if (storedTheme && (storedTheme === "default" || storedTheme === "modern")) {
        setActiveTheme(storedTheme);
      } else if (schoolData.theme_id) {
        setActiveTheme(schoolData.theme_id);
      }
    }
  }, [schoolData.theme_id]);

  const setThemeId = async (newTheme: string) => {
    startTransition(() => {
      setActiveTheme(newTheme);
    });

    try {
      localStorage.setItem("school_active_theme", newTheme);
      document.cookie = `school_active_theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (e) {
      console.warn("Could not write to localStorage/cookies:", e);
    }

    // Public backend sync is disabled — theme is controlled from the Admin Panel.
    // updatePublicTheme(newTheme).catch(() => {});

    toast.success(`Theme switched to: ${newTheme === "modern" ? "Modern Theme" : "Default Theme"}`, {
      description: "Frontend theme updated instantly.",
      duration: 2500,
    });
  };

  const toggleTheme = async () => {
    const nextTheme = activeTheme === "modern" ? "default" : "modern";
    await setThemeId(nextTheme);
  };

  const contextValue: SchoolContextType = {
    ...schoolData,
    theme_id: activeTheme,
    setThemeId,
    toggleTheme,
    isChangingTheme: isPending,
  };

  return (
    <SchoolContext.Provider value={contextValue}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool(): SchoolContextType {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error("useSchool must be used within a SchoolProvider");
  }
  return context;
}
