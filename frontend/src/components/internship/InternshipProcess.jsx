'use client';
import { motion } from 'framer-motion';

const steps = [
    { title: "Apply", desc: "Submit your application with your resume and portfolio." },
    { title: "Selection", desc: "Shortlisted candidates will undergo a technical interview." },
    { title: "Onboarding", desc: "Get set up with our tools, team, and codebase." },
    { title: "Internship", desc: "Work on assigned projects with mentor guidance." },
    { title: "Completion", desc: "Project presentation and certification." }
];

export default function InternshipProcess() {
    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Internship Process</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A structured journey from application to certification.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-[24px] left-0 w-full h-[2px] bg-gray-200 dark:bg-gray-700 -z-10" />

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center bg-white md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none shadow-sm md:shadow-none"
                            >
                                <div className="w-12 h-12 mx-auto bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 border-4 border-white dark:border-dark-bg">
                                    {index + 1}
                                </div>
                                <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
