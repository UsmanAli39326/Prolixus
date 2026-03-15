import Link from "next/link";
import { FaTruck } from "react-icons/fa";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function RecentOrderCard({ order }) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-divider flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:shadow-md transition-all">
            <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary font-default">
                        Invoice #{order.invoiceNumber}
                    </span>

                    <Badge variant="info" dot>
                        {order.orderStatus || "Processing"}
                    </Badge>

                    <Badge variant={order.isPaid ? "success" : "warning"} dot>
                        {order.isPaid ? "Paid" : "Unpaid"}
                    </Badge>
                </div>

                <p className="text-text/60 text-sm font-default">
                    Order Date:{" "}
                    <span className="font-bold text-primary">
                        {new Date(order.transactionDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                </p>
            </div>

            <div className="flex gap-3">
                <Link href={`/order-detail?orderId=${order.id}`}>
                    <Button
                        variant="accent"
                        size="sm"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}