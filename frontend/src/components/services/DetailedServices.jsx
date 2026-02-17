'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ServiceSection = ({ title, desc, points, ctaText, ctaLink, align = "left", id }) => {
    return (
        <div id={id} className="py-20 md:py-28 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <div className="container-custom">
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${align === "right" ? "lg:flex-row-reverse" : ""}`}>
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            {desc}
                        </p>
                        <ul className="space-y-4 mb-10">
                            {points.map((point, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
                                    <span className="text-text-secondary">{point}</span>
                                </li>
                            ))}
                        </ul>
                        <Link href={ctaLink || "/contact"}>
                            <Button size="lg" variant="primary" className="group h-14 px-8">
                                {ctaText}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Visual Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full"
                    >
                        <div className={`aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden relative glass-card-hover border-white/5 flex items-center justify-center`}>
                            <div className="text-center p-8">
                                <span className="text-xl font-bold text-text-muted uppercase tracking-widest">{title} Illustration</span>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute top-10 left-10 w-20 h-20 bg-brand-primary/10 rounded-full blur-xl" />
                            <div className="absolute bottom-10 right-10 w-32 h-32 bg-brand-primary/[0.05] rounded-full blur-xl" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default function DetailedServices() {
    return (
        <section className="bg-white dark:bg-dark-bg">
            <ServiceSection
                align="left"
                title="Web Application Development"
                desc="We build powerful, scalable, and secure web applications tailored to your business goals. Utilizing modern frameworks, we ensure your web presence is fast, responsive, and future-proof."
                points={[
                    "Custom SPA & PWA Development",
                    "Scalable Cloud Architecture (AWS/Vercel)",
                    "SEO-Optimized & High Performance",
                    "Modern Tech Stack: Next.js, React, Node.js"
                ]}
                ctaText="Start a Web Project"
            />

            <ServiceSection
                align="right"
                title="Mobile Application Development"
                desc="Reach your customers anywhere with high-quality mobile apps. We deliver seamless native and cross-platform experiences that users love."
                points={[
                    "iOS & Android Development",
                    "Cross-Platform Solutions (React Native/Flutter)",
                    "Intuitive UI/UX Design",
                    "App Store Optimization & Deployment"
                ]}
                ctaText="Build a Mobile App"
            />

            <ServiceSection
                align="left"
                title="SaaS & Product Development"
                desc="Turning complex ideas into market-ready products. We handle the entire product lifecycle from initial concept to MVP and full-scale launch."
                points={[
                    "Rapid MVP Development",
                    "Product Strategy & Planning",
                    "Scalable Multi-Tenant Architecture",
                    "Continuous Feature Delivery"
                ]}
                ctaText="Launch Your Product"
            />

            <ServiceSection
                align="right"
                title="Admin Panels & Dashboards"
                desc="Take control of your data with custom admin interfaces. We build intuitive dashboards that specific to your workflow and role requirements."
                points={[
                    "Role-Based Access Control (RBAC)",
                    "Real-Time Data Visualization",
                    "Custom Reporting Tools",
                    "Secure & Auditable Actions"
                ]}
                ctaText="Request Admin Panel"
            />

            <ServiceSection
                align="left"
                title="Maintenance & Support"
                desc="Software needs care to stay healthy. We provide ongoing support to keep your applications running smoothly, securely, and efficiently."
                points={[
                    "24/7 Server Monitoring",
                    "Security Patches & Updates",
                    "Performance Optimization",
                    "Priority Bug Fixes"
                ]}
                ctaText="Get Support Plans"
            />
        </section>
    );
}
