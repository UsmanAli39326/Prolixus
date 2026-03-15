"use client";

import { HiOutlineCreditCard } from "react-icons/hi";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

/**
 * A dynamic payment method selector that renders buttons from the API data.
 *
 * Props:
 *  - paymentMethods: sanitized array from usePaymentMethods()
 *  - selectedMethod: currently selected method name
 *  - onSelect: callback(method) when a user picks a method
 *  - loading: boolean
 *  - error: string | null
 */
export default function PaymentMethodSelector({
    paymentMethods,
    selectedMethod,
    onSelect,
    loading,
    error,
}) {
    // ─── Loading skeleton ─────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-divider bg-white dark:bg-white/5 animate-pulse"
                    >
                        <div className="size-12 rounded-full bg-gray-200 dark:bg-white/10" />
                        <div className="h-4 w-20 rounded bg-gray-200 dark:bg-white/10" />
                    </div>
                ))}
            </div>
        );
    }

    // ─── Error state ──────────────────────────────────────────────────────
    if (error && paymentMethods.length === 0) {
        return (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400 text-sm font-bold">{error}</p>
            </div>
        );
    }

    // ─── Method cards ─────────────────────────────────────────────────────
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => {
                const isSelected =
                    selectedMethod?.toLowerCase() === method.name?.toLowerCase();

                return (
                    <FaderInAnimation key={method.id} direction="up" delay={0.05}>
                        <button
                            type="button"
                            onClick={() => onSelect(method)}
                            className={`w-full flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                                isSelected
                                    ? "border-accent bg-accent/5 ring-4 ring-accent/10"
                                    : "border-divider bg-white dark:bg-white/5 hover:border-accent/50"
                            }`}
                        >
                            {/* Icon / image */}
                            {method.imageUrl ? (
                                <div
                                    className={`size-12 rounded-full flex items-center justify-center overflow-hidden ${
                                        isSelected
                                            ? "ring-2 ring-accent"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={method.imageUrl}
                                        alt={method.displayName}
                                        className="size-full object-contain"
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`size-12 rounded-full flex items-center justify-center ${
                                        isSelected
                                            ? "bg-accent text-white"
                                            : "bg-secondary text-primary"
                                    }`}
                                >
                                    <HiOutlineCreditCard className="text-2xl" />
                                </div>
                            )}

                            <span className="font-bold text-primary">
                                {method.displayName || method.name}
                            </span>
                        </button>
                    </FaderInAnimation>
                );
            })}
        </div>
    );
}
