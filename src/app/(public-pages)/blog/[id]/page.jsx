import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import BlogDetail from "@/components/layout/Blog/BlogDetail";
import { getPostById, ALL_POSTS } from "@/lib/blogData";

export async function generateStaticParams() {
    return await ALL_POSTS.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const post = await getPostById(id);
    if (!post) return {};
    return {
        title: `${post.title} | Prolixus Blog`,
        description: post.excerpt,
    };
}

export default async function BlogDetailPage({ params }) {
    const { id } = await params;
    const post = await getPostById(id);
    if (!post) return notFound();

    return (
        <>
            <PageHeader title={post.category} subtitle="Artikel" />
            <BlogDetail post={post} />
        </>
    );
}
