'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { contentAPI } from '@/lib/api';

export default function Footer() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchGlobalContent = async () => {
            try {
                const data = await contentAPI.getSection('global');
                setContent(data);
            } catch (error) {
                console.error("Failed to load footer content", error);
            }
        };
        fetchGlobalContent();
    }, []);

    const currentYear = new Date().getFullYear();
    const c = content || {}; // Fallback to empty object

    return (
        <footer className="bg-dark-bg border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold tracking-tighter">
                            <span className="text-white">Kine</span>
                            <span className="text-primary-400">Trexa</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering businesses with cutting-edge technology solutions. We build the future of digital experiences.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            {c.facebook && <SocialIcon icon={Facebook} href={c.facebook} />}
                            {c.twitter && <SocialIcon icon={Twitter} href={c.twitter} />}
                            {c.instagram && <SocialIcon icon={Instagram} href={c.instagram} />}
                            {c.linkedin && <SocialIcon icon={Linkedin} href={c.linkedin} />}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Company</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/careers">Careers</FooterLink>
                            <FooterLink href="/internship">Internship Program</FooterLink>
                            <FooterLink href="/contact">Contact Us</FooterLink>
                            <FooterLink href="/privacy">Privacy Policy</FooterLink>
                            <FooterLink href="/terms">Terms & Conditions</FooterLink>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Services</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/services">Web Development</FooterLink>
                            <FooterLink href="/services">App Development</FooterLink>
                            <FooterLink href="/services">Digital Marketing</FooterLink>
                            <FooterLink href="/services">UI/UX Design</FooterLink>
                            <FooterLink href="/services">Consultancy</FooterLink>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Get in Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-gray-400 text-sm">
                                <MapPin size={18} className="text-primary-400 mt-1 shrink-0" />
                                <span>
                                    {c.address1 || '123 Tech Park, Innovation Street,'}<br />
                                    {c.address2 || 'Silicon Valley, India'}
                                </span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400 text-sm">
                                <Mail size={18} className="text-primary-400 shrink-0" />
                                <a href={`mailto:${c.email || 'contact@kinetrexa.com'}`} className="hover:text-primary-400 transition-colors">
                                    {c.email || 'contact@kinetrexa.com'}
                                </a>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400 text-sm">
                                <Phone size={18} className="text-primary-400 shrink-0" />
                                <a href={`tel:${c.phone || '+919876543210'}`} className="hover:text-primary-400 transition-colors">
                                    {c.phone || '+91 98765 43210'}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {currentYear} KineTrexa. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon: Icon, href }) {
    if (!href) return null;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
        >
            <Icon size={18} />
        </a>
    );
}

function FooterLink({ href, children }) {
    return (
        <li>
            <Link href={href} className="text-gray-400 hover:text-primary-400 text-sm transition-colors block">
                {children}
            </Link>
        </li>
    );
}


