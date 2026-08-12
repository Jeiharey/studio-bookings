import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import { SwatchField } from "@/components/SwatchField";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { services, site } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.brand} — Creative & Digital Studio` },
      { name: "description", content: site.tagline },
      { property: "og:title", content: `${site.brand} — Creative & Digital Studio` },
      { property: "og:description", content: site.tagline },
    ],
  }),
  component: Index,
});

function Index() {
  const socials = site.socials.filter((s) => s.url);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <SwatchField />

      <SiteHeader />

      <main className="relative z-10 flex-1 px-6 md:px-12">
        <section className="mx-auto max-w-5xl pt-10 pb-16 md:pt-24 md:pb-24">
          <p className="label-mono">Bookings open</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-5xl md:text-6xl">
            {site.hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {site.hero.subhead}
          </p>
        </section>

        <section aria-labelledby="services-heading" className="mx-auto max-w-5xl pb-20">
          <div className="flex items-baseline justify-between border-b pb-4">
            <h2 id="services-heading" className="label-mono">
              Services
            </h2>
            <span className="label-mono">Select one to begin</span>
          </div>

          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="focus-ring group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 border-b py-5 transition-colors duration-200 hover:bg-sand/60 md:gap-x-8 md:py-7"
                >
                  <span className="font-mono text-xs text-muted-foreground transition-colors duration-200 group-hover:text-coral">
                    {service.number}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-xl font-medium tracking-tight md:text-2xl">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {service.summary}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-5 w-5 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {socials.length > 0 && (
          <section className="mx-auto max-w-5xl pb-20">
            <h2 className="label-mono">Elsewhere</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring link-underline inline-flex items-center gap-1 text-sm font-medium"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
