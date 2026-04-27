import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { env } from "../lib/env";

const clientLogos = ["Northlane", "BrightPath", "Launchgrid", "Flowmint", "QuotaIQ", "OpsCanvas"];

const services = [
  {
    title: "MVP Build in Bubble",
    description: "From product idea to production-ready Bubble app with clean workflows, privacy rules, and handoff docs.",
  },
  {
    title: "Internal Tool Development",
    description: "Custom admin, operations, and reporting tools that remove manual processes and speed up team execution.",
  },
  {
    title: "Marketplace & SaaS Delivery",
    description: "Launch multi-role products with payments, onboarding, and automation tuned for conversion and retention.",
  },
  {
    title: "Performance and WU Optimization",
    description: "Reduce Bubble workload usage and improve page responsiveness with targeted architecture improvements.",
  },
  {
    title: "UX and Conversion Design",
    description: "Structured landing and onboarding flows that turn first visits into qualified demos and activated users.",
  },
  {
    title: "Rescue and Refactor",
    description: "Stabilize fragile Bubble projects, remove technical debt, and create a maintainable foundation for growth.",
  },
];

const deliverySteps = [
  {
    step: "01",
    title: "Scope and priority mapping",
    description: "We align on one business KPI, define v1 scope, and turn it into a short execution plan.",
  },
  {
    step: "02",
    title: "Weekly build sprints",
    description: "You get visible progress, clear decisions, and practical tradeoff calls every week.",
  },
  {
    step: "03",
    title: "QA and launch readiness",
    description: "We harden workflows, edge states, and permissions before release.",
  },
  {
    step: "04",
    title: "Handover and growth support",
    description: "Documented build, optional ongoing support, and next roadmap actions for scale.",
  },
];

const caseOutcomes = [
  {
    company: "LeadOrbit",
    meta: "B2B SaaS • 2025",
    outcome: "+58% demo bookings in 8 weeks",
  },
  {
    company: "OpsPilot",
    meta: "Internal Ops Platform • 2025",
    outcome: "42 hours/week of manual work removed",
  },
  {
    company: "TalentLoop",
    meta: "Marketplace • 2024",
    outcome: "1,800 active teams in 90 days",
  },
  {
    company: "ClaimDesk",
    meta: "Insurtech • 2024",
    outcome: "-34% drop-off across onboarding",
  },
];

const pricingPlans = [
  {
    name: "Sprint",
    subtitle: "MVP launch package",
    price: "$9K",
    note: "fixed",
    features: ["Core user flow", "Auth + billing", "3-week delivery", "Launch QA", "30-day support"],
    highlighted: false,
  },
  {
    name: "Build",
    subtitle: "Product system build",
    price: "$24K",
    note: "fixed",
    features: ["Up to 8 workflows", "Advanced integrations", "6-8 week delivery", "Conversion-focused UX", "60-day support"],
    highlighted: true,
  },
  {
    name: "Scale",
    subtitle: "Ongoing product partner",
    price: "Custom",
    note: "retainer",
    features: ["Weekly releases", "Performance optimization", "Priority roadmap support", "Experiment cycles", "Dedicated team"],
    highlighted: false,
  },
];

const testimonial = {
  quote:
    "The team rebuilt our Bubble product with actual engineering discipline. We launched faster, cut WU waste, and conversion improved within the first month.",
  author: "Mina Kapoor",
  role: "Founder, LeadOrbit",
};

export function Home() {
  return (
    <section className="-mt-8 space-y-9 sm:-mt-10 sm:space-y-12 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[calc(100vh-4rem)] w-screen overflow-hidden border-y border-[#f1ddc9] bg-[#fffaf2]">
        <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-[#ff9d7a]/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#ff6b4a]/20 blur-3xl" />

        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[1440px] items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
            <div className="motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500">
              <p className="inline-flex rounded-full border border-[#f1ddc9] bg-[#fff2e2] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#d94828]">
                Bubble Development Agency
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[0.98] tracking-tight text-[#26170e] sm:text-6xl">
                {env.appName} builds Bubble products that ship and convert.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#6f5b4a] sm:text-lg">
                We partner with founders and lean teams to design, build, and optimize Bubble apps from MVP to
                scale-ready platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="bg-[#ff6b4a] text-white transition-colors duration-200 hover:bg-[#d94828]">
                  Book discovery call
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#e7cdb4] bg-[#fff7ec] text-[#26170e] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffe7cf]"
                >
                  View case studies
                </Button>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                <div className="rounded-lg border border-[#f1ddc9] bg-[#fff7ec] p-3">
                  <p className="text-2xl font-bold text-[#26170e]">140+</p>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#8a7260]">Bubble releases</p>
                </div>
                <div className="rounded-lg border border-[#f1ddc9] bg-[#fff7ec] p-3">
                  <p className="text-2xl font-bold text-[#26170e]">4.9/5</p>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#8a7260]">Client score</p>
                </div>
                <div className="rounded-lg border border-[#f1ddc9] bg-[#fff7ec] p-3">
                  <p className="text-2xl font-bold text-[#26170e]">21d</p>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#8a7260]">Avg sprint cycle</p>
                </div>
              </div>
            </div>

            <Card className="border-[#efcfb5] bg-[#fff2e2]/90 shadow-[0_24px_70px_-34px_rgba(217,72,40,0.55)]">
              <CardHeader>
                <CardDescription className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d94828]">
                  What we deliver
                </CardDescription>
                <CardTitle className="text-2xl leading-tight text-[#26170e]">Fast execution with product-level rigor.</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-[#6f5b4a]">
                <p>Strategy, UX, Bubble architecture, integrations, QA, and launch support in one operating cadence.</p>
                <div className="rounded-lg border border-[#f1ddc9] bg-[#fffaf2] p-3">
                  <p className="font-semibold text-[#26170e]">No black-box delivery.</p>
                  <p>You see progress weekly, with clear tradeoffs and handoff-ready documentation.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y border-[#3a2a22] bg-[#231915]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-4 text-[#f0d7cc] sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#ffbeaa]">Trusted by product teams</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold">
            {clientLogos.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d94828]">Services</p>
        <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-[#26170e]">Bubble development for launch, growth, and scale.</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <Card
              key={item.title}
              className="border-[#f1ddc9] bg-[#fffaf2] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_36px_-22px_rgba(217,72,40,0.7)]"
            >
              <CardHeader>
                <CardTitle className="text-xl text-[#26170e]">{item.title}</CardTitle>
                <CardDescription className="leading-relaxed text-[#6f5b4a]">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y border-[#e8d4bf] bg-[#f9efe3]">
        <div className="mx-auto w-full max-w-[1440px] space-y-4 px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d94828]">Case outcomes</p>
              <h2 className="mt-1 text-3xl font-bold leading-tight tracking-tight text-[#26170e]">Real Bubble builds. Measurable outcomes.</h2>
            </div>
            <Button variant="link" className="px-0 text-[#26170e]">
              See all projects
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {caseOutcomes.map((item) => (
              <Card key={item.company} className="overflow-hidden border-[#efcfb5] bg-[#fffaf2]">
                <div className="h-44 bg-[linear-gradient(135deg,#ff9d7a_0%,#ff6b4a_100%)] p-6">
                  <p className="text-4xl font-semibold tracking-tight text-white">{item.company}</p>
                </div>
                <CardContent className="flex items-center justify-between border-t border-[#efcfb5] p-4 text-sm text-[#6f5b4a]">
                  <p>{item.meta}</p>
                  <p className="font-semibold text-[#26170e]">{item.outcome}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y border-[#e8d4bf] bg-[#fff7ec]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-[#efcfb5] bg-[#ffe7cf]">
            <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[0.9fr,1.1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d94828]">Process</p>
                <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-[#26170e]">A delivery process built for speed and clarity.</h2>
                <p className="mt-3 text-base leading-relaxed text-[#6f5b4a]">No bloated discovery cycles. We prioritize, build, review, and ship in practical weekly loops.</p>
              </div>
              <div className="space-y-3">
                {deliverySteps.map((item) => (
                  <div key={item.step} className="rounded-xl border border-[#efcfb5] bg-[#fff7ec] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d94828]">{item.step}</p>
                    <p className="mt-1 text-lg font-semibold text-[#26170e]">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#6f5b4a]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y border-[#3a2a22] bg-[#231915]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden border-[#2c1f18] bg-[#231915] text-[#f7ebe0]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,107,74,0.22),_transparent_52%)]" />
            <CardHeader className="relative text-center">
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff9d7a]">Pricing</CardDescription>
              <CardTitle className="text-4xl leading-tight text-[#fff5ed]">Pick a model. Start shipping.</CardTitle>
            </CardHeader>
            <CardContent className="relative grid gap-4 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={
                    plan.highlighted
                      ? "border-[#ff6b4a] bg-[#fffaf2] text-[#26170e] shadow-[0_30px_90px_-30px_rgba(217,72,40,0.68)]"
                      : "border-[#4b3730] bg-[#2b1f1a] text-[#f7ebe0]"
                  }
                >
                  <CardHeader>
                    <CardDescription className={plan.highlighted ? "text-[#d94828]" : "text-[#ffbeaa]"}>{plan.subtitle}</CardDescription>
                    <CardTitle className={plan.highlighted ? "text-[#26170e]" : "text-white"}>{plan.name}</CardTitle>
                    <p className={plan.highlighted ? "text-4xl font-bold text-[#26170e]" : "text-4xl font-bold text-white"}>{plan.price}</p>
                    <p
                      className={
                        plan.highlighted
                          ? "text-xs uppercase tracking-[0.14em] text-[#8a7260]"
                          : "text-xs uppercase tracking-[0.14em] text-[#d9b8a9]"
                      }
                    >
                      {plan.note}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {plan.features.map((feature) => (
                      <p key={feature} className={plan.highlighted ? "text-[#6f5b4a]" : "text-[#f0d7cc]"}>
                        • {feature}
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={
                        plan.highlighted
                          ? "w-full bg-[#ff6b4a] text-white transition-colors duration-200 hover:bg-[#d94828]"
                          : "w-full bg-[#fff2e2] text-[#26170e] transition-colors duration-200 hover:bg-[#ffe7cf]"
                      }
                    >
                      Get started
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y border-[#e8d4bf] bg-[#fffaf2]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
          <Card className="border-[#f1ddc9] bg-[#fffaf2] text-center">
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d94828]">Client feedback</CardDescription>
              <p className="mx-auto max-w-3xl text-3xl font-medium leading-tight text-[#26170e]">"{testimonial.quote}"</p>
            </CardHeader>
            <CardContent>
              <p className="text-base font-semibold text-[#26170e]">{testimonial.author}</p>
              <p className="text-sm text-[#8a7260]">{testimonial.role}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y border-[#e8d4bf] bg-[#f9efe3]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-[#efcfb5] bg-[linear-gradient(135deg,#fff2e2_0%,#ffe7cf_100%)]">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d94828]">Start your build</p>
                <h2 className="mt-2 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-[#26170e]">Need a Bubble team that executes fast?</h2>
                <p className="mt-3 text-base text-[#6f5b4a]">Share your goal and we’ll send a practical plan: scope, timeline, and the fastest path to launch.</p>
              </div>
              <div className="rounded-xl border border-[#f1ddc9] bg-[#fffaf2] p-4">
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    aria-label="Work email"
                    className="border-[#e7cdb4] bg-white text-[#26170e] placeholder:text-[#9e8572]"
                  />
                  <Button className="w-full bg-[#ff6b4a] text-white transition-colors duration-200 hover:bg-[#d94828]">Request project plan</Button>
                </div>
                <p className="mt-3 text-xs text-[#8a7260]">No spam. One clear response with next steps.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <CardFooter className="justify-center px-0 text-xs uppercase tracking-[0.14em] text-[#9e8572]">
        {env.appName} • Bubble development for fast-moving teams
      </CardFooter>
    </section>
  );
}
