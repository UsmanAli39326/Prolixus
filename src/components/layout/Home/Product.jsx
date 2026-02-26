// import Card from "@/components/ui/Card";

// const PRODUCTS = [
//   {
//     img: "/images/product-image-1.png",
//     title: "Eco Glow Dropper",
//     price: "$16.00",
//   },
//   {
//     img: "/images/product-image-2.png",
//     title: "Vital Oil Dropper",
//     price: "$35.00",
//     delay: "0.2s",
//   },
//   {
//     img: "/images/product-image-3.png",
//     title: "Golden Drip Bottle",
//     price: "$45.00",
//     delay: "0.6s",
//   },
//   {
//     img: "/images/product-image-4.png",
//     title: "Zen Flow Dropper",
//     price: "$62.00",
//     delay: "1s",
//   },
// ];

// export default function ProductsSection() {
//   return (
//     <section className="our-products py-24">
//       <div className="container mx-auto px-4">
//         {/* Header Row */}
//         <div className="section-row mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
//           <div className="section-title max-w-xl">
//             <h3 className="wow fadeInUp capitalize tracking-[0.2em] text-sm font-thin font-accent italic mb-4 text-(--primary-color)">
//               our product
//             </h3>
//             <h2
//               className="text-anime-style-2 text-3xl lg:text-4xl font-bold leading-tight font-default text-(--primary-color)"
//               data-cursor="-opaque"
//             >
//               Premium droppers for pure,
//               <span className="block  text-(--dark-color)  font-accent font-light italic">
//                 precise application
//               </span>
//             </h2>
//           </div>

//           <div
//             className="section-btn wow fadeInUp flex lg:justify-end"
//             data-wow-delay="0.2s"
//           >
//             <a
//               href="#"
//               className="btn-default inline-block rounded-full bg-(--accent-color) px-6 py-2 text-sm font-semibold text-(--white-color)"
//             >
//               view all products
//             </a>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {PRODUCTS.map((p, i) => (
//             <Card
//               key={i}
//               img={p.img}
//               title={p.title}
//               price={p.price}
//               delay={p.delay}
//             />
//           ))}
//         </div>

//         {/* Footer Text */}
//         <div
//           className="section-footer-text wow fadeInUp mt-10 text-center"
//           data-wow-delay="0.8s"
//         >
//           <p className="m-0 text-sm sm:text-base">
//             <span className="mr-2 rounded-full bg-(--accent-color) px-3 py-1 text-xs font-semibold text-(--white-color)">
//               Free
//             </span>
//             Let&apos;s make something great work together.{" "}
//             <a
//               href="/contact"
//               className="italic underline text-(--accent-color) transition-colors hover:text-(--primary-color)"
//             >
//               Get Free Quote
//             </a>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


// ====================
//    NEW CODE
// ====================

import FaderInAnimation from "@/Hooks/FaderInAnimation";
import ProductCard from "../Ecommerce/ProductListingPage/ProductCard";

const PRODUCTS = [
  {
    id: "prolixus-30",
    image: "/images/new/prolixus-nutrients.jpeg",
    title: "Prolixus – 30 Tage",
    description:
      "Vitamin C, Eisen, Calcium und Magnesium zur täglichen Unterstützung.",
    price: 29.9,
    rating: 4.8,
    reviews: 124,
    badge: "Bestseller",
  },
  {
    id: "prolixus-90",
    image: "/images/new/prolixus-absorb.jpeg",
    title: "Prolixus – 90 Tage",
    description:
      "Langfristige Versorgung für einen aktiven Lebensstil.",
    price: 79.9,
    rating: 4.9,
    reviews: 86,
    badge: "Beliebt",
    delay: "0.2s",
  },
  {
    id: "prolixus-family",
    image: "/images/new/prolixus-steps.jpeg",
    title: "Prolixus Familienpack",
    description:
      "Ideal für die ganze Familie – hohe Verträglichkeit.",
    price: 99.9,
    rating: 4.7,
    reviews: 54,
    delay: "0.6s",
  },
  {
    id: "prolixus-special",
    image: "/images/new/prolixus-uv.jpeg",
    title: "Prolixus Special Edition",
    description:
      "Premium Qualität mit bewährter Rezeptur.",
    price: 62.0,
    rating: 4.8,
    reviews: 42,
    delay: "1s",
  },
];

export default function ProductsSection() {
  return (
    <section className="our-products py-24">
      <div className="container mx-auto px-4">

        {/* Header Row (UNCHANGED STRUCTURE) */}
        <div className="section-row mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="section-title max-w-xl">
            <h3 className="capitalize tracking-[0.2em] text-sm font-thin font-accent italic mb-4 text-(--primary-color)">
              Unsere Produkte
            </h3>

            <h2 className="text-3xl lg:text-4xl font-bold leading-tight font-default text-(--primary-color)">
              Prolixus für Ihre tägliche
              <span className="block text-(--accent-color) font-accent font-light italic">
                Vitalität
              </span>
            </h2>
          </div>

          <div className="section-btn flex lg:justify-end">
            <a
              href="/products"
              className="btn-default inline-block rounded-full bg-(--accent-color) px-6 py-2 text-sm font-semibold text-(--white-color)"
            >
              Alle Produkte ansehen
            </a>
          </div>
        </div>

        {/* Product Grid (UNCHANGED STRUCTURE) */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <FaderInAnimation direction="up" key={product.id} delay={product.delay}>
              <ProductCard product={product} />
            </FaderInAnimation>
          ))}
        </div>

      </div>
    </section>
  );
}
