import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowRight, FaAt } from "react-icons/fa";
import { getAboutPayload } from "@/app/api/about/about";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default async function MainFooter() {
  const about = await getAboutPayload();

  return (
    <footer className="bg-(--primary-color) text-(--white-color) pt-24 pb-12">
      <div className="container mx-auto px-6">

        {/* ================= MAIN GRID (4 Columns) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 pb-20 border-b border-white/10">

          {/* Column 1: Logo & Description */}
          <div className="space-y-8">
            <div className="logo">
              <Image
                src="/images/new/Prolixus-logo-white.webp"
                alt="Prolixus Logo" 
                className="w-44 opacity-100"
              />
            </div>
            <p className="text-(--white-color)/60 font-default text-[15px] leading-[1.6] max-w-sm">
              {about?.shortDescription || "Crafting exceptional experiences with a focus on innovation and sustainable growth."}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-(--white-color) font-accent font-bold text-xl mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {[
                "Payment and shipping",
                "Right of withdrawal",
                "Data protection",
                "Imprint",
                "Terms and Conditions",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-(--white-color)/60 hover:text-(--accent-color) transition duration-300 font-default text-[15px]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-(--white-color) font-accent font-bold text-xl mb-8">Contact Us</h3>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <FaMapMarkerAlt className="text-(--accent-color) text-lg shadow-[0_0_10px_var(--accent-color)]" />
                </div>
                <p className="text-(--white-color)/70 font-default text-[15px] leading-relaxed">
                  {about?.address || "Address info unavailable"}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-(--accent-color) text-lg" />
                <a
                  href={`tel:${about?.phone}`}
                  className="text-(--white-color)/70 hover:text-(--accent-color) transition duration-300 font-default text-[15px]"
                >
                  {about?.phone || "+1 (555) 000-1234"}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-(--accent-color) text-lg" />
                <a
                  href={`mailto:${about?.email}`}
                  className="text-(--white-color)/70 hover:text-(--accent-color) transition duration-300 font-default text-[15px]"
                >
                  {about?.email || "contact@prolixus.com"}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Stay Updated */}
          <div>
            <h3 className="text-(--white-color) font-accent font-bold text-xl mb-8">Stay Updated</h3>
            <div className="space-y-6">
              <p className="text-(--white-color)/60 font-default text-[15px] leading-relaxed">
                Join our newsletter to receive the latest updates and health insights.
              </p>

              <form className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-(--white-color)/40 group-focus-within:text-(--accent-color) transition">
                    <FaAt size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-(--white-color) font-default text-[15px] focus:outline-none focus:border-(--accent-color)/50 transition"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  className="w-full rounded-xl! font-default tracking-wide group"
                  rightIcon={<FaArrowRight size={14} className="group-hover:translate-x-1 transition" />}
                >
                  Subscribe Now
                </Button>
              </form>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-(--white-color)/40 font-default text-sm">
            © {new Date().getFullYear()} {about?.companyName || "Prolixus"}. All rights reserved.
          </p>

          <div className="flex items-center gap-8 font-default">
            <a href="#" className="text-(--white-color)/40 hover:text-(--white-color) transition text-sm">Privacy</a>
            <a href="#" className="text-(--white-color)/40 hover:text-(--white-color) transition text-sm">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
