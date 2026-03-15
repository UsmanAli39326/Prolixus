import { apiService } from "@/lib/api";

/**
 * Fetch the list of countries from the backend.
 * Returns an array of { id, name } objects.
 * Falls back to an empty array on error.
 */
export async function getCountries() {
    try {
        const response = await apiService.get("/Configuration/countries");

        if (!response?.success || !response?.data) return [];

        return response.data.map((c) => ({
            id: c.id ?? c.countryId,
            name: c.name ?? c.countryName,
        }));
    } catch (error) {
        console.error("Countries API Error:", error);
        return [];
    }
}
