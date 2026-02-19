'use client';
import { motion } from 'framer-motion';
import { Heart, Lightbulb, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const iconMap = {
    ShieldCheck, Lightbulb, Heart, TrendingUp, Users
};

export default function OurValues({ content }) {
    const {
        title = 'Our Core Values',
        subtitle = 'The principles that guide everything we do.',
        values = []
    } = content || {};

    const defaultValues = [
        {
            icon: 'Heart',
            name: 'Passion for Tech',
            desc: 'We are builders at heart, driven by a genuine love for solving complex problems with elegant code.'
        },
        {
            icon: 'Lightbulb',
            name: 'Constant Innovation',
            desc: 'We never settle. We continuously explore new frameworks, patterns, and technologies to stay ahead.'
        },
        {
            icon: 'TrendingUp',
            name: 'Measurable Growth',
            desc: 'We focus on outcomes, not just output. Every solution we build is designed to drive real business value.'
        },
        {
            icon: 'Users',
            name: 'Collaborative Spirit',
            desc: 'Great software is a team sport. We work transparently with our clients, treating their success as our own.'
        },
        {
            icon: 'ShieldCheck',
            name: 'Uncompromised Quality',
            desc: 'We hold ourselves to the highest standards of code quality, performance, and security.'
        }
    ];

    const valuesToDisplay = values.length > 0 ? values : defaultValues;

    return (
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-gradient-text">{title}</h2>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {valuesToDisplay.map((val, index) => {
                        const IconComponent = iconMap[val.icon] || ShieldCheck;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card-hover border-white/5 p-8 text-center group flex flex-col items-center"
                            >
                                <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(14,165,233,0.1)] group-hover:scale-110 transition-transform">
                                    <IconComponent size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-text-primary">{val.name}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{val.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
