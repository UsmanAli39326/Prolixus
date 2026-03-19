"use client";
import { useState } from "react";
import OrderItem from "./OrderItem";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import useCart from "@/Hooks/useCart";
import { useCurrency } from "@/context/CurrencyContext";
import { useCheckout } from "@/context/CheckoutContext";
import { apiService } from "@/lib/api";
import { HiCreditCard } from "react-icons/hi";

export default function OrderSummary() {
    const { cartItems } = useCart();
    const { formatPrice } = useCurrency();
    const { formData, updateFormData, totals, isAuthenticated, walletBalance } = useCheckout();

    const [inputCode, setInputCode] = useState("");
    const [codeType, setCodeType] = useState("promo");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleApply = async () => {
        if (!inputCode.trim()) return;
        setError("");
        setLoading(true);

        try {
            if (codeType === "promo") {
                // Validate coupon via backend POST API
                const result = await apiService.post("/Checkout/validate-coupon", {
                    code: inputCode.trim(),
                });

                if (result?.data?.isValid) {
                    // Discount is a percentage — calculate the amount from subtotal
                    const discountAmount = parseFloat(
                        ((totals.subtotal * (result.data.discountPercentage || 0)) / 100).toFixed(2)
                    );

                    updateFormData({
                        couponCode: result.data.code || inputCode.trim(),
                        affiliateCustomerCode: "",
                        discountAmount,
                        useWallet: false,
                        walletAmount: 0,
                    });
                    setInputCode("");
                } else {
                    setError(result?.data?.message || "Invalid coupon code");
                }
            } else {
                // Validate affiliate code via backend POST API
                const result = await apiService.post("/Checkout/validate-affiliate", {
                    code: inputCode.trim(),
                });

                if (result?.data?.isValid) {
                    updateFormData({
                        couponCode: "",
                        affiliateCustomerCode: result.data.code || inputCode.trim(),
                        discountAmount: 0,
                        useWallet: false,
                        walletAmount: 0,
                    });
                    setInputCode("");
                } else {
                    setError(result?.data?.message || "Invalid affiliate code");
                }
            }
        } catch (err) {
            setError("Failed to validate code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Whether a promo/affiliate code is currently active
    const hasCodeApplied = !!(formData.couponCode || formData.affiliateCustomerCode);

    const handleWalletToggle = (checked) => {
        if (checked) {
            // Clear any applied code and use wallet instead
            updateFormData({
                useWallet: true,
                walletAmount: walletBalance,
                couponCode: "",
                affiliateCustomerCode: "",
                discountAmount: 0,
            });
        } else {
            updateFormData({ useWallet: false, walletAmount: 0 });
        }
    };

    return (
        <aside className="lg:col-span-12 xl:col-span-5 relative">
            <div className="sticky top-28 bg-surface rounded-4xl p-6 lg:p-8 shadow-xl shadow-divider/50 border border-divider">
                <RevealInAnimation direction="bottom">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-divider">
                        <h3 className="text-xl font-bold text-primary">Order Summary</h3>
                        <span className="text-sm text-gray-400 font-accent">{cartItems.length} items</span>
                    </div>
                </RevealInAnimation>

                {/* Items */}
                <FaderInAnimation direction="up" delay={0.1}>
                    <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <OrderItem key={item.id} item={item} />
                            ))
                        ) : (
                            <p className="text-gray-500 py-8 italic font-accent text-left">Your cart is empty</p>
                        )}
                    </div>
                </FaderInAnimation>

                {/* Discount / Wallet Section */}
                <FaderInAnimation direction="up" delay={0.15}>
                    <div className="mb-6 pt-6 border-t border-divider">
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={() => { setCodeType("promo"); setError(""); setInputCode(""); }}
                                className={`text-xs font-bold uppercase tracking-wider pb-1 border-b-2 transition-all ${codeType === "promo" ? "border-accent text-primary" : "border-transparent text-gray-400 hover:text-primary"}`}
                            >
                                Promo Code
                            </button>
                            <button
                                onClick={() => { setCodeType("affiliate"); setError(""); setInputCode(""); }}
                                className={`text-xs font-bold uppercase tracking-wider pb-1 border-b-2 transition-all ${codeType === "affiliate" ? "border-accent text-primary" : "border-transparent text-gray-400 hover:text-primary"}`}
                            >
                                Affiliate Code
                            </button>
                            {isAuthenticated && walletBalance > 0 && (
                                <button
                                    onClick={() => { setCodeType("wallet"); setError(""); setInputCode(""); }}
                                    className={`text-xs font-bold uppercase tracking-wider pb-1 border-b-2 transition-all ${codeType === "wallet" ? "border-accent text-primary" : "border-transparent text-gray-400 hover:text-primary"}`}
                                >
                                    Wallet
                                </button>
                            )}
                        </div>

                        {/* Promo / Affiliate input */}
                        {codeType !== "wallet" && (
                            <>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder={codeType === "promo" ? "Enter promo code" : "Enter affiliate code"}
                                            value={inputCode}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setInputCode(val);
                                                if (val.trim() === "") setError("");
                                            }}
                                            className="w-full h-11 px-4 bg-white dark:bg-white/5 border border-divider rounded-xl focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm font-default transition-all"
                                        />
                                    </div>
                                    <button
                                        onClick={handleApply}
                                        disabled={!inputCode.trim() || loading}
                                        className="bg-primary text-white disabled:opacity-50 font-bold text-xs px-5 h-11 rounded-xl transition-all active:scale-95 whitespace-nowrap"
                                    >
                                        {loading ? "..." : "Apply"}
                                    </button>
                                </div>
                                {error && <p className="text-red-500 text-[10px] mt-2 ml-1 font-bold">{error}</p>}

                                {(formData.couponCode || formData.affiliateCustomerCode) && (
                                    <div className="mt-4 p-3 bg-accent/5 rounded-xl border border-accent/20 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
                                        <div className="text-xs">
                                            <span className="text-gray-400 block uppercase text-[8px] font-bold">Applied {formData.couponCode ? "Promo" : "Affiliate"}</span>
                                            <span className="text-primary font-bold">{formData.couponCode || formData.affiliateCustomerCode}</span>
                                        </div>
                                        <button
                                            onClick={() => updateFormData({ couponCode: "", affiliateCustomerCode: "", discountAmount: 0 })}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Wallet checkbox */}
                        {codeType === "wallet" && (
                            <label className="flex items-center gap-3 cursor-pointer group py-1">
                                <input
                                    type="checkbox"
                                    checked={formData.useWallet}
                                    onChange={(e) => handleWalletToggle(e.target.checked)}
                                    className="size-5 rounded-md border-2 border-divider accent-accent cursor-pointer transition-all"
                                />
                                <div className="flex-1 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <HiCreditCard className="text-accent text-lg" />
                                        <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                                            Use Wallet Balance
                                        </span>
                                    </div>
                                    <span className="text-sm font-bold text-accent">
                                        {formatPrice(walletBalance)}
                                    </span>
                                </div>
                            </label>
                        )}
                    </div>
                </FaderInAnimation>

                {/* Price Breakdown */}
                <FaderInAnimation direction="up" delay={0.2}>
                    <div className="space-y-3 text-sm text-left">
                        <div className="flex justify-between text-text/70 font-accent">
                            <span>Subtotal</span>
                            <span className="font-semibold text-primary">{formatPrice(totals.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-text/70 font-accent">
                            <span>Shipping</span>
                            <span className="font-semibold text-accent">Free</span>
                        </div>
                        {totals.vatDetails?.map((vat) => (
                            <div key={vat.percentage} className="flex justify-between text-text/70 font-accent">
                                <span>VAT ({vat.percentage}%)</span>
                                <span className="font-semibold text-primary">{formatPrice(vat.amount)}</span>
                            </div>
                        ))}
                        {totals.discountAmount > 0 && (
                            <div className="flex justify-between text-accent font-accent font-bold">
                                <span>Discount</span>
                                <span>-{formatPrice(totals.discountAmount)}</span>
                            </div>
                        )}
                        {totals.walletAmount > 0 && (
                            <div className="flex justify-between text-accent font-accent font-bold">
                                <span>Wallet</span>
                                <span>-{formatPrice(totals.walletAmount)}</span>
                            </div>
                        )}
                    </div>
                </FaderInAnimation>

                <FaderInAnimation direction="up" delay={0.3}>
                    <div className="flex justify-between items-end mt-6 pt-6 border-t border-divider">
                        <span className="text-base font-medium text-text/60 font-accent">Total due</span>
                        <span className="text-3xl font-bold text-accent tracking-tight">{formatPrice(totals.total)}</span>
                    </div>
                </FaderInAnimation>
            </div>
        </aside>

    );
}

