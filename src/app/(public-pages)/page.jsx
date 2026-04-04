import Hero from "@/components/layout/Home/Hero";
import AboutSection from "@/components/layout/About Us/About";
import OurBenefits from "@/components/layout/Home/OurBenefits";
import WhatWeDo from "@/components/layout/Home/WhatWeDo";
import OurKeyPoints from "@/components/layout/Home/OurKeyPoints";
import OurTestimonials from "@/components/layout/Home/Testemonials";
import CtaBox from "@/components/layout/Home/CtaBox";
import YouTubeGallery from "@/components/layout/Home/YouTubeGallery";
import { Suspense } from "react";
import DynamicProductsSection from "@/components/layout/Home/DynamicProductsSection";

export const metadata = {
  title: "Prolixus - Premium Organic Products",
  description: "Shop nature's finest organic ingredients, curated for your holistic well-being.",
};

import ProductCardSkeleton from "@/components/layout/Ecommerce/ProductListingPage/ProductCardSkeleton";

const ProductsLoading = () => (
  <section className="our-products py-16">
    <div className="container mx-auto px-4">
      {/* Header Placeholder */}
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between animate-pulse">
        <div className="max-w-xl space-y-4">
          <div className="h-4 w-32 rounded bg-gray-200"></div>
          <div className="h-10 w-64 rounded bg-gray-200"></div>
        </div>
        <div className="h-10 w-44 rounded-full bg-gray-200"></div>
      </div>

      {/* Grid Placeholder */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Suspense fallback={<ProductsLoading />}>
        <DynamicProductsSection />
      </Suspense>
      <WhatWeDo />
      <OurBenefits />
      <OurTestimonials />
      <OurKeyPoints />
      <CtaBox />
      <YouTubeGallery />
    </>
  );
}