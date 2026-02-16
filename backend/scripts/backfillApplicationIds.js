const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const Application = require('../src/models/Application');

const backfillApplicationIds = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kinetrexa');
        console.log('Connected to MongoDB');

        const applications = await Application.find({ applicationId: { $exists: false } });
        console.log(`Found ${applications.length} applications without ID`);

        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

        for (const app of applications) {
            let isUnique = false;
            let generatedId = '';

            while (!isUnique) {
                generatedId = '';
                const length = Math.floor(Math.random() * 3) + 8;
                for (let i = 0; i < length; i++) {
                    generatedId += characters.charAt(Math.floor(Math.random() * characters.length));
                }

                const existing = await Application.findOne({ applicationId: generatedId });
                if (!existing) {
                    isUnique = true;
                }
            }

            await Application.updateOne(
                { _id: app._id },
                { $set: { applicationId: generatedId } },
                { runValidators: false }
            );
            console.log(`Updated application ${app._id} with ID ${generatedId}`);
        }

        console.log('Backfill complete');
        process.exit(0);
    } catch (error) {
        console.error('Error during backfill:', error);
        process.exit(1);
    }
};

backfillApplicationIds();
