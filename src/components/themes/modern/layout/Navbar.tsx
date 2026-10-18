'use client';

import React, { useState, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { useSchool } from '@/components/providers/school-provider';
import {
  useGetSchoolProfile,
  useGetPages,
  useGlobalSearch,
} from '@/hooks/api/school/useSchoolQueries';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  Moon,
  Sun,
  X,
  Search,
  ArrowUpRight,
  Globe,
  ChevronDown,
  Building2,
  Bell,
  Users,
  Image as ImageIcon,
  Download,
  GraduationCap,
  ShieldCheck,
  FileText,
  Calendar,
  Layers,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ThemeSwitcherButton } from '@/components/custom/ThemeSwitcherButton';

const primaryLinks = [
  ['/', 'home'],
  ['/about', 'about'],
  ['/academics', 'academics'],
  ['/events', 'calendar'],
  ['/contact', 'contact'],
] as const;

const moreLinks = [
  ['/notices', 'notices', Bell],
  ['/facilities', 'facilities', Building2],
  ['/staff', 'staff', Users],
  ['/gallery', 'gallery', ImageIcon],
  ['/downloads', 'downloads', Download],
  ['/results', 'results', GraduationCap],
  // ['/certificate', 'certificate', ShieldCheck], // Temporarily hidden
] as const;

function ThemeToggle({ className }: { className?: string }) {
  const common = useTranslations('Common');
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={common('theme')}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        "border-border/60 bg-background/50 hover:border-primary/40 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md shrink-0",
        className
      )}
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  );
}

function LanguageSwitcher({ className }: { className?: string }) {
  const common = useTranslations('Common');
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={common('language')}
          className={cn(
            "border-border/60 bg-background/50 hover:border-primary/40 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md shrink-0",
            className
          )}
        >
          <Globe className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 p-1.5 rounded-2xl border-border/60 bg-card/95 backdrop-blur-xl shadow-xl"
      >
        <DropdownMenuItem asChild>
          <Link
            href={pathname}
            locale="en"
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              locale === 'en' ? 'bg-primary/15 text-primary font-bold' : 'text-foreground hover:bg-muted/60'
            }`}
          >
            <span>English</span>
            <span className="text-[10px] uppercase font-bold text-muted-foreground">EN</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={pathname}
            locale="bn"
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              locale === 'bn' ? 'bg-primary/15 text-primary font-bold' : 'text-foreground hover:bg-muted/60'
            }`}
          >
            <span>বাংলা</span>
            <span className="text-[10px] uppercase font-bold text-muted-foreground">BN</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={pathname}
            locale="ar"
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              locale === 'ar' ? 'bg-primary/15 text-primary font-bold' : 'text-foreground hover:bg-muted/60'
            }`}
          >
            <span>العربية</span>
            <span className="text-[10px] uppercase font-bold text-muted-foreground">AR</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const school = useSchool();
  const { data: profile } = useGetSchoolProfile(school.school_id);
  const { data: customPages = [] } = useGetPages(school.school_id);

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const t = useTranslations('Navigation');
  const common = useTranslations('Common');
  const pathname = usePathname();
  const locale = useLocale();

  const mobileClose = () => setOpen(false);

  const schoolName = profile?.name || 'School Portal';
  const initial = (schoolName || 'S').slice(0, 1).toUpperCase();
  const portalLoginUrl = `${process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'http://localhost:3000'}/portal-login`;

  // Debounce search query to prevent unnecessary network requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data: searchApiResults, isLoading: isSearching } = useGlobalSearch(
    school.school_id,
    debouncedQuery
  );

  // Keyboard shortcut listener (Ctrl+K, Cmd+K, Escape)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const matchingNotices = searchApiResults?.notices || [];
  const matchingStaff = searchApiResults?.staff || [];
  const matchingEvents = searchApiResults?.events || [];
  const matchingDownloads = searchApiResults?.downloads || [];
  const matchingPages = searchApiResults?.pages || [];
  const totalFound =
    matchingNotices.length +
    matchingStaff.length +
    matchingEvents.length +
    matchingDownloads.length +
    matchingPages.length;

  const isMoreActive =
    moreLinks.some(([href]) => pathname === href) ||
    customPages.some((p: any) => pathname === `/pages/${p.slug}`);

  return (
    <>
      <header className="border-border/50 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-2xl">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
          
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5 sm:gap-3 flex-1 sm:flex-initial overflow-hidden"
            aria-label={t('home')}
          >
            <div className="bg-primary/10 ring-primary/20 grid size-9 sm:size-10 shrink-0 place-items-center overflow-hidden rounded-xl sm:rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-105">
              {school.branding?.logo_url ? (
                <img
                  src={school.branding.logo_url}
                  alt={schoolName}
                  className="size-6 sm:size-7 object-contain"
                />
              ) : (
                <span className="text-primary text-sm sm:text-lg font-black">{initial}</span>
              )}
            </div>
            <div className="min-w-0 flex-1 max-w-[170px] sm:max-w-[280px]">
              <p className="truncate text-xs sm:text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {schoolName}
              </p>
              <p className="truncate text-[9px] sm:text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">
                Campus Portal
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryLinks.map(([href, key]) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-primary/10 text-primary shadow-xs'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}

            {/* Desktop More Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 outline-none cursor-pointer ${
                    isMoreActive
                      ? 'bg-primary/10 text-primary shadow-xs'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <span>{t('more')}</span>
                  <ChevronDown className="size-3.5 opacity-70 transition-transform duration-200" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 p-2 rounded-2xl border-border/60 bg-card/95 backdrop-blur-xl shadow-xl space-y-0.5"
              >
                {moreLinks.map(([href, key, Icon]) => {
                  const active = pathname === href;
                  return (
                    <DropdownMenuItem key={href} asChild>
                      <Link
                        href={href}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-primary/15 text-primary font-semibold'
                            : 'text-foreground hover:bg-muted/60'
                        }`}
                      >
                        <Icon className={`size-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span>{t(key)}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}

                {customPages.length > 0 && (
                  <>
                    <DropdownMenuSeparator className="my-1.5 bg-border/50" />
                    <DropdownMenuLabel className="px-3 py-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                      {t('pages')}
                    </DropdownMenuLabel>
                    {customPages.map((page: any) => {
                      const href = `/pages/${page.slug}`;
                      const active = pathname === href;
                      return (
                        <DropdownMenuItem key={page.id} asChild>
                          <Link
                            href={href}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                              active
                                ? 'bg-primary/15 text-primary font-semibold'
                                : 'text-foreground hover:bg-muted/60'
                            }`}
                          >
                            <Layers className={`size-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className="truncate">{page.title}</span>
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Global Search Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSearchOpen(true)}
              title="Search (Ctrl+K)"
              className="border-border/60 bg-background/50 hover:border-primary/40 text-muted-foreground hover:text-foreground rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md shrink-0 size-9 sm:size-10"
            >
              <Search className="size-4" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Language Switcher - visible on sm+ screens, mobile drawer has dedicated switcher */}
            <LanguageSwitcher className="hidden sm:inline-flex size-9 sm:size-10" />

            {/* Website Theme Template Switcher - Managed via Admin Panel */}
            {/* <ThemeSwitcherButton
              variant="outline"
              className="border-border/60 bg-background/50 hover:border-primary/40 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md shrink-0 size-9 sm:size-10"
            /> */}

            {/* Theme Toggle - visible on sm+ screens, mobile drawer has dedicated toggle */}
            <ThemeToggle className="hidden sm:inline-flex size-9 sm:size-10" />

            {/* Login CTA - visible on sm+ screens */}
            <a
              href={portalLoginUrl}
              className="border border-border/60 bg-background/50 hover:border-primary/40 text-foreground hover:text-primary rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-xs hidden sm:inline-flex items-center shrink-0"
            >
              {common('login')}
            </a>

            {/* Contact Us CTA - visible on sm+ screens */}
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hidden rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex shrink-0"
            >
              {common('contact_us')}
            </Link>

            {/* Mobile Menu Sheet Trigger - Prominent, robust and guaranteed visible on mobile screens */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border/60 bg-background/60 hover:bg-muted/60 text-foreground hover:border-primary/40 rounded-xl size-9 sm:size-10 shrink-0 lg:hidden shadow-xs transition-all duration-200"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-s-border/50 bg-card/95 w-[min(24rem,92vw)] p-0 backdrop-blur-2xl flex flex-col h-full"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                {/* Mobile Drawer Header */}
                <div className="p-5 border-b border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0 pe-8">
                    <div className="bg-primary/10 ring-primary/20 grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl ring-1">
                      {school.branding?.logo_url ? (
                        <img
                          src={school.branding.logo_url}
                          alt={schoolName}
                          className="size-7 object-contain"
                        />
                      ) : (
                        <span className="text-primary font-black">{initial}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground text-sm truncate">{schoolName}</p>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Campus Portal
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Drawer Body */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  {/* Language Selector in Drawer */}
                  <div className="flex items-center justify-between p-2 rounded-2xl bg-muted/40 border border-border/40">
                    <div className="flex items-center gap-1">
                      <Link
                        href={pathname}
                        locale="en"
                        onClick={mobileClose}
                        className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-colors ${
                          locale === 'en'
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        EN
                      </Link>
                      <Link
                        href={pathname}
                        locale="bn"
                        onClick={mobileClose}
                        className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-colors ${
                          locale === 'bn'
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        বাংলা
                      </Link>
                      <Link
                        href={pathname}
                        locale="ar"
                        onClick={mobileClose}
                        className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-colors ${
                          locale === 'ar'
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        العربية
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThemeToggle />
                    </div>
                  </div>

                  {/* Quick Search Shortcut in Drawer */}
                  <button
                    type="button"
                    onClick={() => {
                      mobileClose();
                      setSearchOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-border/60 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors text-xs font-medium"
                  >
                    <Search className="size-4 shrink-0 text-muted-foreground" />
                    <span>{common('search_placeholder')}</span>
                  </button>

                  {/* Primary Navigation */}
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-1.5">
                      {t('menu')}
                    </p>
                    <div className="flex flex-col gap-1">
                      {primaryLinks.map(([href, key]) => {
                        const active = pathname === href;
                        return (
                          <Link
                            key={href}
                            href={href}
                            onClick={mobileClose}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                              active
                                ? 'bg-primary/10 text-primary'
                                : 'text-foreground hover:bg-muted/50'
                            }`}
                          >
                            <span>{t(key)}</span>
                            {active && <span className="size-1.5 rounded-full bg-primary" />}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Explore & More Pages */}
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-1.5">
                      {t('more')}
                    </p>
                    <div className="flex flex-col gap-1">
                      {moreLinks.map(([href, key, Icon]) => {
                        const active = pathname === href;
                        return (
                          <Link
                            key={href}
                            href={href}
                            onClick={mobileClose}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                              active
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                          >
                            <Icon className={`size-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span>{t(key)}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Pages */}
                  {customPages.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-1.5">
                        {t('pages')}
                      </p>
                      <div className="flex flex-col gap-1">
                        {customPages.map((page: any) => {
                          const href = `/pages/${page.slug}`;
                          const active = pathname === href;
                          return (
                            <Link
                              key={page.id}
                              href={href}
                              onClick={mobileClose}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                                active
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                              }`}
                            >
                              <Layers className={`size-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                              <span className="truncate">{page.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Drawer Footer CTA */}
                <div className="p-5 border-t border-border/50 bg-background/50 flex flex-col gap-2.5">
                  <a
                    href={portalLoginUrl}
                    onClick={mobileClose}
                    className="border border-border/80 bg-background/80 hover:bg-muted text-foreground flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold shadow-xs transition-all"
                  >
                    {common('login')}
                  </a>
                  <Link
                    href="/contact"
                    onClick={mobileClose}
                    className="bg-primary text-primary-foreground flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    {common('contact_us')}
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div
          className="bg-background/80 fixed inset-0 z-[100] flex flex-col items-center px-4 pt-20 backdrop-blur-md overflow-y-auto"
          onClick={() => {
            setSearchOpen(false);
            setSearchQuery('');
          }}
        >
          <div
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Search className="text-muted-foreground absolute start-4 top-1/2 h-6 w-6 -translate-y-1/2" />
            <Input
              autoFocus
              placeholder="Search notices, faculty, events, documents, pages... (ESC to close)"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="border-primary/20 focus-visible:ring-primary bg-card h-16 w-full rounded-2xl ps-14 pe-14 text-base shadow-xl"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute end-3 top-1/2 -translate-y-1/2 rounded-xl"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {searchQuery && (
            <div
              className="bg-card border-border animate-in fade-in slide-in-from-bottom-3 mt-4 mb-16 flex max-h-[65vh] w-full max-w-2xl flex-col gap-4 overflow-y-auto rounded-3xl border p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                  Search Results {totalFound > 0 ? `(${totalFound})` : ''}
                </span>
                {isSearching && (
                  <span className="text-primary text-xs font-medium animate-pulse">
                    Searching...
                  </span>
                )}
              </div>

              {isSearching ? (
                <p className="text-muted-foreground py-6 text-center text-sm">
                  Searching institutional database...
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Notices */}
                  {matchingNotices.length > 0 && (
                    <div>
                      <p className="text-muted-foreground px-2 py-1 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                        <FileText className="size-3.5" /> Notices ({matchingNotices.length})
                      </p>
                      <div className="space-y-1 mt-1">
                        {matchingNotices.slice(0, 3).map((notice: any) => (
                          <Link
                            key={notice.id}
                            href="/notices"
                            className="hover:bg-muted/50 hover:border-primary/20 flex items-center justify-between rounded-xl border border-transparent p-3 transition-all"
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <span className="text-sm font-medium">{notice.title}</span>
                            <ArrowUpRight className="text-muted-foreground h-4 w-4" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Staff & Faculty */}
                  {matchingStaff.length > 0 && (
                    <div>
                      <p className="text-muted-foreground px-2 py-1 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                        <Users className="size-3.5" /> Faculty & Staff ({matchingStaff.length})
                      </p>
                      <div className="space-y-1 mt-1">
                        {matchingStaff.slice(0, 3).map((person: any) => (
                          <Link
                            key={person.id}
                            href="/staff"
                            className="hover:bg-muted/50 hover:border-primary/20 flex items-center justify-between rounded-xl border border-transparent p-3 transition-all"
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div>
                              <p className="text-sm font-medium">{person.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {person.designation || 'Faculty'}
                              </p>
                            </div>
                            <ArrowUpRight className="text-muted-foreground h-4 w-4" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Events */}
                  {matchingEvents.length > 0 && (
                    <div>
                      <p className="text-muted-foreground px-2 py-1 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                        <Calendar className="size-3.5" /> Events ({matchingEvents.length})
                      </p>
                      <div className="space-y-1 mt-1">
                        {matchingEvents.slice(0, 3).map((event: any) => (
                          <Link
                            key={event.id}
                            href="/events"
                            className="hover:bg-muted/50 hover:border-primary/20 flex items-center justify-between rounded-xl border border-transparent p-3 transition-all"
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <span className="text-sm font-medium">{event.title}</span>
                            <ArrowUpRight className="text-muted-foreground h-4 w-4" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Downloads */}
                  {matchingDownloads.length > 0 && (
                    <div>
                      <p className="text-muted-foreground px-2 py-1 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                        <Download className="size-3.5" /> Downloads & Forms ({matchingDownloads.length})
                      </p>
                      <div className="space-y-1 mt-1">
                        {matchingDownloads.slice(0, 3).map((item: any) => (
                          <Link
                            key={item.id}
                            href="/downloads"
                            className="hover:bg-muted/50 hover:border-primary/20 flex items-center justify-between rounded-xl border border-transparent p-3 transition-all"
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <span className="text-sm font-medium">{item.title}</span>
                            <ArrowUpRight className="text-muted-foreground h-4 w-4" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Pages */}
                  {matchingPages.length > 0 && (
                    <div>
                      <p className="text-muted-foreground px-2 py-1 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                        <Layers className="size-3.5" /> Pages ({matchingPages.length})
                      </p>
                      <div className="space-y-1 mt-1">
                        {matchingPages.slice(0, 3).map((page: any) => (
                          <Link
                            key={page.id}
                            href={`/pages/${page.slug}`}
                            className="hover:bg-muted/50 hover:border-primary/20 flex items-center justify-between rounded-xl border border-transparent p-3 transition-all"
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <span className="text-sm font-medium">{page.title}</span>
                            <ArrowUpRight className="text-muted-foreground h-4 w-4" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {totalFound === 0 && (
                    <p className="text-muted-foreground py-6 text-center text-sm">
                      No matching results found for "{searchQuery}".
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function ModernFooter() {
  const t = useTranslations('Navigation');
  const modern = useTranslations('Modern');
  const { school_id, branding } = useSchool();
  const { data: profile } = useGetSchoolProfile(school_id);
  const schoolName = profile?.name || 'School';
  const initial = (schoolName || 'S').slice(0, 1).toUpperCase();

  return (
    <footer className="border-border/60 bg-card/60 border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_.7fr_.9fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary grid size-10 place-items-center rounded-2xl font-black overflow-hidden ring-1 ring-primary/20">
              {branding?.logo_url ? (
                <img
                  src={branding.logo_url}
                  alt={schoolName}
                  className="size-7 object-contain"
                />
              ) : (
                <span>{initial}</span>
              )}
            </div>
            <span className="font-bold text-foreground">
              {schoolName}
            </span>
          </div>
          <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-7">
            {profile?.history || modern('hero_description')}
          </p>
        </div>
        <div>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            {t('explore')}
          </p>
          <div className="text-muted-foreground mt-4 grid grid-cols-2 gap-2 text-sm">
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              {t('about')}
            </Link>
            <Link
              href="/academics"
              className="hover:text-primary transition-colors"
            >
              {t('academics')}
            </Link>
            <Link
              href="/events"
              className="hover:text-primary transition-colors"
            >
              {t('calendar')}
            </Link>
            <Link
              href="/notices"
              className="hover:text-primary transition-colors"
            >
              {t('notices')}
            </Link>
            <Link
              href="/facilities"
              className="hover:text-primary transition-colors"
            >
              {t('facilities')}
            </Link>
            <Link
              href="/staff"
              className="hover:text-primary transition-colors"
            >
              {t('staff')}
            </Link>
            <Link
              href="/gallery"
              className="hover:text-primary transition-colors"
            >
              {t('gallery')}
            </Link>
            <Link
              href="/results"
              className="hover:text-primary transition-colors"
            >
              {t('results')}
            </Link>
          </div>
        </div>
        <div>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            {t('contact')}
          </p>
          <div className="text-muted-foreground mt-4 space-y-2 text-sm">
            <p>{profile?.address || 'Learning City'}</p>
            <p>{profile?.phone || '+880 0000 000000'}</p>
            <p>{profile?.email || 'hello@school.edu'}</p>
          </div>
        </div>
      </div>
      <div className="border-border/50 text-muted-foreground border-t px-4 py-5 text-xs sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
        <p>
          © {new Date().getFullYear()} {schoolName}.{' '}
          {modern('footer_note')}
        </p>
        <p>
          Developed by{' '}
          <a
            href="https://hamoodtech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            Hamoodtech
          </a>
        </p>
      </div>
    </footer>
  );
}
