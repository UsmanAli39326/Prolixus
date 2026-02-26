"use client";

import { useState } from "react";
import useCart from "@/Hooks/useCart";
import CheckoutForm from "./CheckoutForm";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";

export default function CheckoutWizard() {
    const { cartItems } = useCart();
    const [currentStep, setCurrentStep] = useState(0);
    // 1. STATE MANAGEMENT: Centralized state for the entire checkout lifecycle.
    // This allows easy payload construction in the final step.
    const [formData, setFormData] = useState({
        // Contact Information
        email: "",
        fullName: "",
        phone: "",

        // Shipping Address
        address: "",
        apartment: "",
        city: "",
        zip: "",
        countryId: 1, // Mapping to backend Country ID (default 1)

        // Payment & Metadata
        paymentMethod: "Cash",
        couponCode: "",
        orderNotes: "",
        paymentToken: null,
    });

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 2));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
    const goToStep = (step) => setCurrentStep(step);

    // Generic updater for shared form state
    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    // 2. FINANCIAL CALCULATIONS: Synced with backend expectations.
    // Ensure vatPercentage matches the shop's tax settings.
    const vatPercentage = 19;
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discountAmount = 0; // Hook for future promo-code backend validation
    const totalNetAmount = subtotal - discountAmount;
    const totalVatAmount = totalNetAmount * (vatPercentage / 100);
    const grossAmount = totalNetAmount + totalVatAmount;

    // 3. PAYLOAD MAPPING: Transforms cart items into 'orderDetails' array.
    // These fields are required for the /orders API endpoint.
    const orderDetails = cartItems.map(item => ({
        itemId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
        vatPercentage: vatPercentage,
        vatAmount: (item.price * item.quantity) * (vatPercentage / 100),
        promotionPrice: item.price,
        discount: 0,
        totalNetPrice: item.price * item.quantity
    }));

    // 4. ORDER SUMMARY: The core object sent to the backend.
    const orderSummary = {
        shopId: 1,
        orderDetails,
        grossAmount,
        totalNetAmount,
        discountAmount,
        totalVatAmount,
        vatPercentage,
        shippingChargesAmount: 0,
        shippingChargesPercentage: 0,
        servicesChargesAmount: 0,
        servicesChargesPercentage: 0,
        currency: "USD",
        invoiceNumber: `INV-${Date.now()}`,
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
            orderSummary={orderSummary}
        />
    );
}
