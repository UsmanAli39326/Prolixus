import { getProductById, getAllProducts } from "@/app/api/products/products";
import {
  ProductImageGallery,
  ProductInfo,
  ProductAccordion,
  ProductBuySection,
} from "@/components/layout/Ecommerce/ProductPage";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

// export const revalidate = 600; // ISR: revalidate product page every 10 minutes

export async function generateStaticParams() {
  // Fetch the first few pages or a high limit to prerender popular ones
  // We will fetch up to 100 products for static generation
  const { products } = await getAllProducts(1, 100);

  if (!products || products.length === 0) return [];

  return products.map((product) => ({
    slug: String(product.id),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductById(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | Ecomm Store`,
    description: product.description || `Buy ${product.title} at our store.`,
    openGraph: {
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductById(slug);

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
      /*
      {
        title: "Shipping & Returns",
        content: "Free shipping over $50. 30-day satisfaction guarantee.",
      },
      */
    ],
  };

  /* ============================
     RENDER
  ============================ */
  return (
    <div className="bg-(--secondary-color) overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <FaderInAnimation direction="left" delay={0.1} distance={30}>
            <ProductImageGallery
              images={extendedProduct.images}
              productTitle={extendedProduct.title}
            />
          </FaderInAnimation>

          <FaderInAnimation direction="right" delay={0.2} distance={30}>
            <div>
              <ProductInfo {...extendedProduct} />

              <ProductBuySection product={product} />

              <ProductAccordion items={extendedProduct.accordionItems} />
            </div>
          </FaderInAnimation>
        </div>
      </div>
    </div>
  );
}