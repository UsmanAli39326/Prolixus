import Hero from "@/components/layout/Home/Hero";
import AboutSection from "@/components/layout/About Us/About";
import ProductsSection from "@/components/layout/Home/Product";
import OurBenefits from "@/components/layout/Home/OurBenefits";
import WhatWeDo from "@/components/layout/Home/WhatWeDo";
import OurKeyPoints from "@/components/layout/Home/OurKeyPoints";
import OurTestimonials from "@/components/layout/Home/Testemonials";
import CtaBox from "@/components/layout/Home/CtaBox";
import YouTubeGallery from "@/components/layout/Home/YouTubeGallery";
import getAllProducts from "@/app/api/products/products";

export const revalidate = 3600; // ISR: revalidate homepage every 1 hour

export const metadata = {
  title: "Prolixus - Premium Organic Products",
  description: "Shop nature's finest organic ingredients, curated for your holistic well-being.",
};

export default async function Home() {
  const { products = [] } = await getAllProducts(1, 3);

  return (
    <>
      <Hero />
      <AboutSection />
      <ProductsSection products={products} />
      <WhatWeDo />
      <OurBenefits />
      <OurTestimonials />
      <OurKeyPoints />
      <CtaBox />
      <YouTubeGallery />
    </>
  );
}