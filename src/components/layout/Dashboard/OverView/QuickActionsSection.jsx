import { FaArrowRight, FaHandshake, FaIdBadge, FaHeadset } from "react-icons/fa";
import ActionCard from "./ActionCard";
import { useCurrency } from "@/context/CurrencyContext";

export default function QuickActionsSection({ stats, loading }) {
    const { formatPrice } = useCurrency();
    return (
        <section>
            <h2 className="text-xl font-accent text-primary mb-4">
                Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                <ActionCard
                    icon={<FaIdBadge />}
                    title="Profile Settings"
                    description="Manage your personal details"
                    actionLabel="Edit Profile"
                    href="/dashboard/profile"
                />

                <ActionCard
                    icon={<FaHeadset />}
                    title="Contact Support"
                    description="Get help with your orders"
                    actionLabel="Get Support"
                    href="/contact"
                />

                <ActionCard
                    icon={<FaHandshake />}
                    title="Partner Program"
                    description="Affiliate Summary"
                    value={loading ? "..." : formatPrice(stats.walletBalance || 0)}
                    actionLabel="Partner Dashboard"
                    href="/dashboard/partner"
                />

            </div>
        </section>
    );
}