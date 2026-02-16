const mongoose = require('mongoose');
const slugify = require('slugify');

const TrainingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a program name'],
        unique: true,
        trim: true,
        maxlength: [100, 'Name can not be more than 100 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    duration: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        enum: ['Online', 'Offline', 'Hybrid'],
        default: 'Online'
    },
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Open', 'Closing Soon', 'Closed'],
        default: 'Open'
    },
    curriculum: [String],
    active: {
        type: Boolean,
        default: true
    },
    enrollmentCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create slug from name
TrainingSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Training', TrainingSchema);
