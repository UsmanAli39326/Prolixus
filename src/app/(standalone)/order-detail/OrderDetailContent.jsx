"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    FaCircleCheck,
    FaReceipt,
    FaUser,
    FaEnvelope,
    FaIdCard,
    FaTruck,
    FaBagShopping,
    FaRegImage,
    FaArrowRight,
    FaArrowLeft,
    FaDownload
} from "react-icons/fa6";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useCurrency } from "@/context/CurrencyContext";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Button from "@/components/ui/Button";
import { getOrderDetails } from "@/lib/OrderService";
import DataTable from "@/components/ui/DataTable";

export default function OrderDetailContent() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const { formatPrice } = useCurrency();

    const columns = [
        {
            header: "Product",
            cell: (item) => {

                const productInfo = item.item || {};

                const imagePath =
                    productInfo.mainImage?.url ||
                    productInfo.mainImage?.thumbnailUrl;

                const imageBaseUrl = "https://admin.aa-consultants.de";

                const fullImageUrl = imagePath
                    ? (imagePath.startsWith("http")
                        ? imagePath
                        : `${imageBaseUrl}${imagePath}`)
                    : null;

                return (
                    <div className="flex items-center gap-5">

                        <div className="size-20 rounded-2xl bg-white dark:bg-white/5 border border-divider shrink-0 overflow-hidden flex items-center justify-center p-2">

                            {fullImageUrl ? (
                                <img
                                    src={fullImageUrl}
                                    alt={productInfo.name}
                                    className="h-full w-full object-contain rounded-xl"
                                />
                            ) : (
                                <FaRegImage className="text-gray-300 text-2xl" />
                            )}

                        </div>

                        <span className="font-bold text-primary text-lg">
                            {productInfo.name || "Unknown Product"}
                        </span>

                    </div>
                );
            }
        },

        {
            header: "Brand",
            cell: (item) => (
                <span className="text-text/80 text-base font-accent italic">
                    {(item.item || {}).brandName || "N/A"}
                </span>
            ),
            className: "w-32"
        },

        {
            header: "Qty",
            cell: (item) => (
                <span className="font-bold text-primary text-lg">
                    {item.quantity || 1}
                </span>
            ),
            className: "w-24 px-6 py-6 text-center",
            cellClassName: "text-center"
        },

        {
            header: "Unit Price",
            cell: (item) => (
                <span className="text-text/80 text-lg font-accent">
                    {formatPrice(item.unitPrice || 0)}
                </span>
            ),
            className: "w-32 text-right",
            cellClassName: "text-right"
        },

        {
            header: "Total",
            cell: (item) => (
                <span className="font-bold text-accent text-lg">
                    {formatPrice(item.totalPrice || item.totalNetPrice || 0)}
                </span>
            ),
            className: "w-32 text-right",
            cellClassName: "text-right"
        }
    ];

    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const orderId = searchParams.get("orderId");

    const handleDownloadInvoice = () => {
        if (!orderData) return;

        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(41, 128, 185);
        doc.text("INVOICE", 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100);

        const invoiceNum = orderData?.order?.invoiceNumber || "N/A";
        const orderIdVal = orderData?.order?.id || "N/A";
        const dateVal = orderData?.order?.transactionDate
            ? new Date(orderData.order.transactionDate).toLocaleString()
            : "N/A";

        doc.text(`Invoice Number: ${invoiceNum}`, 14, 32);
        doc.text(`Order ID: #${orderIdVal}`, 14, 38);
        doc.text(`Date: ${dateVal}`, 14, 44);

        // Customer Details
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text("Customer Details:", 14, 56);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Name: ${orderData?.customer?.name || "N/A"}`, 14, 64);
        doc.text(`Email: ${orderData?.customer?.email || "N/A"}`, 14, 70);
        doc.text(`Code: ${orderData?.customer?.code || "N/A"}`, 14, 76);

        // Delivery Address
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text("Delivery Address:", 100, 56);
        doc.setFontSize(10);
        doc.setTextColor(100);

        let addressText = "N/A";
        const addrObj = orderData?.deliveryAddress || orderData?.order?.deliveryAddress || orderData?.customer?.address || orderData?.order?.shippingAddress || orderData?.shippingAddress;

        if (typeof addrObj === 'string') {
            addressText = addrObj;
        } else if (addrObj && typeof addrObj === 'object') {
            const parts = [
                addrObj.firstName ? `${addrObj.firstName} ${addrObj.lastName || ''}`.trim() : null,
                addrObj.street,
                addrObj.addressLine1,
                addrObj.addressLine2,
                addrObj.city,
                addrObj.state,
                addrObj.zipCode,
                addrObj.country
            ].filter(Boolean);
            if (parts.length > 0) {
                addressText = parts.join(", ");
            }
        }

        const splitAddress = doc.splitTextToSize(addressText, 90);
        doc.text(splitAddress, 100, 64);

        // Table
        const tableColumn = ["Product", "Brand", "Qty", "Unit Price", "Total"];
        const tableRows = [];

        orderData?.orderDetails?.forEach(item => {
            const productInfo = item.item || {};
            // Basic cleanup of HTML spaces
            const unitPriceStr = formatPrice(item.unitPrice || 0).replace(/&nbsp;/g, ' ');
            const totalPriceStr = formatPrice(item.totalPrice || item.totalNetPrice || 0).replace(/&nbsp;/g, ' ');

            const productData = [
                productInfo.name || "Unknown Product",
                productInfo.brandName || "N/A",
                item.quantity || 1,
                unitPriceStr,
                totalPriceStr
            ];
            tableRows.push(productData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: Math.max(85, 64 + (splitAddress.length * 5)),
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            styles: { fontSize: 10, cellPadding: 5 }
        });

        const finalY = doc.lastAutoTable.finalY + 10;

        // Total
        doc.setFontSize(12);
        doc.setTextColor(0);
        const finalTotalStr = formatPrice(orderData?.order?.totalNetAmount || 0).replace(/&nbsp;/g, ' ');
        doc.text(`Total Amount: ${finalTotalStr}`, 14, finalY);

        doc.save(`Invoice_${invoiceNum !== "N/A" ? invoiceNum : orderIdVal}.pdf`);
    };

    useEffect(() => {

        const fetchOrder = async () => {

            if (!orderId) {

                try {

                    const stored = sessionStorage.getItem("orderData");

                    if (stored) {
                        setOrderData(JSON.parse(stored));
                        sessionStorage.removeItem("orderData");
                    } else {
                        setError("No order details found.");
                    }

                } catch {
                    setError("Failed to parse stored order data.");
                }

                setLoading(false);
                return;
            }

            try {

                setLoading(true);

                const response = await getOrderDetails(orderId);

                if (response?.success && response.data) {
                    setOrderData(response.data);
                } else if (response && !response.error) {
                    setOrderData(response.data || response);
                } else {
                    setError(response?.message || "Failed to fetch order details.");
                }

            } catch (err) {
                console.error("Fetch order error:", err);
                setError(err.message || "An error occurred while fetching order details.");
            }

            finally {
                setLoading(false);
            }

        };

        fetchOrder();

    }, [orderId]);

    useEffect(() => {

        window.history.pushState(null, "", window.location.href);

        const handlePopState = () => {
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener("popstate", handlePopState);

        return () => window.removeEventListener("popstate", handlePopState);

    }, []);

    if (loading) {

        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <p className="text-xl text-text/80 font-medium animate-pulse">
                    Loading order details...
                </p>
            </div>
        );

    }

    if (error || !orderData) {

        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-6">

                <p className="text-xl text-red-500 font-medium">
                    {error || "No order details found."}
                </p>

                <Link href="/products">
                    <Button
                        variant="accent"
                        size="lg"
                        className="rounded-full px-10 py-6 text-xl"
                    >
                        Go to Shop
                    </Button>
                </Link>

            </div>
        );

    }

    return (

        <div className="flex flex-col items-center gap-14 py-12 px-4 max-w-4xl mx-auto">

            {/* SUCCESS HEADER */}

            <div className="flex flex-col items-center text-center gap-6">

                <RevealInAnimation direction="up">

                    <div className="size-28 rounded-full bg-accent/10 flex items-center justify-center shadow-sm ring-1 ring-accent/20">

                        <FaCircleCheck className="text-accent text-6xl" />

                    </div>

                </RevealInAnimation>

                <div className="space-y-4">

                    <h1 className="text-5xl font-bold tracking-tight text-primary">
                        Your Order Details
                    </h1>

                    <p className="text-xl text-text/70">

                        Order
                        <span className="font-serif italic font-bold text-primary text-2xl ml-2">
                            #{orderData?.order?.id || "N/A"}
                        </span>

                    </p>

                </div>

            </div>

            {/* ORDER CARD */}

            <FaderInAnimation direction="up" delay={0.2} className="w-full">

                <div className="w-full bg-surface dark:bg-white/5 rounded-4xl shadow-xl border border-divider overflow-hidden">

                    {/* HEADER */}

                    <div className="px-10 py-7 border-b border-divider flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        {/* LEFT SIDE */}
                        <h2 className="text-2xl font-bold text-primary">
                            Order Summary
                        </h2>

                        {/* RIGHT SIDE */}
                        <div className="flex items-center gap-4">

                            {/* STATUS */}
                            <span className="px-5 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider border border-accent/20 flex items-center gap-2">

                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>

                                Status: {orderData?.order?.orderStatus || "Processing"}

                            </span>

                            {/* DOWNLOAD BUTTON */}
                            <button
                                onClick={handleDownloadInvoice}
                                className="px-4 py-2 bg-accent text-white hover:bg-accent/90 transition rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm cursor-pointer"
                            >
                                <FaDownload />
                                Invoice
                            </button>
                        </div>

                    </div>

                    {/* ORDER GRID */}

                    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

                        <div className="flex flex-col gap-4">

                            <div className="flex items-center gap-3 text-accent">

                                <FaReceipt size={22} />

                                <h4 className="font-bold text-lg">
                                    Order Information
                                </h4>

                            </div>

                            <div className="text-lg text-text/80 leading-loose space-y-2">

                                <p>
                                    <strong>Order ID:</strong> #{orderData?.order?.id}
                                </p>

                                <p>
                                    <strong>Invoice:</strong> {orderData?.order?.invoiceNumber}
                                </p>

                                <p>
                                    <strong>Date:</strong>
                                    {orderData?.order?.transactionDate
                                        ? new Date(orderData.order.transactionDate).toLocaleString()
                                        : "N/A"}
                                </p>

                                <p>
                                    <strong>Total:</strong>
                                    <span className="text-accent font-bold ml-2">
                                        {formatPrice(orderData?.order?.totalNetAmount)}
                                    </span>
                                </p>

                            </div>

                        </div>

                        {/* CUSTOMER */}

                        <div className="flex flex-col gap-4">

                            <div className="flex items-center gap-3 text-accent">

                                <FaUser size={22} />

                                <h4 className="font-bold text-lg">
                                    Customer Details
                                </h4>

                            </div>

                            <div className="text-lg text-text/80 leading-loose">

                                <p className="font-bold text-primary">
                                    {orderData?.customer?.name}
                                </p>

                                <p className="flex items-center gap-2">

                                    <FaEnvelope size={16} />

                                    {orderData?.customer?.email}

                                </p>

                                <p className="flex items-center gap-2">

                                    <FaIdCard size={16} />

                                    Code: {orderData?.customer?.code}

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* ITEMS */}

                    <div className="p-10 space-y-4">

                        <div className="flex items-center gap-3 text-accent">

                            <FaBagShopping size={22} />

                            <h4 className="font-bold text-lg">
                                Order Items
                            </h4>

                        </div>

                        <DataTable
                            columns={columns}
                            data={orderData.orderDetails}
                            emptyMessage="No items found"
                        />

                    </div>

                </div>

            </FaderInAnimation>

            {/* ACTIONS */}

            <FaderInAnimation direction="up" delay={0.4} className="w-full">

                <div className="flex flex-col items-center gap-6 w-full max-w-md">

                    <Link href="/products" className="w-full">

                        <Button
                            variant="accent"
                            size="lg"
                            className="w-full rounded-full py-7 text-xl font-bold flex items-center justify-center gap-3"
                        >
                            <span className="inline-block mr-2">Continue Shopping</span>
                            <FaArrowRight className="inline-block" />
                        </Button>

                    </Link>

                    <button
                        onClick={() => router.push("/dashboard")}
                        className="w-full flex items-center justify-center gap-3 text-lg font-bold text-gray-500 hover:text-accent py-3"
                    >

                        <FaArrowLeft />

                        Back to Dashboard

                    </button>

                </div>

            </FaderInAnimation>

        </div>

    );

}
