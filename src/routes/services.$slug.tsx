import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useMemo, useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/chrome";
import { useBooking, type SelectedItem } from "@/lib/booking-context";
import { getService, services, site } from "@/lib/site-config";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug, title: service.title, summary: service.summary };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: `Service unavailable — ${site.brand}` }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} — ${site.brand}`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const service = useMemo(() => getService(slug) ?? services[0]!, [slug]);
  const navigate = useNavigate();
  const { booking, setBooking } = useBooking();

  const initial = booking.serviceSlug === service.slug ? booking.items : [];
  const [selected, setSelected] = useState<SelectedItem[]>(initial);
  const [dueDate, setDueDate] = useState(booking.serviceSlug === service.slug ? booking.dueDate : "");
  const [dueTime, setDueTime] = useState(booking.serviceSlug === service.slug ? booking.dueTime : "");

  const isSelected = (itemId: string) => selected.some((s) => s.itemId === itemId);

  const toggle = (groupName: string, item: { id: string; name: string; description: string }) => {
    setSelected((prev) =>
      prev.some((s) => s.itemId === item.id)
        ? prev.filter((s) => s.itemId !== item.id)
        : [...prev, { groupName, itemId: item.id, name: item.name, description: item.description }],
    );
  };

  const proceed = () => {
    setBooking({
      serviceSlug: service.slug,
      serviceTitle: service.title,
      items: selected,
      dueDate,
      dueTime,
    });
    navigate({ to: "/contact" });
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 px-6 pb-40 md:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="focus-ring link-underline inline-flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </Link>

          <header className="mt-8 border-b pb-8">
            <p className="font-mono text-xs text-coral">{service.number}</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl md:text-5xl">{service.title}</h1>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
              {service.summary}
            </p>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
            <div className="min-w-0">
              {service.groups.map((group) => (
                <section key={group.id} className="mb-10">
                  <h2 className="label-mono border-b pb-3">{group.name}</h2>
                  <ul>
                    {group.items.map((item) => {
                      const active = isSelected(item.id);
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggle(group.name, item)}
                            className="focus-ring group flex w-full items-start gap-4 border-b py-4 text-left transition-colors duration-200 hover:bg-sand/60 min-h-[56px]"
                          >
                            <span
                              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[3px] border transition-colors duration-200 ${
                                active ? "border-accent bg-accent" : "border-border bg-card"
                              }`}
                            >
                              {active && <Check className="h-3.5 w-3.5 text-accent-foreground" aria-hidden />}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[15px] font-medium">{item.name}</span>
                              <span
                                className={`block text-sm text-muted-foreground lg:hidden ${
                                  active ? "mt-1" : "hidden"
                                }`}
                              >
                                {item.description}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}

              <section className="mt-12 border-t pt-8">
                <h2 className="font-display text-xl font-medium tracking-tight">
                  When do you need this completed?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Optional, but it helps us tell you honestly whether we can make it.
                </p>
                <div className="mt-5 flex flex-wrap gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="label-mono">Date</span>
                    <input
                      type="date"
                      min={today}
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="focus-ring rounded-sm border bg-card px-3 py-2.5 text-sm"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="label-mono">Time</span>
                    <input
                      type="time"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                      className="focus-ring rounded-sm border bg-card px-3 py-2.5 text-sm"
                    />
                  </label>
                </div>
              </section>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-10">
                <h2 className="label-mono border-b pb-3">Selected</h2>
                {selected.length === 0 ? (
                  <p className="pt-4 text-sm text-muted-foreground">
                    Nothing selected yet. Tick anything on the left to read what it includes.
                  </p>
                ) : (
                  <ul className="pt-4">
                    {selected.map((s) => (
                      <li key={s.itemId} className="mb-5">
                        <p className="label-mono">{s.groupName}</p>
                        <p className="mt-1 text-sm font-medium">{s.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {s.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 md:px-12">
          <p className="text-sm">
            <span className="font-mono text-xs text-muted-foreground">
              {String(selected.length).padStart(2, "0")}
            </span>{" "}
            <span className="text-muted-foreground">
              item{selected.length === 1 ? "" : "s"} selected
            </span>
          </p>
          <button
            type="button"
            onClick={proceed}
            disabled={selected.length === 0}
            className="focus-ring min-h-[44px] rounded-sm bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-primary"
          >
            Proceed
          </button>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
