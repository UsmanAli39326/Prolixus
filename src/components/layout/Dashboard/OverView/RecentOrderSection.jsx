import Link from "next/link";
import RecentOrderCard from "./RecentOrderCard";

export default function RecentOrderSection() {
    const order = {
        id: "402-91",
        status: "Shipped",
        deliveryDate: "Friday, Oct 24",
    };

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