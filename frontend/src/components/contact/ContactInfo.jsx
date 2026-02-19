'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Shield } from 'lucide-react';
import { contentAPI } from '@/lib/api';

const ContactCard = ({ icon: Icon, title, value, subValue, delay, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="glass-card p-6 rounded-xl border border-white/5 relative group overflow-hidden"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity text-${color}-500`}>
            <Icon size={48} />
        </div>

        <div className="relative z-10">
            <div className={`w-12 h-12 rounded-lg bg-${color}-500/10 flex items-center justify-center mb-4 text-${color}-400 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} />
            </div>

            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">{title}</h3>
            <p className="text-lg font-bold text-white mb-1 break-words">{value}</p>
            {subValue && <p className="text-xs text-text-secondary font-mono">{subValue}</p>}
        </div>

        {/* Hover Glow */}
        <div className={`absolute inset-0 bg-${color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </motion.div>
);

export default function ContactInfo() {
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
            title: 'Electronic Mail',
            value: content?.content?.email || 'hello@kinetrexa.com',
            subValue: 'Response time: < 24h',
            color: 'blue'
        },
        {
            icon: Phone,
            title: 'Hotline',
            value: content?.content?.phone || '+91 98765 43210',
            subValue: 'Mon-Sat, 9am - 6pm IST',
            color: 'green'
        },
        {
            icon: MapPin,
            title: 'Headquarters',
            value: content?.content?.address1 || 'Gorakhpur, Uttar Pradesh',
            subValue: content?.content?.address2 || 'House No. 121B, Lacchiipu, 273001',
            color: 'purple'
        },
        {
            icon: Clock,
            title: 'Operating Hours',
            value: '09:00 - 18:00',
            subValue: 'Business Days Only',
            color: 'orange'
        }
    ];

    return (
        <section className="py-12">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {contactDetails.map((detail, index) => (
                        <ContactCard key={index} {...detail} delay={index * 0.1} />
                    ))}
                </div>

                {/* Secure Connection Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-8 flex items-center justify-center gap-2 text-xs text-text-muted font-mono"
                >
                    <Shield size={12} className="text-green-500" />
                    <span>SECURE CHANNEL ESTABLISHED // ENCRYPTED: AES-256</span>
                </motion.div>
            </div>
        </section>
    );
}
