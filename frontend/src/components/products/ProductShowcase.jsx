'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';

const ShowcaseSection = ({ product, align = "left" }) => {
    return (
        <div id={product.id} className="py-20 md:py-32 border-b border-gray-100 dark:border-gray-800 last:border-0 odd:bg-white odd:dark:bg-dark-bg even:bg-gray-50 even:dark:bg-gray-900/30">
            <div className="container-custom">
                <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${align === "right" ? "lg:flex-row-reverse" : ""}`}>

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full"
                    >
                        <div className={`aspect-[4/3] rounded-3xl overflow-hidden relative ${product.bgGradient} flex items-center justify-center p-8 shadow-2xl shadow-primary-900/10`}>
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full h-full flex flex-col items-center justify-center border border-white/20">
                                <div className={`text-4xl font-bold ${product.color} mb-2`}>{product.name}</div>
                                <div className="text-gray-400 text-sm font-medium uppercase tracking-widest">Product Interface Mockup</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: align === "left" ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${product.statusColor}`}>
                            <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
                            {product.status}
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">{product.name}</h2>
                        <h3 className="text-xl text-gray-500 font-medium mb-6">{product.subtitle}</h3>

                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="space-y-4 mb-10">
                            {product.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className={`w-6 h-6 rounded-full ${product.lightColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                        <Check className={`w-3.5 h-3.5 ${product.color}`} />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className={`${product.btnColor} border-transparent text-white`}>
                                {product.cta}
                            </Button>
                            <Button variant="outline" size="lg">
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
            statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
            bgGradient: "bg-gradient-to-br from-blue-500 to-cyan-400",
            color: "text-blue-600",
            lightColor: "bg-blue-100 dark:bg-blue-900/30",
            btnColor: "bg-blue-600 hover:bg-blue-700",
            cta: "Join Public Beta",
            features: [
                "Visual drag-and-drop workflow builder",
                "Integrates with Slack, Gmail, Trello, and more",
                "Real-time analytics and error logging",
                "Secure data handling with encryption"
            ]
        },
        {
            id: "edumate",
            name: "EduMate",
            subtitle: "Modernizing education management.",
            description: "A comprehensive LMS and ERP solution for schools and colleges. EduMate simplifies administrative tasks, attendance tracking, and grading, allowing educators to focus on teaching.",
            status: "Live Now",
            statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
            bgGradient: "bg-gradient-to-br from-green-500 to-emerald-400",
            color: "text-green-600",
            lightColor: "bg-green-100 dark:bg-green-900/30",
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
            statusColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
            bgGradient: "bg-gradient-to-br from-orange-500 to-amber-400",
            color: "text-orange-600",
            lightColor: "bg-orange-100 dark:bg-orange-900/30",
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
        <section className="bg-white dark:bg-dark-bg">
            {products.map((p, i) => (
                <ShowcaseSection key={i} product={p} align={i % 2 === 0 ? "left" : "right"} />
            ))}
        </section>
    );
}
