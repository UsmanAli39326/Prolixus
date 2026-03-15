import "./globals.css";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: {
    template: "%s | Prolixus",
    default: "Prolixus - Premium Organic Products",
  },
  description: "Shop nature's finest organic ingredients, curated for your holistic well-being.",
  openGraph: {
    title: "Prolixus - Premium Organic Products",
    description: "Shop nature's finest organic ingredients, curated for your holistic well-being.",
    type: "website",
    locale: "en_US",
    url: "https://prolixus.vercel.app",
    siteName: "Prolixus",
  },
  icons: {
    icon: "/images/new/logo-image.png",
  },
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-default",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-accent",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${lora.variable}`}
    >
      <body>
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <main className="min-h-screen">
                {children}
              </main>
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}