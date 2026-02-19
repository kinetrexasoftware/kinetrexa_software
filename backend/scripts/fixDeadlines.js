const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Internship = require('../src/models/Internship');

// Load env vars
dotenv.config({ path: '.env' });

const fixDeadlines = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected');

        const now = new Date();
        // Find active internships starting in the future
        const internships = await Internship.find({
            isActive: true,
            startDate: { $gt: now }
        });

        console.log(`🔍 Found ${internships.length} future active internships.`);

        let updatedCount = 0;
        for (const internship of internships) {
            // Check if deadline is before start date (or just force sync)
            if (internship.deadline < internship.startDate) {
                console.log(`⚠️ Updating ${internship.title}:`);
                console.log(`   Current Deadline: ${internship.deadline.toDateString()}`);
                console.log(`   New Deadline:     ${internship.startDate.toDateString()}`);

                internship.deadline = internship.startDate;
                await internship.save();
                updatedCount++;
            } else {
                console.log(`✅ ${internship.title} is already OK.`);
            }
        }

        console.log(`🎉 Updated ${updatedCount} internships.`);
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

fixDeadlines();
