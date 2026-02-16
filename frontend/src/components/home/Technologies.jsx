'use client';
import { motion } from 'framer-motion';

const techs = [
    "React", "Next.js", "Node.js", "Python", "AWS", "Docker", "Figma", "TailwindCSS", "PostgreSQL", "MongoDB"
];

export default function Technologies() {
    return (
        <section className="py-20 overflow-hidden">
            <div className="container-custom text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">Powered By Modern Tech</h2>
            </div>
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap py-4 flex gap-8 md:gap-16 items-center">
                    {techs.concat(techs).map((tech, i) => (
                        <span key={i} className="text-2xl md:text-4xl font-bold text-gray-300 dark:text-gray-700 mx-4">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-4 flex gap-8 md:gap-16 items-center" aria-hidden="true">
                    {techs.concat(techs).map((tech, i) => (
                        <span key={i} className="text-2xl md:text-4xl font-bold text-gray-300 dark:text-gray-700 mx-4">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
