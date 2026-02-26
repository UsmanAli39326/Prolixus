import Link from "next/link";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";

export default function SummaryPage() {
    // Mock data based on reference HTML
    const orderData = {
        orderNumber: "88392",
        estimatedDelivery: "Oct 24",
        items: [
            {
                name: "Organic Rose Facial Oil",
                price: 45.00,
                qty: 1,
                size: "50ml",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUu0vT3E0r9p9H2fCBSmwKOxSJuN8qaO6TEwXFX6-INKhED8j61Vx9LovvaJ3-S30U-M8TJ5cGR-nveJEFe_9athZYgr-pf0zjS4yM2n1hp6TEH08pVsHgbdFseZaEg1iy8_IEMHiOzfvvZYBfdzmXCfa5yg0Z1YgoH-BgHg9IHFayha3MO6jxe3BgJDLAVHUwxQLnBD26X6HP3lq2EojJr6a7568kW1xYir7pXdnU0ZCDnUu8j_h8lzi-GtBME0WbV2Sa4tfCj6U"
            },
            {
                name: "Bamboo Charcoal Soap",
                price: 24.00,
                qty: 2,
                scent: "Eucalyptus",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZNs3vGcInjWtb8ktQNmvoDWP5XChmPALCcNCBGTZBlQanhd4k5hwsI4rhjaifLMuCXFr_LIFz37Yl6A-HVGuF6pgAgYcHfw_MFXez_xwtlPsxS_A6Nkbki2tg8_3rSisdBXMhNCqV-aIdSCXqSsL_UBph7WrzuCyygaf6Jq4VPFqlsUgzUz8Cqx0s0En4szPZA6P-WznES_0b-hGVHPGCHbE7qG_gQUwEXo-G8ORRlGBWaZf_t96XvT--CYru1zvg37lCtlibu4Q"
            },
            {
                name: "Hydrating Night Cream",
                price: 55.00,
                qty: 1,
                size: "100ml",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3XDJT5A-kGOH87ZzJYmh_tQ-Aeor1HbAey-7oUILvOPaanCbqiUTh0lUgvRohKT6kf3GZOzsCU-hePpS6_63awVRIhUP54BwfaO6pTrrveaqIyh5azFs0Oh8BF7QcRQsjzLASOfMYqF9jT7VeyrDTBJdYTPuRGzbn5lBuWTVA8JnynQIIVRxE9zhw-G8e7Nc7VdhvEyHblfph8l_PMfP2qduAC6-DzlX084P2i7T9tsstaQm6jSoBc6_Q4psEMtuTgJqMfzRssSY"
            }
        ],
        shipping: {
            name: "Isabella Chen",
            address: "123 Serenity Blvd, Suite 4B",
            city: "San Francisco, CA 94110",
            country: "United States"
        },
        payment: {
            method: "Visa ending in 4242",
            total: 124.00,
            subtotal: 124.00,
            shippingCost: "Free"
        }
    };

    return (
        <div className="flex flex-col items-center gap-10">
            {/* Success Header */}
            <div className="flex flex-col items-center text-center gap-6">
                <RevealInAnimation direction="up">
                    <div className="size-24 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-2 shadow-sm ring-1 ring-[#D4AF37]/20">
                        <span className="material-symbols-outlined text-[#D4AF37] !text-6xl">check_circle</span>
                    </div>
                </RevealInAnimation>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Thank you for your order!
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
                        We've received your order <span className="font-serif italic font-medium text-slate-900 dark:text-white text-xl">#{orderData.orderNumber}</span> and will begin crafting your package with care.
                    </p>
                </div>
            </div>

            {/* Order Card */}
            <FaderInAnimation direction="up" delay={0.2}>
                <div className="w-full bg-white dark:bg-[#1a1c1a]/50 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                    {/* Summary Header */}
                    <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4 bg-[#fcfbf7]/50 dark:bg-slate-800/20">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Order Summary</h2>
                        <span className="px-4 py-1 rounded-full bg-[#14b814]/10 text-[#14b814] text-sm font-serif font-medium border border-[#14b814]/20 italic">
                            Estimated Delivery: {orderData.estimatedDelivery}
                        </span>
                    </div>

                    {/* Items List */}
                    <div className="p-8 space-y-8">
                        {orderData.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-6 group">
                                <div className="relative shrink-0 overflow-hidden rounded-lg size-20 md:size-24 bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                            {item.size ? `Size: ${item.size}` : `Scent: ${item.scent}`}
                                        </p>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">Qty: {item.qty}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-serif font-medium text-slate-900 dark:text-white">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Details Grid */}
                    <div className="border-t border-slate-100 dark:border-slate-800 bg-[#fcfbf7]/30 dark:bg-transparent p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-[#14b814] mb-1">
                                    <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                                    <h4 className="font-bold uppercase tracking-wider text-xs">Shipping Address</h4>
                                </div>
                                <div className="text-slate-600 dark:text-slate-300 text-base leading-relaxed pl-7">
                                    <p className="font-bold text-slate-900 dark:text-white">{orderData.shipping.name}</p>
                                    <p>{orderData.shipping.address}</p>
                                    <p>{orderData.shipping.city}</p>
                                    <p>{orderData.shipping.country}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-[#14b814] mb-1">
                                    <span className="material-symbols-outlined text-[20px]">credit_card</span>
                                    <h4 className="font-bold uppercase tracking-wider text-xs">Payment Method</h4>
                                </div>
                                <div className="text-slate-600 dark:text-slate-300 text-base leading-relaxed pl-7">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="material-symbols-outlined text-slate-400">card_travel</span>
                                        <p>{orderData.payment.method}</p>
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        Total charged: <span className="font-serif text-slate-700 dark:text-slate-300">
                                            ${orderData.payment.total.toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="p-8 bg-[#fcfbf7]/50 dark:bg-slate-800/10 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col gap-3 max-w-xs ml-auto">
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Subtotal</span>
                                <span className="font-serif">${orderData.payment.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Shipping</span>
                                <span className="text-[#14b814] font-medium">{orderData.payment.shippingCost}</span>
                            </div>
                            <div className="flex justify-between text-slate-900 dark:text-white text-xl font-bold pt-3 border-t border-slate-200 dark:border-slate-700 mt-1">
                                <span>Total</span>
                                <span className="font-serif">${orderData.payment.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </FaderInAnimation>

            {/* Actions */}
            <FaderInAnimation direction="up" delay={0.4} className="w-full">
                <div className="flex flex-col items-center gap-6 w-full mx-auto max-w-md">
                    <Link
                        href="/products"
                        className="w-full bg-[#14b814] hover:bg-[#0f8a0f] text-white rounded-full py-4 px-8 text-lg font-bold transition-all shadow-lg shadow-[#14b814]/20 hover:shadow-[#14b814]/40 flex items-center justify-center gap-2 group"
                    >
                        Continue Shopping
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                    <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <Link href="#" className="hover:text-[#14b814] transition-colors underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4">
                            Order Support
                        </Link>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                        <Link href="#" className="hover:text-[#14b814] transition-colors underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4">
                            Return Policy
                        </Link>
                    </div>
                </div>
            </FaderInAnimation>
        </div>
    );
}
