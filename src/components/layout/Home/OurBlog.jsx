// import FaderInAnimation from "@/Hooks/FaderInAnimation";
// import RevealInAnimation from "@/Hooks/RevealInAnimation";

// const POSTS = [
//   {
//     img: "/images/post-1.jpg",
//     href: "/blog-single",
//     title: "Glass vs. Plastic Droppers Which One is Right for You?",
//     date: "May 17, 2025",
//     delay: "0s",
//   },
//   {
//     img: "/images/post-2.jpg",
//     href: "/blog-single",
//     title: "Sustainable Beauty Why Reusable dropper are the future",
//     date: "May 20, 2025",
//     delay: "0.2s",
//   },
//   {
//     img: "/images/post-3.jpg",
//     href: "/blog-single",
//     title: "Science Behind Precision Droppers and Their Benefits",
//     date: "May 23, 2025",
//     delay: "0.4s",
//   },
// ];

// export default function OurBlog() {
//   return (
//     <section className="our-blog pt-24 pb-16">
//       <div className="container mx-auto px-4">
//         {/* Header row */}
//         <div className="section-row mb-10 flex flex-col gap-6 lg:flex-row lg:items-center">
//           <div className="w-full lg:w-1/2">
//             <div className="section-title m-4 p-7">
//               <FaderInAnimation direction="up">
//                 <h3 className="text-sm font-semibold capitalize text-primary font-default tracking-[0.2em]">
//                   latest blog
//                 </h3>
//               </FaderInAnimation>
//               <RevealInAnimation>
//                 <h2
//                   className="text-anime-style-2 font-default text-primary text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
//                   data-cursor="-opaque"
//                 >
//                   Latest insights, trends, and{" "}
//                   <span className="block  font-accent font-light italic">
//                     expert tips
//                   </span>
//                 </h2>
//               </RevealInAnimation>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2">
//             <div
//               className="section-btn wow fadeInUp flex justify-start lg:justify-end"
//               data-wow-delay="0.2s"
//             >
//               <a
//                 href="/blog"
//                 className="btn-default inline-flex rounded-full px-6 py-2 text-sm font-semibold bg-(--accent-color) text-(--white-color)  transition"
//               >
//                 view all blog
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Posts grid */}
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {POSTS.map((post, idx) => (
//             <div key={idx}>
//               <FaderInAnimation direction="up" delay={post.delay}>
//                 {/* Post Item */}
//                 <article className="post-item h-full overflow-hidden rounded-2xl border border-(--divider-color) bg-(--white-color) shadow-[0_0_30px_0_rgba(0,0,0,0.05)]">
//                   {/* Featured Image */}
//                   <div className="post-featured-image">
//                     <a
//                       href={post.href}
//                       data-cursor-text="View"
//                       className="block overflow-hidden"
//                     >
//                       <figure className="image-anime block">
//                         <img
//                           src={post.img}
//                           alt={post.title}
//                           className="w-full aspect-[1/0.673] object-cover transition-transform duration-500"
//                         />
//                       </figure>
//                     </a>
//                   </div>

//                   {/* Body */}
//                   <div className="post-item-body p-6">
//                     {/* Content */}
//                     <div className="post-item-content border-b border-(--divider-color) pb-6 mb-6">
//                       <h2 className="text-[20px] leading-snug">
//                         <a href={post.href} className="text-inherit">
//                           {post.title}
//                         </a>
//                       </h2>
//                     </div>

//                     {/* Footer */}
//                     <div className="post-item-footer flex flex-wrap items-center justify-between gap-3">
//                       {/* Meta */}
//                       <div className="post-meta">
//                         <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
//                           <li className="flex items-center gap-2 text-sm capitalize">
//                             <i className="fa-solid fa-calendar-days text--accent-color text-base" />
//                             {post.date}
//                           </li>
//                         </ul>
//                       </div>

//                       {/* Read more */}
//                       <div className="post-item-btn">
//                         <a href={post.href} className="readmore-btn text-sm">
//                           read more
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               </FaderInAnimation>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section >
//   );
// }


// =====================
//    NEW CODE
// =====================


import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";

const POSTS = [
  {
    img: "/images/new/prolixus-usage.jpeg",
    href: "/blog/energiestoffwechsel",
    title: "Warum ist ein gesunder Energiestoffwechsel so wichtig?",
    date: "17. Mai 2025",
    delay: "0s",
  },
  {
    img: "/images/new/prolixus-lifestyle.jpeg",
    href: "/blog/mineralstoffe-im-alltag",
    title: "Mineralstoffe im Alltag – worauf Sie achten sollten",
    date: "20. Mai 2025",
    delay: "0.2s",
  },
  {
    img: "/images/new/prolixus-uv.jpeg",
    href: "/blog/vitamin-c-und-eisen",
    title: "Vitamin C & Eisen – eine sinnvolle Kombination?",
    date: "23. Mai 2025",
    delay: "0.4s",
  },
];


export default function OurBlog() {
  return (
    <section className="our-blog pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header row */}
        <div className="section-row mb-10 flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="w-full lg:w-1/2">
            <div className="section-title m-4 p-7">
              <FaderInAnimation direction="up">
                <h3 className="text-sm font-semibold capitalize text-(--primary-color) font-default tracking-[0.2em]">
                  Aktuelle Blogbeiträge
                </h3>
              </FaderInAnimation>
              <RevealInAnimation>
                <h2
                  className="text-anime-style-2 font-default text-(--primary-color) text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
                  data-cursor="-opaque"
                >
                  Einblicke, Trends und{" "}
                  <span className="block font-accent font-light italic">
                    Experten-Tipps
                  </span>
                </h2>
              </RevealInAnimation>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div
              className="section-btn wow fadeInUp flex justify-start lg:justify-end"
              data-wow-delay="0.2s"
            >
              <a
                href="/blog"
                className="btn-default inline-flex rounded-full px-6 py-2 text-sm font-semibold bg-(--accent-color) text-(--white-color)  transition"
              >
                view all blog
              </a>
            </div>
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, idx) => (
            <div key={idx}>
              <FaderInAnimation direction="up" delay={post.delay}>
                {/* Post Item */}
                <article className="post-item h-full overflow-hidden rounded-2xl border border-(--divider-color) bg-(--white-color) shadow-[0_0_30px_0_rgba(0,0,0,0.05)]">
                  {/* Featured Image */}
                  <div className="post-featured-image">
                    <a
                      href={post.href}
                      data-cursor-text="View"
                      className="block overflow-hidden"
                    >
                      <figure className="image-anime block">
                        <img
                          src={post.img}
                          alt={post.title}
                          className="w-full aspect-[1/0.673] object-cover transition-transform duration-500"
                        />
                      </figure>
                    </a>
                  </div>

                  {/* Body */}
                  <div className="post-item-body p-6">
                    {/* Content */}
                    <div className="post-item-content border-b border-(--divider-color) pb-6 mb-6">
                      <h2 className="text-[20px] leading-snug">
                        <a href={post.href} className="text-inherit">
                          {post.title}
                        </a>
                      </h2>
                    </div>

                    {/* Footer */}
                    <div className="post-item-footer flex flex-wrap items-center justify-between gap-3">
                      {/* Meta */}
                      <div className="post-meta">
                        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                          <li className="flex items-center gap-2 text-sm capitalize">
                            <i className="fa-solid fa-calendar-days text-(--accent-color) text-base" />
                            {post.date}
                          </li>
                        </ul>
                      </div>

                      {/* Read more */}
                      <div className="post-item-btn">
                        <a href={post.href} className="readmore-btn text-sm">
                          read more
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </FaderInAnimation>
            </div>
          ))}
        </div>
      </div>
    </section >
  );
}
