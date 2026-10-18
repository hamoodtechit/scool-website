"use client";

import React from "react";
import { useSchool } from "@/components/providers/school-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette, Check, Sparkles, LayoutTemplate, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSwitcherButtonProps {
  className?: string;
  variant?: "outline" | "ghost" | "default" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

export function ThemeSwitcherButton({}: ThemeSwitcherButtonProps) {
  // Theme changing icon is hidden on the public front-side.
  // Theme is controlled solely from the Admin Panel.
  return null;
}

export function ThemeSwitcherButtonDisabled({
  className,
  variant = "ghost",
  size = "icon",
  showLabel = false,
}: ThemeSwitcherButtonProps) {
  const { theme_id, setThemeId, toggleTheme, isChangingTheme } = useSchool();
  const currentTheme = theme_id || "default";

  return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={showLabel ? "sm" : size}
          title={`Website Theme: ${currentTheme} (Click to change)`}
          aria-label="Change website theme"
          disabled={isChangingTheme}
          className={cn(
            "relative inline-flex items-center gap-1.5 transition-all duration-300 shrink-0",
            showLabel && "px-2.5 h-9 rounded-xl font-semibold text-xs border border-border/60 bg-background/50 hover:border-primary/40 shadow-xs",
            className
          )}
        >
          <Palette className="h-4 w-4 text-primary shrink-0 transition-transform duration-300 hover:rotate-45" />
          {showLabel && (
            <span className="capitalize text-xs font-bold tracking-tight">
              {currentTheme}
            </span>
          )}
          <span className="sr-only">Change site theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 p-1.5 rounded-2xl border-border/60 bg-card/95 backdrop-blur-xl shadow-xl z-50"
      >
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
          <span>Website Theme</span>
          <span className="text-[10px] lowercase px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-bold">
            preview
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 bg-border/50" />
        
        {/* Default Theme Option */}
        <DropdownMenuItem
          onClick={() => setThemeId("default")}
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors",
            currentTheme === "default"
              ? "bg-primary/15 text-primary font-bold"
              : "text-foreground hover:bg-muted/60"
          )}
        >
          <div className="flex items-center gap-2.5">
            <LayoutTemplate className="h-4 w-4 text-primary shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold">Default Theme</span>
              <span className="text-[10px] text-muted-foreground font-normal">Classic institution portal</span>
            </div>
          </div>
          {currentTheme === "default" && (
            <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
          )}
        </DropdownMenuItem>

        {/* Modern Theme Option */}
        <DropdownMenuItem
          onClick={() => setThemeId("modern")}
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors mt-1",
            currentTheme === "modern"
              ? "bg-primary/15 text-primary font-bold"
              : "text-foreground hover:bg-muted/60"
          )}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-primary shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold">Modern Theme</span>
              <span className="text-[10px] text-muted-foreground font-normal">Vibrant & contemporary UX</span>
            </div>
          </div>
          {currentTheme === "modern" && (
            <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5 bg-border/50" />

        {/* Quick Toggle Button */}
        <div className="p-1">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              toggleTheme();
            }}
            className="w-full h-8 text-xs font-bold justify-center rounded-xl bg-muted/60 hover:bg-muted text-foreground transition-all gap-1.5"
          >
            <ArrowRightLeft className="h-3.5 w-3.5 text-primary" />
            Quick Switch to {currentTheme === "modern" ? "Default" : "Modern"}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
