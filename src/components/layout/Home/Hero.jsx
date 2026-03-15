// import Image from "next/image";
// import Link from "next/link";
// import FadeInAnimation from "@/Hooks/FaderInAnimation";
// import { FaPhone } from "react-icons/fa";
// import RevealInAniation from "@/Hooks/RevealInAnimation";
// import Button from "@/components/ui/Button";

// export default function Hero() {
//   return (
//     <section
//       className="relative overflow-hidden bg-cover bg-center pb-20 lg:pt-[220px] lg:pb-[110px] bg--secondary-color"
//       style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg--primary-color/80" />

//       <div className="relative z-2 container mx-auto px-4">
//         <div className="grid items-center gap-10 lg:grid-cols-2">
//           {/* Left: Content */}
//           <div>
//             <div className="hero-content text--white-color">
//               {/* Section Title */}
//               <div className="section-title space-y-4">
//                 <FadeInAnimation direction="up">
//                   <h3 className="text font-accent italic flex tracking-wide capitalize text-white align-middle items-center gap-2">
//                     <span className="w-2 h-2 rounded-2xl bg-accent"></span>
//                     Discover the power of premium
//                   </h3>
//                 </FadeInAnimation>

//                 <RevealInAniation delay={0.2} coverColor="#000">
//                   <h1 className="text-3xl sm:text-4xl lg:text-5xl font-default font-bold leading-tight text-white">
//                     Pure drops perfect precision{" "}
//                     <span className="font-light text--accent-color font-accent italic">
//                       care you can trust.
//                     </span>
//                   </h1>
//                 </RevealInAniation>

//               </div>

//               {/* Content Body */}
//               <FadeInAnimation direction="up">

//                 <div className="hero-content-body mt-8 flex flex-wrap items-center gap-6 lg:gap-10">
//                   <p className="max-w-xl text-sm sm:text-base text-white/90">
//                     Experience the perfect balance of purity and precision with
//                     our premium oil droppers Designed for effortless application,
//                     our high-quality droppers ensure accurate dispensing, minimal
//                     waste, and maximum potency.
//                   </p>
//                   {/* Button */}
//                   <div className="hero-btn">
//                     <Link href="/contact">
//                       <Button
//                         variant="accent"
//                         size="lg"
//                         className="!rounded-full shadow-md transition-transform duration-200 hover:translate-y-0.5 hover:shadow-lg"
//                       >
//                         Purchase Now
//                       </Button>
//                     </Link>
//                   </div>

//                   {/* Contact Now Box */}
//                   <Link
//                     href="tel:+91123468963"
//                     className="contact-now-box inline-flex items-center text-left group"
//                   >
//                     <div className="icon-box mr-4 flex h-12 w-12 items-center justify-center rounded-full bg--accent-color transition-all duration-300 group-hover:bg--accent-color/90">
//                       <i className="fa-solid fa-phone text-2xl text--white-color" />
//                     </div>

//                     <div className="contact-now-box-content flex ">
//                       <span className="bg-accent rounded-4xl w-12 h-12 text-white flex justify-center align-middle items-center mr-4 transition-colors duration-300 group-hover:bg--white-color group-hover:text--accent-color text-2xl">
//                         <FaPhone />
//                       </span>
//                       <div>
//                         <h3 className="text-[20px] font-semibold text--white-color mb-0.5 font-default">
//                           Call Us
//                         </h3>
//                         <p className="m-0 text--white-color">
//                           <span className="transition-colors duration-300 group-hover:text--accent-color font-default">
//                             +91 - 123 468 963
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               </FadeInAnimation>
//             </div>
//           </div>

//           {/* Right: Image */}
//           <div>
//             <div className="hero-image relative mx-6 lg:mx-14">
//               <figure className="block">
//                 <Image
//                   src="/images/hero-image.png"
//                   alt="Premium oil dropper"
//                   width={600}
//                   height={800}
//                   className="h-auto w-full object-cover aspect-[1/1.357]"
//                   priority
//                 />
//               </figure>

//               {/* Premium Quality Circle */}
//               <div className="premium-quality-circle absolute top-0 left-0">
//                 <Image
//                   src="/images/premium-quality-circle-1.png"
//                   alt="Premium quality seal"
//                   width={140}
//                   height={140}
//                   className="w-full max-w-[140px] animate-spin-slowly"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeInAnimation from "@/Hooks/FaderInAnimation";
import { FaPhone } from "react-icons/fa";
import RevealInAniation from "@/Hooks/RevealInAnimation";
import Button from "@/components/ui/Button";

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Delay video loading to prioritize critical assets
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center pb-20 lg:pt-[220px] lg:pb-[110px] bg--secondary-color"
    >
      {/* Background Video (Delayed) */}
      {isVideoLoaded && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        >
          <source src="/videos/hero-video-compressed.mp4" type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-(--primary-color)/85 via-(--primary-color)/60 to-transparent z-1" />

      <div className="relative z-2 container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">

          {/* Left: Content */}
          <div>
            <div className="hero-content text--white-color">

              <div className="section-title space-y-4">
                <FadeInAnimation direction="up">
                  <h3 className="text font-accent italic flex tracking-wide capitalize text-white align-middle items-center gap-2">
                    <span className="w-2 h-2 rounded-2xl bg-accent"></span>
                    Nahrungsergänzungsmittel mit hochwertigen Inhaltsstoffen
                  </h3>
                </FadeInAnimation>

                <RevealInAniation delay={0.2} coverColor="#000">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-default font-bold leading-tight text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
                    Prolixus – Ihr perfekter Start{" "}
                    <span className="font-light text--accent-color font-accent italic">
                      in den Tag
                    </span>
                  </h1>
                </RevealInAniation>
              </div>

              <FadeInAnimation direction="up">
                <div className="hero-content-body mt-8 flex flex-wrap items-center gap-6 lg:gap-10">

                  <p className="max-w-xl text-sm sm:text-base text-white/90">
                    Die Kombination aus Vitamin C, Eisen, Calcium und Magnesium
                    unterstützt Ihren Stoffwechsel und trägt zu Ihrem täglichen
                    Wohlbefinden bei. Ideal für einen aktiven Lebensstil – auch
                    für die fitte Generation 50+ geeignet.
                  </p>

                  <div className="hero-btn">
                    <Link href="/contact">
                      <Button
                        variant="accent"
                        size="lg"
                        className="rounded-full! shadow-md transition-transform duration-200 hover:translate-y-0.5 hover:shadow-lg"
                      >
                        Zum Shop
                      </Button>
                    </Link>
                  </div>

                  <Link
                    href="tel:+491234567890"
                    className="contact-now-box inline-flex items-center text-left group"
                  >
                    <div className="icon-box mr-4 flex h-12 w-12 items-center justify-center rounded-full bg--accent-color transition-all duration-300 group-hover:bg--accent-color/90">
                      <i className="fa-solid fa-phone text-2xl text--white-color" />
                    </div>

                    <div className="contact-now-box-content flex ">
                      <span className="bg-accent rounded-4xl w-12 h-12 text-white flex justify-center align-middle items-center mr-4 transition-colors duration-300 group-hover:bg--white-color group-hover:text--accent-color text-2xl">
                        <FaPhone />
                      </span>
                      <div>
                        <h3 className="text-[20px] font-semibold text-white mb-0.5 font-default">
                          Persönliche Beratung
                        </h3>
                        <p className="m-0 text-white">
                          <span className="transition-colors duration-300 text-white/80  group-hover:text--accent-color font-default">
                            Jetzt Kontakt aufnehmen
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>

                </div>
              </FadeInAnimation>
            </div>
          </div>

          {/* Right: Image */}
          <div>
            <div className="hero-image relative mx-6 lg:mx-14">
              <figure className="block">
                <Image
                  src="/images/new/bottle.png"
                  alt="Prolixus Nahrungsergänzungsmittel"
                  width={600}
                  height={800}
                  className="h-auto w-full object-cover aspect-[1/1.357]"
                  priority
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}