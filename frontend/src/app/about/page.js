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
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
        const res = await fetch(`${API_URL}/content/about`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`Failed to fetch content: ${res.status}`);
            return {};
        }

        const data = await res.json();
        // API returns { success: true, content: { ... } }
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
        <div className="min-h-screen pt-20">
            <AboutHero />

            <CompanyIntro />
            <MissionVision mission={c.mission} vision={c.vision} />
            <WhatMakesUsDifferent content={c.whatMakesUsDifferent} />
            <OurProcess content={c.ourProcess} />
            {c.teamVisible && <Team team={c.team || []} />}
            <TrainingPhilosophy content={c.trainingPhilosophy} />
            <OurValues content={c.ourValues} />
            <AboutCTA />
        </div>
    );
}
