"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { FaCartArrowDown, FaCircleUser } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

// import { getShopMenus } from "@/services/menuService"; // ya jis path me aapka file hai
import { getShopMenus } from "@/app/api/layout/navbar";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { itemCount } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [shopButton, setShopButton] = useState({ label: "Shop Now", url: "/products" });
  const { isLoggedIn } = useAuth();

  const handleUserIconClick = () => {
    router.push("/dashboard")
  };

  // 🔥 Fetch shop menus from API
  useEffect(() => {
    async function loadMenus() {
      const data = await getShopMenus();
      setMenus(data);

      // ✅ Use API data directly to find Shop menu
      const shopMenu = data.find((m) => m.id === 58);
      if (shopMenu) setShopButton(shopMenu);
    }
    loadMenus();
  }, []);


  // Exclude Cart from main nav (Cart icon handled separately)
  const mainMenus = menus.filter((m) => m.label !== "Cart");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-divider bg-primary">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 lg:py-6">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/new/Prolixus-Logo-white.webp"
            alt="Prolixus Logo"
            width={140}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-6">
          <ul className="flex items-center gap-1">
            {mainMenus.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={menu.url}
                  className="px-4 py-3 text-white font-semibold text-[16px] transition hover:text-accent no-underline"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side: Shop Button + Cart + Account */}
          <div className="flex items-center gap-6 pl-6 border-l border-divider">
            <Link href={shopButton?.url || "/products"}>
              <Button variant="accent" className="rounded-full">
                {shopButton?.label || "Shop Now"}
              </Button>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/cart"
                className="relative flex items-center justify-center h-9 w-9 rounded-full border border-white text-white transition hover:bg-white hover:text-accent"
              >
                <FaCartArrowDown />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white shadow-sm ring-2 ring-primary">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={handleUserIconClick}
                aria-label={isLoggedIn ? "Go to Dashboard" : "Login"}
                className="flex items-center justify-center h-9 w-9 rounded-full border border-white text-white transition hover:bg-white hover:text-accent cursor-pointer"
              >
                <FaCircleUser />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg bg-accent"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`block h-0.5 w-6 bg-white transition ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white my-1 transition ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-accent">
          <nav className="px-4 py-3">
            <ul className="flex flex-col gap-1">
              {mainMenus.map((menu) => (
                <li key={menu.id}>
                  <Link
                    href={menu.url}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-white font-semibold hover:text-primary"
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}

              {/* Mobile bottom row: Shop + Cart + Account */}
              <li className="mt-3 border-t border-white/20 pt-4">
                <div className="flex items-center justify-between">
                  <Link href={shopButton?.url || "/products"}>
                    <Button variant="primary" className="rounded-full">
                      {shopButton?.label || "Shop Now"}
                    </Button>
                  </Link>

                  <div className="flex gap-2">
                    <Link
                      href="/cart"
                      className="relative flex items-center justify-center h-9 w-9 border rounded-full border-white text-white hover:bg-white hover:text-accent transition"
                    >
                      <FaCartArrowDown />
                      {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-accent shadow-sm ring-2 ring-accent">
                          {itemCount}
                        </span>
                      )}
                    </Link>

                    <button
                      onClick={handleUserIconClick}
                      aria-label={isLoggedIn ? "Go to Dashboard" : "Login"}
                      className="flex items-center justify-center h-9 w-9 border rounded-full border-white text-white hover:bg-white hover:text-accent transition"
                    >
                      <FaCircleUser />
                    </button>
                  </div>
                </div>
              </li>

            </ul>
          </nav>
        </div>
      )}
    </header>
  );




  // return (
  //   <header className="top-0 left-0 right-0 z-50 border-b border-divider bg-primary absolute">
  //     <div>
  //       <nav className="container mx-auto flex items-center justify-between px-4 py-4 lg:py-6">
  //         {/* Logo */}
  //         <Link href="/" className="flex items-center">
  //           <Image
  //             src="/images/logo.svg"
  //             alt="Logo"
  //             width={140}
  //             height={40}
  //             className="h-10 w-auto"
  //             priority
  //           />
  //         </Link>

  //         {/* Desktop Menu */}
  //         <div className="hidden lg:flex flex-1 items-center justify-between ml-6">
  //           <ul className="flex items-center gap-1">
  //             {/* Home */}
  //             <li className="relative group">
  //               <Link
  //                 href="/"
  //                 className="flex items-center px-4 py-3 text-white font-semibold text-[16px] transition hover:text-accent"
  //               >
  //                 Home
  //               </Link>
  //             </li>

  //             {/* About */}
  //             <li>
  //               <Link
  //                 href="/about"
  //                 className="px-4 py-3 text-white font-semibold text-[16px] transition hover:text-accent"
  //               >
  //                 About Us
  //               </Link>
  //             </li>

  //             {/* Pages Dropdown */}
  //             <li className="relative group">
  //               <button
  //                 type="button"
  //                 className="flex items-center px-4 py-3 text-white font-semibold text-[16px] transition hover:text-accent"
  //               >
  //                 Pages
  //                 <span className="ml-2 text-sm">
  //                   <FaChevronDown />
  //                 </span>
  //               </button>

  //               <ul className="absolute left-0 mt-1 w-56 rounded-2xl bg-accent opacity-0 scale-y-90 origin-top transition-all duration-300 group-hover:opacity-100 group-hover:scale-y-100 pointer-events-none group-hover:pointer-events-auto">
  //                 <li>
  //                   <Link
  //                     href="/blog-single"
  //                     className="block px-5 py-2 text-white font-semibold hover:text-primary transition"
  //                   >
  //                     Blog Details
  //                   </Link>
  //                 </li>
  //                 <li>
  //                   <Link
  //                     href="/features"
  //                     className="block px-5 py-2 text-white font-semibold hover:text-primary transition"
  //                   >
  //                     Features
  //                   </Link>
  //                 </li>
  //                 <li>
  //                   <Link
  //                     href="/testimonials"
  //                     className="block px-5 py-2 text-white font-semibold hover:text-primary transition"
  //                   >
  //                     Testimonials
  //                   </Link>
  //                 </li>
  //                 <li>
  //                   <Link
  //                     href="/faqs"
  //                     className="block px-5 py-2 text-white font-semibold hover:text-primary transition"
  //                   >
  //                     FAQs
  //                   </Link>
  //                 </li>
  //                 <li>
  //                   <Link
  //                     href="/404"
  //                     className="block px-5 py-2 text-white font-semibold hover:text-primary transition"
  //                   >
  //                     404
  //                   </Link>
  //                 </li>
  //               </ul>
  //             </li>

  //             {/* Contact */}
  //             <li>
  //               <Link
  //                 href="/contact"
  //                 className="px-4 py-3 text-white font-semibold text-[16px] transition hover:text-accent"
  //               >
  //                 Contact Us
  //               </Link>
  //             </li>
  //           </ul>

  //           {/* Right Side */}
  //           <div className="flex items-center gap-6 pl-6 border-l border-divider">
  //             {/* Shop Now (ARROW REMOVED) */}
  //             <Link href="/products" className="flex items-center">
  //               <Button variant="accent" className="rounded-full!">
  //                 Shop Now
  //               </Button>
  //             </Link>

  //             {/* User + Cart icons */}
  //             <div className="flex items-center gap-3">
  //               <Link
  //                 href="/cart"
  //                 className="flex items-center justify-center h-9 w-9 rounded-full border border-white text-white transition hover:bg-white hover:text-accent"
  //                 aria-label="Cart"
  //               >
  //                 <span className="text-[18px]">
  //                   <FaCartArrowDown />
  //                 </span>
  //               </Link>

  //               <Link
  //                 href="/account"
  //                 className="flex items-center justify-center h-9 w-9 rounded-full border border-white text-white transition hover:bg-white hover:text-accent"
  //                 aria-label="Account"
  //               >
  //                 <span className="text-[18px]">
  //                   <FaCircleUser />
  //                 </span>
  //               </Link>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Mobile Toggle */}
  //         <button
  //           className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg bg-accent"
  //           onClick={() => setMobileOpen(!mobileOpen)}
  //           aria-label="Toggle navigation"
  //         >
  //           <span
  //             aria-hidden="true"
  //             className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
  //               mobileOpen ? "rotate-45 translate-y-1.5" : ""
  //             }`}
  //           />
  //           <span
  //             aria-hidden="true"
  //             className={`block h-0.5 w-6 bg-white rounded my-1 transition-all duration-300 ${
  //               mobileOpen ? "opacity-0" : ""
  //             }`}
  //           />
  //           <span
  //             aria-hidden="true"
  //             className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
  //               mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
  //             }`}
  //           />
  //         </button>
  //       </nav>

  //       {/* Mobile Menu */}
  //       {mobileOpen && (
  //         <div className="lg:hidden bg-accent transition-all duration-300">
  //           <nav className="px-4 py-3">
  //             <ul className="flex flex-col gap-1">
  //               {/* Home Dropdown */}
  //               <li>
  //                 <details className="group">
  //                   <summary className="flex justify-between items-center px-3 py-2 text-white font-semibold cursor-pointer">
  //                     Home
  //                     <span className="text-xs">
  //                       <FaChevronDown />
  //                     </span>
  //                   </summary>
  //                   <ul className="pl-4 mt-1 flex flex-col gap-1">
  //                     <li>
  //                       <Link
  //                         href="/"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Home - Main
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/index-video"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Home - Video
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/index-slider"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Home - Slider
  //                       </Link>
  //                     </li>
  //                   </ul>
  //                 </details>
  //               </li>

  //               {/* About */}
  //               <li>
  //                 <Link
  //                   href="/about"
  //                   className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                 >
  //                   About Us
  //                 </Link>
  //               </li>

  //               {/* Blog */}
  //               <li>
  //                 <Link
  //                   href="/blog"
  //                   className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                 >
  //                   Blog
  //                 </Link>
  //               </li>

  //               {/* Pages Dropdown */}
  //               <li>
  //                 <details className="group">
  //                   <summary className="flex justify-between items-center px-3 py-2 text-white font-semibold cursor-pointer">
  //                     Pages
  //                     <span className="text-xs">
  //                       <FaChevronDown />
  //                     </span>
  //                   </summary>
  //                   <ul className="pl-4 mt-1 flex flex-col gap-1">
  //                     <li>
  //                       <Link
  //                         href="/blog-single"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Blog Details
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/features"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Features
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/testimonials"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Testimonials
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/faqs"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         FAQs
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/404"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         404
  //                       </Link>
  //                     </li>
  //                   </ul>
  //                 </details>
  //               </li>

  //               {/* Contact */}
  //               <li>
  //                 <Link
  //                   href="/contact"
  //                   className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                 >
  //                   Contact Us
  //                 </Link>
  //               </li>

  //               {/* Mobile bottom row */}
  //               <li className="mt-3 border-t border-white/20 pt-4">
  //                 <div className="flex items-center justify-between gap-3">
  //                   {/* Shop */}
  //                   <Link href="/products" className="shrink-0">
  //                     <Button variant="primary" className="rounded-full">
  //                       Shop Now
  //                     </Button>
  //                   </Link>

  //                   {/* User + Cart */}
  //                   <div className="flex items-center gap-2">
  //                     <Link
  //                       href="/cart"
  //                       className="flex items-center justify-center h-9 w-9 border rounded-full border-white text-white hover:bg-white hover:text-accent transition"
  //                       aria-label="Cart"
  //                     >
  //                       <span className="text-[18px]">
  //                         <FaCartArrowDown />
  //                       </span>
  //                     </Link>
  //                     <Link
  //                       href="/account"
  //                       className="flex items-center justify-center h-9 w-9 border rounded-full border-white text-white hover:bg-white hover:text-accent transition"
  //                       aria-label="Account"
  //                     >
  //                       <span className="text-[18px]">
  //                         <FaCircleUser />
  //                       </span>
  //                     </Link>
  //                   </div>
  //                 </div>
  //               </li>
  //             </ul>
  //           </nav>
  //         </div>
  //       )}
  //     </div>
  //   </header>
  // );
}
