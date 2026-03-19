import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Widerrufsbelehrung | Prolixus",
  description: "Informationen zum Widerrufsrecht und Versandbedingungen bei Prolixus.",
};

const sections = [
  {
    id: "lieferung",
    title: "1. Lieferung",
    content: `Wir liefern unsere Waren nach Deutschland und in alle anderen EU Länder.
    
Sofort lieferbare Artikel liegen bei uns auf Lager und sind (Mo-Fr) innerhalb von 24h versandfertig. Bestellungen vor 13.00 Uhr werden noch am selben Tag versandfertig gemacht.

In Deutschland ist optional eine Zustellung direkt am nächsten Tag möglich. Für alle anderen EU Länder gilt eine Lieferzeit von 1-3 Tagen.`,
  },
  {
    id: "versandkosten",
    title: "2. Versandkosten",
    content: `In Deutschland liefern wir versandkostenfrei.
    
Für alle anderen EU Länder gelten pauschal 13,99€ Versandkosten.`,
  },
  {
    id: "zahlarten",
    title: "3. Zahlarten",
    content: `Wir bieten folgende Zahlungsarten an:
- Vorauskasse
- PayPal
- Kreditkarte (Visa/Mastercard)
- Klarna
- Sofortüberweisung`,
  },
  {
    id: "widerrufsrecht",
    title: "4. Widerrufsrecht",
    content: `Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
    
Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (PROLIXUS GmbH, Filder Straße 63, 47441 Moers, E-Mail: mail@pro-lixus.de) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.`,
  },
  {
    id: "folgen",
    title: "5. Folgen des Widerrufs",
    content: `Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
    
Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben.`,
  },
  {
    id: "ausschluss",
    title: "6. Ausschluss des Widerrufsrechts",
    content: `Das Widerrufsrecht besteht nicht bei Verträgen:
- zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist.
- zur Lieferung von Waren, die schnell verderben können oder deren Verfallsdatum schnell überschritten würde.
- zur Lieferung versiegelter Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet sind, wenn ihre Versiegelung nach der Lieferung entfernt wurde.`,
  },
];

export default function ReturnRefundPage() {
  return (
    <>
      <PageHeader title="Versand &" subtitle="Widerruf" />

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Intro card */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-10">
            <h2 className="text-2xl md:text-3xl font-accent font-bold text-primary mb-4">
              Lieferung und Widerrufsbelehrung
            </h2>
            <p className="text-text leading-relaxed">
              Hier finden Sie Informationen zu unseren Lieferbedingungen, Versandkosten und Ihrem gesetzlichen Widerrufsrecht.
            </p>
          </div>

          {/* Sections */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 space-y-10">
            {sections.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-24">
                <h3 className="text-xl font-accent font-semibold text-primary mb-3">
                  {s.title}
                </h3>
                <div className="text-text leading-relaxed whitespace-pre-wrap">{s.content}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
