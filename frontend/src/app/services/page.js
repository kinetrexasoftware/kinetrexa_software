'use client';

import ServicesHero from '@/components/services/ServicesHero';
import CoreServices from '@/components/services/CoreServices';
import DetailedServices from '@/components/services/DetailedServices';
import DeliveryProcess from '@/components/services/DeliveryProcess';
import ServiceWhyUs from '@/components/services/ServiceWhyUs';
import ServicesCTA from '@/components/services/ServicesCTA';

export default function ServicesPage() {
    return (
        <div className="min-h-screen">
            <ServicesHero />
            <CoreServices />
            <DetailedServices />
            <DeliveryProcess />
            <ServiceWhyUs />
            <ServicesCTA />
        </div>
    );
}