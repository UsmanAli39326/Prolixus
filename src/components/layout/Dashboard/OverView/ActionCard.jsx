import { FaArrowRight } from "react-icons/fa";
import Button from "@/components/ui/Button";

export default function ActionCard({
    icon,
    title,
    description,
    actionLabel,
    value,
}) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-divider hover:shadow-md transition-all group overflow-hidden relative">
            <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-secondary rounded-lg text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <span className="text-xl flex items-center justify-center size-6">{icon}</span>
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-accent font-bold text-primary leading-tight">
                        {title}
                    </h3>
                    <p className="text-sm text-text/60 font-default mt-1">
                        {description}
                    </p>
                </div>
            </div>

            {value && (
                <p className="text-2xl font-bold text-primary font-default my-2">{value}</p>
            )}

            <div className="mt-4 pt-4 border-t border-divider">
                <Button
                    variant="link"
                    size="xs"
                    rightIcon={<FaArrowRight className="text-[10px]" />}
                    className="p-0 h-auto font-bold"
                >
                    {actionLabel}
                </Button>
            </div>
        </div>
    );
}