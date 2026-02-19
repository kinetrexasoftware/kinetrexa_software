import AboutHero from '@/components/about/AboutHero';
import CompanyIntro from '@/components/about/CompanyIntro';
import MissionVision from '@/components/about/MissionVision';
import WhatMakesUsDifferent from '@/components/about/WhatMakesUsDifferent';
import OurProcess from '@/components/about/OurProcess';
import Team from '@/components/about/Team';
import TrainingPhilosophy from '@/components/about/TrainingPhilosophy';
import OurValues from '@/components/about/OurValues';
import AboutCTA from '@/components/about/AboutCTA';

export const dynamic = 'force-dynamic';

async function getAboutContent() {
    try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';
        const API_URL = API_BASE.replace(/\/$/, '');


        const res = await fetch(`${API_URL}/content/about`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`Failed to fetch content: ${res.status}`);
            return {};
        }

        const data = await res.json();
        return data.content || {};
    } catch (error) {
        console.error("Error fetching about content:", error);
        return {};
    }
}

export default async function AboutPage() {
    const c = await getAboutContent();

    // Fallback logic could be handled here if critically needed, but requirement said "No hardcoded text" in UI.
    // If c is empty, MissionVision will receive undefined/null and show nothing, complying with requirements.

    return (
        <div className="min-h-screen">
            <AboutHero />

            <CompanyIntro />
            <MissionVision mission={c.mission} vision={c.vision} />
            <WhatMakesUsDifferent content={c.whatMakesUsDifferent} />
            <OurProcess content={c.ourProcess} />
            <Team team={c.team || []} />
            <TrainingPhilosophy content={c.trainingPhilosophy} />
            <OurValues content={c.ourValues} />
            <AboutCTA />
        </div>
    );
}
