// const categories = [
//   {
//     label: "Skincare",
//     children: ["Cleansers", "Serums", "Moisturizers", "Masks"],
//   },
//   {
//     label: "Haircare",
//   },
//   {
//     label: "Body & Bath",
//   },
// ];

// export default categories;


import { apiService } from "@/lib/api";

export default async function categories() {
  try {
    const response = await apiService.get("/Configuration/categories");

    console.log("cateegories response:",response)

    if (!response?.success) return [];

    return response.data.map((cat) => ({
      label: cat.name,
      children: cat.subCategories?.map((s) => s.name) || [],
    }));
  } catch (error) {
    console.error("Categories API Error:", error);
    return [];
  }
}
