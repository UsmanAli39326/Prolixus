"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/layout/Dashboard/DashboardHeader";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

import ProfileAvatar from "@/components/layout/Dashboard/ProfileSetting/ProfileAvatar";
import PersonalInfoForm from "@/components/layout/Dashboard/ProfileSetting/PersonalInfoForm";
import SecurityForm from "@/components/layout/Dashboard/ProfileSetting/SecurityForm";
import AddressBook from "@/components/layout/Dashboard/ProfileSetting/AddressBook";
import ProfileActions from "@/components/layout/Dashboard/ProfileSetting/ProfileAction";

export default function ProfileSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            alert("Profile updated successfully!");
        }, 1500);
    };

    const handleAvatarChange = (file) => {
        const imageUrl = URL.createObjectURL(file);
        setAvatar(imageUrl);
    };

    const handleAvatarRemove = () => {
        setAvatar(null);
    };

    return (
        <div className="flex flex-col gap-8 pb-10">
            <RevealInAnimation direction="up">
                <DashboardHeader
                    title="Profile Settings"
                    subtitle="Manage your account information and security preferences"
                />
            </RevealInAnimation>

            <div className="flex flex-col gap-10">
                <FaderInAnimation direction="up" delay={0.2}>
                    <ProfileAvatar
                        image={avatar}
                        onChange={handleAvatarChange}
                        onRemove={handleAvatarRemove}
                    />
                </FaderInAnimation>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <FaderInAnimation direction="up" delay={0.4}>
                        <PersonalInfoForm />
                    </FaderInAnimation>

                    <hr className="border-divider" />

                    <FaderInAnimation direction="up" delay={0.6}>
                        <SecurityForm />
                    </FaderInAnimation>

                    <hr className="border-divider" />

                    <FaderInAnimation direction="up" delay={0.7}>
                        <AddressBook />
                    </FaderInAnimation>

                    <hr className="border-divider" />

                    <FaderInAnimation direction="up" delay={0.8}>
                        <ProfileActions isLoading={isLoading} />
                    </FaderInAnimation>
                </form>
            </div>
        </div>
    );
}