'use client';
import { motion } from 'framer-motion';
import { User, Code, GraduationCap } from 'lucide-react';

const audience = [
    {
        icon: GraduationCap,
        title: "College Students",
        desc: "Supplement your degree with practical skills that employers actually look for."
    },
    {
        icon: User,
        title: "Absolute Beginners",
        desc: "No prior coding knowledge? No problem. We start from the very basics."
    },
    {
        icon: Code,
        title: "Career Switchers",
        desc: "Professionals from other fields looking to break into the tech industry."
    }
];

export default function WhoShouldJoin() {
    return (
        <section className="section bg-white dark:bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Is This For?</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Whether you are new to code or looking to upgrade, we have a path for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {audience.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-800/20 p-8 rounded-2xl text-center"
                        >
                            <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-full shadow-sm flex items-center justify-center mb-6 text-primary-600">
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
