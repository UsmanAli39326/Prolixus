"use client";
import { useState } from "react";
import Link from "next/link";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Button from "@/components/ui/Button";
import useCart from "@/Hooks/useCart";
import { stripHtmlTags } from "@/utitlis/formatters";
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft, FiArrowRight, FiCheck, FiShield, FiTruck, FiPackage } from "react-icons/fi";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <FaderInAnimation direction="up">
      <div className="min-h-screen bg-secondary py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <FaderInAnimation direction="down" delay={0.1}>
            <div className="mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-divider">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-accent font-semibold text-primary">
                    Shopping Cart
                  </h1>
                  <p className="text-text mt-2">
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                    {subtotal > 100 && (
                      <span className="text-accent font-medium ml-2">• Free shipping eligible!</span>
                    )}
                  </p>
                </div>
                <Link href="/products" className="group inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300">
                  <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-medium">Continue Shopping</span>
                </Link>
              </div>
            </div>
          </FaderInAnimation>

          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <FaderInAnimation direction="up" delay={0.2}>
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-surface-2 flex items-center justify-center">
                  <FiPackage className="w-12 h-12 text-text/50" />
                </div>
                <h2 className="text-2xl font-accent font-semibold text-primary mb-2">
                  Your cart is empty
                </h2>
                <p className="text-text mb-8">
                  Looks like you haven't added any products yet.
                </p>
                <Link href="/products">
                  <Button variant="accent" size="lg">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </FaderInAnimation>
          ) : (
            /* Cart Content */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart Items Column */}
              <div className="lg:col-span-2">
                {/* Table Header - Desktop Only */}
                <FaderInAnimation direction="left" delay={0.15}>
                  <div className="hidden md:grid grid-cols-12 gap-4 pb-4 text-xs font-semibold text-text uppercase tracking-wider border-b border-divider">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>
                </FaderInAnimation>

                {/* Cart Items */}
                <div className="space-y-4 mt-4">
                  {cartItems.map((item, index) => (
                    <FaderInAnimation key={item.id} direction="left" delay={0.2 + index * 0.1}>
                      <div className="group bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-divider hover:shadow-md transition-shadow duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
                          {/* Product Info */}
                          <div className="col-span-6 flex gap-4 items-center">
                            {/* Product Image */}
                            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-surface-2 shrink-0">
                              <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{
                                  backgroundImage: `url('${item.image}')`,
                                  backgroundColor: "var(--surface-2-color)",
                                }}
                              />
                            </div>
                            {/* Product Details */}
                            <div className="flex flex-col gap-1">
                              <h3 className="font-accent text-base md:text-lg font-medium text-primary leading-tight">
                                {item.name}
                              </h3>
                              <p className="text-sm text-text line-clamp-1">{stripHtmlTags(item.description)}</p>
                              {/* Mobile Price */}
                              <p className="text-accent font-semibold md:hidden">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="col-span-2 flex justify-start md:justify-center">
                            <div className="flex items-center gap-1 bg-secondary rounded-full p-1 border border-divider">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium text-primary">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-primary transition-colors duration-200"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Unit Price - Desktop Only */}
                          <div className="hidden md:block col-span-2 text-center font-medium text-text">
                            ${item.price.toFixed(2)}
                          </div>

                          {/* Line Total & Delete */}
                          <div className="col-span-2 flex items-center justify-between md:justify-end gap-4">
                            <span className="font-semibold text-primary text-lg">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 rounded-full text-text hover:text-error hover:bg-error/10 transition-all duration-200"
                              title="Remove item"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </FaderInAnimation>
                  ))}
                </div>

                {/* Trust Badges - Mobile */}
                <FaderInAnimation direction="up" delay={0.5}>
                  <div className="mt-8 p-6 bg-surface-2 rounded-2xl lg:hidden">
                    <div className="flex flex-wrap gap-6 justify-center">
                      <TrustBadge icon={<FiShield />} text="100% Organic" />
                      <TrustBadge icon={<FiTruck />} text="Free Shipping 100+" />
                      <TrustBadge icon={<FiCheck />} text="Quality Guaranteed" />
                    </div>
                  </div>
                </FaderInAnimation>
              </div>

              {/* Order Summary Column */}
              <div className="lg:col-span-1">
                <FaderInAnimation direction="right" delay={0.3}>
                  <div className="sticky top-24 space-y-6">
                    {/* Summary Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-divider">
                      <h2 className="text-2xl font-accent font-semibold text-primary mb-6">
                        Order Summary
                      </h2>

                      {/* Calculations */}
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-text">Subtotal</span>
                          <span className="font-medium text-primary">${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-text">Shipping</span>
                          <span className={`font-medium ${shipping === 0 ? 'text-accent' : 'text-primary'}`}>
                            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-text">Tax</span>
                          <span className="font-medium text-primary">${tax.toFixed(2)}</span>
                        </div>

                        <div className="h-px bg-divider my-4" />

                        <div className="flex justify-between items-center">
                          <span className="text-xl font-accent font-semibold text-primary">Total</span>
                          <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <Link href="/checkout">
                        <Button
                          variant="accent"
                          size="lg"
                          fullWidth
                          className="group"
                          rightIcon={<FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />}
                        >
                          Proceed to Checkout
                        </Button>
                      </Link>

                      <p className="text-center text-xs text-text mt-4 flex items-center justify-center gap-1">
                        <FiShield className="w-3 h-3" /> Secure checkout powered by Stripe
                      </p>
                    </div>

                    {/* Trust Badges - Desktop */}
                    <RevealInAnimation direction="bottom" delay={0.4}>
                      <div className="hidden lg:block bg-surface-2 rounded-2xl p-6 border border-divider">
                        <div className="space-y-4">
                          <TrustBadgeHorizontal
                            icon={<FiShield />}
                            title="Premium Quality"
                            description="100% organic ingredients sourced responsibly"
                          />
                          <TrustBadgeHorizontal
                            icon={<FiTruck />}
                            title="Free Shipping"
                            description="On orders over $100"
                          />
                          <TrustBadgeHorizontal
                            icon={<FiPackage />}
                            title="Easy Returns"
                            description="30-day hassle-free returns"
                          />
                        </div>
                      </div>
                    </RevealInAnimation>
                  </div>
                </FaderInAnimation>
              </div>
            </div>
          )}
        </div>
      </div>
    </FaderInAnimation>
  );
}

// Trust Badge Component - Mobile
function TrustBadge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-primary">
      <span className="text-accent">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

// Trust Badge Component - Desktop Horizontal
function TrustBadgeHorizontal({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 text-accent shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-sm text-primary">{title}</h4>
        <p className="text-xs text-text mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
