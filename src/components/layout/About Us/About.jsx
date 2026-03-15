import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { stripHtmlTags } from "@/utitlis/formatters";
import {getAboutPayload} from "@/app/api/about/about";

export default async function AboutSection() {
  const about = await getAboutPayload(); // 👈 API CALL
  return (
    <section className="about-us py-24 lg:py-28 bg-(--secondary-color)">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Left: Image */}
          <div>
            <div className="relative">
              <img
                src="/images/new/prolixus-lifestyle.jpeg"
                alt="Prolixus Vitalität"
                className="w-full rounded-2xl object-cover aspect-[1/1.1] shadow-lg"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8">

            {/* Title */}
            <div className="space-y-4">
              <FaderInAnimation direction="up">
                <h3 className="font-accent text-3xl italic text-(--accent-color)">
                  {about.title}
                </h3>
              </FaderInAnimation>
{/* 
              <RevealInAnimation direction="left" delay={0.2}>
                <h2 className="font-default text-3xl font-bold leading-tight text-(--primary-color) sm:text-4xl">
                  Für Sie und Ihre Familie
                </h2>
              </RevealInAnimation> */}

              <FaderInAnimation direction="up" delay={0.3}>
                <p className="text-base text-(--text-color) leading-relaxed">
                  {stripHtmlTags(about.description)}
                </p>
              </FaderInAnimation>
            </div>

            {/* Benefits */}
            {/* <FaderInAnimation direction="up" delay={0.4}>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaCircle size={10} className="mt-2 text-(--accent-color)" />
                  <span>Unterstützt den normalen Energiestoffwechsel</span>
                </li>

                <li className="flex items-start gap-3">
                  <FaCircle size={10} className="mt-2 text-(--accent-color)" />
                  <span>Trägt zur Verringerung von Müdigkeit bei</span>
                </li>

                <li className="flex items-start gap-3">
                  <FaCircle size={10} className="mt-2 text-(--accent-color)" />
                  <span>Vegan, glutenfrei und ohne Zusatzstoffe</span>
                </li>
              </ul>
            </FaderInAnimation> */}

            {/* CTA */}
            {/* <FaderInAnimation direction="up" delay={0.5}>
              <a
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-(--accent-color) px-8 py-3 text-sm font-semibold text-(--white-color) shadow-md hover:opacity-90 transition"
              >
                Mehr über Prolixus erfahren
              </a>
            </FaderInAnimation> */}

          </div>
        </div>
      </div>
    </section>
  );
}

// ==============================
// OLD SECTION
// ==============================

// import FaderInAnimation from "@/Hooks/FaderInAnimation";
// import RevealInAnimation from "@/Hooks/RevealInAnimation";
// import { FaCircle } from "react-icons/fa"; 
// import {getAboutPayload} from "@/app/api/about/about";

// export default async function AboutSection() {
//   const about = await getAboutPayload(); // 👈 API CALL
//   return (
//     <section className="about-us py-24 lg:py-28 bg-(--secondary-color)">
//       <div className="container mx-auto px-4">
//         <div className="grid items-center gap-10 lg:grid-cols-2">
//           {/* Left: Image */}
//           <div>
//             <div className="relative lg:pr-10">
//               <figure>
//                 <img
//                   src="/images/about-image.png"
//                   alt="About us"
//                   className="w-full rounded-2xl object-cover aspect-[1/1.072]"
//                 />
//               </figure>

//               {/* Premium Quality Circle */}
//               <div className="absolute -top-8 right-0">
//                 <img
//                   src="/images/premium-quality-circle-2.png"
//                   alt="Premium quality"
//                   className="w-full max-w-[130px] animate-spin-slowly"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right: Content */}
//           <div>
//             <div className="space-y-8">
//               {/* Title */}
//               <div className="space-y-4">
//                 {/* <FaderInAnimation direction="up">
//                   <h3 className="font-accent text-xl font-light italic capitalize text-(--primary-color)">
//                     about us
//                   </h3>
//                 </FaderInAnimation> */}

//                 <RevealInAnimation direction="left" delay={0.2}>
//                   <h2 className="font-default text-2xl font-bold leading-tight text-(--primary-color) sm:text-3xl lg:text-4xl">
//                     {about.companyName}{" "}
//                     {/* <span className="block font-accent font-light italic text-(--accent-color)">
//                       ultimate care always
//                     </span> */}
//                   </h2>
//                 </RevealInAnimation>

//                 <FaderInAnimation direction="up" delay={0.2}>
//                   <p className="text-sm text-(--text-color) sm:text-base">
//                     {/* We believe that every drop matters. Our premium oil dropper
//                     bottles are designed to deliver purity, precision, and care
//                     with every use. */}
//                     {about.shortDescription}
//                   </p>
//                 </FaderInAnimation>
//               </div>

         
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
