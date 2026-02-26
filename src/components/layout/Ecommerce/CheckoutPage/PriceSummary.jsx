export default function PriceSummary({ subtotal, tax, total }) {
    return (
        <div className="space-y-3 pb-6 border-b border-[#e7e0cf]/50 text-sm text-[#1b170d]">
            <div className="flex justify-between">
                <span className="text-[#9a824c]/90 font-serif">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
                <span className="text-[#9a824c]/90 font-serif">Shipping</span>
                <span className="text-xs text-[#9a824c] font-serif italic italic">Calculated at next step</span>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-[#9a824c]/90 flex items-center gap-1 font-serif">
                    Estimated taxes
                    <svg className="size-4 opacity-50 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                </span>
                <span className="font-medium">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-baseline mt-6 mb-8 pt-4 border-t border-[#e7e0cf]/50">
                <span className="text-[#1b170d] text-lg font-bold">Total</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-[#9a824c] text-xs uppercase tracking-wide">USD</span>
                    <span className="text-[#1b170d] text-2xl font-bold tracking-tight">${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
