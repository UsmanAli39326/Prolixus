"use client";

import React, { useState, useMemo } from "react";
import ShopLayout from "./ProductLayout";
import FiltersSidebar from "./SideBar";
import ProductGrid from "./ProductGrid";
import ShopTopBar from "./ProductHeader";
import LoadMore from "./LoadMore";

export default function ProductsFilterManager({ initialProducts, pagination, categoryList, filters }) {
  const [priceRange, setPriceRange] = useState({ 
    min: filters.price.min, 
    max: filters.price.max 
  });
  const [sortBy, setSortBy] = useState(filters.sort[0]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // 1. Filter by Price
    result = result.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // 2. Sort
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Name (A-Z)") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    // "Default Sorting" or others will just maintain the API's order for now,
    // though the filtering step above might slightly alter stable sorts depending on JS engine.

    return result;
  }, [initialProducts, priceRange, sortBy]);

  return (
    <ShopLayout
      sidebar={
        <FiltersSidebar
          categories={categoryList}
          filters={filters}
          currentPriceRange={priceRange}
          onPriceChange={setPriceRange}
          currentSort={sortBy}
          onSortChange={setSortBy}
        />
      }
      content={
        <>
          <ShopTopBar 
            total={pagination?.totalCount} 
            showing={filteredAndSortedProducts.length} 
          />
          <ProductGrid products={filteredAndSortedProducts} />
          
          {/* LoadMore is technically fetching more from the backend, 
              so it might interact weirdly with client-side filters if not handled perfectly, 
              but we'll leave it as is for now as per the existing codebase. */}
          <LoadMore hasNext={pagination?.hasNextPage} />
        </>
      }
    />
  );
}
