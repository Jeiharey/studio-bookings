import { Link } from "@tanstack/react-router";
import { site } from "@/lib/site-config";

export function BrandMark() {
  return (
    <Link
      to="/"
      className="focus-ring group inline-flex items-center gap-3"
      aria-label={`${site.brand} — home`}
    >
      <span className="relative grid h-8 w-8 place-items-center rounded-sm bg-ink sm:h-10 sm:w-10">
        <span className="block h-2.5 w-2.5 rounded-full bg-coral transition-transform duration-300 group-hover:translate-x-[3px] sm:h-3 sm:w-3" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight sm:text-2xl md:text-[2rem]">
        {site.brand}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
      <BrandMark />
      <span className="label-mono hidden sm:block">Creative &amp; digital studio</span>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 flex flex-col gap-2 border-t px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-12">
      <span>
        © {new Date().getFullYear()} {site.brand}. All rights reserved.
      </span>
      <span className="label-mono">Made in-house</span>
    </footer>
  );
}
