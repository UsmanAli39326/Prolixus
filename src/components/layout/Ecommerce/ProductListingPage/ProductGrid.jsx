import React from "react";
import ProductCard from "./ProductCard";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function ProductGrid({ products = [] }) {
  return (
    <div
      className="
        grid grid-cols-1 gap-6
        sm:grid-cols-2 sm:gap-6
        lg:grid-cols-3 lg:gap-8
        items-start
      "
    >
      {products.map((p, idx) => (
        <FaderInAnimation
          key={p.id}
          direction="up"
          duration={0.5}
          distance={16}
          delay={Math.min(idx * 0.05, 0.25)}
        >
          <ProductCard key={p.id} product={p} />
        </FaderInAnimation>
      ))}
    </div>
  );
}
