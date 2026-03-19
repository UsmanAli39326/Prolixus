"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { getCountries } from "@/app/api/products/countries";

export default function CheckoutForm({ nextStep, goToStep, formData, updateFormData, isAuthenticated, total, onDirectComplete, isSubmitting }) {
    const [errors, setErrors] = useState({});

    const inputStyles = {
        labelClassName: "text-sm font-medium ml-2 text-primary font-accent",
        inputClassName: "w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-white/5 focus:border-accent focus:ring-1 focus:ring-accent transition-colors font-default"
    };

    const [countries, setCountries] = useState([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getCountries();
                setCountries(data);
            } catch (error) {
                console.error("Failed to fetch countries:", error);
            } finally {
                setIsLoadingCountries(false);
            }
        };
        fetchCountries();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.fullName) newErrors.fullName = "Full name is required";
        if (!formData.phone) newErrors.phone = "Phone is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.zip) newErrors.zip = "Post code is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            if (total === 0) {
                onDirectComplete();
            } else {
                nextStep();
            }
        }
    };

    // INPUT HANDLERS: Generic change handler that maps directly to the global checkout state.
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        updateFormData({ [name]: type === 'checkbox' ? checked : value });
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <RevealInAnimation direction="left">
                <nav className="flex items-center gap-3 text-sm font-medium font-default">
                    <span className="text-primary font-bold">Information</span>
                    <div className="text-gray-400">
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                    <span className="text-gray-400 cursor-default">Payment</span>
                </nav>
            </RevealInAnimation>

            <div className="space-y-10">
                {/* Contact Section */}
                <FaderInAnimation direction="up" delay={0.1}>
                    <div className="space-y-6">
                        <div className="flex items-baseline justify-between">
                            <h2 className="text-2xl font-bold tracking-tight text-primary">Contact Information</h2>
                            {!isAuthenticated && (
                                <span className="text-sm font-accent text-gray-500">
                                    Have an account? <Link href="/login?redirect=/checkout" className="text-accent font-bold hover:underline hover:cursor-pointer">Log in</Link>
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div className="md:col-span-2">
                                <Input
                                    label="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    placeholder="you@example.com"
                                    type="email"
                                    className="space-y-1.5"
                                    required
                                    {...inputStyles}
                                />
                            </div>
                            <Input
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                error={errors.fullName}
                                placeholder="e.g. Jane Doe"
                                className="space-y-1.5"
                                required
                                {...inputStyles}
                            />
                            <Input
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                error={errors.phone}
                                placeholder="+1 (555) 000-0000"
                                className="space-y-1.5"
                                required
                                {...inputStyles}
                            />
                        </div>
                    </div>
                </FaderInAnimation>

                {/* Shipping Address */}
                <FaderInAnimation direction="up" delay={0.2}>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight text-primary">Shipping Address</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div className="md:col-span-2">
                                <Input
                                    label="Street Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    error={errors.address}
                                    placeholder="Street name and number"
                                    className="space-y-1.5"
                                    required
                                    {...inputStyles}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Input
                                    label="Apartment, suite, etc. (optional)"
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleChange}
                                    className="space-y-1.5"
                                    {...inputStyles}
                                />
                            </div>
                            <Input
                                label="ZIP / Post Code"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                error={errors.zip}
                                className="space-y-1.5"
                                required
                                {...inputStyles}
                            />
                            <Input
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                error={errors.city}
                                className="space-y-1.5"
                                required
                                {...inputStyles}
                            />
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium ml-2 text-primary font-accent block mb-1.5">Country</label>
                                <select
                                    name="countryId"
                                    className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-white/5 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                                    value={formData.countryId}
                                    onChange={handleChange}
                                >
                                    {isLoadingCountries ? (
                                        <option disabled>Loading countries...</option>
                                    ) : (
                                        countries.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                </FaderInAnimation>

                {/* Actions */}
                <FaderInAnimation direction="up" delay={0.3}>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100 dark:border-white/10">
                        <Link
                            href="/cart"
                            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-accent transition-colors group"
                        >
                            <HiChevronLeft className="text-lg transition-transform group-hover:-translate-x-1" />
                            Return to cart
                        </Link>

                        <Button
                            onClick={handleNext}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto h-14 bg-accent! hover:bg-accent! text-white! font-bold text-lg rounded-full! shadow-lg shadow-accent/10 px-10"
                        >
                            {total === 0 ? "Complete Order" : "Continue to Payment"}
                        </Button>
                    </div>
                </FaderInAnimation>
            </div>
        </div>
    );
}
