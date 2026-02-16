const mongoose = require('mongoose');

const TaskItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a task title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a task description']
    },
    requiresGithubLink: {
        type: Boolean,
        default: true
    },
    requiresLiveLink: {
        type: Boolean,
        default: true
    },
    requiresLinkedinLink: {
        type: Boolean,
        default: true
    }
});

const DomainTaskSchema = new mongoose.Schema({
    internshipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Internship',
        required: [true, 'Please select an internship program'],
        unique: true
    },
    domain: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    tasks: {
        type: [TaskItemSchema],
        required: [true, 'Please add at least one task']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DomainTask', DomainTaskSchema);
