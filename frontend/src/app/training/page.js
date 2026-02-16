'use client';

import TrainingHero from '@/components/training/TrainingHero';
import TrainingPrograms from '@/components/training/TrainingPrograms';
import WhyOurTraining from '@/components/training/WhyOurTraining';
import LearningApproach from '@/components/training/LearningApproach';
import CertificationOutcomes from '@/components/training/CertificationOutcomes';
import WhoShouldJoin from '@/components/training/WhoShouldJoin';
import TrainingCTA from '@/components/training/TrainingCTA';

export default function TrainingPage() {
    return (
        <div className="min-h-screen">
            <TrainingHero />
            <TrainingPrograms />
            <WhyOurTraining />
            <LearningApproach />
            <CertificationOutcomes />
            <WhoShouldJoin />
            <TrainingCTA />
        </div>
    );
}
