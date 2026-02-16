'use client';
import { motion } from 'framer-motion';

export default function WarningAnimation({ message = "You have already applied for this internship" }) {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            {/* Animated Warning Circle with Pulsing Effect */}
            <div className="relative flex items-center justify-center w-20 h-20 mb-4">
                {/* Pulsing Background Ring */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-amber-400 dark:bg-amber-500 rounded-full blur-md"
                />

                {/* Main Circle Background */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        duration: 0.3 // Faster appearance < 500ms
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 rounded-full shadow-lg border-2 border-amber-200 dark:border-amber-700"
                />

                {/* Warning Icon - Triangle with Exclamation */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                    }}
                    className="relative z-10"
                >
                    <svg
                        className="w-10 h-10 text-amber-600 dark:text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </motion.div>
            </div>

            {/* Text Content with Staggered Animation */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.2, // Within 300-500ms total
                    duration: 0.3
                }}
                className="text-center max-w-md px-4"
            >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
                    Already Registered
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-1">
                    {message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    You can only apply once per internship domain.
                </p>
            </motion.div>
        </div>
    );
}
