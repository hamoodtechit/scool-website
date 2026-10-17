import React from "react";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";

export function DefaultThemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
