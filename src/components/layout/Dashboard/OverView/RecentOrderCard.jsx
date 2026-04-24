import Link from "next/link";
import { FaTruck } from "react-icons/fa";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function RecentOrderCard({ order }) {
    return (
        <div className="bg-white dark:bg-background-dark/30 rounded-2xl p-6 shadow-sm border border-divider flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col gap-4 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="p-3 bg-accent/10 rounded-xl text-accent">
                        <FaTruck className="text-xl" />
                    </div>
                    <div>
                        <span className="text-lg font-bold text-primary font-default block leading-none mb-1">
                            Invoice #{order.invoiceNumber}
                        </span>
                        <div className="flex items-center gap-2">
                            <Badge variant="info" dot className="text-[10px] py-0.5">
                                {order.orderStatus || "Processing"}
                            </Badge>
                            <Badge variant={order.isPaid ? "success" : "warning"} dot className="text-[10px] py-0.5">
                                {order.isPaid ? "Paid" : "Unpaid"}
                            </Badge>
                        </div>
                    </div>
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
                <Link href={`/order-detail?orderId=${order.id}`} className="w-full md:w-auto">
                    <Button
                        variant="accent"
                        size="sm"
                        className="w-full md:w-auto px-8 rounded-xl shadow-lg shadow-accent/10 group-hover:shadow-accent/20 transition-all"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}