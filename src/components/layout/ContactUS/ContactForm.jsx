// components/ContactSection.jsx
"use client";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Button from "@/components/ui/Button";
import { getAboutPayload } from "@/app/api/about/about";

export default function ContactSection() {
  const about = getAboutPayload();

  const fieldClass =
    "w-full h-12 px-4 rounded-xl border border-divider bg-white text-text placeholder:text-text/50 text-sm font-default outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-full px-4">
        <div className="rounded-3xl border border-divider bg-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT: FORM */}
            <div className="p-8 sm:p-12">
              <div className="mb-8">
                <FaderInAnimation direction="up">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-accent">
                    <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                    contact us
                  </p>
                </FaderInAnimation>

                <FaderInAnimation direction="up">
                  <h2 className="text-primary text-3xl sm:text-4xl font-semibold leading-tight font-default">
                    Get in touch{" "}
                    <span className="font-accent italic font-normal">with us</span>
                  </h2>
                </FaderInAnimation>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="grid grid-cols-1 gap-4"
              >
                {/* Name row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FaderInAnimation direction="up">
                    <input
                      type="text"
                      name="fname"
                      placeholder="First name"
                      className={fieldClass}
                      required
                    />
                  </FaderInAnimation>

                  <FaderInAnimation direction="up">
                    <input
                      type="text"
                      name="lname"
                      placeholder="Last name"
                      className={fieldClass}
                      required
                    />
                  </FaderInAnimation>
                </div>

                {/* Email */}
                <FaderInAnimation direction="up">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className={fieldClass}
                    required
                  />
                </FaderInAnimation>

                {/* Phone */}
                <FaderInAnimation direction="up">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    className={fieldClass}
                    required
                  />
                </FaderInAnimation>

                {/* Message */}
                <FaderInAnimation direction="up">
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 rounded-xl border border-divider bg-white text-text placeholder:text-text/50 text-sm font-default outline-none resize-vertical transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 min-h-[130px]"
                  />
                </FaderInAnimation>

                {/* Submit */}
                <FaderInAnimation direction="up">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="mt-2 w-fit !rounded-full"
                  >
                    Submit Message
                  </Button>
                </FaderInAnimation>
              </form>
            </div>

            {/* RIGHT: MAP */}
            <div className="min-h-80 border-t border-divider lg:min-h-full lg:border-l lg:border-t-0">
              <iframe
                title="Google Map"
                className="h-full w-full"
                src={
                  about?.googleMap ||
                  "https://www.google.com/maps?q=Filder+Str.+63,+47441+Moers,+Germany&output=embed"
                }
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
