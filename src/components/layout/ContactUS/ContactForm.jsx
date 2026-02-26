// components/ContactSection.jsx
"use client";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { getAboutPayload } from "@/app/api/about/about";
export default function ContactSection() {
  const about = getAboutPayload(); // 👈 API CALL
  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-full px-4">
        <div className="rounded-3xl border border-divider bg-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT: FORM */}
            <div className="p-8 sm:p-12">
              <div className="mb-8">
                <FaderInAnimation direction="up">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold  tracking-[0.2em] text-accent">
                    <span className="inline-block h-2 w-2 rounded-full bg-accent font-accent italic capitalize" />
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FaderInAnimation direction="up">
                    <Input
                      type="text"
                      name="fname"
                      placeholder="First name"
                      inputClassName="!rounded-xl"
                      required
                    />
                  </FaderInAnimation>

                  <FaderInAnimation direction="up">
                    <Input
                      type="text"
                      name="lname"
                      placeholder="Last name"
                      inputClassName="!rounded-xl"
                      required
                    />
                  </FaderInAnimation>
                </div>

                <FaderInAnimation direction="up">
                  <Input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    inputClassName="!rounded-xl"
                    required
                  />
                </FaderInAnimation>

                <FaderInAnimation direction="up">
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    inputClassName="!rounded-xl"
                    required
                  />
                </FaderInAnimation>

                <FaderInAnimation direction="up">
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Write message..."
                    className="textarea"
                  />
                </FaderInAnimation>

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

      {/* Minimal CSS (uses your :root variables) */}
      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid var(--divider-color);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 16px;
          line-height: 1.4;
          color: var(--text-color);
          background: var(--white-color);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .input::placeholder {
          color: color-mix(in srgb, var(--text-color) 65%, transparent);
        }
        .input:focus {
          border-color: var(--accent-color);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-color) 18%, transparent);
        }

        .textarea {
          width: 100%;
          border: 1px solid var(--divider-color);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 16px;
          line-height: 1.4;
          color: var(--text-color);
          background: var(--white-color);
          outline: none;
          resize: vertical;
          min-height: 120px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .textarea::placeholder {
          color: color-mix(in srgb, var(--text-color) 65%, transparent);
        }
        .textarea:focus {
          border-color: var(--accent-color);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-color) 18%, transparent);
        }
      `}</style>
    </section>
  );
}
