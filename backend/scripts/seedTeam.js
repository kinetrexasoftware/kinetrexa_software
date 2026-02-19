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
                name: 'Hridesh Kumar Chaurasia',
                role: 'Director',
                bio: 'Leading the strategic vision and operational excellence of KineTrexa.',
                image: '', // Placeholder or specific image URL if available
                linkedin: '#',
                twitter: '#',
                github: '#'
            },
            {
                name: 'Shahe Aalam Ansari',
                role: 'Director',
                bio: 'Driving technical innovation and software architecture standards.',
                image: '', // Placeholder
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
            aboutContent.markModified('content'); // Essential for mixed type
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
