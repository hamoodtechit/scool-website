"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { SearchX, Home } from "lucide-react";
import { DefaultThemeLayout } from "@/components/themes/default/DefaultThemeLayout";

export default function NotFoundPage() {
  const t = useTranslations("Common"); // Assuming we'll have standard strings, or hardcode

  return (
    <DefaultThemeLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mb-8">
          <SearchX className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="text-6xl font-black text-foreground tracking-tighter mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-muted-foreground mb-4">
          Page Not Found
        </h2>
        
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="w-4 h-4 me-2" />
              Return Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </DefaultThemeLayout>
  );
}
