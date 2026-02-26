import Image from "next/image"
import Hero from "@/components/layout/Home/Hero";
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
import OurBlog from "@/components/layout/Home/OurBlog";

export default function Home() {
  return (
    <>
      <Hero/>
      <AboutSection/>
      <WhyChooseUs/>
      <ProductsSection/>
      <WhatWeDo/>
      <OurKeyPoints/>
      <PremiumProducts/>
      <OurBenefits/>
      <CtaBox/>
      <OurFaqs/>
      <OurTestimonials/>
      <OurBlog/>
    </>
  );
}