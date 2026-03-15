import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Terms & Conditions | Prolixus",
  description:
    "Read the Terms & Conditions for using the Prolixus e-commerce platform, including user responsibilities, ordering, payments, shipping, returns, and more.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Prolixus website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our platform. We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website following any changes constitutes acceptance of the revised terms.`,
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content: `You must be at least 18 years of age or have the consent of a parent or legal guardian to use this website. By using Prolixus, you represent and warrant that you have the legal capacity to enter into a binding agreement.`,
  },
  {
    id: "accounts",
    title: "3. User Accounts",
    content: `When you create an account with Prolixus, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. Prolixus reserves the right to suspend or terminate accounts that violate these terms or are found to be fraudulent.`,
  },
  {
    id: "products-pricing",
    title: "4. Products & Pricing",
    content: `All product descriptions, images, and prices on the Prolixus platform are provided for informational purposes and are subject to change without notice. While we strive to ensure accuracy, we do not warrant that product descriptions, pricing, or other content is complete, reliable, or error-free. In the event of a pricing error, Prolixus reserves the right to cancel any order placed at the incorrect price.`,
  },
  {
    id: "orders-payments",
    title: "5. Orders & Payments",
    content: `By placing an order on Prolixus, you are making an offer to purchase a product. All orders are subject to acceptance and availability. We accept various payment methods as displayed at checkout. You agree to pay the full amount for your order, including applicable taxes and shipping charges. Prolixus reserves the right to refuse or cancel any order for any reason, including suspected fraud or unauthorized transactions.`,
  },
  {
    id: "shipping-delivery",
    title: "6. Shipping & Delivery",
    content: `Prolixus aims to process and ship orders in a timely manner. Delivery times are estimated and may vary based on location, carrier performance, and other factors beyond our control. Prolixus is not responsible for delays caused by customs, natural disasters, or other unforeseen circumstances. Risk of loss and title for items pass to you upon delivery to the carrier.`,
  },
  {
    id: "returns-refunds",
    title: "7. Returns & Refunds",
    content: `We want you to be satisfied with your purchase. If you are not happy with a product, you may request a return or exchange in accordance with our Return Policy. Items must be returned in their original condition within the specified return window. Refunds will be processed to the original payment method once the returned item has been received and inspected. Certain items, such as perishable goods or personalized products, may not be eligible for return.`,
  },
  {
    id: "intellectual-property",
    title: "8. Intellectual Property",
    content: `All content on the Prolixus website—including text, graphics, logos, images, product designs, and software—is the property of Prolixus or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without prior written consent from Prolixus.`,
  },
  {
    id: "prohibited-conduct",
    title: "9. Prohibited Conduct",
    content: `You agree not to use the Prolixus platform for any unlawful purpose, or in any way that could damage, disable, or impair the website. Prohibited activities include, but are not limited to: attempting to gain unauthorized access to any part of the website, using automated tools to scrape or harvest data, submitting false or misleading information, and engaging in any activity that interferes with other users' enjoyment of the platform.`,
  },
  {
    id: "partner-program",
    title: "10. Partner & Affiliate Program",
    content: `Participation in the Prolixus Partner Program is subject to separate terms and conditions. Affiliate commissions, referral codes, and wallet balances are managed at the sole discretion of Prolixus. We reserve the right to modify, suspend, or terminate the Partner Program at any time. Any fraudulent activity, including self-referrals or manipulation of affiliate links, will result in immediate disqualification and forfeiture of earned commissions.`,
  },
  {
    id: "privacy",
    title: "11. Privacy & Data Protection",
    content: `Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy. By using Prolixus, you consent to the collection and use of your data as described therein. We implement industry-standard security measures to protect your information, but no method of transmission over the internet is 100% secure.`,
  },
  {
    id: "limitation-liability",
    title: "12. Limitation of Liability",
    content: `To the fullest extent permitted by law, Prolixus and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website or any products purchased through the platform. Our total liability for any claim arising from these terms shall not exceed the amount you paid for the specific product or service in question.`,
  },
  {
    id: "indemnification",
    title: "13. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Prolixus and its affiliates from any claims, losses, liabilities, damages, costs, and expenses (including reasonable attorney fees) arising out of or related to your use of the website, your violation of these Terms & Conditions, or your violation of any rights of a third party.`,
  },
  {
    id: "governing-law",
    title: "14. Governing Law",
    content: `These Terms & Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which Prolixus operates, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved exclusively in the competent courts of that jurisdiction.`,
  },
  {
    id: "contact",
    title: "15. Contact Us",
    content: `If you have any questions or concerns about these Terms & Conditions, please contact us through our Contact page or reach out to our customer support team. We are committed to resolving any issues promptly and fairly.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms &" subtitle="Conditions" />

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Intro card */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-10">
            <p className="text-sm text-text/60 mb-1 font-medium uppercase tracking-wider">
              Effective Date: March 11, 2026
            </p>
            <h2 className="text-2xl md:text-3xl font-accent font-bold text-primary mb-4">
              Prolixus Terms &amp; Conditions
            </h2>
            <p className="text-text leading-relaxed">
              Welcome to Prolixus. These Terms &amp; Conditions outline the
              rules and regulations for the use of the Prolixus e-commerce
              platform. By accessing this website, you accept these terms in
              full. Please read them carefully before using our services.
            </p>
          </div>

          {/* Table of contents */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-10">
            <h3 className="text-lg font-accent font-semibold text-primary mb-4">
              Table of Contents
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
                <p className="text-text leading-relaxed">{s.content}</p>
              </article>
            ))}

            {/* Closing note */}
            <div className="border-t border-divider pt-8 mt-10">
              <p className="text-text/70 text-sm leading-relaxed">
                By using the Prolixus platform, you acknowledge that you have
                read, understood, and agree to be bound by these Terms &amp;
                Conditions. Thank you for choosing Prolixus.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}