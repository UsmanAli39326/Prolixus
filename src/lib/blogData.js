


import { apiService } from "@/lib/api";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

let postsArray = [];

async function fetchPosts() {
  try {
    const res = await apiService.get("/Configuration/blogs");
    console.log("blog res.data:", res.data);
    debugger
    if (res?.success && Array.isArray(res.data)) {
      postsArray = res.data.map((blog) => ({
        id: blog.id ?? 0,
        slug: blog.slug ?? "",
        thumbnailImg: blog.file?.thumbnailUrl ? `https://admin.aa-consultants.de${blog.file.thumbnailUrl}` : "",
        img: blog.file?.url ? `https://admin.aa-consultants.de${blog.file.url}` : "",
        href: `/blog/${blog.id}`,
        title: blog.title ?? "",
        excerpt: blog.shortDescription ?? "",
        date: formatDate(blog.createdDateTime) ?? "",
        category: blog.category ?? "",
        author: blog.author ?? "",
        readTime: blog.readTime ?? "",
        content: blog.description
      }));
    }

    console.log("blog postsArray:", postsArray);


  } catch (err) {
    console.error(err);
  }
}

/* fetch immediately */
await fetchPosts();

/* EXPORT SAME NAME */
export const ALL_POSTS = postsArray;

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}


export async function getPostById(id) {
  return await ALL_POSTS.find((post) => post.id === Number(id)) || null;
}

export async function getRelatedPostsById(currentId, count = 3) {
  return await ALL_POSTS.filter((post) => post.id !== Number(currentId)).slice(0, count);
}
