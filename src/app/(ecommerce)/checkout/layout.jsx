import OrderSummary from "@/components/layout/Ecommerce/CheckoutPage/OrderSummary";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function CheckoutLayout({ children }) {
    return (
        <div className="bg-secondary text-text font-default antialiased min-h-screen flex flex-col">
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #ddd;
                    border-radius: 20px;
                }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}} />

            <main className="grow flex justify-center w-full px-4 py-8 lg:px-8">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-8">
                        <FaderInAnimation direction="up" distance={20}>
                            {children}
                        </FaderInAnimation>
                    </div>
                    <div className="lg:col-span-12 xl:col-span-5">
                        <FaderInAnimation direction="left" delay={0.2}>
                            <OrderSummary />
                        </FaderInAnimation>
                    </div>
                </div>
            </main>
        </div>
    );
}
