"use client";

import React, { createContext, useContext } from "react";
import { DomainResolution } from "@/services/domain.service";

const SchoolContext = createContext<DomainResolution | undefined>(undefined);

export function SchoolProvider({
  children,
  schoolData,
}: {
  children: React.ReactNode;
  schoolData: DomainResolution;
}) {
  return (
    <SchoolContext.Provider value={schoolData}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error("useSchool must be used within a SchoolProvider");
  }
  return context;
}
