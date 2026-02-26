"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function DiscountCode() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleApply = async () => {
        if (!code.trim()) return;

        try {
            setLoading(true);

            // simulate api call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Applied discount:", code);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-3 mb-8 pt-6 border-t border-[#e7e0cf]/50">
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder="Discount code or gift card"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-12 px-4 bg-white border border-[#e7e0cf] rounded-xl focus:border-[#ecad18] focus:ring-1 focus:ring-[#ecad18] outline-none text-sm transition-all placeholder:text-[#9a824c]/60"
                />
            </div>

            <button
                onClick={handleApply}
                disabled={!code.trim() || loading}
                className="bg-[#9a824c]/20 hover:bg-[#9a824c]/30 text-[#1b170d]/70 hover:text-[#1b170d] disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm px-5 h-12 rounded-xl transition-colors active:scale-95"
            >
                {loading ? "..." : "Apply"}
            </button>
        </div>
    );
}
