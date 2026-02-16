const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const dropGhostIndex = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        const collection = mongoose.connection.collection('contents');
        const indexes = await collection.indexes();
        console.log('📊 Current indexes:', indexes.map(i => i.name));

        if (indexes.some(i => i.name === 'key_1')) {
            console.log('🗑️ Dropping ghost index key_1...');
            await collection.dropIndex('key_1');
            console.log('✅ Index dropped successfully');
        } else {
            console.log('ℹ️ Index key_1 not found');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Failed to drop index:', error);
        process.exit(1);
    }
};

dropGhostIndex();
