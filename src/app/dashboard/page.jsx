"use client";
import { useState, useEffect } from "react";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

import RecentOrderSection from "@/components/layout/Dashboard/OverView/RecentOrderSection";
import QuickActionsSection from "@/components/layout/Dashboard/OverView/QuickActionsSection";
import DashboardHeader from "@/components/layout/Dashboard/DashboardHeader";
import { getProfile } from "@/lib/ProfileService";
import { getCustomerOrders } from "@/lib/OrderService";
import { getWalletData } from "@/lib/PartnerService";

export default function DashboardOverviewPage() {
    const [user, setUser] = useState({ name: "" });
    const [stats, setStats] = useState({
        totalOrders: 0,
        walletBalance: 0,
        totalEarnings: 0,
    });
    const [recentOrder, setRecentOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [profileRes, ordersRes, walletRes] = await Promise.allSettled([
                    getProfile(),
                    getCustomerOrders(),
                    getWalletData()
                ]);

                let newStats = { ...stats };
                let newUser = { ...user };
                let newRecentOrder = null;

                if (profileRes.status === 'fulfilled' && profileRes.value?.data) {
                    newUser.name = profileRes.value.data.name;
                }

                if (ordersRes.status === 'fulfilled' && ordersRes.value?.data && Array.isArray(ordersRes.value.data)) {
                    newStats.totalOrders = ordersRes.value.data.length;
                    if (ordersRes.value.data.length > 0) {
                        newRecentOrder = ordersRes.value.data[0];
                    }
                }

                if (walletRes.status === 'fulfilled' && walletRes.value?.data) {
                    newStats.walletBalance = walletRes.value.data.remainingAffiliateAmount || 0;
                    newStats.totalEarnings = walletRes.value.data.totalAffiliateAmount || 0;
                }

                setUser(newUser);
                setStats(newStats);
                setRecentOrder(newRecentOrder);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-10">
            <RevealInAnimation direction="up">
                <DashboardHeader
                    title={`Welcome back, ${user.name}`}
                    subtitle="Here's what's happening with your organic lifestyle today."
                />
            </RevealInAnimation>

            <FaderInAnimation direction="up" delay={0.2}>
                <RecentOrderSection order={recentOrder} loading={loading} />
            </FaderInAnimation>

            <FaderInAnimation direction="up" delay={0.4}>
                <QuickActionsSection stats={stats} loading={loading} />
            </FaderInAnimation>
        </div>
    );
}