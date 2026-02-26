import MainFooter from '@/components/layout/Footer';
import React from 'react';
import Navbar from "@/components/layout/Navbar";

export const metadata = {
    title: 'PROLIXUS - Shop',
    description: 'Shop and browse our products',
};

export default function EcommerceLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="ecommerce-container">
                {children}
            </main>
            <MainFooter />
        </>
    );
}