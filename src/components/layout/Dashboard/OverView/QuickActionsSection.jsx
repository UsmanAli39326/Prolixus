import { FaArrowRight, FaHandshake, FaIdBadge } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import ActionCard from "./ActionCard";

export default function QuickActionsSection({ stats, loading }) {
    return (
        <section>
            <h2 className="text-xl font-accent text-primary mb-4">
                Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <ActionCard
                    icon={<FaIdBadge />}
                    title="Profile Settings"
                    description="Manage your personal details"
                    actionLabel="Edit Profile"
                    href="/dashboard/profile"
                />

                <ActionCard
                    icon={<FaLocationDot />}
                    title="Saved Addresses"
                    description="Manage shipping destinations"
                    actionLabel="Manage Addresses"
                    href="/dashboard/profile"
                />

                <ActionCard
                    icon={<FaHandshake />}
                    title="Partner Program"
                    description="Affiliate Summary"
                    value={loading ? "..." : `$${(stats.walletBalance || 0).toFixed(2)}`}
                    actionLabel="Partner Dashboard"
                    href="/dashboard/partner"
                />

            </div>
        </section>
    );
}