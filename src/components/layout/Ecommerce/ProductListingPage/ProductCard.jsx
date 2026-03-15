"use client";

import Rating from "./ProductRating";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { stripHtmlTags } from "@/utitlis/formatters";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { useCurrency } from "@/context/CurrencyContext";

export default function ProductCard({ product }) {
  const { formatPrice } = useCurrency();
  return (
    <Link
      href={`/products/${product.id}`}
      className="
        group flex flex-col overflow-hidden
        rounded-[18px]
        border border-(--divider-color)
        bg-(--white-color)
        shadow-sm
        transition-all
        hover:-translate-y-0.5 hover:shadow-lg
      "
      prefetch
    >
      <div className="relative aspect-4/5 bg-(--secondary-color)">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {product.badge && (
          <Badge
            variant="primary"
            className="absolute left-3 top-3 text-[10px] font-bold uppercase tracking-wide px-3 py-1"
          >
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="flex grow flex-col p-5">
        <h3 className="font-accent text-lg font-semibold h-14 line-clamp-2 leading-snug text-(--primary-color)">
          {product.title}
        </h3>

        <div className="mt-2">
          {/* <Rating value={product.rating} count={product.reviews} /> */}
        </div>

        <div className="relative mt-2 h-12">
          <p className="line-clamp-2 text-sm leading-relaxed text-(--text-color)/75 transition-all duration-300 group-hover:line-clamp-none group-hover:absolute group-hover:z-10 group-hover:bg-(--white-color) group-hover:shadow-sm">
            {stripHtmlTags(product.description)}
          </p>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-semibold text-(--primary-color)">
            {formatPrice(product.price)}
          </span>

          <AddToCartButton product={product} size="card" />
        </div>
      </div>
    </Link>
  );
}

