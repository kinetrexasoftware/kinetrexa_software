require('dotenv').config({ path: '../.env' }); // Adjusted path for script execution context
const mongoose = require('mongoose');
const Content = require('../models/Content');
const connectDB = require('../config/database');

// Explicit config if dotenv fails or path is tricky
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kinetrexa';

const seedHomeContent = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        const homeContent = {
            hero: {
                title: 'Building the Future of Digital Innovation',
                subtitle: 'Web Apps • Mobile Apps • SaaS Products • Training • Internships',
                ctaText: 'Hire Us'
            },
            services: {
                title: 'What We Do',
                subtitle: 'Comprehensive technology services tailored to your needs'
            },
            products: {
                title: 'Our Products',
                subtitle: 'Innovative solutions built for scale and performance'
            },
            whyChooseUs: {
                title: 'Why Choose KineTrexa',
                subtitle: 'We deliver excellence through innovation and dedication',
                items: [
                    { title: 'Expert Team', desc: 'Industry veterans with years of experience.', icon: 'Users' },
                    { title: 'Fast Delivery', desc: 'We value your time and deliver on schedule.', icon: 'Clock' },
                    { title: 'Reliable Support', desc: '24/7 support for all your critical needs.', icon: 'CheckCircle2' }
                ]
            },
            founderVision: {
                quote: "At KineTrexa, we don't just write code; we engineer possibilities. Our vision is to bridge the gap between academic learning and industry demands while delivering world-class digital solutions to our clients.",
                author: "Shahe Alam",
                designation: "Founder & CEO, KineTrexa"
            },
            projects: {
                title: 'Our Recent Work',
                subtitle: 'Showcasing our latest projects and success stories',
                items: [
                    {
                        title: 'E-Commerce Platform',
                        category: 'Web Development',
                        desc: 'A full-featured shopping platform with secure payments.'
                    },
                    {
                        title: 'Task Master App',
                        category: 'Mobile App',
                        desc: 'Productivity application for managing daily tasks efficiently.'
                    },
                    {
                        title: 'Analytics Dashboard',
                        category: 'SaaS Product',
                        desc: 'Real-time data visualization for business intelligence.'
                    }
                ]
            },
            howWeWork: {
                title: 'How We Work',
                subtitle: 'A transparent and efficient process to bring your vision to life.',
                steps: [
                    { title: 'Discovery', desc: 'We understand your needs and goals.', icon: 'Search' },
                    { title: 'Planning', desc: 'We create a roadmap for success.', icon: 'PenTool' },
                    { title: 'Development', desc: 'We build with quality code.', icon: 'Code2' },
                    { title: 'Launch', desc: 'We deploy and support your product.', icon: 'Rocket' }
                ]
            },
            trainingInternship: {
                trainingTitle: 'Expert-Led Training Programs',
                trainingDesc: 'Master the latest technologies with our hands-on training sessions. From web development to cloud computing, we cover it all.',
                internshipTitle: 'Join Our Internship Program',
                internshipDesc: 'Kickstart your career with real-world exposure. Work on live projects and gain invaluable experience.'
            }
        };

        const section = 'home';

        let content = await Content.findOne({ section });

        if (content) {
            console.log('Home content already exists. Updating...');
            content.content = { ...content.content, ...homeContent };
            await content.save();
        } else {
            console.log('Creating new Home content...');
            await Content.create({
                section,
                content: homeContent,
                isPublished: true
            });
        }

        console.log('✅ Home Content Seeded Successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedHomeContent();
