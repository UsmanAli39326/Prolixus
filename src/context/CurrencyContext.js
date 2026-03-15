"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getAboutPayload } from "@/app/api/about/about";

const DEFAULT_SYMBOL = "$";
const DEFAULT_CURRENCY = "USD";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
    const [currencySymbol, setCurrencySymbol] = useState(DEFAULT_SYMBOL);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCurrency() {
            try {
                const about = await getAboutPayload();
                if (about?.currencySymbol) setCurrencySymbol(about.currencySymbol);
                if (about?.currency) setCurrency(about.currency);
            } catch (error) {
                console.warn("CurrencyContext: failed to fetch currency, using default ($).", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCurrency();
    }, []);

    /**
     * Format a numeric amount using the fetched currency symbol.
     * e.g. formatPrice(29.9) → "€29.90"
     */
    const formatPrice = (amount) => {
        if (amount === null || amount === undefined) return `${currencySymbol}0.00`;
        const num = typeof amount === "number" ? amount : Number(amount);
        return `${currencySymbol}${num.toFixed(2)}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, currencySymbol, formatPrice, loading }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
};
