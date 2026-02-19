'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';

const ShowcaseSection = ({ product, align = "left" }) => {
    // Custom Illustration Renderers based on Product ID
    const renderIllustration = () => {
        if (product.id === 'kineflow') {
            return (
                <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
                    {/* Abstract Workflow Nodes */}
                    <div className="relative z-10 w-full max-w-sm">
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                <div className="w-6 h-6 rounded-full bg-blue-500" />
                            </div>
                            <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-500/50 to-cyan-400/50 mx-4 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-cyan-400/20 border border-cyan-400/30 backdrop-blur-md flex items-center justify-center">
                                <div className="w-6 h-6 rounded bg-cyan-400 transform rotate-45" />
                            </div>
                        </div>
                        <div className="space-y-3 p-6 glass-card border-blue-500/10 rounded-xl">
                            <div className="h-2 w-1/3 bg-blue-500/30 rounded-full mb-4" />
                            <div className="h-2 w-full bg-blue-500/10 rounded-full" />
                            <div className="h-2 w-3/4 bg-blue-500/10 rounded-full" />
                        </div>
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
                </div>
            );
        } else if (product.id === 'edumate') {
            return (
                <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-bl from-green-900/40 to-emerald-900/40 p-8 overflow-hidden">
                    {/* Abstract Dashboard */}
                    <div className="relative z-10 w-full max-w-sm bg-dark-bg/80 border border-green-500/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl transform rotate-3">
                        <div className="flex gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30" />
                            <div className="space-y-2">
                                <div className="h-3 w-24 bg-green-500/40 rounded-full" />
                                <div className="h-2 w-16 bg-green-500/20 rounded-full" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-24 bg-green-500/10 rounded-xl border border-green-500/10" />
                            <div className="h-24 bg-emerald-500/10 rounded-xl border border-emerald-500/10" />
                        </div>
                    </div>
                    <div className="absolute top-10 right-10 w-32 h-32 bg-green-500/20 blur-[80px] rounded-full" />
                </div>
            );
        } else {
            return (
                <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-tr from-orange-900/40 to-amber-900/40 p-8 overflow-hidden">
                    {/* Abstract Vitals Monitor */}
                    <div className="relative z-10 w-full max-w-sm space-y-4">
                        <div className="flex items-center gap-4 bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl backdrop-blur-md">
                            <div className="text-2xl font-bold text-orange-500">98</div>
                            <div className="h-8 flex-1 flex items-end gap-1">
                                <div className="w-1 h-3 bg-orange-500/30" />
                                <div className="w-1 h-5 bg-orange-500/60" />
                                <div className="w-1 h-8 bg-orange-500" />
                                <div className="w-1 h-4 bg-orange-500/50" />
                                <div className="w-1 h-6 bg-orange-500/70" />
                            </div>
                        </div>
                        <div className="h-32 rounded-xl border border-amber-500/20 bg-amber-500/5 relative overflow-hidden backdrop-blur-sm flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full h-px bg-amber-500/30" />
                            </div>
                            <svg className="w-full h-16 text-amber-500" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
                                <path d="M0 10 H20 L25 5 L30 15 L35 10 H100" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" className="animate-pulse" />
                            </svg>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/20 blur-[100px] rounded-full" />
                </div>
            );
        }
    };

    return (
        <div id={product.id} className="py-24 md:py-32 border-b border-white/5 last:border-0 odd:bg-dark-bg even:bg-white/[0.02]">
            <div className="container-custom">
                <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${align === "right" ? "lg:flex-row-reverse" : ""}`}>

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full"
                    >
                        <div className={`aspect-[4/3] rounded-3xl overflow-hidden relative glass-card border-white/10 shadow-2xl group`}>
                            {renderIllustration()}
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: align === "left" ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border ${product.statusColor.includes('blue') ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : product.statusColor.includes('green') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                            <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
                            {product.status}
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black mb-4 text-white">{product.name}</h2>
                        <h3 className={`text-xl font-bold mb-6 ${product.color}`}>{product.subtitle}</h3>

                        <p className="text-text-secondary text-lg leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="space-y-4 mb-10">
                            {product.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${product.lightColor.replace('bg-', 'bg-opacity-20 bg-')}`}>
                                        <Check className={`w-3.5 h-3.5 ${product.color}`} />
                                    </div>
                                    <span className="text-text-primary text-lg">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className={`${product.btnColor} border-transparent text-white shadow-lg shadow-${product.color.split('-')[1]}-500/20`}>
                                {product.cta}
                            </Button>
                            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5">
                                Learn More
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default function ProductShowcase() {
    const products = [
        {
            id: "kineflow",
            name: "KineFlow",
            subtitle: "Automate the boring stuff. Focus on growth.",
            description: "KineFlow is an intelligent workflow automation tool designed for small to medium innovative businesses. It connects your favorite apps and automates repetitive tasks without writing a single line of code.",
            status: "Beta Access",
            statusColor: "text-blue-400",
            bgGradient: "bg-gradient-to-br from-blue-500 to-cyan-400", // Kept for reference
            color: "text-blue-400",
            lightColor: "bg-blue-500",
            btnColor: "bg-blue-600 hover:bg-blue-700",
            cta: "Join Public Beta",
            features: [
                "Visual drag-and-drop workflow builder",
                "Integrates with Slack, Gmail, Trello, and more",
                "Real-time analytics and error logging",
                "Secure data handling with encryption"
            ]
        },
        // ... (rest of products array remains same structure, just color tweaks if needed)
        {
            id: "edumate",
            name: "EduMate",
            subtitle: "Modernizing education management.",
            description: "A comprehensive LMS and ERP solution for schools and colleges. EduMate simplifies administrative tasks, attendance tracking, and grading, allowing educators to focus on teaching.",
            status: "Live Now",
            statusColor: "text-green-400",
            bgGradient: "bg-gradient-to-br from-green-500 to-emerald-400",
            color: "text-green-400",
            lightColor: "bg-green-500",
            btnColor: "bg-green-600 hover:bg-green-700",
            cta: "Request Demo",
            features: [
                "Student and Teacher Portals",
                "Online fee payment and invoicing",
                "Assignment submission and grading system",
                "Automated report card generation"
            ]
        },
        {
            id: "healthsync",
            name: "HealthSync",
            subtitle: "Healthcare, simplified.",
            description: "HealthSync is an upcoming platform for clinic management and remote patient monitoring. It bridges the communication gap between doctors and patients.",
            status: "Coming Soon",
            statusColor: "text-orange-400",
            bgGradient: "bg-gradient-to-br from-orange-500 to-amber-400",
            color: "text-orange-400",
            lightColor: "bg-orange-500",
            btnColor: "bg-orange-600 hover:bg-orange-700",
            cta: "Join Waitlist",
            features: [
                "Appointment scheduling & telemedicine",
                "Digital electronic health records (EHR)",
                "Prescription management",
                "Patient vitals tracking dashboard"
            ]
        }
    ];

    return (
        <section className="bg-dark-bg">
            {products.map((p, i) => (
                <ShowcaseSection key={i} product={p} align={i % 2 === 0 ? "left" : "right"} />
            ))}
        </section>
    );
}
