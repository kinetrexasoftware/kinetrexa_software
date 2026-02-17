'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function InternshipEligibility() {
    return (
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            <div className="container-custom relative z-10">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 brand-gradient-text">Who Can Apply?</h2>
                        <ul className="space-y-6 mb-10">
                            {[
                                "Students currently pursuing B.Tech, BCA, MCA, or related fields.",
                                "Recent graduates looking for their first major industry break.",
                                "Anyone with basic knowledge of programming and a hunger to learn."
                            ].map((text, i) => (
                                <li key={i} className="flex items-center gap-4 group">
                                    <span className="w-2.5 h-2.5 bg-brand-primary rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)] group-hover:scale-125 transition-transform" />
                                    <span className="text-lg text-text-secondary">{text}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-text-muted mb-8 italic border-l-2 border-brand-primary/20 pl-6">
                            *Prior project experience is a plus, but passion is mandatory.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card-hover border-white/5 p-10"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-text-primary">Engineering Standard</h3>
                        <p className="text-lg text-text-secondary leading-relaxed mb-8">
                            This is a rigorous program. We expect absolute commitment, punctuality, and a proactive engineering attitude. In return, we provide mentorship that can change your trajectory.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#openings">
                                <Button variant="primary" size="lg" className="h-14 px-10">
                                    View Openings
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
