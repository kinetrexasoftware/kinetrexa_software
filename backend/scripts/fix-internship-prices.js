/**
 * Script to fix internship prices
 * Run with: node scripts/fix-internship-prices.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Internship = require('../src/models/Internship');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};

const fixPrices = async () => {
    try {
        // Get all internships
        const internships = await Internship.find({});

        console.log(`\n📊 Found ${internships.length} internships\n`);

        for (const internship of internships) {
            console.log(`\n🔍 Checking: ${internship.title}`);
            console.log(`   Current applicationFee:`, internship.applicationFee);

            // If applicationFee doesn't exist or amount is 0/undefined
            if (!internship.applicationFee || !internship.applicationFee.amount) {
                console.log(`   ⚠️  Missing or invalid applicationFee`);

                // Set default based on title or ask for manual update
                // You can customize these prices based on your internships
                let defaultPrice = 1999; // Default fallback

                // Example: Set prices based on title keywords
                if (internship.title.toLowerCase().includes('ui/ux') ||
                    internship.title.toLowerCase().includes('design')) {
                    defaultPrice = 79;
                } else if (internship.title.toLowerCase().includes('backend') ||
                    internship.title.toLowerCase().includes('data')) {
                    defaultPrice = 149;
                } else if (internship.title.toLowerCase().includes('full stack') ||
                    internship.title.toLowerCase().includes('fullstack')) {
                    defaultPrice = 249;
                }

                internship.applicationFee = {
                    amount: defaultPrice,
                    currency: 'INR',
                    isMandatory: true
                };

                await internship.save();
                console.log(`   ✅ Updated to ₹${defaultPrice}`);
            } else {
                console.log(`   ✓ Already has price: ₹${internship.applicationFee.amount}`);
            }
        }

        console.log('\n✅ All internships updated successfully!\n');

        // Display summary
        const updated = await Internship.find({});
        console.log('📋 Final Pricing Summary:');
        console.log('─'.repeat(60));
        updated.forEach(int => {
            console.log(`${int.title.padEnd(40)} ₹${int.applicationFee?.amount || 'NOT SET'}`);
        });
        console.log('─'.repeat(60));

    } catch (error) {
        console.error('❌ Error fixing prices:', error);
    }
};

const main = async () => {
    await connectDB();
    await fixPrices();
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
};

main();
