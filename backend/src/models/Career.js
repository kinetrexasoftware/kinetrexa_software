const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Please add a job role title'],
        trim: true
    },
    location: {
        type: String,
        required: true,
        default: 'Remote'
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        default: 'Full-time'
    },
    description: {
        type: String,
        required: [true, 'Please add a job description']
    },
    requirements: [String],
    salary: String,
    status: {
        type: String,
        enum: ['Active', 'Closed'],
        default: 'Active'
    },
    applicantsCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Career', CareerSchema);
