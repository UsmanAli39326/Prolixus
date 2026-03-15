// components/ContactSection.jsx
"use client";
import React, { useState, useCallback, useEffect } from "react";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Button from "@/components/ui/Button";
import { getAboutPayload } from "@/app/api/about/about";
import { submitContactForm } from "@/app/api/contact/contact";
import { MdCheckCircle, MdError, MdClose } from "react-icons/md";

/* ─── Small inline toast component ─── */
function Toast({ type, message, onClose }) {
  const isSuccess = type === "success";
  return (
    <div
      role="alert"
      className={`
                flex items-start gap-3 px-5 py-4 rounded-xl shadow-lg border fixed top-24 right-4 z-50 min-w-[300px]
                ${isSuccess
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-red-50 border-red-200 text-red-800"
        }
                animate-fade-in
            `}
    >
      {isSuccess
        ? <MdCheckCircle className="text-xl shrink-0 mt-0.5 text-green-500" />
        : <MdError className="text-xl shrink-0 mt-0.5 text-red-500" />
      }
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
      >
        <MdClose className="text-lg" />
      </button>
    </div>
  );
}

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  messageDescription: "",
};

export default function ContactSection() {
  const about = getAboutPayload();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }

  /* ── Dismiss toast helper ── */
  const dismissToast = useCallback(() => setToast(null), []);

  /* ── Auto-dismiss after 5 s ── */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismissToast, 5000);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dismissToast();

    try {
      const response = await submitContactForm(formData);
      if (response?.success) {
        setToast({
          type: "success",
          message: "Thank you for contacting us! We will get back to you soon.",
        });
        setFormData(INITIAL_FORM);
      } else {
        throw new Error(response?.message || "Failed to submit form.");
      }
    } catch (error) {
      setToast({
        type: "error",
        message: error.message || "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "w-full h-12 px-4 rounded-xl border border-divider bg-white text-text placeholder:text-text/50 text-sm font-default outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <section className="py-24 relative">
      {/* Toast notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={dismissToast}
        />
      )}

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
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4"
              >
                {/* Name row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FaderInAnimation direction="up">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className={fieldClass}
                      required
                    />
                  </FaderInAnimation>

                  <FaderInAnimation direction="up">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className={fieldClass}
                    required
                  />
                </FaderInAnimation>

                {/* Message */}
                <FaderInAnimation direction="up">
                  <textarea
                    name="messageDescription"
                    value={formData.messageDescription}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 rounded-xl border border-divider bg-white text-text placeholder:text-text/50 text-sm font-default outline-none resize-vertical transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 min-h-[130px]"
                    required
                  />
                </FaderInAnimation>

                {/* Submit */}
                <FaderInAnimation direction="up">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={isSubmitting}
                    className="mt-2 w-fit !rounded-full"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Message"}
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
