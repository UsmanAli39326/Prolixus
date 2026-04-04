import categories from "@/app/api/products/categories";
import filters from "@/app/api/products/filter";
import ShopHero from "@/components/layout/Ecommerce/ProductListingPage/ProductHero";
import ProductsFilterManager from "@/components/layout/Ecommerce/ProductListingPage/ProductsFilterManager";


export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop All Products",
  description: "Browse our complete collection of premium organic products.",
};

export default async function ShopPage({ searchParams }) {
  const resolvedParams = await searchParams;
  
  const categoryList = await categories();
  const filterList = await filters();

  const page = Number(resolvedParams.page) || 1;
  const sortBy = resolvedParams.sort || filterList.sort[0];
  const minPrice = Number(resolvedParams.minPrice) || filterList.price.min;
  const maxPrice = Number(resolvedParams.maxPrice) || filterList.price.max;

  return (
    <div className="bg-(--secondary-color)">
      <ShopHero
        title="Shop All Products"
        subtitle="Discover nature's finest ingredients, curated for your holistic well-being."
      />
      <ProductsFilterManager
        categoryList={categoryList}
        filters={filterList}
        initialPage={page}
        initialSort={sortBy}
        initialPriceRange={{ min: minPrice, max: maxPrice }}
      />
    </div>
  );
}