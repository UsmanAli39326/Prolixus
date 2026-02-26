import Button from "@/components/ui/Button";

export default function DashboardHeader({
    title,
    subtitle,
    action,
    showBorder = true,
    children,
}) {
    return (
        <header
            className={`flex flex-col md:flex-row justify-between md:items-end gap-4 pb-6 ${showBorder ? "border-b border-divider" : ""
                }`}
        >
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-accent italic font-bold text-primary leading-tight">
                    {title}
                </h1>

                {subtitle && (
                    <p className="text-text/70 font-default text-base">
                        {subtitle}
                    </p>
                )}

                {children}
            </div>

            {action && (
                <div className="flex items-center">
                    {action}
                </div>
            )}
        </header>
    );
}