import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle, className, ...props }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 md:mb-12 text-center", className)} {...props}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 flex justify-center">
        <div className="h-1 w-20 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-1/2 rounded-full" />
        </div>
      </div>
    </div>
  );
}
