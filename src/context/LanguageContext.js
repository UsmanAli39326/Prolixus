"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/lib/api";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en"); // Default to English
    const [translations, setTranslations] = useState({});
    const [availableLanguages, setAvailableLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const loadTranslations = async (lang) => {
        try {
            const common = await import(`@/i18n/${lang}/common.json`);
            setTranslations(common.default);
        } catch (error) {
            console.error("Failed to load translations:", error);
        }
    };

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await apiService.get("/Configuration/languages");
                if (response.success) {
                    setAvailableLanguages(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch languages:", error);
                // Fallback to basic languages if API fails
                setAvailableLanguages([
                    { code: "en", name: "English", isRtl: false, isActive: true },
                    { code: "de", name: "German", isRtl: false, isActive: true }
                ]);
            }
        };

        fetchLanguages();

        // Load language preference from localStorage on mount
        const storedLang = localStorage.getItem("appLanguage");
        const langToUse = (storedLang && (storedLang === "en" || storedLang === "de" || storedLang === "ar"))
            ? storedLang
            : (navigator.language.split('-')[0] === "de" ? "de" : (navigator.language.split('-')[0] === "ar" ? "ar" : "en"));

        setLanguage(langToUse);
        loadTranslations(langToUse).then(() => setLoading(false));
    }, []);

    useEffect(() => {
        // Update document lang and dir attribute when language changes
        if (!loading) {
            document.documentElement.lang = language;

            // Set RTL/LTR direction based on language configuration
            const currentLangData = availableLanguages.find(l => l.code === language);
            if (currentLangData) {
                document.documentElement.dir = currentLangData.isRtl ? "rtl" : "ltr";
            }

            localStorage.setItem("appLanguage", language);
            document.cookie = `appLanguage=${language}; path=/; max-age=31536000; SameSite=Lax`;
            loadTranslations(language);
        }
    }, [language, loading, availableLanguages]);

    const switchLanguage = (newLang) => {
        if (newLang !== language) {
            // Persist language choice immediately before reload
            localStorage.setItem("appLanguage", newLang);
            document.cookie = `appLanguage=${newLang}; path=/; max-age=31536000; SameSite=Lax`;

            // Trigger a full page reload to ensure all content and state are updated
            window.location.reload();
        }
    };

    /**
     * Translate function
     * Usage: t('navbar.shop_now')
     */
    const t = (path) => {
        const keys = path.split('.');
        let result = translations;
        for (const key of keys) {
            if (result && result[key]) {
                result = result[key];
            } else {
                return path; // Fallback to path name
            }
        }
        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, availableLanguages, switchLanguage, t, loading }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
