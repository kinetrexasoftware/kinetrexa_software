'use client';
import { motion } from 'framer-motion';

const steps = [
    { title: "Apply", desc: "Submit your resume or portfolio via email or our form." },
    { title: "Initial Chat", desc: "A brief call to understand your goals and background." },
    { title: "Skills Test", desc: "A practical task relevant to the role you applied for." },
    { title: "Culture Fit", desc: "Meet the team and see if we vibe well together." },
    { title: "Offer", desc: "Welcome aboard! Let's build great things." }
];

export default function HiringProcess() {
    return (
        <section className="section bg-white dark:bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Hiring Process</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Simple, transparent, and respectful of your time.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center border-t border-gray-100 dark:border-gray-800 pt-10">
                    {steps.map((step, index) => (
                        <div key={index} className="w-full sm:w-1/2 lg:w-1/5 p-4 text-center relative group">
                            {/* Number */}
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold mx-auto mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                {index + 1}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {step.desc}
                            </p>

                            {/* Connector Line (Desktop Only) */}
                            {index !== steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[36px] right-0 w-full h-[2px] bg-gray-100 dark:bg-gray-800 -z-10 left-1/2" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
