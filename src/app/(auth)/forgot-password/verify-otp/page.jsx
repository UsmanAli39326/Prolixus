"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function VerifyOTPPage() {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState("");
    const inputRefs = useRef([]);

    useEffect(() => {
        // Get method and value from session storage
        const method = sessionStorage.getItem("reset_method");
        const value = sessionStorage.getItem("reset_value");

        if (!method || !value) {
            setDeliveryInfo("Enter the 6-digit code we sent you.");
            return;
        }

        const label = method === "phone" ? "phone number" : "email";

        // Mask the value for privacy
        let masked = value;
        if (method === "email") {
            const parts = value.split("@");
            if (parts.length === 2) {
                const name = parts[0];
                const domain = parts[1];
                const safeName = name.length <= 2 ? name[0] + "*" : name.slice(0, 2) + "***";
                masked = `${safeName}@${domain}`;
            }
        } else {
            const digits = value.replace(/\s+/g, "");
            masked = digits.length > 4 ? `***${digits.slice(-3)}` : digits;
        }

        setDeliveryInfo(`Enter the 6-digit code sent to your ${label}: ${masked}`);
    }, []);

    const handleChange = (index, value) => {
        // Only allow digits
        const digit = value.replace(/[^0-9]/g, "");

        if (digit.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = digit;
            setOtp(newOtp);

            // Auto-focus next input
            if (digit && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        // Backspace moves to previous input
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        const digits = text.replace(/\D/g, "").slice(0, 6);

        if (digits) {
            const newOtp = [...otp];
            digits.split("").forEach((ch, i) => {
                if (i < 6) newOtp[i] = ch;
            });
            setOtp(newOtp);

            // Focus the last filled input
            const lastIndex = Math.min(digits.length - 1, 5);
            inputRefs.current[lastIndex]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            setError("Please enter the 6-digit OTP code.");
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push("/forgot-password/reset-password");
        }, 1000);
    };

    const handleResend = () => {
        // Simulate resend
        alert("OTP resent! (Demo - connect backend here)");
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
                                    "Verify your one-time code to continue."
                                </div>
                                <div className="mt-3 text-white/80 text-sm">
                                    This helps keep your account secure.
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: OTP Form panel */}
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

                                <Link href="/forgot-password" className="flex justify-end w-full">
                                    <Button variant="ghost">Change Method</Button>
                                </Link>

                                <h1 className="text-3xl font-bold font-accent text-center text-primary">
                                    Verify <span className="text-accent">OTP</span>
                                </h1>
                                <p className="mt-2 text-center text-sm text-text">
                                    {deliveryInfo}
                                </p>

                                {error && (
                                    <p className="text-error text-sm text-center mt-4">{error}</p>
                                )}

                                <form onSubmit={handleSubmit} className="mt-8">
                                    {/* OTP Inputs */}
                                    <div className="flex items-center justify-center gap-3">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (inputRefs.current[index] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={handlePaste}
                                                className={`
                          w-12 h-14 sm:w-14 sm:h-16 rounded-xl border text-center text-lg font-semibold
                          bg-white text-primary transition-all duration-200
                          focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none
                          ${error ? "border-error" : "border-divider"}
                        `}
                                            />
                                        ))}
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        fullWidth
                                        loading={loading}
                                        loadingText="Verifying..."
                                        className="mt-8"
                                    >
                                        Verify & Continue
                                    </Button>

                                    <div className="mt-4 text-center text-sm text-text">
                                        Didn't receive code?{" "}
                                        <button
                                            type="button"
                                            onClick={handleResend}
                                            className="font-medium text-accent hover:underline"
                                        >
                                            Resend
                                        </button>
                                    </div>

                                    <p className="text-center text-sm text-text pt-3">
                                        <Link href="/forgot-password" className="font-medium text-accent hover:underline">
                                            Change method
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
