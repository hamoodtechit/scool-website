"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { DefaultThemeLayout } from "@/components/themes/default/DefaultThemeLayout";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <DefaultThemeLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="bg-destructive/10 w-24 h-24 rounded-full flex items-center justify-center mb-8">
          <AlertTriangle className="w-12 h-12 text-destructive" />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Something went wrong
        </h1>
        
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          We've encountered an unexpected error. Our engineering team has been notified.
          {error.message && (
            <span className="block mt-4 text-xs bg-muted p-2 rounded text-destructive/80 font-mono">
              {error.message}
            </span>
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" onClick={() => reset()}>
            <RefreshCw className="w-4 h-4 me-2" />
            Try Again
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.location.href = '/'}>
            Return Home
          </Button>
        </div>
      </div>
    </DefaultThemeLayout>
  );
}
