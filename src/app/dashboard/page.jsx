import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

import RecentOrderSection from "@/components/layout/Dashboard/OverView/RecentOrderSection";
import QuickActionsSection from "@/components/layout/Dashboard/OverView/QuickActionsSection";
import LoyaltySection from "@/components/layout/Dashboard/OverView/LoyaltyCard";
import DashboardHeader from "@/components/layout/Dashboard/DashboardHeader";
import { FaQuestionCircle } from "react-icons/fa";
import Button from "@/components/ui/Button";

export default function DashboardOverviewPage() {
    return (
        <div className="flex flex-col gap-10">
            <RevealInAnimation direction="up">
                <DashboardHeader
                    title="Welcome back, Isabelle"
                    subtitle="Here's what's happening with your organic lifestyle today."
                    action={
                        <Button size="sm" variant="outline" leftIcon={<FaQuestionCircle />}>
                            Need Help?
                        </Button>
                    }
                />
            </RevealInAnimation>

            <FaderInAnimation direction="up" delay={0.2}>
                <RecentOrderSection />
            </FaderInAnimation>

            <FaderInAnimation direction="up" delay={0.4}>
                <QuickActionsSection />
            </FaderInAnimation>

            <FaderInAnimation direction="up" delay={0.6}>
                <LoyaltySection />
            </FaderInAnimation>
        </div>
    );
}