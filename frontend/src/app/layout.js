import { Inter } from 'next/font/google';
import '../styles/globals.css';
import ClientLayout from '../components/layout/ClientLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
    title: 'KineTrexa | Innovative IT Solutions',
    description: 'Leading IT company providing Web Development, App Development, and Digital Marketing solutions.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark scroll-smooth scroll-pt-24">
            <body className={`${inter.variable} font-sans bg-dark-bg text-white antialiased selection:bg-primary-500/30 selection:text-white`}>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
