import { apiService } from "@/lib/api";

export async function getShopMenus() {
  try {
    const response = await apiService.get("/Configuration/shopmenus");

    console.log("shopmenus response:", response);

    if (!response?.success) return [];

    // Filter + Sort + Clean Data
    const menus = response.data
      .filter((m) => m.isActive) // only active
      .sort((a, b) => a.priority - b.priority) // priority wise
      .map((m) => ({
        id: m.id,
        label: m.name,
        url: m.url,
      }));

    return menus;

  } catch (error) {
    console.error("ShopMenus API Error:", error);
    return [];
  }
}
