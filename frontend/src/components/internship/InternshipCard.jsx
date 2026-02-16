'use client';

import { Calendar, Clock, MapPin, Sparkles, MonitorPlay } from 'lucide-react';
import Card, { CardBody, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDate, daysRemaining } from '@/lib/utils'; // removed formatCurrency as we use plain numbers

export default function InternshipCard({ internship, onApply }) {
    const deadline = daysRemaining(internship.deadline);
    const daysToStart = daysRemaining(internship.startDate);
    const isExpired = deadline < 0;

    const typeConfig = {
        Paid: {
            color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
            icon: Sparkles
        },
        Free: {
            color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
            icon: MonitorPlay
        }
    };

    const currentType = typeConfig[internship.type] || typeConfig['Free'];
    const TypeIcon = currentType.icon;

    return (
        <Card hover className="h-full flex flex-col group relative overflow-hidden bg-white dark:bg-gray-800/50 dark:backdrop-blur-sm border-gray-200 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-500/30">
            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardBody className="flex-grow space-y-6 pt-8">
                {/* Header */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${currentType.color}`}>
                            <TypeIcon size={12} />
                            {internship.type}
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                            <MapPin size={12} />
                            {internship.mode}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary-500 transition-colors">
                            {internship.title}
                        </h3>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {internship.shortDescription || internship.description}
                </p>

                {/* Info Grid */}
                <div className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Clock size={16} className="text-primary-500" />
                            <span>Duration</span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-gray-200">{internship.duration}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Calendar size={16} className="text-primary-500" />
                            <span>Start Date</span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-gray-200">{formatDate(internship.startDate)}</span>
                    </div>

                    <div className="h-px w-full bg-gray-200 dark:bg-gray-700/50" />

                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Program Fee</span>
                        <span className={`text-xl font-extrabold ${internship.type === 'Paid' ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-400' : 'text-primary-500'}`}>
                            {internship.type === 'Paid' ? `₹${internship.amount}` : 'Free'}
                        </span>
                    </div>
                </div>

                {/* Deadline Warning if approaching */}
                {deadline > 0 && deadline <= 3 && (
                    <div className="text-xs text-center text-orange-500 font-medium bg-orange-500/10 py-1.5 rounded-lg border border-orange-500/20">
                        🔥 Only {deadline} days left to apply!
                    </div>
                )}

                {/* Urgency Badge (Based on Start Date - User Request) */}
                {daysToStart > 0 && daysToStart <= 10 && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg z-10 animate-pulse">
                        Hurry! Starts in {daysToStart} Days
                    </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                    {internship.technologies?.slice(0, 3).map((tech, idx) => (
                        <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </CardBody>

            <CardFooter className="pt-0 pb-6 px-6">
                <Button
                    onClick={onApply}
                    disabled={isExpired}
                    className={`w-full relative overflow-hidden h-11 text-base shadow-lg transition-all duration-300 ${isExpired
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                        : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5'
                        }`}
                >
                    {isExpired ? (
                        'Applications Closed'
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            Apply Now
                            <Sparkles size={16} className={internship.type === 'Paid' ? 'text-yellow-300' : 'hidden'} />
                        </span>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}