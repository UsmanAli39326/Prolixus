import Link from "next/link";
import RecentOrderCard from "./RecentOrderCard";

export default function RecentOrderSection({ order, loading }) {
    if (loading) {
        return (
            <section>
                <div className="flex items-center justify-between mb-4 animate-pulse">
                    <div className="h-6 bg-gray-100 rounded w-32"></div>
                    <div className="h-4 bg-gray-100 rounded w-24"></div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-divider h-24 animate-pulse"></div>
            </section>
        );
    }

    if (!order) {
        return (
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-accent text-primary">Recent Order</h2>
                </div>
                <div className="bg-white rounded-xl p-10 shadow-sm border border-divider text-center">
                    <p className="text-text/60 font-default">No recent orders found.</p>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-accent text-primary">Recent Order</h2>
                <Link
                    href="/dashboard/orders"
                    className="text-sm font-bold text-accent hover:text-accent/80 underline decoration-2 underline-offset-4"
                >
                    View All Orders
                </Link>
            </div>

            <RecentOrderCard order={order} />
        </section>
    );
}
