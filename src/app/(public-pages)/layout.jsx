import Navbar from "@/components/layout/NavbarWrapper";
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
