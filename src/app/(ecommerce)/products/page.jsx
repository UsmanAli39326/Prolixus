import getAllProducts from "@/app/api/products/products";

export const metadata = {
  title: "Shop All Products",
  description: "Browse our complete collection of premium organic products.",
};
import categories from "@/app/api/products/categories";
import filters from "@/app/api/products/filter";

import ShopHero from "@/components/layout/Ecommerce/ProductListingPage/ProductHero";
// import ShopTopBar from "@/components/layout/Ecommerce/ProductListingPage/ProductHeader";
// import ProductGrid from "@/components/layout/Ecommerce/ProductListingPage/ProductGrid";
// import LoadMore from "@/components/layout/Ecommerce/ProductListingPage/LoadMore";
import ProductsFilterManager from "@/components/layout/Ecommerce/ProductListingPage/ProductsFilterManager";

export default async function ShopPage({ searchParams }) {
  const categoryList = await categories();
  const page = Number(searchParams.page) || 1;
  const { products, pagination } = await getAllProducts(page, 20);

  return (
    <div className="bg-(--secondary-color)">
      <ShopHero
        title="Shop All Products"
        subtitle="Discover nature's finest ingredients, curated for your holistic well-being."
      />

      <ProductsFilterManager
        initialProducts={products}
        pagination={pagination}
        categoryList={categoryList}
        filters={filters}
      />
    </div>
  );
}
