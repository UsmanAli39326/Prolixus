"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useCurrency } from "@/context/CurrencyContext";

export default function PayPalProvider({ children }) {
  const { currency } = useCurrency();
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: currency || "EUR",
        intent: "capture",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}