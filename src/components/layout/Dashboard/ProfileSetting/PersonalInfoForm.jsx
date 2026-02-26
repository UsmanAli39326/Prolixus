"use client";
import React from "react";
import Input from "@/components/ui/Input";
import { MdEmail, MdPhone, MdPerson } from "react-icons/md";

export default function PersonalInfoForm() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
                <h3 className="text-xl font-accent font-bold text-primary mb-2">
                    Personal Information
                </h3>
                <p className="text-base text-text/70">
                    Update your name and contact details here.
                </p>
            </div>

            <Input
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                defaultValue="Isabelle"
                required
                autoComplete="given-name"
                icon={<MdPerson />}
            />

            <Input
                id="lastName"
                name="lastName"
                label="Last Name"
                inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                placeholder="Enter your last name"
                defaultValue="V."
                required
                autoComplete="family-name"
                icon={<MdPerson />}
            />

            <Input
                id="email"
                name="email"
                label="Email Address"
                type="email"
                inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                placeholder="your@email.com"
                defaultValue="isabelle.v@example.com"
                required
                autoComplete="email"
                icon={<MdEmail />}
            />

            <Input
                id="phone"
                name="phone"
                label="Phone Number"
                type="tel"
                inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary "
                placeholder="+1 (555) 000-0000"
                defaultValue="+1 (555) 123-4567"
                autoComplete="tel"
                icon={<MdPhone className="text-text/70 text-" />}
            />
        </div>
    );
}