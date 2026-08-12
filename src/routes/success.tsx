import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/chrome";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title: `Request received — ${site.brand}` },
      { name: "description", content: "Thanks — your project request has been received." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: `Request received — ${site.brand}` },
      { property: "og:description", content: "Thanks — your project request has been received." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex flex-1 items-center px-6 md:px-12">
        <div className="mx-auto w-full max-w-5xl py-20">
          <p className="font-mono text-xs text-coral">Received</p>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl md:text-5xl">
            Thanks — we've got your request.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            We've logged everything you selected along with your deadline. Someone from the studio
            will reply to you by email within one business day.
          </p>
          <div className="mt-10">
            <Link
              to="/"
              className="focus-ring inline-flex min-h-[44px] items-center rounded-sm bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-accent"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
