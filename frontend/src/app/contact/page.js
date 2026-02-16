'use client';
import { Toaster } from 'react-hot-toast';
import ContactHero from '@/components/contact/ContactHero';
import QuickContact from '@/components/contact/QuickContact';
import ContactForm from '@/components/contact/ContactForm';
import WhyContactUs from '@/components/contact/WhyContactUs';
import ContactCTA from '@/components/contact/ContactCTA';

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <Toaster position="top-right" />
            <ContactHero />
            <QuickContact />
            <ContactForm />
            <WhyContactUs />
            <ContactCTA />
        </div>
    );
}
