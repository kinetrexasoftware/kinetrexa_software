'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import AdminHeader from '@/components/admin/layout/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminLayoutClient({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated, loading } = useAdminAuth();
    const isLoginPage = pathname.includes('/login');

    useEffect(() => {
        if (!loading) {
            if (isLoginPage && isAuthenticated) {
                router.push('/admin/dashboard');
            } else if (!isLoginPage && !isAuthenticated) {
                router.push('/admin/login');
            }
        }
    }, [isAuthenticated, loading, isLoginPage, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (!isAuthenticated) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
            <AdminSidebar />
            <AdminHeader />
            <main className="pt-20 md:pl-64 p-6 transition-all min-h-screen">
                <div className="max-w-full overflow-x-hidden">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
