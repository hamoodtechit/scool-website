import React from "react";
import { ModernFooter, Navbar } from "./layout/Navbar";

export function ModernThemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -start-24 -top-24 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -end-32 top-1/3 size-[30rem] rounded-full bg-secondary/10 blur-3xl" />
      </div>
      <Navbar />
      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-10 pb-16 sm:pb-24 lg:pb-32">{children}</main>
        <ModernFooter />
      </div>
    </div>
  );
}
