"use client";

import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi";
import Button from "@/components/ui/Button";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function OrderConfirmation({ orderData, formatPrice, isLoggedIn }) {
    if (!orderData) return null;

    return (
        <FaderInAnimation direction="up">
            <div className="max-w-lg mx-auto py-12">
                {/* Confirmation Card */}
                <div className="bg-white dark:bg-white/5 border border-divider rounded-3xl shadow-xl shadow-accent/5 overflow-hidden">
                    {/* Header */}
                    <div className="bg-linear-to-br from-accent/10 via-accent/5 to-transparent px-8 pt-10 pb-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                                <HiCheckCircle className="text-5xl text-accent" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-primary mb-2">Order Confirmed!</h2>
                        <p className="text-text/70 font-accent text-sm">
                            Your order has been placed successfully.
                        </p>
                    </div>

                    {/* Order Details */}
                    <div className="px-8 py-6 space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-divider">
                            <span className="text-sm text-text/60 font-accent">Order ID</span>
                            <span className="text-sm font-bold text-primary">#{orderData?.orderId}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-divider">
                            <span className="text-sm text-text/60 font-accent">Invoice Number</span>
                            <span className="text-sm font-bold text-primary">{orderData?.invoiceNumber}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-divider">
                            <span className="text-sm text-text/60 font-accent">Total Amount</span>
                            <span className="text-sm font-bold text-accent">{formatPrice(orderData?.grossAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-sm text-text/60 font-accent">Payment Status</span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                {orderData?.paymentStatus}
                            </span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 pb-8 pt-2">
                        <p className="text-xs text-text/50 font-accent text-center mb-6">
                            We&apos;ll send you an email confirmation shortly.
                        </p>
                        {isLoggedIn ? (
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <Link href={`/order-detail?orderId=${orderData?.orderId}`} className="block flex-1">
                                    <Button variant="outline" size="lg" className="rounded-full! w-full border-2 border-divider hover:border-accent">
                                        View Order
                                    </Button>
                                </Link>
                                <Link href="/dashboard" className="block flex-1">
                                    <Button variant="accent" size="lg" className="rounded-full! w-full">
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Link href="/products" className="block">
                                <Button variant="accent" size="lg" className="rounded-full! px-12 w-full">
                                    Continue Shopping
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </FaderInAnimation>
    );
}
