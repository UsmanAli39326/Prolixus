"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import useCart from "@/Hooks/useCart";
import usePaymentMethods from "@/Hooks/usePaymentMethods";
import CheckoutForm from "./CheckoutForm";
import PaymentForm from "./PaymentForm";
import { useCurrency } from "@/context/CurrencyContext";
import { useCheckout } from "@/context/CheckoutContext";
import { getAdapter } from "@/lib/payment/gatewayRegistry";

// ---------------------------------------------------------------------------
// PAYLOAD BUILDER
// Pure function — no React dependency, easy to unit-test independently.
// Converts the cart state + checkout formData into the exact guest-order
// payload required by the backend API contract.
// ---------------------------------------------------------------------------
export function buildGuestOrderPayload(formData, cartItems, currency = "EURO", totals = {}, user = null) {
    // Helper: round a number to 2 decimal places
    const r = (n) => parseFloat((n ?? 0).toFixed(2));

    // ── orderDetails ────────────────────────────────────────────────────────
    const vatPercentage = totals.vatPercentage || 0;

    const orderDetails = cartItems.map((item) => {
        // Normalize: if value >= 1 it's already a %, otherwise convert decimal to %
        const rawVat = item.vatPercentage ?? 0;
        const vatDecimal = rawVat >= 1 ? rawVat / 100 : rawVat;
        const itemVatPct = vatDecimal * 100;
        return {
            itemId: item.id,
            quantity: item.quantity,
            unitPrice: r(item.price),
            vatPercentage: r(itemVatPct),
            vatAmount: r(item.price * item.quantity * vatDecimal),
            promotionPrice: r(item.price),   // same as unitPrice when no promotion
            discount: 0,
            totalNetPrice: r(item.price * item.quantity),
        };
    });

    // ── Guest customer string ───────────────────────────────────────────────
    // If we have a user.id, we send customerId instead of guestCustomerInfo
    const customerId = user?.id || null;
    const guestCustomerInfo = customerId ? null : `${formData.fullName}, ${formData.email}, ${formData.phone}`;

    // ── Final payload ───────────────────────────────────────────────────────
    return {
        shopId: 1,
        customerId,
        guestCustomerInfo,
        orderDetails,                                   // always a proper array
        couponCode: formData.couponCode?.trim() || null,
        paymentMethod: formData.paymentMethod || "Cash",
        paymentToken: formData.paymentToken ?? null,
        grossAmount: totals.total,
        totalNetAmount: totals.subtotal,
        discountAmount: totals.discountAmount || 0,
        totalVatAmount: totals.vatAmount,
        vatPercentage,
        shippingChargesAmount: totals.shipping,
        shippingChargesPercentage: 0,
        servicesChargesAmount: 0,
        servicesChargesPercentage: 0,
        currency,
        invoiceNumber: "",                              // default empty string
        description: formData.orderNotes || "",
        deliveryPostCode: formData.zip || "",
        deliveryCity: formData.city || "",
        deliveryStreet: formData.address || "",
        deliveryCountryId: parseInt(formData.countryId) || 1,
        addMoreAddress: formData.apartment || "",
        affiliateCustomerCode: formData.affiliateCustomerCode || "",
    };
}

// ---------------------------------------------------------------------------
// WIZARD
// ---------------------------------------------------------------------------
export default function CheckoutWizard() {
    const { cartItems } = useCart();
    const { currency } = useCurrency();
    const { formData, updateFormData, totals, user, isAuthenticated } = useCheckout();
    const [currentStep, setCurrentStep] = useState(0);

    // Fetch payment methods from the API (sanitized, active-only)
    const {
        paymentMethods,
        loading: methodsLoading,
        error: methodsError,
    } = usePaymentMethods();

    // Track selected payment method object (contains publishableKey)
    const [selectedMethod, setSelectedMethod] = useState(null);

    // When methods load, auto-select the first one if none selected
    const hasAutoSelected = useRef(false);
    useEffect(() => {
        if (!hasAutoSelected.current && paymentMethods.length > 0 && !selectedMethod) {
            const defaultMethod = paymentMethods[0];
            setSelectedMethod(defaultMethod);
            updateFormData({ paymentMethod: defaultMethod.name });
            hasAutoSelected.current = true;
        }
    }, [paymentMethods, selectedMethod, updateFormData]);

    const handleMethodSelect = useCallback(
        (method) => {
            setSelectedMethod(method);
            updateFormData({ paymentMethod: method.name });
        },
        [updateFormData]
    );

    // Get the gateway adapter for the selected method
    const gateway = useMemo(() => {
        return getAdapter(selectedMethod?.name);
    }, [selectedMethod]);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
    const goToStep = (step) => setCurrentStep(step);

    const steps = [
        { name: "Information", component: CheckoutForm },
        { name: "Payment", component: PaymentForm },
    ];

    const CurrentFormComponent = steps[currentStep].component;

    const formProps = {
        nextStep,
        prevStep,
        goToStep,
        currentStep,
        formData,
        updateFormData,
        buildGuestOrderPayload: (fd, ci, c) => buildGuestOrderPayload(fd, ci, c, totals, user),
        cartItems,
        user,
        isAuthenticated,
        // New payment-specific props
        paymentMethods,
        methodsLoading,
        methodsError,
        selectedMethod,
        onMethodSelect: handleMethodSelect,
        gateway,
    };

    // On the payment step, wrap with the selected gateway's ProviderComponent
    if (currentStep === 1 && gateway) {
        const GatewayProvider = gateway.ProviderComponent;
        return (
            <GatewayProvider
                publishableKey={selectedMethod?.publishableKey}
                currency={currency}
            >
                <CurrentFormComponent {...formProps} />
            </GatewayProvider>
        );
    }

    return <CurrentFormComponent {...formProps} />;
}
