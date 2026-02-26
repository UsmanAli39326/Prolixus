"use client";
import OrderItem from "./OrderItem";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import useCart from "@/Hooks/useCart";

export default function OrderSummary() {
    const { cartItems } = useCart();

    // SYNCED CALCULATIONS: This logic must match CheckoutWizard.jsx and the backend payload requirements.
    const vatPercentage = 19;
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = 0; // Initialize for future coupon logic
    const totalNetAmount = subtotal - discountAmount;
    const totalVatAmount = totalNetAmount * (vatPercentage / 100);
    const total = totalNetAmount + totalVatAmount;

    return (
        <aside className="lg:col-span-12 xl:col-span-5 relative">
            <div className="sticky top-28 bg-surface rounded-4xl p-6 lg:p-8 shadow-xl shadow-divider/50 border border-divider">
                <RevealInAnimation direction="bottom">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-divider">
                        <h3 className="text-xl font-bold text-primary">Order Summary</h3>
                        <span className="text-sm text-gray-400 font-serif">{cartItems.length} items</span>
                    </div>
                </RevealInAnimation>

                {/* Items */}
                <FaderInAnimation direction="up" delay={0.1}>
                    <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <OrderItem key={item.id} item={item} />
                            ))
                        ) : (
                            <p className="text-gray-500 py-8 italic font-serif text-left">Your cart is empty</p>
                        )}
                    </div>
                </FaderInAnimation>

                {/* Price Calculation */}
                <FaderInAnimation direction="up" delay={0.2}>
                    <div className="space-y-3 pt-6 border-t border-divider text-sm text-left">
                        <div className="flex justify-between text-text/70 font-serif">
                            <span>Subtotal</span>
                            <span className="font-semibold text-primary">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-text/70 font-serif">
                            <span>Net Total</span>
                            <span className="font-semibold text-primary">${totalNetAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-text/70 font-serif">
                            <span>VAT ({vatPercentage}%)</span>
                            <span className="font-semibold text-primary">${totalVatAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </FaderInAnimation>

                <FaderInAnimation direction="up" delay={0.3}>
                    <div className="flex justify-between items-end mt-6 pt-6 border-t border-divider">
                        <span className="text-base font-medium text-text/60 font-serif">Total due</span>
                        <span className="text-3xl font-bold text-accent tracking-tight">${total.toFixed(2)}</span>
                    </div>
                </FaderInAnimation>
            </div>
        </aside>
    );
}
