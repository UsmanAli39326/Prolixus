import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Datenschutzerklärung | Prolixus",
  description: "Erfahren Sie mehr darüber, wie Prolixus Ihre persönlichen Daten sammelt, verwendet und schützt.",
};

const sections = [
  {
    id: "allgemein",
    title: "1. Allgemeiner Hinweis und Pflichtinformationen",
    content: `Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.`,
  },
  {
    id: "verantwortlich",
    title: "2. Benennung der verantwortlichen Stelle",
    content: `Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
    
PROLIXUS GmbH
Filder Straße 63
47441 Moers

Tel.: +49 284 197 913 20
Website: www.pro-lixus.de
E-Mail: mail@pro-lixus.de

Die verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).`,
  },
  {
    id: "widerruf",
    title: "3. Widerruf Ihrer Einwilligung zur Datenverarbeitung",
    content: `Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der Datenverarbeitung möglich. Ein Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.`,
  },
  {
    id: "beschwerde",
    title: "4. Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde",
    content: `Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen Verstoßes ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde bezüglich datenschutzrechtlicher Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem sich der Sitz unseres Unternehmens befindet.`,
  },
  {
    id: "uebertragbarkeit",
    title: "5. Recht auf Datenübertragbarkeit",
    content: `Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die Bereitstellung erfolgt in einem maschinenlesbaren Format. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.`,
  },
  {
    id: "auskunft",
    title: "6. Recht auf Auskunft, Berichtigung, Sperrung, Löschung",
    content: `Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, Herkunft der Daten, deren Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.`,
  },
  {
    id: "verschluesselung",
    title: "7. SSL- bzw. TLS-Verschlüsselung",
    content: `Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, die Sie an uns als Seitenbetreiber senden, nutzt unsere Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind Daten, die Sie über diese Website übermitteln, für Dritte nicht mitlesbar.`,
  },
  {
    id: "server-log",
    title: "8. Server-Log-Dateien",
    content: `In Server-Log-Dateien erhebt und speichert der Provider der Website automatisch Informationen, die Ihr Browser automatisch an uns übermittelt. Dies sind: Besuchte Seite auf unserer Domain, Datum und Uhrzeit der Serveranfrage, Browsertyp und Browserversion, Verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, IP-Adresse.`,
  },
  {
    id: "cookies",
    title: "9. Cookies",
    content: `Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Einige Cookies sind „Session-Cookies.“ Solche Cookies werden nach Ende Ihrer Browser-Sitzung von selbst gelöscht.`,
  },
  {
    id: "google-analytics",
    title: "10. Google Analytics",
    content: `Unsere Website verwendet Funktionen des Webanalysedienstes Google Analytics. Anbieter des Webanalysedienstes ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Google Analytics verwendet „Cookies“.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader title="Datenschutz" subtitle="erklärung" />

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Intro card */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-10">
            <p className="text-sm text-text/60 mb-1 font-medium uppercase tracking-wider">
              Stand: 18. März 2026
            </p>
            <h2 className="text-2xl md:text-3xl font-accent font-bold text-primary mb-4">
              Datenschutzerklärung Prolixus
            </h2>
            <p className="text-text leading-relaxed">
              Willkommen bei Prolixus. Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. In dieser Datenschutzerklärung informieren wir Sie darüber, wie wir Ihre Daten erfassen, verarbeiten und schützen.
            </p>
          </div>

          {/* Table of contents */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-10">
            <h3 className="text-lg font-accent font-semibold text-primary mb-4">
              Inhaltsverzeichnis
            </h3>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 list-decimal list-inside text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-text hover:text-accent transition-colors duration-200 no-underline hover:underline"
                  >
                    {s.title.replace(/^\d+\.\s*/, "")}
                  </a>
                </li>
              ))}
            </ol>
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

            {/* Closing note */}
            <div className="border-t border-divider pt-8 mt-10">
              <p className="text-text/70 text-sm leading-relaxed">
                Bei Fragen zum Datenschutz können Sie uns jederzeit über die im Impressum genannten Wege kontaktieren.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
