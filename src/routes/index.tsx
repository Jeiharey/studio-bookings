import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { VortexField } from "@/components/VortexField";
import { SiteFooter, SiteHeader, SocialRow } from "@/components/chrome";
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
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <VortexField className="pointer-events-none absolute inset-x-0 top-0 h-[62vh] opacity-70 md:left-auto md:right-[-6%] md:h-full md:w-[62%] md:opacity-100" />

      <SiteHeader />

      <main className="relative z-10 flex-1 px-6 md:px-12">
        <section className="mx-auto flex max-w-7xl flex-col justify-center pt-[46vh] pb-16 md:min-h-[72vh] md:max-w-none md:pt-4 md:pb-10">
          <div className="max-w-xl">
            <h1 className="tech-caps text-sm md:text-base">{site.hero.eyebrow}</h1>
            <span className="mt-3 block h-[3px] w-10 bg-signal" />

            <nav aria-label="Services" className="mt-8">
              <ul>
                {services.map((service) => {
                  const isActive = active === service.slug;
                  return (
                    <li key={service.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: service.slug }}
                        onMouseEnter={() => setActive(service.slug)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(service.slug)}
                        onBlur={() => setActive(null)}
                        className={`focus-ring group flex min-h-[44px] items-center gap-3 py-2 transition-colors duration-200 ${
                          isActive ? "text-signal" : "text-foreground"
                        }`}
                      >
                        <span className="flex w-8 shrink-0 items-center">
                          <span
                            className={`h-1.5 w-1.5 rounded-full bg-signal transition-opacity duration-200 ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          <span
                            className={`ml-1 h-px bg-signal transition-all duration-300 ${
                              isActive ? "w-5 opacity-100" : "w-0 opacity-0"
                            }`}
                          />
                        </span>
                        <span className="tech-caps text-xl leading-tight sm:text-2xl md:text-[1.75rem]">
                          {service.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <p className="label-mono mt-8">{site.hero.subhead}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/services/$slug"
                params={{ slug: services[0]!.slug }}
                className="focus-ring glow-signal inline-flex min-h-[48px] items-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold tracking-widest text-primary-foreground uppercase"
              >
                Let&apos;s talk
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <SocialRow />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
