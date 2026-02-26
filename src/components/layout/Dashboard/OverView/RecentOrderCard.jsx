import { FaTruck } from "react-icons/fa";
import Button from "@/components/ui/Button";

export default function RecentOrderCard({ order }) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-divider flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:shadow-md transition-all">
            <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary font-default">
                        Order #{order.id}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider border border-green-200">
                        {order.status}
                    </span>
                </div>

                <p className="text-text/60 text-sm font-default">
                    Estimated Delivery:{" "}
                    <span className="font-bold text-primary">
                        {order.deliveryDate}
                    </span>
                </p>
            </div>

            <div className="flex gap-3">
                <Button
                    variant="accent"
                    size="sm"
                    leftIcon={<FaTruck />}
                    className="shadow-sm"
                >
                    Track Order
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                >
                    View Details
                </Button>
            </div>
        </div>
    );
}