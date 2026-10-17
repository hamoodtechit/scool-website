import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClass?: string;
}

export function Section({ children, className, containerClass, ...props }: SectionProps) {
  return (
    <section className={cn("py-12 md:py-20", className)} {...props}>
      <div className={cn("container mx-auto px-4", containerClass)}>
        {children}
      </div>
    </section>
  );
}
