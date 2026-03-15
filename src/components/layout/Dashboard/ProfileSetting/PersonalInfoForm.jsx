"use client";
import React from "react";
import Input from "@/components/ui/Input";
import { FaUser, FaPhone, FaEnvelope, FaBuilding, FaMapMarkerAlt, FaGlobe, FaCity, FaRoad } from "react-icons/fa";

export default function PersonalInfoForm({ formData = {}, onChange, isLoading, countries = [], isLoadingCountries = false }) {
    const inputClass =
        "w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section header */}
            <div className="md:col-span-2">
                <h3 className="text-xl font-accent font-bold text-primary mb-2">
                    Personal Information
                </h3>
                <p className="text-base text-text/70">
                    Update your name and contact details here.
                </p>
            </div>

            {/* Full Name */}
            <Input
                id="name"
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                inputClassName={inputClass}
                value={formData.name ?? ""}
                onChange={onChange}
                disabled={isLoading}
                required
                autoComplete="name"
                icon={<FaUser />}
            />

            {/* Email Address */}
            <Input
                id="email"
                name="email"
                label="Email Address"
                type="email"
                placeholder="email@example.com"
                inputClassName={inputClass}
                value={formData.email ?? ""}
                disabled={true}
                readOnly
                icon={<FaEnvelope />}
            />

            {/* Phone Number */}
            <Input
                id="mobile"
                name="mobile"
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                inputClassName={inputClass}
                value={formData.mobile ?? ""}
                onChange={onChange}
                disabled={isLoading}
                autoComplete="tel"
                icon={<FaPhone />}
            />

            {/* VAT Number */}
            <Input
                id="vatNumber"
                name="vatNumber"
                label="VAT Number"
                placeholder="VAT Number"
                inputClassName={inputClass}
                value={formData.vatNumber ?? ""}
                onChange={onChange}
                disabled={isLoading}
                icon={<FaBuilding />}
            />

            {/* Shipping Post Code */}
            <Input
                id="shippingPostCode"
                name="shippingPostCode"
                label="Shipping Post Code"
                placeholder="Post Code"
                inputClassName={inputClass}
                value={formData.shippingPostCode ?? ""}
                onChange={onChange}
                disabled={isLoading}
                icon={<FaMapMarkerAlt />}
            />

            {/* Shipping Country */}
            <div className="input-field">
                <label htmlFor="shippingCountryId" className="input-label">
                    Shipping Country
                </label>
                <div className={`flex justify-center items-center input-wrapper ${isLoading || isLoadingCountries ? "input-disabled" : ""}`}>
                    <span className="input-icon left">
                        <FaGlobe />
                    </span>
                    <select
                        id="shippingCountryId"
                        name="shippingCountryId"
                        className={`input-element ${inputClass} appearance-none bg-transparent`}
                        value={formData.shippingCountryId ?? ""}
                        onChange={onChange}
                        disabled={isLoading || isLoadingCountries}
                    >
                        {isLoadingCountries ? (
                            <option disabled value="">Loading countries...</option>
                        ) : (
                            <>
                                <option disabled value="">Select a country</option>
                                {countries.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            </div>

            {/* Shipping City */}
            <Input
                id="shippingCity"
                name="shippingCity"
                label="Shipping City"
                placeholder="City"
                inputClassName={inputClass}
                value={formData.shippingCity ?? ""}
                onChange={onChange}
                disabled={isLoading}
                icon={<FaCity />}
            />

            {/* Shipping Street */}
            <Input
                id="shippingStreet"
                name="shippingStreet"
                label="Shipping Street"
                placeholder="Street Address"
                inputClassName={inputClass}
                value={formData.shippingStreet ?? ""}
                onChange={onChange}
                disabled={isLoading}
                icon={<FaRoad />}
            />
        </div>
    );
}