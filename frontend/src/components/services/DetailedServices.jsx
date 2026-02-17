'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ServiceSection = ({ title, desc, points, ctaText, ctaLink, align = "left", id, IllustrationComponent }) => {
    return (
        <div id={id} className={`py-20 md:py-32 border-b border-white/5 last:border-0 ${align === "right" ? "bg-white/[0.02]" : ""}`}>
            <div className="container-custom">
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${align === "right" ? "lg:flex-row-reverse" : ""}`}>
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-text-primary">{title}</h2>
                        <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                            {desc}
                        </p>
                        <ul className="space-y-4 mb-10">
                            {points.map((point, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-brand-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-text-primary text-lg">{point}</span>
                                </li>
                            ))}
                        </ul>
                        <Link href={ctaLink || "/contact"}>
                            <Button size="lg" className="group h-14 px-8 text-lg min-w-[200px]">
                                {ctaText}
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Visual Placeholder / Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full"
                    >
                        <div className={`aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden relative glass-card border-white/10 shadow-2xl group`}>
                            {IllustrationComponent ? <IllustrationComponent /> : (
                                <div className="w-full h-full flex items-center justify-center bg-dark-secondary">
                                    <span className="text-xl font-bold text-text-muted uppercase tracking-widest">{title}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default function DetailedServices() {
    return (
        <section className="bg-dark-bg">
            <ServiceSection
                align="left"
                title="Web Application Development"
                desc="We build powerful, scalable, and secure web applications tailored to your business goals. Utilizing modern frameworks like Next.js and React, we ensure your web presence is fast, responsive, and future-proof."
                points={[
                    "Custom SPA & PWA Development",
                    "Scalable Cloud Architecture (AWS/Vercel)",
                    "SEO-Optimized & High Performance",
                    "Modern Tech Stack: Next.js, React, Node.js"
                ]}
                ctaText="Start a Web Project"
                IllustrationComponent={() => (
                    <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 to-purple-900/20 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                        {/* Abstract UI Elements */}
                        <div className="absolute top-1/4 left-1/4 w-3/4 h-3/4 bg-dark-secondary/50 backdrop-blur-xl border border-white/10 rounded-tl-3xl shadow-2xl p-6">
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                                <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                                <div className="h-32 w-full bg-brand-primary/10 rounded-xl mt-6 border border-brand-primary/20" />
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-primary/30 blur-[80px] rounded-full" />
                    </div>
                )}
            />

            <ServiceSection
                align="right"
                title="Mobile Application Development"
                desc="Reach your customers anywhere with high-quality mobile apps. We deliver seamless native and cross-platform experiences that users love, powered by React Native and Flutter."
                points={[
                    "iOS & Android Development",
                    "Cross-Platform Solutions (React Native/Flutter)",
                    "Intuitive UI/UX Design",
                    "App Store Optimization & Deployment"
                ]}
                ctaText="Build a Mobile App"
                IllustrationComponent={() => (
                    <div className="w-full h-full bg-gradient-to-bl from-purple-500/20 to-blue-900/20 relative overflow-hidden flex items-center justify-center">
                        <div className="relative z-10 w-48 h-80 bg-dark-bg border-4 border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden transform -rotate-6">
                            <div className="absolute top-0 w-full h-6 bg-black flex justify-center pt-2"><div className="w-16 h-4 bg-dark-secondary rounded-full" /></div>
                            <div className="p-4 pt-10 space-y-4">
                                <div className="flex justify-between items-center"><div className="w-8 h-8 bg-purple-500/20 rounded-full" /><div className="w-8 h-8 bg-white/5 rounded-full" /></div>
                                <div className="h-32 bg-gradient-to-br from-purple-500/20 to-brand-primary/20 rounded-2xl border border-white/5" />
                                <div className="h-20 bg-white/5 rounded-2xl" />
                            </div>
                        </div>
                        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-purple-500/30 blur-[60px] rounded-full" />
                    </div>
                )}
            />

            <ServiceSection
                align="left"
                title="SaaS & Product Development"
                desc="Turning complex ideas into market-ready products. We handle the entire product lifecycle from initial concept to MVP and full-scale launch with multi-tenant architectures."
                points={[
                    "Rapid MVP Development",
                    "Product Strategy & Planning",
                    "Scalable Multi-Tenant Architecture",
                    "Continuous Feature Delivery"
                ]}
                ctaText="Launch Your Product"
                IllustrationComponent={() => (
                    <div className="w-full h-full bg-gradient-to-tr from-emerald-500/10 to-brand-primary/10 relative overflow-hidden flex items-center justify-center">
                        {/* Floating Nodes */}
                        <div className="relative z-10 grid grid-cols-2 gap-4 transform rotate-3">
                            <div className="w-24 h-24 glass-card border-white/10 rounded-2xl flex items-center justify-center"><div className="w-10 h-10 bg-brand-primary/20 rounded-full" /></div>
                            <div className="w-24 h-24 glass-card border-white/10 rounded-2xl flex items-center justify-center translate-y-8"><div className="w-10 h-10 bg-emerald-500/20 rounded-full" /></div>
                            <div className="w-24 h-24 glass-card border-white/10 rounded-2xl flex items-center justify-center -translate-y-4"><div className="w-10 h-10 bg-purple-500/20 rounded-full" /></div>
                            <div className="w-24 h-24 glass-card border-white/10 rounded-2xl flex items-center justify-center translate-y-4"><div className="w-10 h-10 bg-orange-500/20 rounded-full" /></div>
                        </div>
                        <div className="absolute inset-0 bg-brand-primary/5 blur-3xl" />
                    </div>
                )}
            />

            <ServiceSection
                align="right"
                title="Admin Panels & Dashboards"
                desc="Take control of your data with custom admin interfaces. We build intuitive dashboards that specific to your workflow, providing real-time insights and secure management."
                points={[
                    "Role-Based Access Control (RBAC)",
                    "Real-Time Data Visualization",
                    "Custom Reporting Tools",
                    "Secure & Auditable Actions"
                ]}
                ctaText="Request Admin Panel"
                IllustrationComponent={() => (
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-blue-900/30 relative overflow-hidden flex items-center justify-center p-8">
                        <div className="w-full h-full bg-dark-secondary/80 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-4 flex flex-col gap-3">
                            <div className="flex gap-4 mb-2">
                                <div className="w-16 h-16 bg-brand-primary/10 border border-brand-primary/20 rounded-lg" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-1/3 bg-white/10 rounded" />
                                    <div className="h-8 w-full bg-white/5 rounded" />
                                </div>
                            </div>
                            <div className="flex-1 grid grid-cols-3 gap-2 items-end pb-2">
                                <div className="h-16 bg-brand-primary/20 rounded-t" />
                                <div className="h-24 bg-brand-primary/40 rounded-t" />
                                <div className="h-12 bg-brand-primary/30 rounded-t" />
                                <div className="h-20 bg-brand-primary/50 rounded-t" />
                                <div className="h-14 bg-brand-primary/20 rounded-t" />
                                <div className="h-28 bg-brand-primary/60 rounded-t shadow-[0_0_15px_rgba(14,165,233,0.3)]" />
                            </div>
                        </div>
                    </div>
                )}
            />

            <ServiceSection
                align="left"
                title="Maintenance & Support"
                desc="Software needs care to stay healthy. We provide 24/7 dedicated support to keep your applications running smoothly, securely, and efficiently with guaranteed uptime."
                points={[
                    "24/7 Server Monitoring",
                    "Security Patches & Updates",
                    "Performance Optimization",
                    "Priority Bug Fixes"
                ]}
                ctaText="Get Support Plans"
                IllustrationComponent={() => (
                    <div className="w-full h-full bg-gradient-to-r from-green-900/20 to-emerald-900/20 relative overflow-hidden flex items-center justify-center">
                        <div className="w-48 h-48 border-[6px] border-emerald-500/20 rounded-full flex items-center justify-center relative">
                            <div className="absolute inset-0 border-[6px] border-emerald-500 rounded-full border-t-transparent animate-spin duration-[3s]" />
                            <div className="text-4xl font-bold text-emerald-400">24/7</div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 blur-[40px] rounded-full" />
                    </div>
                )}
            />
        </section>
    );
}
