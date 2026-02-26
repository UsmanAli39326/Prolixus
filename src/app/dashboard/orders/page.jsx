"use client";
import React from "react";
import Link from "next/link";
import { FaFilter, FaDownload, FaArrowRight } from "react-icons/fa";
import { MdLoop } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import DashboardHeader from "@/components/layout/Dashboard/DashboardHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

const mockOrders = [
    {
        id: "ORD-9921",
        date: "Oct 24, 2023",
        status: "Shipped",
        total: "$145.00",
        variant: "success",
    },
    {
        id: "ORD-8842",
        date: "Sep 15, 2023",
        status: "Delivered",
        total: "$230.50",
        variant: "info",
    },
    {
        id: "ORD-7719",
        date: "Aug 02, 2023",
        status: "Processing",
        total: "$85.00",
        variant: "warning",
        animate: true,
        icon: MdLoop,
    },
    {
        id: "ORD-6630",
        date: "Jul 19, 2023",
        status: "Delivered",
        total: "$315.00",
        variant: "info",
    },
    {
        id: "ORD-5501",
        date: "Jun 05, 2023",
        status: "Cancelled",
        total: "$42.00",
        variant: "error",
        icon: IoClose,
    },
];

export default function OrderHistoryPage() {
    const columns = [
        {
            header: "Date",
            accessor: "date",
            cellClassName: "text-text/80 dark:text-white/80 font-medium"
        },
        {
            header: "Order ID",
            accessor: "id",
            cellClassName: "text-text dark:text-white font-bold"
        },
        {
            header: "Status",
            cell: (row) => (
                <Badge
                    variant={row.variant}
                    dot={!row.icon}
                    icon={row.icon}
                    animate={row.animate}
                >
                    {row.status}
                </Badge>
            )
        },
        {
            header: "Total",
            accessor: "total",
            cellClassName: "text-text dark:text-white font-medium"
        },
        {
            header: "Action",
            className: "text-right pr-8",
            cellClassName: "text-right pr-8",
            cell: (row) => (
                <Link
                    href={`/dashboard/orders/${row.id}`}
                    className="inline-flex items-center gap-1 text-accent hover:text-accent/80 text-sm font-bold tracking-wide transition-colors group-hover:underline decoration-2 underline-offset-4"
                >
                    View Details
                    <FaArrowRight className="text-[10px]" />
                </Link>
            )
        }
    ];

    const pagination = {
        currentPage: 1,
        totalPages: 8,
        from: 1,
        to: 5,
        total: 24,
        onPageChange: (page) => console.log("Page change", page),
        onPrev: () => console.log("Prev"),
        onNext: () => console.log("Next")
    };

    return (
        <div className="flex flex-col gap-8">
            <RevealInAnimation direction="up">
                <DashboardHeader
                    title="Order History"
                    subtitle="View details and track the status of your past organic purchases."
                    action={
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" leftIcon={<FaFilter className="text-xs" />}>
                                Filter
                            </Button>
                            <Button size="sm" variant="outline" leftIcon={<FaDownload className="text-xs" />}>
                                Export
                            </Button>
                        </div>
                    }
                />
            </RevealInAnimation>

            <FaderInAnimation direction="up" delay={0.2}>
                <div className="flex flex-col gap-6">
                    <DataTable
                        columns={columns}
                        data={mockOrders}
                        pagination={pagination}
                    />
                </div>
            </FaderInAnimation>
        </div>
    );
}
