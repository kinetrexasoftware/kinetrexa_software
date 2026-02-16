const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Content = require('../src/models/Content');

dotenv.config({ path: '.env' });

const seedGlobalContent = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        const globalContent = {
            section: 'global',
            content: {
                facebook: 'https://facebook.com/kinetrexa',
                twitter: 'https://twitter.com/kinetrexa',
                instagram: 'https://instagram.com/kinetrexa',
                linkedin: 'https://linkedin.com/company/kinetrexa',
                email: 'contact@kinetrexa.com',
                phone: '+91 98765 43210',
                address1: '123 Tech Park, Innovation Street,',
                address2: 'Silicon Valley, India'
            },
            isPublished: true
        };

        const existing = await Content.findOne({ section: 'global' });
        if (existing) {
            console.log('ℹ️ Global content already exists. Updating...');
            existing.content = globalContent.content;
            await existing.save();
        } else {
            console.log('🌱 Creating global content...');
            await Content.create(globalContent);
        }

        console.log('✅ Global content seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedGlobalContent();
