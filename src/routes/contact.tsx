import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/chrome";
import { useBooking } from "@/lib/booking-context";
import { submitBooking } from "@/lib/booking.functions";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Your details — ${site.brand}` },
      { name: "description", content: "Send us your project details and we'll come back to you." },
      { property: "og:title", content: `Your details — ${site.brand}` },
      {
        property: "og:description",
        content: "Send us your project details and we'll come back to you.",
      },
    ],
  }),
  component: ContactPage,
});

type Errors = Partial<Record<"fullName" | "email" | "phone" | "form", string>>;

function ContactPage() {
  const { booking, reset } = useBooking();
  const navigate = useNavigate();
  const send = useServerFn(submitBooking);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const hasSelection = booking.items.length > 0 && booking.serviceSlug;

  const validate = () => {
    const next: Errors = {};
    if (fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = "Please enter a valid email address.";
    if (phone.trim().replace(/[^\d]/g, "").length < 6) next.phone = "Please enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !hasSelection) return;
    setLoading(true);
    setErrors(({ form: _form, ...rest }) => rest);
    try {
      await send({
        data: {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          serviceSlug: booking.serviceSlug!,
          serviceTitle: booking.serviceTitle!,
          items: booking.items.map((i) => ({
            groupName: i.groupName,
            name: i.name,
            description: i.description,
          })),
          dueDate: booking.dueDate,
          dueTime: booking.dueTime,
        },
      });
      reset();
      navigate({ to: "/success" });
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "focus-ring mt-2 w-full rounded-sm border bg-card px-3 py-3 text-[15px] outline-none transition-colors duration-200";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 px-6 pb-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            to={booking.serviceSlug ? "/services/$slug" : "/"}
            params={{ slug: booking.serviceSlug ?? "" }}
            className="focus-ring link-underline inline-flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </Link>

          <header className="mt-8 border-b pb-8">
            <p className="label-mono">Final step</p>
            <h1 className="tech-caps mt-3 text-3xl sm:text-4xl md:text-5xl">Your details</h1>
          </header>

          {!hasSelection && (
            <p className="mt-8 text-sm text-muted-foreground">
              You haven't selected anything yet.{" "}
              <Link to="/" className="link-underline font-medium text-foreground">
                Pick a service first
              </Link>
              .
            </p>
          )}

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
            <form onSubmit={onSubmit} noValidate className="min-w-0">
              <div className="max-w-md">
                <label className="block">
                  <span className="label-mono">Full name</span>
                  <input
                    className={inputClass}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    maxLength={100}
                    autoComplete="name"
                    required
                  />
                  {errors.fullName && (
                    <span className="mt-2 block text-xs text-destructive">{errors.fullName}</span>
                  )}
                </label>

                <label className="mt-6 block">
                  <span className="label-mono">Email</span>
                  <input
                    className={inputClass}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    autoComplete="email"
                    required
                  />
                  {errors.email && (
                    <span className="mt-2 block text-xs text-destructive">{errors.email}</span>
                  )}
                </label>

                <label className="mt-6 block">
                  <span className="label-mono">Phone</span>
                  <input
                    className={inputClass}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={40}
                    autoComplete="tel"
                    required
                  />
                  {errors.phone && (
                    <span className="mt-2 block text-xs text-destructive">{errors.phone}</span>
                  )}
                </label>

                {errors.form && (
                  <p className="mt-6 rounded-sm border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                    {errors.form}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !hasSelection}
                  className="focus-ring glow-signal inline-flex min-h-[48px] items-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold tracking-widest text-primary-foreground uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-35 mt-8 w-full justify-center sm:w-auto"
                >
                  {loading ? "Sending…" : "Send request"}
                </button>
              </div>
            </form>

            <aside className="border-t pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <h2 className="label-mono border-b pb-3">Your request</h2>
              {hasSelection ? (
                <>
                  <p className="tech-caps pt-4 text-base">
                    {booking.serviceTitle}
                  </p>
                  <ul className="mt-4">
                    {booking.items.map((i) => (
                      <li key={i.itemId} className="mb-4 border-b pb-4 last:border-b-0">
                        <p className="label-mono">{i.groupName}</p>
                        <p className="mt-1 text-sm font-medium">{i.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {i.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p className="label-mono mt-4">Needed by</p>
                  <p className="mt-1 text-sm">
                    {[booking.dueDate, booking.dueTime].filter(Boolean).join(" · ") ||
                      "No date given"}
                  </p>
                </>
              ) : (
                <p className="pt-4 text-sm text-muted-foreground">Nothing selected.</p>
              )}
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
