import BlogCard from "@/components/layout/Blog/BlogCard";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { ALL_POSTS } from "@/lib/blogData";


export default function BlogListing() {
    return (
        <section className="blog-listing-section pt-16 pb-24">
            <div className="container mx-auto px-4">

                {/* Intro text */}
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <FaderInAnimation direction="up">
                        <h3 className="text-sm font-semibold capitalize text-(--primary-color) font-default tracking-[0.2em] mb-3">
                            Unser Blog
                        </h3>
                    </FaderInAnimation>
                    <RevealInAnimation>
                        <h2 className="font-default text-(--primary-color) text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                            Einblicke, Trends und{" "}
                            <span className="font-accent font-light italic">
                                Experten-Tipps
                            </span>
                        </h2>
                    </RevealInAnimation>
                    <FaderInAnimation direction="up" delay="0.2s">
                        <p className="mt-4 text-(--text-color)/70 leading-relaxed">
                            Bleiben Sie informiert mit unseren neuesten Artikeln rund um
                            Gesundheit, Ernährung und Wohlbefinden.
                        </p>
                    </FaderInAnimation>
                </div>

                {/* Posts grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {ALL_POSTS.map((post, idx) => (
                        <BlogCard key={idx} post={post} index={idx} />
                    ))}
                </div>

            </div>
        </section>
    );
}
