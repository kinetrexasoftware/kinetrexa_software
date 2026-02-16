'use client';
import { Bell, Search, Globe, LogOut, User } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeader() {
    return (
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 md:ml-64 fixed top-0 right-0 left-0 z-30 transition-all shadow-sm">

            {/* Global Search */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search anything (users, products, leads)..."
                        className="w-full bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm group-hover:shadow-md"
                    />
                    <div className="absolute right-3 top-2 flex items-center text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600">
                        ⌘K
                    </div>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-4">

                {/* Website Preview */}
                <Link
                    href="/"
                    target="_blank"
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <Globe size={16} />
                    <span>View Site</span>
                </Link>

                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 mx-2" />

                {/* Notifications */}
                <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                </button>

                {/* Profile Dropdown */}
                <div className="flex items-center gap-3 pl-2 group cursor-pointer relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-transparent group-hover:ring-primary-500/30 transition-all">
                        SA
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">Admin User</p>
                        <p className="text-xs text-gray-500">Super Administrator</p>
                    </div>

                    <button
                        onClick={() => {
                            sessionStorage.removeItem('isAdmin');
                            sessionStorage.removeItem('token');
                            sessionStorage.removeItem('adminUser');
                            document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
                            window.location.href = '/admin/login';
                        }}
                        className="ml-4 p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
