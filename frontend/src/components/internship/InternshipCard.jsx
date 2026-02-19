'use client';

import { Calendar, Clock, MapPin, Sparkles, MonitorPlay, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatDate, daysRemaining } from '@/lib/utils';

export default function InternshipCard({ internship, onApply }) {
    const deadline = daysRemaining(internship.deadline);
    const daysToStart = daysRemaining(internship.startDate);
    const isExpired = deadline < 0;

    return (
        <div className="glass-card-hover border-white/5 h-full flex flex-col group relative">
            <div className="flex-grow p-8 flex flex-col">
                {/* Banner Image */}
                {internship.image && (
                    <div className="h-48 w-full overflow-hidden mb-6 rounded-t-xl -mx-8 -mt-8">
                        <img
                            src={internship.image}
                            alt={internship.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                )}
                {/* Header Tags */}
                <div className="flex items-center gap-3 mb-6">
                    <span className={`badge ${internship.type === 'Paid' ? 'badge-beta' : 'bg-brand-primary/10 text-brand-primary border-brand-primary/20'}`}>
                        <Sparkles size={12} className={internship.type === 'Paid' ? 'animate-pulse' : ''} />
                        {internship.type}
                    </span>
                    <span className="badge bg-white/5 text-text-muted border-white/10">
                        <MapPin size={12} />
                        {internship.mode}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {internship.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-8 line-clamp-2">
                    {internship.shortDescription || internship.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <Clock size={16} className="text-brand-primary" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Duration</span>
                            <span className="text-sm text-text-primary font-bold">{internship.duration}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <Calendar size={16} className="text-brand-primary" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Starts</span>
                            <span className="text-sm text-text-primary font-bold">{formatDate(internship.startDate)}</span>
                        </div>
                    </div>
                </div>

                {/* Features/Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {internship.technologies?.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-brand-primary/5 text-text-muted border border-brand-primary/10">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Urgency/Pricing */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">Fee Model</span>
                        <span className={`text-xl font-black ${internship.type === 'Paid' ? 'text-brand-primary' : 'text-text-primary'}`}>
                            {internship.type === 'Paid' ? `₹${internship.amount}` : 'FREE'}
                        </span>
                    </div>
                    {daysToStart > 0 && daysToStart <= 10 && (
                        <span className="badge badge-live border-red-500/20 text-red-400 bg-red-500/10">
                            Starting in {daysToStart}d
                        </span>
                    )}
                </div>
            </div>

            {/* CTA Button */}
            <div className="p-6 pt-0">
                <Button
                    onClick={onApply}
                    variant={isExpired ? 'outline' : 'primary'}
                    disabled={isExpired}
                    className="w-full h-12 shadow-sm"
                >
                    {isExpired ? 'Applications Closed' : (
                        <span className="flex items-center gap-2">
                            Apply Now <ArrowRight size={16} />
                        </span>
                    )}
                </Button>
            </div>

            {/* Approaching Deadline Warning */}
            {deadline > 0 && deadline <= 3 && (
                <div className="absolute top-4 right-4 animate-bounce">
                    <span className="badge bg-red-500 text-white font-black text-[9px] border-0 shadow-lg shadow-red-500/40">
                        CLOSING SOON
                    </span>
                </div>
            )}
        </div>
    );
}