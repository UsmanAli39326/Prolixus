import Navbar from "@/components/layout/Navbar";
import MainFooter from "@/components/layout/Footer";
export default function PublicPageLayout({ children }) {
  return (
    <>
      <Navbar />
      <section className="company-pages-wrapper">
        {children}
      </section>
      <MainFooter />
    </>
  )
}
