"use client";
import React from "react";
import Input from "@/components/ui/Input";
import { MdLock } from "react-icons/md";

export default function SecurityForm() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-accent font-bold text-primary mb-2">
                        Security
                    </h3>
                    <p className="text-base text-text/70">
                        Ensure your account is using a long, random password to stay secure.
                    </p>
                </div>
                <button
                    type="button"
                    className="text-sm font-medium text-accent hover:underline"
                >
                    Forgot Password?
                </button>
            </div>

            <div className="md:col-span-2 md:w-1/2">
                <Input
                    id="currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    icon={<MdLock />}
                />
            </div>

            <Input
                id="newPassword"
                name="newPassword"
                label="New Password"
                inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                type="password"
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                icon={<MdLock />}
            />

            <Input
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm New Password"
                inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                type="password"
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                icon={<MdLock className="text-xl" />}
            />
        </div>
    );
}