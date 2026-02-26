"use client";

import { useState } from "react";
import Link from "next/link";
import { HiChevronLeft, HiOutlineCreditCard, HiLockClosed, HiCheckCircle } from "react-icons/hi";
import Button from "@/components/ui/Button";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import useCart from "@/Hooks/useCart";

export default function PaymentForm({ prevStep, goToStep, formData, updateFormData, orderSummary }) {
    const { clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // FORM SUBMISSION: Handles the final API call to /Configuration/orders
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. PAYMENT TOKEN: If Card is selected, generate a dummy token.
            // In a real scenario, this would come from a payment gateway (Stripe/PayPal).
            const paymentToken = 1234567890

            // 2. FINAL PAYLOAD: Merges orderSummary (totals/items) with user input.
            const payload = {
                ...orderSummary,
                // Customer details formatted as a single string for guest identification
                guestCustomerInfo: `${formData.fullName}, ${formData.email}, ${formData.phone}`,
                paymentMethod: formData.paymentMethod,
                paymentToken: paymentToken,
                couponCode: formData.couponCode,
                description: formData.orderNotes,

                // Address Mapping
                deliveryStreet: formData.address,
                deliveryCity: formData.city,
                deliveryPostCode: formData.zip,
                deliveryCountryId: parseInt(formData.countryId),
                addMoreAddress: formData.apartment || "",
                affiliateCustomerCode: "", // Hook for partner/referral programs
            };

            // 3. API CALL: Uses the unified apiService from @/lib/api
            const response = "api"

            if (response.success) {
                // 4. SUCCESS: Clear cart and show confirmation screen
                setSuccess(true);
                clearCart();
            } else {
                // 5. ERROR: Display backend error messages (e.g., "Out of stock")
                setError(response.message || "Failed to place order. Please try again.");
            }
        } catch (err) {
            console.error("Order Submission Error:", err);
            setError("A connection error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <FaderInAnimation direction="up">
                <div className="text-center py-20 space-y-6">
                    <div className="flex justify-center">
                        <HiCheckCircle className="text-8xl text-accent animate-bounce" />
                    </div>
                    <h2 className="text-4xl font-bold text-primary">Order Confirmed!</h2>
                    <p className="text-lg text-text max-w-md mx-auto font-serif">
                        Thank you for your purchase. Your order has been placed successfully.
                        We'll send you an email confirmation shortly.
                    </p>
                    <div className="pt-8">
                        <Link href="/shop">
                            <Button variant="accent" size="lg" className="rounded-full px-12">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </FaderInAnimation>
        );
    }

    return (
        <div className="flex flex-col gap-8 text-left">
            <RevealInAnimation direction="left">
                <nav className="flex items-center gap-3 text-sm font-medium">
                    <button onClick={() => goToStep(0)} className="text-accent hover:underline">Information</button>
                    <div className="text-gray-400">
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                    <button onClick={() => goToStep(1)} className="text-accent hover:underline">Shipping</button>
                    <div className="text-gray-400">
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                    <span className="text-primary font-bold">Payment</span>
                </nav>
            </RevealInAnimation>

            <div className="space-y-10">
                {/* Summary Box */}
                <FaderInAnimation direction="up" delay={0.1}>
                    <div className="bg-white dark:bg-white/5 border border-divider rounded-2xl overflow-hidden text-sm">
                        <div className="p-5 flex items-baseline justify-between gap-4 border-b border-divider">
                            <div className="flex gap-6">
                                <span className="text-gray-400 font-serif w-12 text-left">Contact</span>
                                <span className="text-primary">{formData.email}</span>
                            </div>
                            <button onClick={() => goToStep(0)} className="text-accent text-xs font-bold hover:underline">Change</button>
                        </div>
                        <div className="p-5 flex items-baseline justify-between gap-4 border-b border-divider">
                            <div className="flex gap-6">
                                <span className="text-gray-400 font-serif w-12 text-left">Ship to</span>
                                <span className="text-primary">
                                    {formData.address}, {formData.apartment ? `${formData.apartment}, ` : ''}{formData.city} {formData.zip}
                                </span>
                            </div>
                            <button onClick={() => goToStep(0)} className="text-accent text-xs font-bold hover:underline">Change</button>
                        </div>
                        <div className="p-5 flex items-baseline justify-between gap-4 border-divider">
                            <div className="flex gap-6">
                                <span className="text-gray-400 font-serif w-12 text-left">Method</span>
                                <span className="text-primary">Standard Shipping • <span className="font-bold">Free</span></span>
                            </div>
                            <button onClick={() => goToStep(1)} className="text-accent text-xs font-bold hover:underline">Change</button>
                        </div>
                    </div>
                </FaderInAnimation>

                {/* Payment Methods */}
                <FaderInAnimation direction="up" delay={0.2}>
                    <div className="space-y-6">
                        <div className="text-left">
                            <h2 className="text-2xl font-bold tracking-tight text-primary">Payment</h2>
                            <p className="text-sm text-text/60 mt-1 font-serif">All transactions are secure and encrypted.</p>
                        </div>

                        {/* Payment method selection disabled to focus on Cash on Delivery */}
                        <div className="bg-surface border border-divider rounded-2xl p-6 space-y-4">
                            <div className="flex items-center gap-3 text-primary">
                                <HiOutlineCreditCard className="text-2xl" />
                                <span className="font-bold text-lg text-left">Cash on Delivery (COD)</span>
                            </div>
                            <p className="text-sm text-text/70 font-serif leading-relaxed text-left">
                                You will pay for your order in cash at the moment of delivery. Please ensure you have the correct amount ready.
                            </p>
                        </div>

                        {/* 
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => updateFormData({ paymentMethod: "Cash" })}
                                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${formData.paymentMethod === "Cash"
                                    ? "border-accent bg-accent/5 ring-4 ring-accent/10"
                                    : "border-divider bg-white dark:bg-white/5 hover:border-accent/50"
                                    }`}
                            >
                                <div className={`size-12 rounded-full flex items-center justify-center ${formData.paymentMethod === "Cash" ? "bg-accent text-white" : "bg-secondary text-primary"}`}>
                                    <HiCheckCircle className="text-2xl" />
                                </div>
                                <span className="font-bold text-primary">Cash on Delivery</span>
                            </button>

                            <button
                                onClick={() => updateFormData({ paymentMethod: "Card" })}
                                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${formData.paymentMethod === "Card"
                                    ? "border-accent bg-accent/5 ring-4 ring-accent/10"
                                    : "border-divider bg-white dark:bg-white/5 hover:border-accent/50"
                                    }`}
                            >
                                <div className={`size-12 rounded-full flex items-center justify-center ${formData.paymentMethod === "Card" ? "bg-accent text-white" : "bg-secondary text-primary"}`}>
                                    <HiOutlineCreditCard className="text-2xl" />
                                </div>
                                <span className="font-bold text-primary">Credit Card</span>
                            </button>
                        </div>

                        {formData.paymentMethod === "Card" && (
                            <RevealInAnimation direction="down">
                                <div className="bg-surface border border-divider rounded-2xl p-6 text-left">
                                    <p className="text-primary font-bold mb-2">Card Details</p>
                                    <p className="text-sm text-text font-serif">For demonstration, clicking 'Complete Order' will simulate a secure card transaction.</p>
                                </div>
                            </RevealInAnimation>
                        )}
                        */}
                    </div>
                </FaderInAnimation>

                {/* Additional Information */}
                <FaderInAnimation direction="up" delay={0.3}>
                    <div className="space-y-6">
                        <div className="text-left">
                            <label className="text-sm font-medium ml-2 text-primary font-serif block mb-1.5">Order Notes (optional)</label>
                            <textarea
                                className="w-full p-4 rounded-xl border border-divider bg-white dark:bg-white/5 focus:border-accent focus:ring-1 focus:ring-accent transition-colors min-h-[100px]"
                                placeholder="Special instructions for delivery..."
                                value={formData.orderNotes || ""}
                                onChange={(e) => updateFormData({ orderNotes: e.target.value })}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="couponCode"
                                    value={formData.couponCode || ""}
                                    onChange={(e) => updateFormData({ couponCode: e.target.value })}
                                    placeholder="Gift card or promo code"
                                    className="w-full h-12 pl-4 pr-24 rounded-xl border border-divider bg-white dark:bg-white/5 focus:ring-2 focus:ring-accent focus:border-accent placeholder:text-text/50 text-sm transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    className="absolute right-1 top-1 h-10 px-4 rounded-lg bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all duration-200"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        <div className="bg-secondary/50 rounded-xl p-4 flex items-start gap-3 mt-4 text-left">
                            <HiLockClosed className="text-primary dark:text-accent text-xl mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 text-left">Security Guarantee</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug font-serif text-left">Your data is protected with 256-bit encryption. We do not store your full card details.</p>
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-200 text-left">
                                {error}
                            </p>
                        )}
                    </div>
                </FaderInAnimation>

                {/* Actions */}
                <FaderInAnimation direction="up" delay={0.4}>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-6 border-t border-divider">
                        <button onClick={prevStep} className="flex items-center gap-1 text-sm font-medium text-primary hover:text-accent transition-colors group">
                            <HiChevronLeft className="text-lg transition-transform group-hover:-translate-x-1" />
                            Return to Shipping
                        </button>

                        <Button
                            onClick={handleSubmit}
                            loading={loading}
                            disabled={loading}
                            className="w-full sm:w-auto h-14 bg-accent! hover:bg-accent! text-white! font-bold text-lg rounded-full! shadow-lg shadow-accent/10 px-10"
                        >
                            Complete Order <span className="hidden sm:inline"> • ${orderSummary.grossAmount.toFixed(2)}</span>
                        </Button>
                    </div>
                </FaderInAnimation>
            </div>
        </div>
    );
}
