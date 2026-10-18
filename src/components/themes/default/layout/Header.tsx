"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useTheme } from "next-themes";
import { useSchool } from "@/components/providers/school-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useGetPages, useGlobalSearch, useGetSchoolProfile } from "@/hooks/api/school/useSchoolQueries";
import { Moon, Sun, Globe, Menu, Search, X, ArrowRight, FileText, Users, Calendar, Download, Layers } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ThemeSwitcherButton } from "@/components/custom/ThemeSwitcherButton";

export function Header() {
  const t = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const { theme, setTheme } = useTheme();
  const school = useSchool();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  
  const { data: customPages = [] } = useGetPages(school.school_id);
  const { data: profile } = useGetSchoolProfile(school.school_id);
  const schoolName = profile?.name || school.seo?.title || "School Portal";
  const logoSrc = school.branding?.logo_url || profile?.logoUrl || profile?.logo_url;
  const portalLoginUrl = `${process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || "http://localhost:3000"}/portal-login`;

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data: searchResults, isLoading: isSearching } = useGlobalSearch(
    school.school_id,
    debouncedQuery
  );

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/academics", label: t("academics") },
    { href: "/events", label: t("calendar") },
    { href: "/facilities", label: t("facilities") },
    { href: "/notices", label: t("notices") },
    { href: "/gallery", label: t("gallery") },
    { href: "/contact", label: t("contact") },
  ];

  const notices = searchResults?.notices || [];
  const staff = searchResults?.staff || [];
  const events = searchResults?.events || [];
  const downloads = searchResults?.downloads || [];
  const pages = searchResults?.pages || [];
  const totalFound = notices.length + staff.length + events.length + downloads.length + pages.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          {logoSrc ? (
            <img src={logoSrc} alt={schoolName} className="h-10 w-10 object-contain rounded-md" />
          ) : (
            <div className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-sm">
              {schoolName.slice(0, 1).toUpperCase()}
            </div>
          )}
          <span className="font-bold text-lg md:text-xl tracking-tight hidden sm:inline-block max-w-[280px] lg:max-w-md truncate">
            {schoolName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          {customPages.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-primary outline-none">
                {t("pages")}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {customPages.map((page: any) => (
                  <DropdownMenuItem key={page.id} asChild>
                    <Link href={`/pages/${page.slug}`}>{page.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          
          {/* Global Search */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSearchOpen(true)}
            title="Search portal (Ctrl+K)"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title={tCommon("language")}>
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={pathname} locale="en">English</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={pathname} locale="bn">বাংলা</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={pathname} locale="ar">العربية</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Website Theme Template Switcher - Controlled via Admin Panel */}
          {/* <ThemeSwitcherButton variant="ghost" size="icon" /> */}

          {/* Theme Switcher */}
          <Button
            variant="ghost"
            size="icon"
            title={tCommon("theme")}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Login Button */}
          <Button asChild className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={portalLoginUrl}>
              {tCommon("login")}
            </a>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex items-center gap-2.5 pb-4 border-b">
                {logoSrc ? (
                  <img src={logoSrc} alt={schoolName} className="h-9 w-9 object-contain rounded" />
                ) : (
                  <div className="h-9 w-9 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {schoolName.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <span className="font-bold text-base truncate">{schoolName}</span>
              </div>
              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="block px-2 py-1 text-lg transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                {customPages.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2 pt-2 border-t">
                    <p className="px-2 text-sm text-muted-foreground font-semibold">{t("pages")}</p>
                    {customPages.map((page: any) => (
                      <Link 
                        key={page.id}
                        href={`/pages/${page.slug}`}
                        className="block px-2 py-1 text-lg transition-colors hover:text-primary text-muted-foreground"
                      >
                        {page.title}
                      </Link>
                    ))}
                  </div>
                )}
                <div className="mt-4 border-t pt-4">
                  <Button asChild className="w-full bg-primary text-primary-foreground">
                    <a href={portalLoginUrl}>
                      {tCommon("login")}
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

        </div>
      </div>

      {/* Global Search Modal */}
      {searchOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex flex-col pt-20 px-4 items-center overflow-y-auto"
          onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
        >
          <div 
            className="w-full max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
            <Input 
              autoFocus
              placeholder="Search notices, faculty, events, documents, pages... (ESC to exit)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 ps-14 pe-14 text-base rounded-2xl shadow-lg border-primary/20 focus-visible:ring-primary bg-background"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full"
              onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {searchQuery && (
            <div 
              className="w-full max-w-2xl mt-4 mb-16 bg-card p-6 rounded-2xl shadow-2xl border border-border flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b pb-3 border-border">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Search Results {totalFound > 0 ? `(${totalFound})` : ""}
                </span>
                {isSearching && (
                  <span className="text-xs text-primary animate-pulse font-medium">Searching...</span>
                )}
              </div>

              {isSearching ? (
                <p className="text-sm text-muted-foreground py-6 text-center">Querying database...</p>
              ) : totalFound > 0 ? (
                <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
                  {/* Notices */}
                  {notices.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider mb-1">
                        <FileText className="w-3.5 h-3.5" /> Notices ({notices.length})
                      </p>
                      {notices.slice(0, 3).map((item) => (
                        <Link 
                          key={item.id} 
                          href="/notices" 
                          className="p-3 hover:bg-muted/50 rounded-xl flex items-center justify-between group transition-colors"
                          onClick={() => setSearchOpen(false)}
                        >
                          <span className="text-sm font-semibold group-hover:text-primary transition-colors">{item.title}</span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Staff */}
                  {staff.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider mb-1">
                        <Users className="w-3.5 h-3.5" /> Faculty & Staff ({staff.length})
                      </p>
                      {staff.slice(0, 3).map((item) => (
                        <Link 
                          key={item.id} 
                          href="/staff" 
                          className="p-3 hover:bg-muted/50 rounded-xl flex items-center justify-between group transition-colors"
                          onClick={() => setSearchOpen(false)}
                        >
                          <div>
                            <p className="text-sm font-semibold group-hover:text-primary transition-colors">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.designation || "Faculty"}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Events */}
                  {events.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider mb-1">
                        <Calendar className="w-3.5 h-3.5" /> Events ({events.length})
                      </p>
                      {events.slice(0, 3).map((item) => (
                        <Link 
                          key={item.id} 
                          href="/events" 
                          className="p-3 hover:bg-muted/50 rounded-xl flex items-center justify-between group transition-colors"
                          onClick={() => setSearchOpen(false)}
                        >
                          <span className="text-sm font-semibold group-hover:text-primary transition-colors">{item.title}</span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Downloads */}
                  {downloads.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider mb-1">
                        <Download className="w-3.5 h-3.5" /> Downloads & Forms ({downloads.length})
                      </p>
                      {downloads.slice(0, 3).map((item) => (
                        <Link 
                          key={item.id} 
                          href="/downloads" 
                          className="p-3 hover:bg-muted/50 rounded-xl flex items-center justify-between group transition-colors"
                          onClick={() => setSearchOpen(false)}
                        >
                          <span className="text-sm font-semibold group-hover:text-primary transition-colors">{item.title}</span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Pages */}
                  {pages.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider mb-1">
                        <Layers className="w-3.5 h-3.5" /> Pages ({pages.length})
                      </p>
                      {pages.slice(0, 3).map((item) => (
                        <Link 
                          key={item.id} 
                          href={`/pages/${item.slug}`} 
                          className="p-3 hover:bg-muted/50 rounded-xl flex items-center justify-between group transition-colors"
                          onClick={() => setSearchOpen(false)}
                        >
                          <span className="text-sm font-semibold group-hover:text-primary transition-colors">{item.title}</span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground text-sm">
                    No results found matching "<span className="font-semibold text-foreground">{searchQuery}</span>".
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}


