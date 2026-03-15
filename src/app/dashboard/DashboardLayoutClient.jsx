"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaBars, FaHandshake, FaHome, FaShoppingBag, FaSignOutAlt, FaTimes, FaUser, FaUserAlt } from "react-icons/fa";
import { FaLocationDot, FaStarOfLife } from 'react-icons/fa6';
import { apiService } from "@/lib/api";
import RouteGuard from "@/components/auth/RouteGuard";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
    { label: 'Overview', href: '/dashboard', icon: FaHome },
    { label: 'My Orders', href: '/dashboard/orders', icon: FaShoppingBag },
    { label: 'Profile Settings', href: '/dashboard/profile', icon: FaUser },
    { label: 'Partner Program', href: '/dashboard/partner', icon: FaHandshake },
];

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout: authLogout, profile, profileLoading } = useAuth();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = async () => {
        try {
            await apiService.post("/Account/Logout");
        } catch (error) {
            console.error("Logout API failed or returned an error", error);
        } finally {
            authLogout(true); // Use AuthContext logout to keep state in sync
            router.push("/login");
        }
    };

    // Derive display values from preloaded profile
    const displayName = profile?.name;
    const displayEmail = profile?.email;

    return (
        <RouteGuard>
            <div className="bg-secondary dark:bg-background-dark text-text dark:text-slate-100 min-h-screen flex flex-col md:flex-row overflow-x-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-primary text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/images/new/Prolixus-Logo-white.webp"
                            alt="Logo"
                            width={120}
                            height={34}
                            className="h-8 w-auto"
                            priority
                        />
                    </Link>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-2xl focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </header>

                {/* Backdrop for mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                        onClick={toggleSidebar}
                    />
                )}

                {/* Sidebar Navigation */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 w-72 bg-primary text-white flex flex-col justify-between transform transition-transform duration-300 ease-in-out
                    md:translate-x-0 md:h-screen md:sticky md:top-0
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="p-6 md:p-8 flex flex-col gap-10 overflow-y-auto">
                        {/* Brand Logo - Hidden on mobile side as it is in topbar, but visible on Desktop sidebar */}
                        <div className="hidden md:flex items-center gap-3">
                            <div className="flex flex-col">
                                <Link href="/" className="flex items-center">
                                    <Image
                                        src="/images/new/Prolixus-Logo-white.webp"
                                        alt="Logo"
                                        width={140}
                                        height={40}
                                        className="h-10 w-auto"
                                        priority
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="flex flex-col gap-2">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${isActive
                                            ? 'bg-white/10 text-white border-l-4 border-accent'
                                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                                            }`}
                                        href={item.href}
                                    >
                                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform flex items-center justify-center size-5">
                                            <item.icon />
                                        </span>
                                        <span className="text-sm font-medium font-default tracking-wide">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* User & Logout */}
                    <div className="p-6 md:p-8 border-t border-white/10 bg-primary sticky bottom-0">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="size-10 rounded-full bg-white/90 text-primary border-2 border-accent flex justify-center items-center">
                                <FaUserAlt className='text-xl' />
                            </div>
                            {profileLoading ? (
                                <div className="flex flex-col gap-2">
                                    <div className="h-3 w-24 rounded-full bg-white/20 animate-pulse" />
                                    <div className="h-2.5 w-32 rounded-full bg-white/10 animate-pulse" />
                                </div>
                            ) : (
                                <div>
                                    <p className="text-sm font-bold text-white truncate max-w-[150px]">{displayName}</p>
                                    <p className="text-xs text-white/50 truncate max-w-[150px]">{displayEmail}</p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                        >
                            <span className="material-symbols-outlined text-lg flex items-center justify-center"><FaSignOutAlt /></span>
                            Log Out
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-12 lg:px-20 overflow-y-auto h-screen bg-secondary dark:bg-background-dark">
                    <div className="max-w-5xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </RouteGuard>
    );
}

