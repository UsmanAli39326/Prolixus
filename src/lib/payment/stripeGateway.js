"use client";

import { useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { apiService } from "@/lib/api";

// ─── Provider ─────────────────────────────────────────────────────────────────
function StripeGatewayProvider({ publishableKey, children }) {
    const stripePromise = useMemo(() => {
        if (!publishableKey) return null;
        return loadStripe(publishableKey);
    }, [publishableKey]);

    if (!stripePromise) {
        return <p className="text-red-500 text-sm">Stripe configuration is missing.</p>;
    }

    return <Elements stripe={stripePromise}>{children}</Elements>;
}

// ─── Checkout Form ────────────────────────────────────────────────────────────
function StripeCheckoutForm({
    formData,
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

    const handleStripePayment = async () => {
        if (!stripe || !elements) {
            onError("Stripe has not loaded yet. Please wait a moment.");
            return;
        }

        setLoading(true);

        try {
            const payload = buildGuestOrderPayload(formData, cartItems, currency);

            // Create a PaymentIntent server-side
            const res = await fetch("/api/stripe/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: payload.grossAmount,
                    currency: payload.currency || "eur",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                onError(data.error || "Payment initialization failed.");
                setLoading(false);
                return;
            }

            // Confirm the card payment
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email: formData.email,
                        name: formData.fullName,
                    },
                },
            });

            if (result.error) {
                onError(result.error.message);
                setLoading(false);
                return;
            }

            if (result.paymentIntent.status === "succeeded") {
                payload.paymentToken = result.paymentIntent.id;
                payload.paymentMethod = "Stripe";

                const response = await apiService.post("/Checkout/create-order", payload);

                if (response.success) {
                    onSuccess(response.data);
                } else {
                    onError(response.message || "Order creation failed.");
                }
            }
        } catch (err) {
            console.error("Stripe payment error:", err);
            onError("Payment failed. Please try again.");
        }

        setLoading(false);
    };

    return {
        handlePayment: handleStripePayment,
        ui: (
            <div className="bg-surface border border-divider rounded-2xl p-6 my-6 text-left">
                <p className="text-primary font-bold mb-4">Card Details</p>
                <div className="p-4 border rounded-xl bg-white">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#32325d",
                                },
                            },
                        }}
                    />
                </div>
            </div>
        ),
    };
}

// Wrapper component to use hooks and pass down
function StripeCheckoutComponent(props) {
    const { handlePayment, ui } = StripeCheckoutForm(props);

    // Expose handlePayment to parent via a ref-like callback
    if (props.onReady) {
        props.onReady(handlePayment);
    }

    return ui;
}

// ─── Adapter Export ───────────────────────────────────────────────────────────
const stripeGateway = {
    name: "Stripe",
    ProviderComponent: StripeGatewayProvider,
    CheckoutComponent: StripeCheckoutComponent,
};

export default stripeGateway;
