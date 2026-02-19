

import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import OurProducts from '@/components/home/OurProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TrainingInternship from '@/components/home/TrainingInternship';
import HowWeWork from '@/components/home/HowWeWork';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import FounderVision from '@/components/home/FounderVision';
import CTA from '@/components/home/CTA';

async function getHomeContent() {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';
        const res = await fetch(`${API_URL}/content/home`, {
            cache: 'no-store'
        });

        if (!res.ok) return {};
        const data = await res.json();
        return data.content || {};
    } catch (error) {
        console.error("Error fetching home content:", error);
        return {};
    }
}

export default async function HomePage() {
    const c = await getHomeContent();

    return (
        <div className="min-h-screen">
            <Hero content={c.hero} />
            <Services content={c.services} />
            <span id="products">
                <OurProducts content={c.products} />
            </span>
            <WhyChooseUs content={c.whyChooseUs} />
            <TrainingInternship content={c.trainingInternship} />
            <HowWeWork content={c.howWeWork} />
            <ProjectsPreview content={c.projects} />
            <FounderVision content={c.founderVision} />
            <CTA content={c.hero} /> {/* Reusing hero CTA text if needed or add specific CTA content */}
        </div>
    );
}