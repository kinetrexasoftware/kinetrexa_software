'use client';

import CareersHero from '@/components/careers/CareersHero';
import WhyWorkWithUs from '@/components/careers/WhyWorkWithUs';
import OpenPositions from '@/components/careers/OpenPositions';
import InternshipOpportunity from '@/components/careers/InternshipOpportunity';
import HiringProcess from '@/components/careers/HiringProcess';
import CareersCTA from '@/components/careers/CareersCTA';

export default function CareersPage() {
    return (
        <div className="min-h-screen">
            <CareersHero />
            <WhyWorkWithUs />
            <OpenPositions />
            <InternshipOpportunity />
            <HiringProcess />
            <CareersCTA />
        </div>
    );
}
