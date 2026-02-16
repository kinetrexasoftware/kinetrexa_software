const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const admins = await Admin.find({}).select('+password');
        console.log('Admins found:', admins.length);
        admins.forEach(admin => {
            console.log(`ID: ${admin._id}`);
            console.log(`Name: ${admin.name}`);
            console.log(`Email: ${admin.email}`);
            console.log(`Role: ${admin.role}`);
            console.log(`IsActive: ${admin.isActive}`);
            console.log(`Password Hash: ${admin.password ? 'Exists' : 'Missing'}`);
            console.log('-------------------');
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
