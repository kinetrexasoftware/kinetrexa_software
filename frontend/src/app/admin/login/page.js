'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast, { Toaster } from 'react-hot-toast';
import { loginAdmin } from '@/lib/adminApi';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminLogin() {
    const router = useRouter();
    const { login } = useAdminAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (!result.success) {
            toast.error(result.message || 'Login failed');
            setLoading(false);
        }
        // Redirect is handled by context/layout
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
            <Toaster position="top-center" />
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        <span className="text-gray-900 dark:text-white">Kine</span>
                        <span className="text-primary-600">trexa</span>
                    </h1>
                    <p className="text-gray-500 text-sm">Admin Access Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="admin@kinetrexa.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            icon={Mail}
                        />
                    </div>
                    <div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            icon={Lock}
                        />
                    </div>

                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full"
                    >
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-400">
                    <p>Protected System. Authorized Access Only.</p>
                </div>
            </div>
        </div>
    );
}
