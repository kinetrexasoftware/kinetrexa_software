'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Box,
    Briefcase,
    GraduationCap,
    Users,
    MessageSquare,
    Settings,
    FileText,
    LogOut,
    Layers,
    UserCircle,
    ChevronDown,
    ChevronRight,
    Search,
    Mail,
    Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    {
        name: 'Products & Services',
        icon: Box,
        children: [
            { name: 'All Products', path: '/admin/products' },
            { name: 'Services', path: '/admin/services' },
        ]
    },
    {
        name: 'Programs',
        icon: GraduationCap,
        children: [
            { name: 'Training', path: '/admin/training' },
            { name: 'Internships', path: '/admin/internships' },
        ]
    },
    { name: 'Applications', path: '/admin/applications', icon: MessageSquare },
    { name: 'Task Assignments', path: '/admin/tasks', icon: Layers },
    { name: 'Inquiries', path: '/admin/inquiries', icon: Mail },
    { name: 'Careers', path: '/admin/careers', icon: Users },
    { name: 'Content', path: '/admin/content', icon: FileText },
    { name: 'Users', path: '/admin/users', icon: UserCircle },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (name) => {
        setOpenMenus(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const isPathActive = (item) => {
        if (item.path === pathname) return true;
        if (item.children) {
            return item.children.some(child => child.path === pathname);
        }
        return false;
    };

    return (
        <aside className="w-64 bg-gray-900 border-r border-gray-800 text-gray-300 hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 shadow-xl">
            {/* Logo area */}
            <div className="h-16 flex items-center px-6 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <Link href="/admin/dashboard" className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold">K</div>
                    <span className="text-white">KineTrexa</span>
                </Link>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {menuItems.map((item) => {
                    const active = isPathActive(item);
                    const isOpen = openMenus[item.name] || active;

                    if (item.children) {
                        return (
                            <div key={item.name} className="space-y-1">
                                <button
                                    onClick={() => toggleMenu(item.name)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium
                                        ${active
                                            ? 'bg-gray-800 text-white shadow-sm'
                                            : 'hover:bg-gray-800/50 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <item.icon className={`w-5 h-5 mr-3 shrink-0 ${active ? 'text-primary-500' : 'text-gray-500'}`} />
                                        {item.name}
                                    </div>
                                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-11 pr-2 space-y-1 pb-2">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.path}
                                                        href={child.path}
                                                        className={`block py-2 px-3 text-sm rounded-md transition-colors
                                                            ${pathname === child.path
                                                                ? 'text-primary-400 bg-primary-500/10 font-medium'
                                                                : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                                                            }`}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium
                                ${active
                                    ? 'bg-gray-800 text-white shadow-sm ring-1 ring-gray-700'
                                    : 'hover:bg-gray-800/50 hover:text-white'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 mr-3 shrink-0 ${active ? 'text-primary-500' : 'text-gray-500'}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 bg-gray-900/50">
                <button className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors group">
                    <LogOut className="w-5 h-5 mr-3 shrink-0 group-hover:text-red-400" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
