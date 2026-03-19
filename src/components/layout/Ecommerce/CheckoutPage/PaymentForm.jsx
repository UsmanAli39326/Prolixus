"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { HiChevronLeft, HiLockClosed, HiCheckCircle } from "react-icons/hi";
import Button from "@/components/ui/Button";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import useCart from "@/Hooks/useCart";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useCheckout } from "@/context/CheckoutContext";
import PaymentMethodSelector from "./PaymentMethodSelector";
import OrderConfirmation from "./OrderConfirmation";

export default function PaymentForm({
    prevStep,
    goToStep,
    formData,
    updateFormData,
    buildGuestOrderPayload,
    cartItems,
    // Dynamic payment props
    paymentMethods,
    methodsLoading,
    methodsError,
    selectedMethod,
    onMethodSelect,
    gateway,
}) {
    const { clearCart } = useCart();
    const { isLoggedIn } = useAuth();
    const { currency, formatPrice } = useCurrency();
    const { setOrderCompleted, totals } = useCheckout();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);

    // Ref to hold the gateway-specific payment handler
    const paymentHandlerRef = useRef(null);

    const handleSuccess = (data) => {
        setOrderData(data);
        setSuccess(true);
        setOrderCompleted(true);
        clearCart();
    };

    const handleError = (message) => {
        setError(message);
        setLoading(false);
    };

    // Called when the gateway's checkout component is ready
    const handleGatewayReady = (handler) => {
        paymentHandlerRef.current = handler;
    };

    // Submit handler — delegates to the active gateway's payment handler
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!selectedMethod) {
            setError("Please select a payment method.");
            return;
        }

        if (!selectedMethod.publishableKey) {
            setError("This payment method is not properly configured.");
            return;
        }

        // For gateways with a handlePayment callback (e.g. Stripe)
        if (paymentHandlerRef.current) {
            setError(null);
            paymentHandlerRef.current();
        }
        // For gateways that manage their own submit (e.g. PayPal buttons), no action needed
    };

    if (success) {
        return (
            <OrderConfirmation
                orderData={orderData}
                formatPrice={formatPrice}
                isLoggedIn={isLoggedIn}
            />
        );
    }

    // Resolve the CheckoutComponent from the active gateway adapter
    const GatewayCheckout = gateway?.CheckoutComponent;

    return (
        <div className="flex flex-col gap-8 text-left">
            <RevealInAnimation direction="left">
                <nav className="flex items-center gap-3 text-sm font-medium font-default">
                    <span className="text-gray-400 cursor-default">Information</span>
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
                                <span className="text-gray-400 font-accent w-12 text-left">Contact</span>
                                <span className="text-primary">{formData.email}</span>
                            </div>
                            <button onClick={() => goToStep(0)} className="text-accent text-xs font-bold hover:underline">Change</button>
                        </div>
                        <div className="p-5 flex items-baseline justify-between gap-4 border-b border-divider">
                            <div className="flex gap-6">
                                <span className="text-gray-400 font-accent w-12 text-left">Ship to</span>
                                <span className="text-primary">
                                    {formData.address}, {formData.apartment ? `${formData.apartment}, ` : ''}{formData.city} {formData.zip}
                                </span>
                            </div>
                            <button onClick={() => goToStep(0)} className="text-accent text-xs font-bold hover:underline">Change</button>
                        </div>
                        <div className="p-5 flex items-baseline justify-between gap-4 border-divider">
                            <div className="flex gap-6">
                                <span className="text-gray-400 font-accent w-12 text-left">Shipping</span>
                                <span className="font-bold text-accent">Free</span>
                            </div>
                        </div>
                    </div>
                </FaderInAnimation>

                {/* Dynamic Payment Method Selector */}
                <FaderInAnimation direction="up" delay={0.2}>
                    <PaymentMethodSelector
                        paymentMethods={paymentMethods}
                        selectedMethod={selectedMethod?.name}
                        onSelect={onMethodSelect}
                        loading={methodsLoading}
                        error={methodsError}
                    />

                    {/* Gateway-specific checkout UI */}
                    {selectedMethod && gateway && (
                        <gateway.ProviderComponent
                            publishableKey={selectedMethod.publishableKey}
                            amount={totals.total}
                            currency={currency}
                        >
                            <RevealInAnimation direction="down">
                                {GatewayCheckout && (
                                    <GatewayCheckout
                                        formData={formData}
                                        updateFormData={updateFormData}
                                        buildGuestOrderPayload={buildGuestOrderPayload}
                                        cartItems={cartItems}
                                        currency={currency}
                                        onSuccess={handleSuccess}
                                        onError={handleError}
                                        loading={loading}
                                        setLoading={setLoading}
                                        onReady={handleGatewayReady}
                                        methodName={selectedMethod.displayName || selectedMethod.name}
                                    />
                                )}
                            </RevealInAnimation>
                        </gateway.ProviderComponent>
                    )}
                </FaderInAnimation>

                {/* Additional Information */}
                <FaderInAnimation direction="up" delay={0.3}>
                    <div className="space-y-6">
                        <div className="text-left">
                            <label className="text-sm font-medium ml-2 text-primary font-accent block mb-1.5">Order Notes (optional)</label>
                            <textarea
                                className="w-full p-4 rounded-xl border border-divider bg-white dark:bg-white/5 focus:border-accent focus:ring-1 focus:ring-accent transition-colors min-h-[100px] font-default"
                                placeholder="Special instructions for delivery..."
                                value={formData.orderNotes || ""}
                                onChange={(e) => updateFormData({ orderNotes: e.target.value })}
                            />
                        </div>
                        {/* 
                        <div className="bg-secondary/50 rounded-xl p-4 flex items-start gap-3 mt-4 text-left">
                            <HiLockClosed className="text-primary dark:text-accent text-xl mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 text-left">Security Guarantee</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug font-accent text-left">Your data is protected with 256-bit encryption. We do not store your full card details.</p>
                            </div>
                        </div> */}

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
                            Return to Information
                        </button>

                        <Button
                            onClick={handleSubmit}
                            loading={loading}
                            disabled={loading}
                            className="w-full sm:w-auto h-14 bg-accent! hover:bg-accent! text-white! font-bold text-lg rounded-full! shadow-lg shadow-accent/10 px-10"
                        >
                            Complete Order
                        </Button>
                    </div>
                </FaderInAnimation>
            </div>
        </div>
    );
}
