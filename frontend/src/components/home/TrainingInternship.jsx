'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Users, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function TrainingInternship({ content }) {
    const {
        trainingTitle = 'Expert-Led Training Programs',
        trainingDesc = 'Master the latest technologies with our hands-on training sessions. From web development to cloud computing, we cover it all.',
        internshipTitle = 'Join Our Internship Program',
        internshipDesc = 'Kickstart your career with real-world exposure. Work on live projects and gain invaluable experience.'
    } = content || {};

    return (
        <section className="relative section-padding overflow-hidden">
            {/* Mesh Gradient Backgrounds */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-dark-bg">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-brand-primary/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                    {/* Training Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold tracking-widest uppercase mb-6 w-fit"
                        >
                            <GraduationCap size={14} />
                            <span>Academic Excellence</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-gradient-text leading-tight">
                            {trainingTitle}
                        </h2>
                        <p className="text-lg text-text-secondary mb-10 max-w-xl leading-relaxed">
                            {trainingDesc}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                            <Feature
                                icon={Users}
                                title="Expert Mentorship"
                                desc="Learn directly from industry leaders"
                            />
                            <Feature
                                icon={Award}
                                title="Global Certification"
                                desc="Get industry-recognized credits"
                            />
                        </div>

                        <Link href="/services#training">
                            <Button size="lg" className="w-fit">
                                View Training Programs
                                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Internship Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-0.5 bg-brand-primary rounded-[2.5rem] blur opacity-10 group-hover:opacity-25 transition duration-1000 group-hover:duration-200"></div>

                        <div className="relative h-full p-8 md:p-12 glass-card rounded-[2.5rem] flex flex-col group-hover:border-brand-primary/30 transition-all duration-500">
                            {/* Decorative glows */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 -z-10 opacity-50" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 -z-10 opacity-30" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <span className="badge badge-beta text-[10px] py-1.5 font-bold tracking-widest border-brand-primary/20">
                                        <Sparkles size={12} className="text-brand-primary animate-pulse" />
                                        Career Accelerator
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-brand-primary transition-colors">
                                    {internshipTitle}
                                </h2>
                                <p className="text-text-secondary mb-10 text-lg leading-relaxed max-w-md">
                                    {internshipDesc}
                                </p>

                                <div className="space-y-4 mb-10 flex-grow">
                                    <InternshipBenefit text="Real-world project immersion" />
                                    <InternshipBenefit text="End-to-end placement assistance" />
                                    <InternshipBenefit text="Flexible hybrid work schedules" />
                                </div>

                                <Link href="/internship">
                                    <Button className="w-full h-14" variant="primary">
                                        Apply for Internship
                                        <Briefcase className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Feature({ icon: Icon, title, desc }) {
    return (
        <div className="glass-card-hover p-5 border-white/5 hover:border-brand-primary/30">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-primary/20 transition-all">
                <Icon size={24} />
            </div>
            <h4 className="font-bold mb-2 text-text-primary group-hover:text-brand-primary transition-colors">{title}</h4>
            <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
        </div>
    );
}

function InternshipBenefit({ text }) {
    return (
        <div className="flex items-center gap-3 group/item">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center border border-white/5 group-hover/item:bg-brand-primary/20 transition-colors">
                <CheckCircle2 size={12} className="text-brand-primary" />
            </div>
            <span className="text-sm md:text-base font-medium text-text-secondary group-hover/item:text-text-primary transition-colors">{text}</span>
        </div>
    );
}
