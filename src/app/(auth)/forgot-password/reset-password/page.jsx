"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!newPassword.trim() || !confirmPassword.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        // Clear session storage
        sessionStorage.removeItem("reset_method");
        sessionStorage.removeItem("reset_value");

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push("/login");
        }, 1000);
    };

    return (
        <FaderInAnimation direction="up">
            <div className="flex items-center justify-center p-4 bg-secondary -mt-24 h-screen">
                {/* Outer frame */}
                <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-up">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

                        {/* LEFT: Image panel */}
                        <div className="relative hidden lg:block">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: "url('/images/bg.jpg')" }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/55 to-black/75" />

                            {/* Top brand */}
                            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl border-2 border-dashed border-white/60 flex items-center justify-center bg-white/10">
                                        <span className="text-xs text-white/70">Logo</span>
                                    </div>
                                    <div className="leading-tight">
                                        <div className="text-white font-semibold tracking-wide">Prolixus</div>
                                        <div className="text-white/70 text-xs">Secure access portal</div>
                                    </div>
                                </div>
                            </div>

                            {/* Quote block */}
                            <div className="absolute bottom-7 left-7 right-7">
                                <div className="text-white text-2xl font-semibold leading-snug font-accent">
                                    "Secure your account with a new password."
                                </div>
                                <div className="mt-3 text-white/80 text-sm">
                                    Prolixus Security • Account Recovery
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Reset Password Form panel */}
                        <div className="flex items-center justify-center p-8 sm:p-12">
                            <div className="w-full max-w-md">

                                {/* Brand (for mobile) */}
                                <div className="lg:hidden mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-primary/35 flex items-center justify-center bg-primary/5">
                                            <span className="text-xs text-primary/65">Logo</span>
                                        </div>
                                        <div>
                                            <div className="font-accent text-2xl text-primary">Prolixus</div>
                                            <div className="text-sm text-text">Secure access portal</div>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/login" className="flex justify-end w-full">
                                    <Button variant="ghost">Back To Login</Button>
                                </Link>

                                <h1 className="text-3xl font-bold font-accent text-center text-primary">
                                    Set <span className="text-accent">New Password</span>
                                </h1>
                                <p className="mt-2 text-center text-sm text-text">
                                    Enter and confirm your new password below.
                                </p>

                                {error && (
                                    <p className="text-error text-sm text-center mt-4">{error}</p>
                                )}

                                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                                    <Input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        label="New Password"
                                        className="w-full"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />

                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        label="Confirm Password"
                                        className="w-full"
                                        placeholder="Re-enter new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        fullWidth
                                        loading={loading}
                                        loadingText="Updating password..."
                                        className="mt-2"
                                    >
                                        Update Password
                                    </Button>

                                    <p className="text-center text-sm text-text pt-2">
                                        <Link href="/login" className="font-medium text-accent hover:underline">
                                            Back to Login
                                        </Link>
                                    </p>
                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </FaderInAnimation>
    );
}
