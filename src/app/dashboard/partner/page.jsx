"use client";
import React, { useState } from "react";
import {
    FaChevronRight,
    FaWallet,
    FaUsers,
    FaChartLine,
    FaLink,
    FaCopy,
    FaCheckCircle
} from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";

import DashboardHeader from "@/components/layout/Dashboard/DashboardHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

const mockCommissions = [
    {
        id: "#ORD-9923",
        date: "Oct 24, 2023",
        status: "Completed",
        earnings: "$128.50",
        variant: "success",
    },
    {
        id: "#ORD-9841",
        date: "Oct 22, 2023",
        status: "Pending",
        earnings: "$45.00",
        variant: "warning",
    },
    {
        id: "#ORD-9755",
        date: "Oct 18, 2023",
        status: "Completed",
        earnings: "$212.00",
        variant: "success",
    },
    {
        id: "#ORD-9630",
        date: "Oct 15, 2023",
        status: "Canceled",
        earnings: "$85.00",
        variant: "error",
        canceled: true
    },
];

const StatsCard = ({ title, value, trend, detail, icon: Icon }) => (
    <div className="group relative overflow-hidden rounded-xl bg-primary p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-all group-hover:bg-accent/10"></div>
        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
            <div className="flex items-center justify-between">
                <span className="font-accent text-sm font-medium text-white/80 uppercase tracking-wider">{title}</span>
                <Icon className="text-accent/80 text-xl" />
            </div>
            <div>
                <div className="text-3xl font-bold text-accent">{value}</div>
                <div className="mt-2 flex items-center gap-1 text-xs text-white/60">
                    <MdTrendingUp className="text-sm text-green-400" />
                    <span className="text-green-400 font-medium">{trend}</span>
                    <span>{detail}</span>
                </div>
            </div>
        </div>
    </div>
);

export default function PartnerProgramPage() {
    const [referralLink] = useState("organicbrand.com/ref/jdoe23");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const columns = [
        {
            header: "Date",
            accessor: "date",
            cellClassName: "text-text/80 dark:text-white/80 font-medium"
        },
        {
            header: "Order ID",
            accessor: "id",
            cellClassName: "text-text/60 dark:text-white/60 font-mono text-xs"
        },
        {
            header: "Status",
            cell: (row) => (
                <Badge variant={row.variant}>
                    {row.status}
                </Badge>
            )
        },
        {
            header: "Earnings",
            className: "text-right",
            cellClassName: "text-right font-bold text-text dark:text-white",
            cell: (row) => (
                <span className={row.canceled ? "text-text/40 line-through" : ""}>
                    {row.earnings}
                </span>
            )
        }
    ];

    const pagination = {
        currentPage: 1,
        totalPages: 3,
        from: 1,
        to: 4,
        total: 12,
        onPageChange: () => { },
        onPrev: () => { },
        onNext: () => { }
    };

    return (
        <div className="flex flex-col gap-8 pb-10">
            {/* Header */}
            <RevealInAnimation direction="up">
                <DashboardHeader
                    title="Partner Program"
                    subtitle="Track your impact, monitor earnings, and grow your organic community."
                >
                </DashboardHeader>
            </RevealInAnimation>

            {/* Stats Grid */}
            <FaderInAnimation direction="up" delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard
                        title="Total Earnings"
                        value="$1,240.50"
                        trend="+12%"
                        detail="from last month"
                        icon={FaWallet}
                    />
                    <StatsCard
                        title="Referrals"
                        value="45"
                        trend="+5%"
                        detail="new customers"
                        icon={FaUsers}
                    />
                    <StatsCard
                        title="Conversion Rate"
                        value="4.2%"
                        trend="+0.8%"
                        detail="avg. performance"
                        icon={FaChartLine}
                    />
                </div>
            </FaderInAnimation>

            {/* Referral Link Box */}
            <FaderInAnimation direction="up" delay={0.4}>
                <div className="rounded-2xl bg-white dark:bg-background-dark/30 border border-divider p-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-text mb-1">Your Referral Link</h3>
                            <p className="text-sm text-text/60">Share this link with your audience to earn commissions on every sale.</p>
                        </div>
                        <div className="flex w-full lg:w-auto flex-col sm:flex-row items-center gap-3">
                            <div className="relative w-full lg:w-[320px]">
                                <input
                                    className="w-full rounded-lg border border-divider bg-secondary/20 dark:bg-white/5 py-3 pl-4 pr-12 text-sm font-medium text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                                    readOnly
                                    type="text"
                                    value={referralLink}
                                />
                                <FaLink className="absolute right-4 top-1/2 -translate-y-1/2 text-text/40" />
                            </div>
                            <Button
                                className="w-full sm:w-auto whitespace-nowrap"
                                variant="primary"
                                leftIcon={copied ? <FaCheckCircle /> : <FaCopy />}
                                onClick={handleCopy}
                            >
                                {copied ? "Copied!" : "Copy Link"}
                            </Button>
                        </div>
                    </div>
                </div>
            </FaderInAnimation>

            {/* Commissions Table */}
            <FaderInAnimation direction="up" delay={0.6}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xl font-bold text-primary font-accent">Recent Commissions</h3>
                    </div>
                    <DataTable
                        columns={columns}
                        data={mockCommissions}
                        pagination={pagination}
                    />
                </div>
            </FaderInAnimation>

            {/* Footer Links */}
            <FaderInAnimation direction="up" delay={0.8}>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-text/50">
                    <a className="hover:text-accent transition-colors underline decoration-divider underline-offset-4" href="#">Terms & Conditions</a>
                    <a className="hover:text-accent transition-colors underline decoration-divider underline-offset-4" href="#">Payout Settings</a>
                    <a className="hover:text-accent transition-colors underline decoration-divider underline-offset-4" href="#">Contact Support</a>
                </div>
            </FaderInAnimation>
        </div>
    );
}
