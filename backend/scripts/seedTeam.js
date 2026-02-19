const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Content = require('../src/models/Content');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedTeam = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');

        const teamData = [
            {
                name: 'Alex Mercer',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
                bio: 'Visionary leader with 15+ years in software architecture and AI, driving KineTrexa’s mission to redefine digital excellence.',
                linkedin: '#',
                twitter: '#',
                github: '#'
            },
            {
                name: 'Sarah Lin',
                role: 'Chief Technology Officer',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
                bio: 'Expert in scalable systems and cloud infrastructure. Sarah ensures every line of code meets our rigorous performance standards.',
                linkedin: '#',
                twitter: '#',
                github: '#'
            },
            {
                name: 'James Chen',
                role: 'Head of Engineering',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
                bio: 'Full-stack virtuoso leading our agile teams. James is obsessed with clean code, security, and developer experience.',
                linkedin: '#',
                twitter: '#',
                github: '#'
            },
            {
                name: 'Elena Rodriguez',
                role: 'Lead Project Manager',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400',
                bio: 'The bridge between technical complexity and business goals. Elena ensures seamless delivery and transparent communication.',
                linkedin: '#',
                twitter: '#',
                github: '#'
            },
            {
                name: 'David Kim',
                role: 'Lead UI/UX Designer',
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400',
                bio: 'Crafting intuitive, "Mission Control" interfaces that turn complex data into beautiful, actionable experiences.',
                linkedin: '#',
                twitter: '#',
                github: '#'
            },
            {
                name: 'Michael Ross',
                role: 'Lead QA Engineer',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
                bio: 'Our first line of defense. Michael’s automated testing frameworks ensure zero-defect deployments for critical systems.',
                linkedin: '#',
                twitter: '#',
                github: '#'
            }
        ];

        // Find 'about' section content
        const aboutContent = await Content.findOne({ section: 'about' });

        if (aboutContent) {
            aboutContent.content = {
                ...aboutContent.content,
                team: teamData,
                teamVisible: true // Ensure it's visible
            };
            await aboutContent.save();
            console.log('Team data seeded successfully into "about" section.');
        } else {
            console.log('About section not found. Creating it...');
            await Content.create({
                section: 'about',
                content: {
                    team: teamData,
                    teamVisible: true
                }
            });
            console.log('About section created with team data.');
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding team:', error);
        process.exit(1);
    }
};

seedTeam();
