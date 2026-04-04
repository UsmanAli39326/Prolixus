import { Suspense } from "react";
import dynamic from "next/dynamic";

const OrderDetailContent = dynamic(() => import("./OrderDetailContent"), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <p className="text-xl text-text/80 font-medium animate-pulse">
                Loading order details...
            </p>
        </div>
    )
});

export async function generateMetadata({ searchParams }) {
    const { orderId } = await searchParams;
    return {
        title: `Order Details #${orderId || "N/A"}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default function OrderDetailPage() {
    return (
        <Suspense
            fallback={
                <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                    <p className="text-xl text-text/80 font-medium animate-pulse">
                        Loading order details...
                    </p>
                </div>
            }
        >
            <OrderDetailContent />
        </Suspense>
    );
}