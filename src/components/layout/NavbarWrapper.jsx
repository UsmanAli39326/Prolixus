import { getShopMenus } from "@/app/api/layout/navbar";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const menus = await getShopMenus();
  return <Navbar menus={menus} />;
}
