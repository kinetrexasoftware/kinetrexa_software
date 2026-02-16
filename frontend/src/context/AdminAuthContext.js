'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { loginAdmin, logoutAdmin, getAdminProfile } from '@/lib/adminApi';
import toast from 'react-hot-toast';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Check auth status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const data = await getAdminProfile();
            if (data.success) {
                setUser(data.admin);
            } else {
                throw new Error('Auth failed');
            }
        } catch (error) {
            // API 401 should trigger global interceptor, but we double safety here
            setUser(null);
            // If we are on a protected route, this effectively "logs out" the state
            // The layout.js will redirect
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const data = await loginAdmin(email, password);
            if (data.success) {
                setUser(data.admin || data.user); // Handle potential response variations
                toast.success('Login Successful');
                router.push('/admin/dashboard');
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error.message || 'Login failed' };
        }
    };

    const logout = async () => {
        try {
            await logoutAdmin();
            setUser(null);
            router.push('/admin/login');
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout failed', error);
            // Force logout on frontend anyway
            setUser(null);
            router.push('/admin/login');
        }
    };

    return (
        <AdminAuthContext.Provider value={{ user, loading, login, logout, checkAuth, isAuthenticated: !!user }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    return useContext(AdminAuthContext);
}
