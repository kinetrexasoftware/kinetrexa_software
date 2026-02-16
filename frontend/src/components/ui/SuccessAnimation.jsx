'use client';
import { motion } from 'framer-motion';

export default function SuccessAnimation({ message = "Submitted Successfully!" }) {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute inset-0 bg-green-100 dark:bg-green-900 rounded-full"
                />
                <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <svg
                        className="w-10 h-10 text-green-600 dark:text-green-400 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </svg>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
            >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Success!</h3>
                <p className="text-gray-500 dark:text-gray-400">
                    {message}
                </p>
            </motion.div>
        </div>
    );
}
