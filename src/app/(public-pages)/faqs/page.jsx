"use client";

import PageHeader from "@/components/layout/PageHeader";
import { useState } from "react";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

const faqs = [
  {
    category: "Versand & Lieferung",
    questions: [
      {
        question: "Wohin liefern Sie Ihre Produkte?",
        answer: "Wir liefern unsere Waren nach Deutschland und in alle anderen EU Länder.",
      },
      {
        question: "Wie lange dauert die Lieferung?",
        answer: "Sofort lieferbare Artikel sind innerhalb von 24h versandfertig. In Deutschland ist eine Zustellung am nächsten Tag möglich. Für andere EU Länder gilt eine Lieferzeit von 1-3 Tagen.",
      },
      {
        question: "Wie hoch sind die Versandkosten?",
        answer: "Innerhalb Deutschlands liefern wir versandkostenfrei. Für alle anderen EU Länder berechnen wir pauschal 13,99€.",
      },
    ],
  },
  {
    category: "Zahlung",
    questions: [
      {
        question: "Welche Zahlungsarten bieten Sie an?",
        answer: "Wir akzeptieren Vorauskasse, PayPal, Kreditkarte (Visa/Mastercard), Klarna und Sofortüberweisung.",
      },
      {
        question: "Wann wird meine Kreditkarte belastet?",
        answer: "Ihre Kreditkarte wird erst belastet, wenn Ihre Sendung unser Haus verlässt.",
      },
    ],
  },
  {
    category: "Sicherheit & Datenschutz",
    questions: [
      {
        question: "Sind meine Daten bei der Bestellung sicher?",
        answer: "Ja, wir nutzen eine SSL- bzw. TLS-Verschlüsselung zum Schutz Ihrer Daten während der Übertragung.",
      },
    ],
  },
  {
    category: "Widerruf & Rücksendung",
    questions: [
      {
        question: "Wie kann ich meine Bestellung widerrufen?",
        answer: "Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen den Vertrag zu widerrufen. Informieren Sie uns dazu bitte per Post oder E-Mail.",
      },
      {
        question: "Wer trägt die Kosten der Rücksendung?",
        answer: "Der Verbraucher trägt die unmittelbaren Kosten der Rücksendung der Waren.",
      },
    ],
  },
];

function Chevron({ open }) {
  return (
    <svg
      className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180 text-white" : "rotate-0 text-primary"}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FAQPage() {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <PageHeader title="Häufige" subtitle="Fragen (FAQ)" />

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            {faqs.map((cat, catIdx) => (
              <div key={catIdx}>
                <h2 className="text-2xl font-accent font-bold text-primary mb-6 border-b border-divider pb-2">
                  {cat.category}
                </h2>
                <div className="space-y-4">
                  {cat.questions.map((faq, faqIdx) => {
                    const id = `${catIdx}-${faqIdx}`;
                    const isOpen = openId === id;

                    return (
                      <div
                        key={id}
                        className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
                      >
                        <FaderInAnimation direction="up">
                          <button
                            type="button"
                            onClick={() => toggleAccordion(id)}
                            className={`flex w-full items-center justify-between px-6 py-5 text-left transition-colors ${
                              isOpen ? "bg-accent text-white" : "bg-white text-primary"
                            }`}
                          >
                            <span className="text-base font-semibold">{faq.question}</span>
                            <Chevron open={isOpen} />
                          </button>

                          <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                              isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p
                                className={`px-6 pb-6 text-sm leading-relaxed ${
                                  isOpen ? "text-white/90" : "text-text"
                                }`}
                              >
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </FaderInAnimation>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
