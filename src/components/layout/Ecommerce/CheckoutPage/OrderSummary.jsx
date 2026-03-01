"use client";
import OrderItem from "./OrderItem";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import useCart from "@/Hooks/useCart";
import { calcCartTotals } from "@/lib/cart";

export default function OrderSummary() {
    const { cartItems } = useCart();

    // SYNCED CALCULATIONS: Uses the same shared utility as the cart page and payload builder.
    const { subtotal, vatAmount, shipping, total, vatPercentage } = calcCartTotals(cartItems);

    return (
        <aside className="lg:col-span-12 xl:col-span-5 relative">
            <div className="sticky top-28 bg-surface rounded-4xl p-6 lg:p-8 shadow-xl shadow-divider/50 border border-divider">
                <RevealInAnimation direction="bottom">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-divider">
                        <h3 className="text-xl font-bold text-primary">Order Summary</h3>
                        <span className="text-sm text-gray-400 font-accent">{cartItems.length} items</span>
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
                            <p className="text-gray-500 py-8 italic font-accent text-left">Your cart is empty</p>
                        )}
                    </div>
                </FaderInAnimation>

                {/* Price Breakdown */}
                <FaderInAnimation direction="up" delay={0.2}>
                    <div className="space-y-3 pt-6 border-t border-divider text-sm text-left">
                        <div className="flex justify-between text-text/70 font-accent">
                            <span>Subtotal</span>
                            <span className="font-semibold text-primary">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-text/70 font-accent">
                            <span>Shipping</span>
                            <span className={`font-semibold ${shipping === 0 ? 'text-accent' : 'text-primary'}`}>
                                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                            </span>
                        </div>
                        <div className="flex justify-between text-text/70 font-accent">
                            <span>VAT ({vatPercentage}%)</span>
                            <span className="font-semibold text-primary">${vatAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </FaderInAnimation>

                <FaderInAnimation direction="up" delay={0.3}>
                    <div className="flex justify-between items-end mt-6 pt-6 border-t border-divider">
                        <span className="text-base font-medium text-text/60 font-accent">Total due</span>
                        <span className="text-3xl font-bold text-accent tracking-tight">${total.toFixed(2)}</span>
                    </div>
                </FaderInAnimation>
            </div>
        </aside>
    );
}
