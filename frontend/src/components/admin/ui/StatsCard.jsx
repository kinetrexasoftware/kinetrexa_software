'use client';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function StatsCard({ title, value, change, trend, icon: Icon, color, link, loading }) {
    const isUp = trend === 'up';
    const trendColor = isUp ? 'text-green-600' : 'text-red-600';
    const trendIcon = isUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />;

    const content = (
        <>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
                    {loading ? (
                        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-1"></div>
                    ) : (
                        <div className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{value}</div>
                    )}
                </div>
                <div className={`p-2 rounded-lg ${color} bg-opacity-10 dark:bg-opacity-20`}>
                    <Icon size={20} className={color.replace('bg-', 'text-')} />
                </div>
            </div>

            {(change || change === 0) && (
                <div className="flex items-center gap-1 text-xs font-medium">
                    <span className={`flex items-center ${trendColor}`}>
                        {trendIcon} {Math.abs(change)}%
                    </span>
                    <span className="text-gray-400 ml-1">vs last month</span>
                </div>
            )}
        </>
    );

    const containerClasses = "block bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full";

    if (link) {
        return (
            <Link href={link || '#'} className={containerClasses}>
                {content}
            </Link>
        );
    }

    return (
        <div className={containerClasses}>
            {content}
        </div>
    );
}
