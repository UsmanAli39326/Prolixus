import DashboardLayoutClient from "./DashboardLayoutClient";

export const metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
