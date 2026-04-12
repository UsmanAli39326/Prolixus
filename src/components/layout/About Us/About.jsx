import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { stripHtmlTags } from "@/utitlis/formatters";
import { getAboutPayload } from "@/app/api/about/about";
import { FiCheck } from "react-icons/fi"; // Using Feather icons for a cleaner look

export default async function AboutSection() {
  const about = await getAboutPayload();

  if (!about) return null;

  return (
    <section className="about-us relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-24">

          {/* Left: Dynamic Image Arrangement */}
          <div className="relative lg:col-span-12 xl:col-span-5 lg:sticky lg:top-32">
            <FaderInAnimation direction="right">
              <div className="relative">
                {/* Main Image */}
                <div className="relative z-10 overflow-hidden rounded-4xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src="/images/new/about-us.webp"
                    alt="Prolixus Vitalität"
                    width="560"
                    height="602"
                    className="w-full object-cover"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-transparent" />
                </div>

                {/* Floating Highlight Card */}
                <div className="absolute -bottom-6 -right-6 z-20 hidden rounded-2xl bg-white p-6 shadow-xl sm:block lg:-right-8 animate-bounce-subtle">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30">
                      <span className="text-xl font-bold">100%</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary/60">Natural Origin</p>
                      <p className="font-accent text-lg font-bold text-primary">Pure Vitality</p>
                    </div>
                  </div>
                </div>

                {/* Decorative border/accent */}
                <div className="absolute -top-6 -left-6 z-0 h-32 w-32 rounded-full border-r-4 border-t-4 border-accent" />
              </div>
            </FaderInAnimation>
          </div>

          {/* Right: Refined Content */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="max-w-2xl space-y-10">

              {/* Header Group */}
              <div className="space-y-6">
                <FaderInAnimation direction="up" delay={0.1}>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Our Philosophy</span>
                    <span className="h-px w-8 bg-accent" />
                  </div>
                </FaderInAnimation>

                <RevealInAnimation direction="left" delay={0.2}>
                  <h2 className="font-accent text-4xl font-bold leading-[1.15] text-primary sm:text-5xl lg:text-6xl">
                    {about.title}
                  </h2>
                </RevealInAnimation>

                <FaderInAnimation direction="up" delay={0.3}>
                  <p className="text-lg leading-relaxed text-text/80 lg:text-xl">
                    {about.shortDescription}
                  </p>
                </FaderInAnimation>
              </div>

              {/* Rich Description Body */}
              <FaderInAnimation direction="up" delay={0.4}>
                <div className="prose prose-slate max-w-none border-l-2 border-accent/20 pl-6 text-base text-text/70 leading-loose">
                  {stripHtmlTags(about.description)}
                </div>
              </FaderInAnimation>

              {/* Functional Benefits Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  "Optimized Energy Metabolism",
                  "Reduced Fatigue & Tiredness",
                  "Pure Vegan & Gluten Free",
                  "Daily Vitality Support"
                ].map((benefit, idx) => (
                  <FaderInAnimation key={idx} direction="up" delay={0.5 + idx * 0.1}>
                    <div className="group flex items-center gap-4 py-1 transition-all">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                        <FiCheck strokeWidth={3} size={20} />
                      </div>
                      <span className="text-sm font-bold text-primary/80 lg:text-base">
                        {benefit}
                      </span>
                    </div>
                  </FaderInAnimation>
                ))}
              </div>

              {/* Action Button */}
              <FaderInAnimation direction="up" delay={0.9}>
                <div className="pt-4">
                  <a
                    href="/about"
                    className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-primary px-10 py-5 text-sm font-bold tracking-widest text-white transition-all hover:bg-accent hover:px-12 active:scale-95"
                  >
                    <span>EXPLORE OUR STORY</span>
                    <div className="translate-x-0 transition-transform group-hover:translate-x-2">
                      →
                    </div>
                  </a>
                </div>
              </FaderInAnimation>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
