"use client";

import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import Input from "@/components/ui/Input";
import StripeInput from "@/components/ui/StripeInput";
import { apiService } from "@/lib/api";
import { FaCreditCard, FaQuestionCircle } from "react-icons/fa";

// ─── Provider ────────────────────────────────────────────────────────────────
function StripeGatewayProvider({ publishableKey, amount, currency, children }) {
    const stripePromise = useMemo(() => {
        if (!publishableKey) return null;
        return loadStripe(publishableKey);
    }, [publishableKey]);

    useEffect(() => {
        // Provider just needs to initialize Stripe.
        // We defer PaymentIntent creation to the checkout component 
        // to avoid duplicate API calls and complex prop drilling.
    }, []);

    if (!stripePromise) {
        return <p className="text-red-500 text-sm">Stripe not initialized</p>;
    }

    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    );
}


// ─── Checkout Form ───────────────────────────────────────────────────────────
function StripeCheckoutForm({
    formData,
    setFormData,
    buildGuestOrderPayload,
    cartItems,
    currency,
    onSuccess,
    onError,
    loading,
    setLoading,
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [cardholderName, setCardholderName] = useState("");
    const [clientSecret, setClientSecret] = useState(null);
    const stripeStyles = {
        style: {
            base: {
                fontSize: "16px",
                color: "#2C2C2C", // var(--text-color)
                fontFamily: "inherit",
                "::placeholder": {
                    color: "#9CA3AF", // gray-400
                },
            },
            invalid: {
                color: "#ef4444", // red-500
            },
        },
    };

    // 🔁 Create PaymentIntent HERE for split elements flow
    useEffect(() => {
        if (clientSecret) return;

        const createIntent = async () => {
            try {
                const payload = buildGuestOrderPayload(formData, cartItems, currency);

                const res = await fetch("/api/stripe/create-payment-intent", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount: payload.grossAmount,
                        currency: payload.currency || "eur",
                    }),
                });

                const data = await res.json();

                if (!data.clientSecret) {
                    console.error("Stripe error:", data);
                    return;
                }

                setClientSecret(data.clientSecret);
            } catch (err) {
                console.error(err);
            }
        };

        createIntent();
    }, [clientSecret, formData, cartItems, currency, buildGuestOrderPayload]);

    const handlePayment = async () => {
        if (!stripe || !elements || !clientSecret) {
            onError("Stripe not ready");
            return;
        }

        setLoading(true);

        try {
            const cardNumber = elements.getElement(CardNumberElement);

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardNumber,
                    billing_details: {
                        name: cardholderName,   // ✅ use local state
                        email: formData.email,  // optional
                    },
                },
            });

            if (result.error) {
                onError(result.error.message);
                setLoading(false);
                return;
            }

            if (result.paymentIntent.status === "succeeded") {
                const payload = buildGuestOrderPayload(
                    formData,
                    cartItems,
                    currency
                );

                payload.paymentToken = result.paymentIntent.id;
                payload.paymentMethod = "Stripe";

                const response = await apiService.post(
                    "/Checkout/create-order",
                    payload
                );

                if (response.success) {
                    onSuccess(response.data);
                } else {
                    onError(response.message);
                }
            }
        } catch (err) {
            console.error(err);
            onError("Payment failed");
        }

        setLoading(false);
    };

    return {
        handlePayment,
        ui: (
            <div className="bg-white mt-7 dark:bg-white/5 border border-divider rounded-2xl p-6 mb-8 space-y-5 relative">
                
                {/* Loader Overlay */}
                {!clientSecret && (
                    <div className="absolute inset-0 z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center">
                        <div className="flex gap-1.5 items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                        <p className="text-sm mt-3 font-medium text-text/70">Connecting to secure server...</p>
                    </div>
                )}

                <p className="text-lg font-bold text-primary">Card Payment</p>

                {/* Cardholder Name */}
                <Input
                    type="text"
                    label="Cardholder Name"
                    placeholder="John Doe"
                    inputClassName="w-full p-3.5"
                    className="w-full"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                />

                {/* Card Number */}
                <StripeInput
                    label="Card Number"
                    element={CardNumberElement}
                    icon={<FaCreditCard size={18} />}
                    className="w-full mt-1"
                    inputClassName="w-full p-3.5"
                    options={stripeStyles}
                />

                {/* Expiry + CVC */}
                <div className="flex flex-col sm:flex-row gap-5 mt-1">
                    <StripeInput
                        label="Expiry Date"
                        element={CardExpiryElement}
                        className="flex-1"
                        inputClassName="w-full p-3.5"
                        options={stripeStyles}
                    />

                    <StripeInput
                        label="CVC"
                        element={CardCvcElement}
                        rightIcon={<FaQuestionCircle size={18} className="text-gray-400" />}
                        className="flex-1"
                        inputClassName="w-full p-3.5"
                        options={stripeStyles}
                    />
                </div>
            </div>
        ),
    };
}


// ─── Wrapper ─────────────────────────────────────────────────────────────────
function StripeCheckoutComponent(props) {
    const { handlePayment, ui } = StripeCheckoutForm(props);

    useEffect(() => {
        if (props.onReady) {
            props.onReady(handlePayment);
        }
    }, [handlePayment]);

    return ui;
}


// ─── Export Adapter ──────────────────────────────────────────────────────────
const stripeGateway = {
    name: "Stripe",
    ProviderComponent: StripeGatewayProvider,
    CheckoutComponent: StripeCheckoutComponent,
};

export default stripeGateway;