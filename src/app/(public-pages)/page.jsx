import Hero from "@/components/layout/Home/Hero";

export const metadata = {
  title: "Prolixus - Premium Organic Products",
  description: "Shop nature's finest organic ingredients, curated for your holistic well-being.",
};
import AboutSection from "@/components/layout/About Us/About";
import WhyChooseUs from "@/components/layout/Home/WhyChooseUs";
import ProductsSection from "@/components/layout/Home/Product";
import WhatWeDo from "@/components/layout/Home/WhatWeDo";
import OurKeyPoints from "@/components/layout/Home/OurKeyPoints";
import PremiumProducts from "@/components/layout/Home/PremiumProducts";
import OurBenefits from "@/components/layout/Home/OurBenefits";
import CtaBox from "@/components/layout/Home/CtaBox";
import OurFaqs from "@/components/layout/Home/OurFAQs";
import OurTestimonials from "@/components/layout/Home/Testemonials";
// import OurBlog from "@/components/layout/Home/OurBlog";
import getAllProducts from "@/app/api/products/products";
import YouTubeGallery from "@/components/layout/Home/YouTubeGallery";

export default async function Home() {
  const { products = [] } = await getAllProducts(1, 3);

  return (
    <>
      <Hero />
      <AboutSection />
      <WhyChooseUs />
      <ProductsSection products={products} />
      <WhatWeDo />
      <OurKeyPoints />
      <PremiumProducts />
      <OurBenefits />
      <CtaBox />
      <OurFaqs />
      <OurTestimonials />
      {/* <OurBlog /> */}
      <YouTubeGallery />
    </>
  );
}