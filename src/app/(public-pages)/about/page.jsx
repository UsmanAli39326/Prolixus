import AboutPageHeader from '@/components/layout/PageHeader';

export const metadata = {
  title: "About Us",
  description: "Learn about our mission to provide sustainable, premium organic products.",
};
import About from '@/components/layout/About Us/About';
// import OurApproach from '@/components/layout/About Us/OurApproach';
// import OurKeyPoints from '@/components/layout/Home/OurKeyPoints';
// import OurBenefits from '@/components/layout/Home/OurBenefits';
// import OurFaqs from '@/components/layout/Home/OurFAQs';
// import OurTestimonials from '@/components/layout/Home/Testemonials';

export default function AboutPage() {
  return (
    <>
      <AboutPageHeader title="About" subtitle="us"/>
      <About/>
      {/* <OurApproach/> */}
      {/* <OurKeyPoints/> */}
      {/* <OurBenefits/> */}
      {/* <OurFaqs/> */}
      {/* <OurTestimonials/> */}
    </>
  );
}