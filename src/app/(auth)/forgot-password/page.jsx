"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { apiService } from "@/lib/api";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const value = email.trim();

        if (!value) {
            setError("Please enter your email address");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            await apiService.post("/Account/forgot-password", { email: value });

            // Store for OTP page   
            sessionStorage.setItem("reset_method", "email");
            sessionStorage.setItem("reset_value", value);

            router.push("/forgot-password/verify-otp");
        } catch (err) {
            setError(err.message || "Failed to send verification code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FaderInAnimation direction="up">
            <div className="flex items-center justify-center p-4 bg-secondary -mt-24 h-screen">
                <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-up">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

                        {/* LEFT: Image panel */}
                        <div className="relative hidden lg:block">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: "url('/images/bg.jpg')" }}
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/55 to-black/75" />

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

                            <div className="absolute bottom-7 left-7 right-7">
                                <div className="text-white text-2xl font-semibold leading-snug font-accent">
                                    "We'll help you get back into your account."
                                </div>
                                <div className="mt-3 text-white/80 text-sm">
                                    Prolixus Security • Account Recovery
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Form panel */}
                        <div className="flex items-center justify-center p-8 sm:p-12">
                            <div className="w-full max-w-md">

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
                                    Forgot <span className="text-accent">Password?</span>
                                </h1>
                                <p className="mt-2 text-center text-sm text-text">
                                    Enter your email to receive a verification code.
                                </p>

                                {error && (
                                    <p className="text-error text-sm text-center mt-4">{error}</p>
                                )}

                                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        label="Email Address"
                                        inputClassName={`
                                        w-full rounded-md border text-lg bg-white px-4 py-2 text-primary transition-all duration-200
                                        focus:border-accent focus:ring-2 focus:ring-accent/25 focus: focus:outline-none
                                        ${error ? "border-error" : "border-divider"}
                                        `}
                                        className="w-full"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        fullWidth
                                        loading={loading}
                                        loadingText="Sending code..."
                                        className="mt-2"
                                    >
                                        Send Verification Code
                                    </Button>

                                    <p className="text-center text-sm text-text pt-2">
                                        Remember your password?{" "}
                                        <Link href="/login" className="font-medium text-primary hover:underline">
                                            Sign in
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
