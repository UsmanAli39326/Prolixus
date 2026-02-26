import getAllProducts from "@/app/api/products/products";
import categories from "@/app/api/products/categories";
import filters from "@/app/api/products/filter";

import ShopHero from "@/components/layout/Ecommerce/ProductListingPage/ProductHero";
import ShopTopBar from "@/components/layout/Ecommerce/ProductListingPage/ProductHeader";
import ProductGrid from "@/components/layout/Ecommerce/ProductListingPage/ProductGrid";
import LoadMore from "@/components/layout/Ecommerce/ProductListingPage/LoadMore";
import FiltersSidebar from "@/components/layout/Ecommerce/ProductListingPage/SideBar";
import ShopLayout from "@/components/layout/Ecommerce/ProductListingPage/ProductLayout";

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

      <ShopLayout
        sidebar={
          <FiltersSidebar
            categories={categoryList}
            filters={filters}
          />
        }
        content={
          <>
            <ShopTopBar total={pagination?.totalCount} showing={products.length} />
            <ProductGrid products={products} />
            {/* <LoadMore 
            hasNext={pagination?.hasNextPage}/> */}

            <LoadMore
              hasNext={pagination?.hasNextPage}
            // onClick={loadMoreProducts}
            />
          </>
        }
      />
    </div>
  );
}
