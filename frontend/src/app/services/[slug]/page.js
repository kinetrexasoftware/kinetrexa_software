'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    CheckCircle2, ArrowRight, Code, Cpu, Activity,
    Layers, Zap, Shield, Globe, Smartphone,
    Cloud, Database, PieChart, Sparkles
} from 'lucide-react';
import { serviceAPI } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const iconMap = {
    Globe, Smartphone, Cloud, Layers, Database, PieChart, Code, Cpu, Activity, Zap, Shield
};

export default function ServiceDetailPage() {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await serviceAPI.getBySlug(slug);
                setService(data);
            } catch (err) {
                console.error("Failed to fetch service:", err);
                setError("Service not found");
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchService();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B1220] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen bg-[#0B1220] flex flex-col items-center justify-center text-white px-4">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-gray-400 mb-8">{error || "Service not found"}</p>
                <Link href="/" className="px-6 py-3 bg-primary-600 rounded-full font-bold hover:bg-primary-700 transition-colors">
                    Back to Home
                </Link>
            </div>
        );
    }

    const IconComponent = iconMap[service.icon] || Sparkles;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className={`relative pt-32 pb-20 overflow-hidden bg-gradient-to-br ${service.gradientTheme || 'from-blue-600 to-cyan-500'} text-white`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 mb-8"
                        >
                            <IconComponent size={40} className="text-white" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            {service.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-medium"
                        >
                            {service.shortDescription}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <a href="#get-started" className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all">
                                Get Started
                            </a>
                            <a href="#process" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full font-bold hover:bg-white/20 transition-all">
                                Our Process
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Bottom Wave */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126,211.36,111.71,254,102.25,282.45,71.21,321.39,56.44Z" className="fill-white"></path>
                    </svg>
                </div>
            </section>

            {/* Detailed Description */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: service.detailedDescription }}></div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Key Capabilities</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Discover the powerful features that make our {service.title} service a perfect fit for your needs.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4"
                            >
                                <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 size={16} className="text-green-600" />
                                </div>
                                <span className="text-lg font-semibold text-gray-800">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-6">Our Tech Stack</h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                We use industry-standard, high-performance technologies to build your solution. Our stack is chosen for its scalability, security, and developer productivity.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {service.technologies.map((tech, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-bold border border-gray-200">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="p-8 bg-gray-900 rounded-3xl text-white transform translate-y-4">
                                <Code size={32} className="text-primary-400 mb-4" />
                                <h4 className="font-bold text-xl mb-2">Modern Code</h4>
                                <p className="text-gray-400 text-sm">Clean, maintainable architecture.</p>
                            </div>
                            <div className="p-8 bg-primary-600 rounded-3xl text-white">
                                <Cpu size={32} className="text-white mb-4" />
                                <h4 className="font-bold text-xl mb-2">Optimized</h4>
                                <p className="text-primary-100 text-sm">Blazing fast performance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Timeline */}
            <section id="process" className="py-24 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 blur-[100px] rounded-full"></div>
                <div className="container-custom relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">How We Work</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">A transparent, systematic approach to delivering your project on time and beyond expectations.</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-12">
                            {service.processSteps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-8 group"
                                >
                                    <div className="text-5xl font-black text-white/10 group-hover:text-primary-500/30 transition-colors duration-500">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </div>
                                    <div className="flex-1 p-8 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary-500/50 transition-all">
                                        <h3 className="text-2xl font-bold mb-2">{step}</h3>
                                        <div className="h-1 w-12 bg-primary-500 rounded-full mb-4"></div>
                                        <p className="text-gray-400">Step details and objectives are outlined clearly to ensure alignment between our teams.</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Block */}
            <section id="get-started" className="py-24 bg-white">
                <div className="container-custom">
                    <div className="relative rounded-[3rem] bg-gradient-to-r from-primary-600 to-indigo-700 p-12 md:p-20 overflow-hidden shadow-2xl text-center text-white">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to transform your business with our {service.title}?</h2>
                            <p className="text-xl text-primary-100 mb-12 max-w-3xl mx-auto font-medium">
                                Join dozens of successful companies that trust KineTrexa for their digital transformation journey.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <Link href="/contact" className="px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
                                    Book a Free Consultation
                                </Link>
                                <Link href="/internships" className="px-10 py-5 bg-transparent border-2 border-white/50 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all">
                                    Explore Internships
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
