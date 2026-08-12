/**
 * EDITABLE CONTENT CONFIG
 * -----------------------
 * Everything the site displays lives here. Update copy, services,
 * sub-category groups, items and social links without touching layout code.
 */

export const site = {
  brand: "Bad at Marketing",
  tagline: "A creative and digital studio for brands that were told they're bad at marketing.",
  hero: {
    headline: "We make good marketing for people who think they're bad at it.",
    subhead:
      "Brand identity, websites, content, campaigns and film — built by one small studio, end to end. Pick what you need below and tell us when you need it.",
  },
  email: "kailainathanjeiharey@gmail.com",
  /** Add real profile URLs here. Empty string = hidden from the site. */
  socials: [
    { label: "Facebook", url: "" },
    { label: "Instagram", url: "" },
    { label: "WhatsApp", url: "" },
    { label: "Threads", url: "" },
    { label: "X", url: "" },
    { label: "LinkedIn", url: "" },
  ],
} as const;

export type ServiceItem = {
  id: string;
  name: string;
  description: string;
};

export type ServiceGroup = {
  id: string;
  name: string;
  items: ServiceItem[];
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  groups: ServiceGroup[];
};

export const services: Service[] = [
  {
    slug: "brand-identity",
    number: "01",
    title: "Brand Identity",
    summary: "Names, marks and systems that make you look like you meant it.",
    groups: [
      {
        id: "strategy",
        name: "Strategy",
        items: [
          {
            id: "positioning",
            name: "Brand positioning",
            description:
              "We define who you're for, what you stand for and how you're different — written as a short, usable positioning statement.",
          },
          {
            id: "naming",
            name: "Naming",
            description:
              "Name generation and shortlisting for a company, product or campaign, with basic availability screening.",
          },
          {
            id: "messaging",
            name: "Messaging framework",
            description:
              "Your core message, proof points and audience-specific talking tracks in one reference document.",
          },
          {
            id: "tone",
            name: "Tone of voice",
            description:
              "How you sound in writing — principles, do's and don'ts, and rewritten examples from your real copy.",
          },
        ],
      },
      {
        id: "visual",
        name: "Visual identity",
        items: [
          {
            id: "logo",
            name: "Logo & wordmark",
            description:
              "A primary mark plus responsive variants (stacked, horizontal, icon) in all production formats.",
          },
          {
            id: "palette",
            name: "Colour & type system",
            description:
              "A colour palette and typographic scale with accessible contrast pairings, ready for print and screen.",
          },
          {
            id: "artdirection",
            name: "Art direction",
            description:
              "Photography, illustration and graphic rules so everything you publish looks like it came from the same place.",
          },
          {
            id: "iconography",
            name: "Iconography & graphics",
            description:
              "A custom icon set and supporting graphic elements drawn to your grid and stroke weights.",
          },
        ],
      },
      {
        id: "rollout",
        name: "Rollout",
        items: [
          {
            id: "guidelines",
            name: "Brand guidelines",
            description:
              "A practical PDF or web guide your team and vendors can actually follow.",
          },
          {
            id: "stationery",
            name: "Stationery & collateral",
            description:
              "Business cards, letterheads, decks, email signatures and print-ready artwork.",
          },
          {
            id: "packaging",
            name: "Packaging",
            description:
              "Structural and surface design with dielines prepared for your printer.",
          },
          {
            id: "signage",
            name: "Signage & environment",
            description:
              "Storefront, wayfinding and interior applications mocked up in context.",
          },
        ],
      },
    ],
  },
  {
    slug: "web-digital",
    number: "02",
    title: "Web & Digital",
    summary: "Fast, considered websites and products — designed and built.",
    groups: [
      {
        id: "design",
        name: "Design",
        items: [
          {
            id: "ux",
            name: "UX & wireframes",
            description:
              "Sitemap, user flows and low-fidelity wireframes agreed before a single pixel is polished.",
          },
          {
            id: "uidesign",
            name: "UI design",
            description:
              "High-fidelity responsive screens for every key page and state.",
          },
          {
            id: "designsystem",
            name: "Design system",
            description:
              "A reusable component library with tokens for colour, type, spacing and motion.",
          },
          {
            id: "prototype",
            name: "Interactive prototype",
            description:
              "A clickable prototype for testing and stakeholder sign-off before build.",
          },
        ],
      },
      {
        id: "build",
        name: "Build",
        items: [
          {
            id: "marketingsite",
            name: "Marketing website",
            description:
              "A hand-built, fast, SEO-ready site with a CMS so you can edit content yourself.",
          },
          {
            id: "ecommerce",
            name: "E-commerce store",
            description:
              "Product catalogue, cart and checkout with payments, shipping and tax configured.",
          },
          {
            id: "webapp",
            name: "Web app / portal",
            description:
              "Accounts, dashboards and database-backed features for a product or internal tool.",
          },
          {
            id: "landing",
            name: "Campaign landing page",
            description:
              "A single focused page built for one campaign, with tracking and A/B variants.",
          },
          {
            id: "migration",
            name: "Platform migration",
            description:
              "Moving an existing site to a new platform with redirects and SEO preserved.",
          },
        ],
      },
      {
        id: "optimise",
        name: "Optimise",
        items: [
          {
            id: "seo",
            name: "Technical SEO",
            description:
              "Crawl audit, metadata, structured data, sitemaps and Core Web Vitals fixes.",
          },
          {
            id: "analytics",
            name: "Analytics & tracking",
            description:
              "Event tracking, conversion goals and a dashboard that answers real questions.",
          },
          {
            id: "cro",
            name: "Conversion optimisation",
            description:
              "Funnel review and prioritised test plan to raise conversion on existing traffic.",
          },
          {
            id: "care",
            name: "Care & maintenance",
            description:
              "Monthly updates, backups, monitoring and a set allowance of small changes.",
          },
        ],
      },
    ],
  },
  {
    slug: "content-social",
    number: "03",
    title: "Content & Social",
    summary: "A feed and a voice that people actually stop for.",
    groups: [
      {
        id: "planning",
        name: "Planning",
        items: [
          {
            id: "socialstrategy",
            name: "Social strategy",
            description:
              "Channel choices, content pillars, posting cadence and what success looks like.",
          },
          {
            id: "calendar",
            name: "Content calendar",
            description:
              "A rolling monthly plan with topics, formats and dates mapped out in advance.",
          },
          {
            id: "audit",
            name: "Channel audit",
            description:
              "A review of your existing accounts with what's working, what isn't, and what to stop.",
          },
          {
            id: "competitor",
            name: "Competitor review",
            description:
              "How the people you're compared to show up, and the gaps you can own.",
          },
        ],
      },
      {
        id: "production",
        name: "Production",
        items: [
          {
            id: "static",
            name: "Static post design",
            description:
              "On-brand feed graphics and carousels, sized for every platform you post to.",
          },
          {
            id: "shortform",
            name: "Short-form video",
            description:
              "Reels, Shorts and TikToks — concept, edit, captions and sound.",
          },
          {
            id: "photoshoot",
            name: "Photography shoot",
            description:
              "A half or full day of product, food, portrait or lifestyle photography, retouched.",
          },
          {
            id: "copywriting",
            name: "Copywriting",
            description:
              "Captions, hooks and long-form posts written in your tone of voice.",
          },
          {
            id: "ugc",
            name: "Creator / UGC content",
            description:
              "Sourcing and directing creators to produce native-feeling content you can reuse in ads.",
          },
        ],
      },
      {
        id: "management",
        name: "Management",
        items: [
          {
            id: "scheduling",
            name: "Scheduling & publishing",
            description:
              "We load, schedule and publish everything so nothing depends on you remembering.",
          },
          {
            id: "community",
            name: "Community management",
            description:
              "Replies, comments and DMs handled daily in your voice, with escalation rules.",
          },
          {
            id: "reporting",
            name: "Monthly reporting",
            description:
              "A short report on reach, engagement and what we're changing next month.",
          },
          {
            id: "influencer",
            name: "Influencer outreach",
            description:
              "Identifying, contacting and briefing partners, plus deliverable tracking.",
          },
        ],
      },
    ],
  },
  {
    slug: "performance",
    number: "04",
    title: "Performance Marketing",
    summary: "Paid media and email that earn their budget back.",
    groups: [
      {
        id: "paid",
        name: "Paid media",
        items: [
          {
            id: "meta",
            name: "Meta ads",
            description:
              "Facebook and Instagram campaign setup, audiences, creative testing and daily optimisation.",
          },
          {
            id: "google",
            name: "Google ads",
            description:
              "Search, Performance Max and remarketing campaigns with keyword and negative management.",
          },
          {
            id: "tiktok",
            name: "TikTok ads",
            description:
              "Native-first ad creative and campaign management built around the platform's pace.",
          },
          {
            id: "linkedinads",
            name: "LinkedIn ads",
            description:
              "B2B targeting, lead-gen forms and sales-ready audience segments.",
          },
        ],
      },
      {
        id: "creative",
        name: "Ad creative",
        items: [
          {
            id: "staticads",
            name: "Static ad sets",
            description:
              "Multiple concept variations per campaign, sized for each placement.",
          },
          {
            id: "videoads",
            name: "Video ad edits",
            description:
              "Hook-led cutdowns in 9:16, 1:1 and 16:9 with captions burned in.",
          },
          {
            id: "adcopy",
            name: "Ad copy variants",
            description:
              "Headlines and primary text written for testing, not just for filling the field.",
          },
          {
            id: "lppair",
            name: "Landing page pairing",
            description:
              "Matching the page to the ad promise so you stop losing clicks after the click.",
          },
        ],
      },
      {
        id: "lifecycle",
        name: "Lifecycle",
        items: [
          {
            id: "emailflows",
            name: "Email automations",
            description:
              "Welcome, abandoned cart, win-back and post-purchase flows built and tested.",
          },
          {
            id: "newsletter",
            name: "Newsletter design",
            description:
              "A reusable template plus written and designed campaign sends.",
          },
          {
            id: "crm",
            name: "CRM setup",
            description:
              "Lists, segments, tags and lead scoring configured in your platform.",
          },
          {
            id: "sms",
            name: "SMS & WhatsApp",
            description:
              "Opt-in flows and broadcast campaigns for the channels people actually open.",
          },
        ],
      },
    ],
  },
  {
    slug: "video-motion",
    number: "05",
    title: "Video & Motion",
    summary: "Film, animation and sound — from the idea to the final master.",
    groups: [
      {
        id: "preproduction",
        name: "Pre-production",
        items: [
          {
            id: "concept",
            name: "Concept & script",
            description:
              "The idea, the script and the reason anyone should watch past three seconds.",
          },
          {
            id: "storyboard",
            name: "Storyboard",
            description:
              "Frame-by-frame boards so everyone sees the film before it's shot.",
          },
          {
            id: "casting",
            name: "Casting & location",
            description:
              "Talent sourcing, location scouting and the paperwork that comes with both.",
          },
          {
            id: "schedule",
            name: "Production schedule",
            description:
              "Call sheets, shot list and a realistic day plan with contingency.",
          },
        ],
      },
      {
        id: "production",
        name: "Production",
        items: [
          {
            id: "brandfilm",
            name: "Brand film",
            description:
              "A 60–120 second flagship film with crew, lighting and directed sound.",
          },
          {
            id: "productvideo",
            name: "Product video",
            description:
              "Clean, tightly lit product demonstration built for site and paid placements.",
          },
          {
            id: "interview",
            name: "Interview / testimonial",
            description:
              "Multi-camera interview setup with lav audio and b-roll coverage.",
          },
          {
            id: "event",
            name: "Event coverage",
            description:
              "Same-week highlight edit plus a stills and clips library from the day.",
          },
        ],
      },
      {
        id: "post",
        name: "Post-production",
        items: [
          {
            id: "edit",
            name: "Edit & grade",
            description:
              "Assembly, fine cut and colour grade, with two rounds of revisions included.",
          },
          {
            id: "motion",
            name: "Motion graphics",
            description:
              "Animated titles, lower thirds, transitions and logo stings in your identity.",
          },
          {
            id: "explainer",
            name: "2D explainer animation",
            description:
              "Illustrated animation that explains something complicated in under 90 seconds.",
          },
          {
            id: "sound",
            name: "Sound design & mix",
            description:
              "Music selection or scoring, voiceover direction and a broadcast-safe mix.",
          },
          {
            id: "versions",
            name: "Cutdowns & versions",
            description:
              "Platform-specific versions and aspect ratios delivered from the same master.",
          },
        ],
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
