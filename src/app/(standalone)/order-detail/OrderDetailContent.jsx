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
    FaDownload,
    FaPhone,
    FaTicket,
    FaUsers,
    FaWallet
} from "react-icons/fa6";

import { useCurrency } from "@/context/CurrencyContext";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Button from "@/components/ui/Button";
import { getOrderDetails } from "@/lib/OrderService";
import DataTable from "@/components/ui/DataTable";
import { getAboutPayload } from "@/app/api/about/about";

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
                    <div className="flex items-center gap-4 py-1">

                        <div className="size-16 rounded-xl bg-secondary dark:bg-white/5 border border-divider shrink-0 overflow-hidden flex items-center justify-center p-1.5 shadow-sm">

                            {fullImageUrl ? (
                                <img
                                    src={fullImageUrl}
                                    alt={productInfo.name}
                                    className="h-full w-full object-contain rounded-lg"
                                />
                            ) : (
                                <FaRegImage className="text-text/20 text-xl" />
                            )}

                        </div>

                        <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-primary text-base line-clamp-1">
                                {productInfo.name || "Unknown Product"}
                            </span>
                            <span className="text-text/40 text-xs font-medium italic">
                                {productInfo.brandName || "No Brand"}
                            </span>
                        </div>

                    </div>
                );
            }
        },

        {
            header: "Qty",
            cell: (item) => (
                <span className="font-bold text-primary text-base">
                    {item.quantity || 1}
                    <span className="text-text/40 font-medium ml-1 text-xs">pcs</span>
                </span>
            ),
            className: "w-24 text-center",
            cellClassName: "text-center"
        },

        {
            header: "Unit Price",
            cell: (item) => (
                <span className="text-text/60 text-base font-medium">
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
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const orderId = searchParams.get("orderId");

    const handleDownloadInvoice = async () => {
        if (!orderData) return;

        // ✅ Only run in browser (prevents SSR errors in Next.js/Nuxt)
        if (typeof window === "undefined") return;

        // Dynamically import jsPDF and autoTable
        const jsPDFModule = await import("jspdf");
        const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;
        const autoTable = (await import("jspdf-autotable")).default;

        const doc = new jsPDF();

        // ---------------------------------------------------------
        // Header
        // ---------------------------------------------------------
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

        // ---------------------------------------------------------
        // Seller Details
        // ---------------------------------------------------------
        // Ensure aboutData is available in your component's scope
        if (typeof aboutData !== 'undefined' && aboutData) {
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text("Seller Information:", 100, 22);
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(`${aboutData.companyName || "Prolixus"}`, 100, 32);
            const aboutAddress = doc.splitTextToSize(aboutData.address || "N/A", 90);
            doc.text(aboutAddress, 100, 38);
            const addressHeight = aboutAddress.length * 5;
            doc.text(`Email: ${aboutData.email || "N/A"}`, 100, 38 + addressHeight);
            doc.text(`Phone: ${aboutData.phone || aboutData.mobile || "N/A"}`, 100, 44 + addressHeight);
        }

        // ---------------------------------------------------------
        // Customer Details
        // ---------------------------------------------------------
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text("Customer Details:", 14, 56);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Name: ${orderData?.customer?.name || "N/A"}`, 14, 64);
        doc.text(`Email: ${orderData?.customer?.email || "N/A"}`, 14, 70);

        let promoY = 76;
        if (orderData?.order?.couponCode) {
            doc.text(`Promo Code: ${orderData.order.couponCode}`, 14, promoY);
            promoY += 6;
        }
        if (orderData?.order?.affiliateCustomerCode) {
            doc.text(`Affiliate Code: ${orderData.order.affiliateCustomerCode}`, 14, promoY);
            promoY += 6;
        }
        if (orderData?.order?.walletAmount > 0) {
            const walletStr = formatPrice(orderData.order.walletAmount).replace(/&nbsp;/g, ' ');
            doc.text(`Paid via Wallet: ${walletStr}`, 14, promoY);
        }

        // ---------------------------------------------------------
        // Delivery Address
        // ---------------------------------------------------------
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

        // ---------------------------------------------------------
        // Table
        // ---------------------------------------------------------
        const tableColumn = ["Product", "Brand", "Qty", "Unit Price", "Total"];
        const tableRows = [];

        orderData?.orderDetails?.forEach(item => {
            const productInfo = item.item || {};
            const unitPriceStr = formatPrice(item.unitPrice || 0).replace(/&nbsp;/g, ' ');
            const totalPriceStr = formatPrice(item.totalPrice || item.totalNetPrice || 0).replace(/&nbsp;/g, ' ');

            tableRows.push([
                productInfo.name || "Unknown Product",
                productInfo.brandName || "N/A",
                item.quantity || 1,
                unitPriceStr,
                totalPriceStr
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: Math.max(85, 64 + (splitAddress.length * 5)),
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            styles: { fontSize: 10, cellPadding: 5 }
        });

        // ---------------------------------------------------------
        // Final Total & Save
        // ---------------------------------------------------------
        const finalY = doc.lastAutoTable.finalY + 10;

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

                const [orderResponse, aboutResponse] = await Promise.all([
                    getOrderDetails(orderId),
                    getAboutPayload()
                ]);

                if (orderResponse?.success && orderResponse.data) {
                    setOrderData(orderResponse.data);
                } else if (orderResponse && !orderResponse.error) {
                    setOrderData(orderResponse.data || orderResponse);
                } else {
                    setError(orderResponse?.message || "Failed to fetch order details.");
                }

                if (aboutResponse) {
                    setAboutData(aboutResponse);
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

        <div className="flex flex-col items-center gap-10 py-16 px-4 max-w-5xl mx-auto min-h-screen">

            {/* SUCCESS HEADER */}

            <div className="flex flex-col items-center text-center gap-5">

                <RevealInAnimation direction="up">

                    <div className="size-20 rounded-2xl bg-accent/10 flex items-center justify-center shadow-lg shadow-accent/5 ring-1 ring-accent/20 relative group">

                        <div className="absolute inset-0 bg-accent/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>

                        <FaCircleCheck className="text-accent text-4xl relative z-10" />

                    </div>

                </RevealInAnimation>

                <div className="space-y-2">

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
                        Order Confirmed
                    </h1>

                    <p className="text-lg text-text/60 font-medium">
                        We've received your order
                        <span className="text-accent font-bold ml-1.5">
                            #{orderData?.order?.id || "N/A"}
                        </span>
                    </p>

                </div>

            </div>

            {/* ORDER CARD */}

            <FaderInAnimation direction="up" delay={0.2} className="w-full">

                <div className="w-full bg-white dark:bg-white/5 rounded-3xl shadow-2xl shadow-primary/5 border border-divider overflow-hidden">

                    {/* HEADER */}

                    <div className="px-8 py-6 border-b border-divider flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-secondary/30 dark:bg-white/5">

                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                <FaReceipt size={18} />
                            </div>
                            <h2 className="text-xl font-bold text-primary">
                                Order Summary
                            </h2>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">

                            {/* STATUS */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                </span>
                                {orderData?.order?.orderStatus || "Processing"}
                            </div>

                            {/* DOWNLOAD BUTTON */}
                            <button
                                onClick={handleDownloadInvoice}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-all rounded-xl text-xs font-bold shadow-md shadow-primary/10 active:scale-95 cursor-pointer"
                            >
                                <FaDownload size={14} />
                                Invoice
                            </button>
                        </div>

                    </div>

                    {/* ORDER GRID */}

                    {/* ORDER GRID */}

                    <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 bg-white dark:bg-transparent">

                        {/* ORDER INFO */}
                        <div className="space-y-6">

                            <div className="flex items-center gap-3 text-primary">
                                <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                    <FaReceipt size={16} />
                                </div>
                                <h4 className="font-bold text-lg">
                                    Order Information
                                </h4>
                            </div>

                            <div className="space-y-4 text-base">
                                <div className="flex flex-col gap-1">
                                    <span className="text-text/40 text-xs font-bold uppercase tracking-wider">Order ID</span>
                                    <span className="text-primary font-bold">#{orderData?.order?.id}</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-text/40 text-xs font-bold uppercase tracking-wider">Invoice Number</span>
                                    <span className="text-text/80 font-medium">{orderData?.order?.invoiceNumber || "N/A"}</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-text/40 text-xs font-bold uppercase tracking-wider">Transaction Date</span>
                                    <span className="text-text/80 font-medium">
                                        {orderData?.order?.transactionDate
                                            ? new Date(orderData.order.transactionDate).toLocaleString('en-US', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short'
                                            })
                                            : "N/A"}
                                    </span>
                                </div>

                                <div className="pt-2">
                                    <div className="flex items-center justify-between p-3 rounded-2xl bg-secondary/50 dark:bg-white/5 border border-divider">
                                        <span className="text-text/60 font-bold text-sm">Amount Paid</span>
                                        <span className="text-accent font-black text-xl">
                                            {formatPrice(orderData?.order?.totalNetAmount)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* CUSTOMER */}
                        <div className="space-y-6">

                            <div className="flex items-center gap-3 text-primary">
                                <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                    <FaUser size={16} />
                                </div>
                                <h4 className="font-bold text-lg">
                                    Customer Details
                                </h4>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-text/40 text-xs font-bold uppercase tracking-wider">Name</span>
                                    <span className="text-primary font-bold">{orderData?.customer?.name}</span>
                                </div>

                                <div className="flex flex-col gap-1 text-text/80">
                                    <span className="text-text/40 text-xs font-bold uppercase tracking-wider">Email</span>
                                    <div className="flex items-center gap-2 font-medium">
                                        <FaEnvelope size={14} className="text-text/40" />
                                        {orderData?.customer?.email}
                                    </div>
                                </div>

                                {(orderData?.order?.couponCode || orderData?.order?.affiliateCustomerCode || orderData?.order?.walletAmount > 0) && (
                                    <div className="space-y-2 mt-4 pt-4 border-t border-divider">
                                        {orderData?.order?.couponCode && (
                                            <div className="flex items-center gap-2 text-accent bg-accent/5 px-3 py-1.5 rounded-lg w-fit">
                                                <FaTicket size={14} />
                                                <span className="text-xs font-bold">Promo: {orderData.order.couponCode}</span>
                                            </div>
                                        )}

                                        {orderData?.order?.affiliateCustomerCode && (
                                            <div className="flex items-center gap-2 text-accent bg-accent/5 px-3 py-1.5 rounded-lg w-fit">
                                                <FaUsers size={14} />
                                                <span className="text-xs font-bold">Affiliate: {orderData.order.affiliateCustomerCode}</span>
                                            </div>
                                        )}

                                        {orderData?.order?.walletAmount > 0 && (
                                            <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-500/5 px-3 py-1.5 rounded-lg w-fit">
                                                <FaWallet size={14} />
                                                <span className="text-xs font-bold">Wallet: {formatPrice(orderData.order.walletAmount)}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* SELLER INFORMATION */}
                        {aboutData && (
                            <div className="space-y-6">

                                <div className="flex items-center gap-3 text-primary">
                                    <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                        <FaTruck size={16} />
                                    </div>
                                    <h4 className="font-bold text-lg">
                                        Seller Information
                                    </h4>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-text/40 text-xs font-bold uppercase tracking-wider">Company</span>
                                        <span className="text-primary font-bold">{aboutData.companyName}</span>
                                    </div>

                                    <div className="flex flex-col gap-1 text-text/80">
                                        <span className="text-text/40 text-xs font-bold uppercase tracking-wider">Address</span>
                                        <span className="text-sm leading-relaxed">{aboutData.address}</span>
                                    </div>

                                    <div className="flex flex-col gap-3 pt-2">
                                        <div className="flex items-center gap-2 text-sm text-text/80 font-medium">
                                            <FaEnvelope size={14} className="text-text/40" />
                                            {aboutData.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text/80 font-medium">
                                            <FaPhone size={14} className="text-text/40" />
                                            {aboutData.phone || aboutData.mobile}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}

                    </div>

                    {/* ITEMS */}

                    <div className="px-8 pb-10 space-y-6">

                        <div className="flex items-center gap-3 text-primary pt-6 border-t border-divider">

                            <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                <FaBagShopping size={16} />
                            </div>

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

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">

                    <Link href="/products" className="w-full sm:w-auto min-w-[240px]">

                        <Button
                            variant="accent"
                            size="lg"
                            className="w-full rounded-2xl py-6 text-lg font-bold flex items-center justify-center gap-3 shadow-xl shadow-accent/10 active:scale-95 transition-all"
                        >
                            <span className="inline-block">Continue Shopping</span>
                            <FaArrowRight className="text-sm" />
                        </Button>

                    </Link>

                    <button
                        onClick={() => router.push("/dashboard")}
                        className="w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-3 text-base font-bold text-text/40 hover:text-primary transition-colors rounded-2xl border border-transparent hover:border-divider"
                    >

                        <FaArrowLeft className="text-sm" />

                        Back to Dashboard

                    </button>

                </div>

            </FaderInAnimation>

        </div>

    );

}
