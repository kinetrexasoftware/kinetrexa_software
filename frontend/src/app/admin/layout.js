import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import AdminHeader from '@/components/admin/layout/AdminHeader';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import AdminLayoutClient from './AdminLayoutClient';

export default function AdminLayout({ children }) {
    return (
        <AdminAuthProvider>
            <AdminLayoutClient>
                {children}
            </AdminLayoutClient>
        </AdminAuthProvider>
    );
}
