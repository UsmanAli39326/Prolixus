import Badge from "@/components/ui/Badge";
import { stripHtmlTags } from "@/utitlis/formatters";

export default function OrderItem({ item }) {
    return (
        <div className="flex gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100 dark:border-white/5 relative">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className={`w-full h-full bg-linear-to-br ${item.color || 'from-amber-50 to-orange-100'}`} />
                )}
                {item.quantity > 1 && (
                    <Badge
                        variant="info"
                        className="absolute top-0 right-0 -mt-2 -mr-2 size-5 flex items-center justify-center p-0 text-[10px]"
                    >
                        {item.quantity}
                    </Badge>
                )}
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-semibold text-primary text-base leading-tight">{item.name}</h4>
                <p className="text-sm text-text mt-1 truncate max-w-[200px] font-accent">
                    {item.variant || stripHtmlTags(item.description) || "Product"}
                </p>
            </div>

            <div className="flex flex-col justify-center text-right">
                <span className="font-semibold text-primary whitespace-nowrap">${item.price.toFixed(2)}</span>
                <span className="text-xs text-text/60 font-accent">Qty: {item.quantity}</span>
            </div>
        </div>
    );
}
