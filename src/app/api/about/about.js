import { apiService } from "@/lib/api";

export  async function getAboutPayload() {
  try {
    const response = await apiService.get("/Configuration/about");
    console.log("about response:", response);

    if (!response?.success || !response?.data) return null;

    const about = response.data;

    return {
      companyName: about.companyName,
      title: about.title,
      shortDescription: about.shortDescription,
      description:about.description,
      address: about.address,
      email: about.email,
      mobile: about.mobile,
      phone: about.phone,
      activeTime: about.activeTime,
      currency: about.currency,
      currencySymbol: about.currencySymbol,
      shippingCost: about.shippingCost,
      freeShippingOnOrderPrice: about.freeShippingOnOrderPrice,
      googleMap: about.googleMapPinLocation,
      logoId: about.fileId,
    };

  } catch (error) {
    console.error("About API Error:", error);
    return null;
  }
}

