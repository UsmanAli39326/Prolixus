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
    FaArrowLeft,
    FaDownload,
    FaPhone,
    FaTicket,
    FaUsers,
    FaWallet,
    FaCircleInfo,
    FaBuilding,
    FaTag,
    FaBoxOpen
} from "react-icons/fa6";

import { useCurrency } from "@/context/CurrencyContext";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
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
                        : `${imageBaseUrl}${imagePath} `)
                    : null;

                return (
                    <div className="flex items-center gap-3 sm:gap-4 py-1">

                        <div className="size-12 sm:size-16 rounded-xl bg-secondary dark:bg-white/5 border border-divider shrink-0 overflow-hidden flex items-center justify-center p-1.5 shadow-sm">

                            {fullImageUrl ? (
                                <img
                                    src={fullImageUrl}
                                    alt={productInfo.name}
                                    className="h-full w-full object-contain rounded-lg"
                                />
                            ) : (
                                <FaRegImage className="text-text/20 text-lg sm:text-xl shrink-0" />
                            )}

                        </div>

                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="font-bold text-primary text-sm sm:text-base line-clamp-2 wrap-break-word">
                                {productInfo.name || "Unknown Product"}
                            </span>
                            <span className="text-text/40 text-[10px] sm:text-xs font-medium italic truncate">
                                {productInfo.brandName || "No Brand"}
                            </span>
                        </div>

                    </div>
                );
            },
            className: "min-w-[120px]"
        },

        {
            header: "Qty",
            cell: (item) => (
                <span className="font-bold text-primary text-sm sm:text-base">
                    {item.quantity || 1}
                    <span className="text-text/40 font-medium ml-1 text-[10px] sm:text-xs">pcs</span>
                </span>
            ),
            className: "min-w-[50px] sm:min-w-[80px] w-24 text-center",
            cellClassName: "text-center"
        },

        {
            header: "Unit Price",
            cell: (item) => {
                const netUnitPrice = item.totalNetPrice && item.quantity
                    ? item.totalNetPrice / item.quantity
                    : item.unitPrice || 0;
                return (
                    <span className="text-text/60 text-sm sm:text-base font-medium">
                        {formatPrice(netUnitPrice)}
                    </span>
                );
            },
            className: "min-w-[80px] sm:min-w-[100px] text-right",
            cellClassName: "text-right"
        },
        {
            header: "VAT",
            cell: (item) => (
                <div className="flex flex-col items-end">
                    <span className="text-text/80 text-sm sm:text-base font-medium">
                        {formatPrice(item.vatAmount || 0)}
                    </span>
                    <span className="text-text/40 text-[9px] sm:text-[10px] font-bold">
                        ({item.vatPercentage || 0}%)
                    </span>
                </div>
            ),
            className: "min-w-[60px] sm:min-w-[80px] w-24 text-right",
            cellClassName: "text-right"
        },

        {
            header: "Total",
            cell: (item) => (
                <span className="font-bold text-accent text-base sm:text-lg whitespace-nowrap">
                    {formatPrice(item.totalPrice || item.totalNetPrice || 0)}
                </span>
            ),
            className: "min-w-[80px] sm:min-w-[100px] text-right",
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

        try {
            // Dynamically import libraries to prevent SSR "Node.js" module errors
            const { default: jsPDF } = await import("jspdf");
            const { default: autoTable } = await import("jspdf-autotable");

            const doc = new jsPDF();

            // --- Header ---
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

            doc.text(`Invoice Number: #${invoiceNum}`, 14, 32);
            doc.text(`Date: ${dateVal}`, 14, 38);

            // --- Seller Details ---
            let yLeft = 56;
            let yRight = 22;

            // --- Seller Details ---
            if (aboutData) {
                doc.setFontSize(12);
                doc.setTextColor(0);
                doc.text("Seller Information:", 100, yRight);
                yRight += 8;

                doc.setFontSize(10);
                doc.setTextColor(100);
                doc.text(`${aboutData.companyName || "Prolixus"}`, 100, yRight);
                yRight += 6;

                const aboutAddressLines = doc.splitTextToSize(aboutData.address || "N/A", 90);
                doc.text(aboutAddressLines, 100, yRight);
                yRight += (aboutAddressLines.length * 5);

                doc.text(`Email: ${aboutData.email || "N/A"}`, 100, yRight);
                yRight += 6;
                doc.text(`Phone: ${aboutData.phone || aboutData.mobile || "N/A"}`, 100, yRight);
                yRight += 6;
                doc.text(`Tax Number: ${aboutData.taxNumber || "N/A"}`, 100, yRight);
                yRight += 12; // Gap before next section
            }

            // --- Customer Details ---
            yLeft = Math.max(yLeft, 56); // Base Y for middle sections
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text("Customer Details:", 14, yLeft);
            yLeft += 8;

            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(`Name: ${orderData?.customer?.name || "N/A"}`, 14, yLeft);
            yLeft += 6;
            doc.text(`Email: ${orderData?.customer?.email || "N/A"}`, 14, yLeft);
            yLeft += 6;

            if (orderData?.order?.couponCode) {
                doc.text(`Promo Code: ${orderData.order.couponCode}`, 14, yLeft);
                yLeft += 6;
            }
            if (orderData?.order?.affiliateCustomerCode) {
                doc.text(`Affiliate Code: ${orderData.order.affiliateCustomerCode}`, 14, yLeft);
                yLeft += 6;
            }
            if (orderData?.order?.walletAmount > 0) {
                const walletStr = formatPrice(orderData.order.walletAmount).replace(/&nbsp;/g, ' ');
                doc.text(`Paid via Wallet: ${walletStr}`, 14, yLeft);
                yLeft += 6;
            }

            // --- Delivery Address ---
            const deliveryHeaderY = Math.max(56, yRight); // Either same row as Customer Details or below Seller Info
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text("Delivery Address:", 100, deliveryHeaderY);

            let currentYRight = deliveryHeaderY + 8;
            doc.setFontSize(10);
            doc.setTextColor(100);

            let addressText = "N/A";
            const dStreet = orderData?.order?.deliveryStreet || orderData?.deliveryStreet;
            const dCity = orderData?.order?.deliveryCity || orderData?.deliveryCity;
            const dPostCode = orderData?.order?.deliveryPostCode || orderData?.deliveryPostCode;
            const dCountryName = orderData?.deliveryCountry?.name || "";

            const parts = [dStreet, dCity, dPostCode, dCountryName].filter(Boolean);

            if (parts.length > 0) {
                addressText = parts.join(", ");
            } else {
                const addrObj = orderData?.deliveryAddress || orderData?.order?.deliveryAddress || orderData?.customer?.address || orderData?.order?.shippingAddress || orderData?.shippingAddress;
                if (typeof addrObj === 'string') {
                    addressText = addrObj;
                } else if (addrObj && typeof addrObj === 'object') {
                    const legacyParts = [
                        addrObj.firstName ? `${addrObj.firstName} ${addrObj.lastName || ''}`.trim() : null,
                        addrObj.street,
                        addrObj.addressLine1,
                        addrObj.addressLine2,
                        addrObj.city,
                        addrObj.state,
                        addrObj.zipCode,
                        addrObj.country
                    ].filter(Boolean);
                    if (legacyParts.length > 0) {
                        addressText = legacyParts.join(", ");
                    }
                }
            }

            const splitAddress = doc.splitTextToSize(addressText, 90);
            doc.text(splitAddress, 100, currentYRight);
            yRight = currentYRight + (splitAddress.length * 5);

            // --- Table Data Preparation ---
            const tableColumn = ["Product", "Brand", "Qty", "Unit Price", "VAT", "Total"];
            const tableRows = [];

            orderData?.orderDetails?.forEach(item => {
                const productInfo = item.item || {};
                const netUnitPrice = item.totalNetPrice && item.quantity
                    ? item.totalNetPrice / item.quantity
                    : item.unitPrice || 0;

                const unitPriceStr = formatPrice(netUnitPrice).replace(/&nbsp;/g, ' ');
                const taxStr = formatPrice(item.vatAmount || 0).replace(/&nbsp;/g, ' ');
                const totalPriceStr = formatPrice(item.totalPrice || item.totalNetPrice || 0).replace(/&nbsp;/g, ' ');

                tableRows.push([
                    productInfo.name || "Unknown Product",
                    productInfo.brandName || "N/A",
                    item.quantity || 1,
                    unitPriceStr,
                    taxStr,
                    totalPriceStr
                ]);
            });

            // --- Render Table ---
            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: Math.max(yLeft, yRight) + 10,
                headStyles: { fillColor: [41, 128, 185], textColor: 255 },
                alternateRowStyles: { fillColor: [245, 245, 245] },
                styles: { fontSize: 10, cellPadding: 5 }
            });

            // --- Footer / Totals ---
            const finalY = doc.lastAutoTable.finalY + 15;
            doc.setFontSize(14);
            doc.setTextColor(0);
            const finalTotalStr = `Total Amount: ${formatPrice(orderData?.order?.totalNetAmount || orderData?.order?.grossAmount || 0).replace(/&nbsp;/g, ' ')}`;
            const pageWidth = doc.internal.pageSize.getWidth();
            const textWidth = doc.getTextWidth(finalTotalStr);
            doc.text(finalTotalStr, pageWidth - textWidth - 14, finalY);

            // --- Save PDF ---
            doc.save(`Invoice_${invoiceNum !== "N/A" ? invoiceNum : orderIdVal}.pdf`);

        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    useEffect(() => {
        const fetchOrder = async () => {
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
            } finally {
                setLoading(false);
            }
        };

        const fetchAboutOnly = async () => {
            try {
                const aboutResponse = await getAboutPayload();
                if (aboutResponse) {
                    setAboutData(aboutResponse);
                }
            } catch (err) {
                console.error("Fetch about error:", err);
            }
        };

        if (orderId) {
            fetchOrder();
        } else {
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
            fetchAboutOnly().finally(() => setLoading(false));
        }
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
                <p className="text-lg sm:text-xl text-text/80 font-medium animate-pulse">
                    Loading order details...
                </p>
            </div>
        );

    }

    if (error || !orderData) {

        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-5 sm:gap-6">

                <p className="text-lg sm:text-xl text-red-500 font-medium wrap-break-word">
                    {error || "No order details found."}
                </p>

                <Link href="/products" className="w-full sm:w-auto">
                    <Button
                        variant="accent"
                        size="lg"
                        className="w-full sm:w-auto rounded-full px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl"
                    >
                        Go to Shop
                    </Button>
                </Link>

            </div>
        );

    }

    return (
        <div className="min-h-screen w-full bg-linear-to-b from-secondary/40 to-transparent px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">

            {/* TOP ACTIONS */}
            <FaderInAnimation>
                <div className="w-full max-w-6xl mb-8 sm:mb-12 flex flex-col sm:flex-row justify-between items-center gap-6">

                    <Button
                        onClick={() => router.push("/dashboard")}
                        variant="outline"
                        size="lg"
                        leftIcon={<FaArrowLeft size={16} />}
                        className="w-full sm:w-auto rounded-2xl border-2 border-divider font-black hover:bg-secondary/50 transition-all shadow-sm hover:shadow-md active:scale-95 py-3 sm:py-4 px-6 sm:px-8 text-primary/70"
                    >
                        Dashboard
                    </Button>

                    <Link href="/products" className="w-full sm:w-auto">
                        <Button
                            variant="primary"
                            size="lg"
                            leftIcon={<FaBagShopping size={18} />}
                            className="w-full sm:w-auto rounded-2xl bg-linear-to-r from-accent to-accent/80 shadow-2xl shadow-accent/20 hover:shadow-accent/40 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all font-black py-4 sm:py-5 px-10 sm:px-14 text-lg"
                        >
                            Continue Shopping
                        </Button>
                    </Link>

                </div>
            </FaderInAnimation>

            {/* HEADER */}
            <FaderInAnimation>
                <div className="w-full max-w-3xl text-center space-y-6">

                    <div className="relative mx-auto size-20 sm:size-24 mb-6">
                        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full scale-110 animate-pulse"></div>
                        <div className="relative size-full rounded-3xl bg-linear-to-br from-accent to-accent/80 flex items-center justify-center shadow-2xl shadow-accent/20">
                            <FaCircleCheck className="text-white text-3xl sm:text-4xl" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
                            Order Confirmed
                        </h1>
                        <p className="text-base sm:text-lg text-text/60 font-medium">
                            Invoice
                            <span className="text-accent font-extrabold mx-1.5 px-2 py-0.5 bg-accent/5 rounded-lg">
                                #{orderData?.order?.invoiceNumber || orderData?.order?.id}
                            </span>
                            has been successfully placed.
                        </p>
                    </div>
                </div>
            </FaderInAnimation>

            {/* MAIN CARD */}
            <div className="w-full max-w-6xl mt-8 sm:mt-10 bg-white dark:bg-white/5 rounded-2xl sm:rounded-3xl shadow-xl border border-divider overflow-hidden">

                {/* TOP BAR */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 sm:px-8 py-5 border-b border-divider bg-secondary/20">

                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <FaReceipt size={18} />
                        </div>
                        <div>
                            <span className="font-bold text-primary block">Order Summary</span>
                            <span className="text-xs text-text/40 font-medium">Placed on {orderData?.order?.transactionDate}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">

                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-[11px] font-bold uppercase tracking-wider border border-accent/20 whitespace-nowrap">
                            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                            {orderData?.order?.orderStatus || 'Processing'}
                        </div>

                        <Button
                            onClick={handleDownloadInvoice}
                            variant="primary"
                            size="sm"
                            leftIcon={<FaDownload size={14} />}
                            className="rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-xs h-9"
                        >
                            Invoice
                        </Button>

                    </div>
                </div>

                {/* GRID INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-divider">

                    {/* ORDER */}
                    <div className="p-6 space-y-4 hover:bg-secondary/10 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                                <FaCircleInfo size={14} />
                            </div>
                            <h4 className="font-bold text-primary text-sm uppercase tracking-wide">Order Info</h4>
                        </div>

                        <div className="text-sm space-y-2.5">
                            <div className="flex justify-between items-center group/info">
                                <span className="text-text/50">Invoice No:</span>
                                <span className="font-bold text-primary">#{orderData?.order?.invoiceNumber || orderData?.order?.id}</span>
                            </div>
                            <div className="flex justify-between items-center group/info">
                                <span className="text-text/50">VAT:</span>
                                <span className="font-medium">{formatPrice(orderData?.order?.totalVatAmount)}</span>
                            </div>

                            <div className="pt-3 mt-3 border-t border-divider flex justify-between items-end">
                                <div>
                                    <span className="text-text/40 text-[10px] font-bold uppercase tracking-widest block mb-0.5">Grand Total</span>
                                    <p className="text-accent font-black text-xl leading-none">
                                        {formatPrice(orderData?.order?.totalNetAmount || orderData?.order?.grossAmount)}
                                    </p>
                                </div>
                                <FaTag className="text-accent/20 mb-1" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* CUSTOMER */}
                    <div className="p-6 space-y-4 hover:bg-secondary/10 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                                <FaUser size={14} />
                            </div>
                            <h4 className="font-bold text-primary text-sm uppercase tracking-wide">Customer</h4>
                        </div>

                        <div className="text-sm space-y-3">
                            <div>
                                <p className="font-bold text-primary text-base">{orderData?.customer?.name}</p>
                                <p className="text-text/50 flex items-center gap-1.5 mt-1">
                                    <FaEnvelope size={10} className="shrink-0" />
                                    <span className="break-all leading-tight">{orderData?.customer?.email}</span>
                                </p>
                            </div>

                            <div className="space-y-1.5">
                                {orderData?.order?.couponCode && (
                                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-accent/5 text-accent text-[11px] font-bold">
                                        <FaTicket size={10} />
                                        PROMO: {orderData.order.couponCode}
                                    </div>
                                )}

                                {orderData?.order?.affiliateCustomerCode && (
                                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/5 text-blue-600 text-[11px] font-bold">
                                        <FaUsers size={10} />
                                        AFFILIATE: {orderData.order.affiliateCustomerCode}
                                    </div>
                                )}

                                {orderData?.order?.walletAmount > 0 && (
                                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-green-500/5 text-green-600 text-[11px] font-bold">
                                        <FaWallet size={10} />
                                        WALLET: {formatPrice(orderData.order.walletAmount)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* DELIVERY */}
                    <div className="p-6 space-y-4 hover:bg-secondary/10 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
                                <FaTruck size={14} />
                            </div>
                            <h4 className="font-bold text-primary text-sm uppercase tracking-wide">Shipping</h4>
                        </div>

                        <div className="text-sm space-y-1 text-primary/80">
                            <p className="font-bold text-primary">{orderData?.order?.deliveryStreet}</p>
                            <p className="font-medium">{orderData?.order?.deliveryPostCode} {orderData?.order?.deliveryCity}</p>
                            <p className="text-text/60 font-medium flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-text/20 rounded-full"></span>
                                {orderData?.deliveryCountry?.name}
                            </p>
                        </div>
                    </div>

                    {/* SELLER */}
                    {aboutData && (
                        <div className="p-6 space-y-4 hover:bg-secondary/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-gray-500/10 text-gray-600 flex items-center justify-center">
                                    <FaBuilding size={14} />
                                </div>
                                <h4 className="font-bold text-primary text-sm uppercase tracking-wide">Merchant</h4>
                            </div>

                            <div className="text-sm space-y-3">
                                <div>
                                    <p className="font-bold text-primary">{aboutData.companyName}</p>
                                    <p className="text-text/50 text-xs mt-0.5 leading-relaxed">{aboutData.address}</p>
                                </div>

                                <div className="space-y-1.5">
                                    <p className="text-text/60 flex items-center gap-2 text-[11px]">
                                        <FaEnvelope size={10} className="text-primary/40" />
                                        <span className="break-all">{aboutData.email}</span>
                                    </p>
                                    <p className="text-text/60 flex items-center gap-2 text-[11px]">
                                        <FaPhone size={10} className="text-primary/40" />
                                        <span>{aboutData.phone}</span>
                                    </p>
                                    <p className="text-text/60 flex items-center gap-2 text-[11px]">
                                        <FaIdCard size={10} className="text-primary/40" />
                                        <span>Tax Number: {aboutData.taxNumber || "N/A"}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ITEMS */}
                <div className="p-6 sm:p-8 border-t border-divider space-y-6 bg-secondary/10">

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                <FaBoxOpen size={18} />
                            </div>
                            <h4 className="font-black text-primary text-lg uppercase tracking-tight">Ordered Items</h4>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold border border-primary/10">
                            {orderData.orderDetails?.length || 0} Items
                        </div>
                    </div>

                    <div className="w-full">
                        <DataTable
                            columns={columns}
                            data={orderData.orderDetails}
                            emptyMessage="No items found"
                        />
                    </div>

                </div>

            </div>

        </div>
    );

}