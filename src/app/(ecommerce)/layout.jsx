import MainFooter from '@/components/layout/Footer';
import React from 'react';
import Navbar from "@/components/layout/NavbarWrapper";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata = {
    title: 'PROLIXUS - Shop',
    description: 'Shop and browse our products',
};

export default function EcommerceLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="ecommerce-container pt-[80px]">
                {children}
            </main>
            <MainFooter />
        </>
    );
}