'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Linkedin, Twitter, Github } from 'lucide-react';

export default function Team({ team }) {
    // Fallback if no team provided (but effectively we want it controlled by Admin)
    const members = team || [];

    if (members.length === 0) return null;

    return (
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-gradient-text">Meet The Team</h2>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        The visionary minds and expert engineers driving KineTrexa forward.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {members.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card-hover border-white/5 p-8 text-center group"
                        >
                            <div className="relative w-28 h-28 mx-auto mb-8">
                                <div className="absolute inset-0 bg-brand-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                                <div className="relative w-full h-full rounded-2xl bg-dark-secondary border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-brand-primary/30 transition-colors">
                                    <div className="text-4xl font-black brand-gradient-text">
                                        {member.name ? member.name.charAt(0) : '?'}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-2 text-text-primary">{member.name}</h3>
                            <p className="text-brand-primary font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>

                            <p className="text-text-secondary leading-relaxed mb-8 italic">
                                "{member.bio}"
                            </p>

                            <div className="flex justify-center gap-6">
                                {member.linkedin && <SocialLink href={member.linkedin} icon={Linkedin} />}
                                {member.twitter && <SocialLink href={member.twitter} icon={Twitter} />}
                                {member.github && <SocialLink href={member.github} icon={Github} />}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SocialLink({ href, icon: Icon }) {
    return (
        <a href={href} className="text-gray-400 hover:text-primary-600 transition-colors">
            <Icon size={18} />
        </a>
    );
}
