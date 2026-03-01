"use client";

import { useState } from "react";
import useCart from "@/Hooks/useCart";
import CheckoutForm from "./CheckoutForm";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";

// ---------------------------------------------------------------------------
// PAYLOAD BUILDER
// Pure function — no React dependency, easy to unit-test independently.
// Converts the cart state + checkout formData into the exact guest-order
// payload required by the backend API contract.
// ---------------------------------------------------------------------------
export function buildGuestOrderPayload(formData, cartItems) {
    // Helper: round a number to 2 decimal places
    const r = (n) => parseFloat((n ?? 0).toFixed(2));

    // ── orderDetails ────────────────────────────────────────────────────────
    const vatPercentage = 19;

    const orderDetails = cartItems.map((item) => ({
        itemId: item.id,
        quantity: item.quantity,
        unitPrice: r(item.price),
        vatPercentage,
        vatAmount: r(item.price * item.quantity * (vatPercentage / 100)),
        promotionPrice: r(item.price),   // same as unitPrice when no promotion
        discount: 0,
        totalNetPrice: r(item.price * item.quantity),
    }));

    // ── Financial totals ────────────────────────────────────────────────────
    const totalNetAmount = r(orderDetails.reduce((s, d) => s + d.totalNetPrice, 0));
    const totalVatAmount = r(orderDetails.reduce((s, d) => s + d.vatAmount, 0));
    const shippingChargesAmount = 0;
    const shippingChargesPercentage = 0;
    const servicesChargesAmount = 0;
    const servicesChargesPercentage = 0;
    const discountAmount = 0;

    // grossAmount = totalNetAmount + totalVatAmount + shipping + services - discount
    const grossAmount = r(
        totalNetAmount +
        totalVatAmount +
        shippingChargesAmount +
        servicesChargesAmount -
        discountAmount
    );

    // ── Guest customer string ───────────────────────────────────────────────
    const guestCustomerInfo = `${formData.fullName}, ${formData.email}, ${formData.phone}`;

    // ── Final payload ───────────────────────────────────────────────────────
    return {
        shopId: 1,
        guestCustomerInfo,
        orderDetails,                                   // always a proper array
        couponCode: formData.couponCode?.trim() || null,
        paymentMethod: formData.paymentMethod || "Cash",
        paymentToken: formData.paymentToken ?? null,
        grossAmount,
        totalNetAmount,
        discountAmount,
        totalVatAmount,
        vatPercentage,
        shippingChargesAmount,
        shippingChargesPercentage,
        servicesChargesAmount,
        servicesChargesPercentage,
        currency: "USD",
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
    const [currentStep, setCurrentStep] = useState(0);

    // 1. CENTRALISED FORM STATE — covers all three wizard steps
    const [formData, setFormData] = useState({
        // Contact
        email: "",
        fullName: "",
        phone: "",

        // Shipping address
        address: "",
        apartment: "",
        city: "",
        zip: "",
        countryId: 1,

        // Payment & metadata
        paymentMethod: "Cash",
        paymentToken: null,
        couponCode: "",
        orderNotes: "",

        // Optional extras
        affiliateCustomerCode: "",
    });

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 2));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
    const goToStep = (step) => setCurrentStep(step);

    const updateFormData = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    const steps = [
        { name: "Information", component: CheckoutForm },
        { name: "Shipping", component: ShippingForm },
        { name: "Payment", component: PaymentForm },
    ];

    const CurrentFormComponent = steps[currentStep].component;

    return (
        <CurrentFormComponent
            nextStep={nextStep}
            prevStep={prevStep}
            goToStep={goToStep}
            currentStep={currentStep}
            formData={formData}
            updateFormData={updateFormData}
            // Pass builder + raw cart items so PaymentForm can compose
            // the final payload at submission time (has access to latest state)
            buildGuestOrderPayload={buildGuestOrderPayload}
            cartItems={cartItems}
        />
    );
}
