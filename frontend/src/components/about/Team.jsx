'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Linkedin, Twitter, Github } from 'lucide-react';

export default function Team({ team }) {
    // Fallback if no team provided (but effectively we want it controlled by Admin)
    const members = team || [];

    if (members.length === 0) return null;

    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet The Team</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        The minds behind KineTrexa.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {members.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="text-center h-full hover:shadow-lg transition-shadow">
                                <CardContent className="p-8">
                                    <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 mb-6 overflow-hidden">
                                        {/* Placeholder for actual image */}
                                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                                            {member.name ? member.name.charAt(0) : '?'}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                        "{member.bio}"
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        {member.linkedin && <SocialLink href={member.linkedin} icon={Linkedin} />}
                                        {member.twitter && <SocialLink href={member.twitter} icon={Twitter} />}
                                        {member.github && <SocialLink href={member.github} icon={Github} />}
                                    </div>
                                </CardContent>
                            </Card>
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
