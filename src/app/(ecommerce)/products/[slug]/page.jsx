"use client";
/*
==================================================
FIX 1 — Convert to Client Component
Reason:
The old component was async (Server Component) but
used React hooks (useState, useEffect). That causes
runtime errors in Next.js App Router.

Adding "use client" allows hooks and browser logic.
==================================================
*/

// ✅ FIX: Correct import type (named export)
import { getProductById } from "@/app/api/products/products";

/*
❌ OLD IMPORT (caused error if function is not default export)
import getProductById from "@/app/api/products/products";
*/

import { useEffect, useState, use } from "react";
import useCart from "@/Hooks/useCart";
/*
❌ OLD (missing `use` + hooks used in server component)
import { useEffect, useState } from "react";
*/

import Button from "@/components/ui/Button";
import {
  ProductImageGallery,
  ProductInfo,
  QuantitySelector,
  ProductAccordion,
} from "@/components/ecommerce/ProductPage";

/* ============================
   PAGE COMPONENT
============================ */
export default function ProductPage({ params }) {
  /*
  ==================================================
  FIX 2 — Correct handling of dynamic route params
  Reason:
  In client components, params must be unwrapped.
  Old code destructured incorrectly and used wrong key.
  ==================================================
  */

  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  /*
  ❌ OLD PARAM HANDLING (server-style)
  export default async function ProductPage({ params }) {
    const { id } = params;
  }
  */

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);

    // Add to global cart
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
    }, quantity);

    // Feedback timeout
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  /*
  ==================================================
  FIX 3 — Proper client-side data fetching lifecycle
  Reason:
  Data fetching must run inside useEffect for
  client-rendered components.
  ==================================================
  */
  useEffect(() => {
    if (slug) {
      setLoading(true);

      getProductById(slug)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setLoading(false);
        });
    }
  }, [slug]);

  /*
  ❌ OLD DATA FETCH (ran inside async server component)
  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);
  */

  /*
  ==================================================
  FIX 4 — Loading guard prevents premature rendering
  ==================================================
  */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-(--text-color)">Loading product details...</p>
      </div>
    );
  }

  /*
  ==================================================
  FIX 5 — Safe null handling
  ==================================================
  */
  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-accent text-2xl font-semibold text-(--primary-color)">
            Product Not Found
          </h1>
          <p className="mt-2 text-(--text-color)">
            The product you're looking for (ID: {slug}) doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  /* ============================
     DATA PREPARATION
  ============================ */
  const extendedProduct = {
    ...product,
    category: product.categoryName || "Product",
    subcategory: product.subcategoryName || "",
    badges: product.badge
      ? [{ label: product.badge, type: "default" }]
      : [],
    images: product.image
      ? [product.image]
      : ["/images/new/prolixus-nutrients.jpeg"],
    heroImage: product.image,
    accordionItems: [
      {
        title: "Description",
        content: product.description || "No detailed description available.",
      },
      {
        title: "Shipping & Returns",
        content: "Free shipping over $50. 30-day satisfaction guarantee.",
      },
    ],
  };

  /* ============================
     RENDER
  ============================ */
  return (
    <div className="bg-(--secondary-color)">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductImageGallery
            images={extendedProduct.images}
            productTitle={extendedProduct.title}
          />

          <div>
            <ProductInfo {...extendedProduct} />

            <div className="mt-8 flex gap-4">
              <QuantitySelector
                initialQuantity={1}
                onChange={(val) => setQuantity(val)}
              />
              <Button
                variant="accent"
                size="lg"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? "Added!" : "Add to Cart"}
              </Button>
            </div>

            <ProductAccordion items={extendedProduct.accordionItems} />
          </div>
        </div>
      </div>
    </div>
  );
}