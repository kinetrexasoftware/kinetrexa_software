'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Status & Docs', path: '/pricing' },
    { name: 'Internship', path: '/internship' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-bg/85 backdrop-blur-md border-b border-white/5 py-4 shadow-lg' : 'bg-transparent py-6'
                }`}
        >
            <div className="container-custom">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                        <span className="text-text-primary">Kine</span>
                        <span className="text-brand-primary">Trexa</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`text-sm font-semibold transition-all hover:text-brand-primary ${pathname === link.path ? 'text-brand-primary' : 'text-text-secondary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/contact">
                            <Button size="sm" className="shadow-brand-glow/20">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-dark-bg/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
                    >
                        <div className="container-custom py-6 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center justify-between text-lg font-medium py-3 border-b border-white/5 ${pathname === link.path ? 'text-brand-primary' : 'text-text-secondary'
                                        }`}
                                >
                                    {link.name}
                                    <ChevronRight size={16} className={`opacity-50 ${pathname === link.path ? 'text-brand-primary' : ''}`} />
                                </Link>
                            ))}
                            <div className="pt-4">
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full h-12">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
