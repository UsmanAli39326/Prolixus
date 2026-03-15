"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";

/**
 * RouteGuard component to protect authenticated-only routes.
 * Redirects to /login?redirect=<currentPath> if no authToken is found.
 */
export default function RouteGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isLoggedIn, loading } = useAuth();

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            // Redirect to login with current path as redirect param
            const redirectPath = encodeURIComponent(pathname);
            router.replace(`/login?redirect=${redirectPath}`);
        }
    }, [isLoggedIn, loading, pathname, router]);

    if (loading || !isLoggedIn) {
        // Display a loading state aligned with the app's loading pattern
        return (
            <div className="fixed inset-0 z-1000 flex items-center justify-center bg-primary/90">
                <div className="relative h-[140px] w-[140px]">
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-white border-l-white animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                            src="/images/new/Prolixus-Logo-white.webp"
                            alt="Loading"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return children;
}
