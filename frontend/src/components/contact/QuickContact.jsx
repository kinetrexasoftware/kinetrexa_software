'use client';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { contentAPI } from '@/lib/api';

export default function QuickContact() {
    const [content, setContent] = useState({});

    useEffect(() => {
        const fetchGlobalContent = async () => {
            try {
                const data = await contentAPI.getSection('global');
                setContent(data || {});
            } catch (error) {
                console.error("Failed to load contact info", error);
            }
        };
        fetchGlobalContent();
    }, []);

    const contactDetails = [
        {
            icon: Mail,
            title: "Email Us",
            value: content?.content?.email || "hello@kinetrexa.com",
            sub: "We usually reply within 24 hours.",
            link: `mailto:${content?.content?.email || "hello@kinetrexa.com"}`,
            color: "text-blue-600",
            bg: "bg-blue-100 dark:bg-blue-900/20"
        },
        {
            icon: Phone,
            title: "Call Us",
            value: content?.content?.phone || "+91 98765 43210",
            sub: "Mon-Sat from 9am to 6pm.",
            link: `tel:${content?.content?.phone || "+919876543210"}`,
            color: "text-green-600",
            bg: "bg-green-100 dark:bg-green-900/20"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            value: content?.content?.address1 || "House No. 121B, Lacchiipu, Gorakhpur",
            sub: content?.content?.address2 || "Uttar Pradesh, India - 273001",
            link: null,
            color: "text-purple-600",
            bg: "bg-purple-100 dark:bg-purple-900/20"
        },
        {
            icon: Clock,
            title: "Business Hours",
            value: "Monday - Friday",
            sub: "9:00 AM - 6:00 PM",
            link: null,
            color: "text-orange-600",
            bg: "bg-orange-100 dark:bg-orange-900/20"
        }
    ];

    return (
        <section className="section bg-white dark:bg-dark-bg">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contactDetails.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                            <div className={`w-14 h-14 rounded-full ${item.bg} ${item.color} flex items-center justify-center mb-4`}>
                                <item.icon size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            {item.link ? (
                                <a href={item.link} className="text-gray-900 dark:text-white font-medium hover:text-primary-600 transition-colors mb-1">
                                    {item.value}
                                </a>
                            ) : (
                                <p className="text-gray-900 dark:text-white font-medium mb-1">{item.value}</p>
                            )}
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
