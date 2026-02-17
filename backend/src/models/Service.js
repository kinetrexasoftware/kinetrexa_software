const mongoose = require('mongoose');
const slugify = require('slugify');

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a service title'],
        unique: true,
        trim: true,
        maxlength: [100, 'Title can not be more than 100 characters']
    },
    slug: String,
    shortDescription: {
        type: String,
        required: [true, 'Please add a short description'],
        maxlength: [200, 'Short description can not be more than 200 characters']
    },
    detailedDescription: {
        type: String,
        required: [true, 'Please add a detailed description']
    },
    icon: {
        type: String,
        default: 'Settings'
    },
    coverImage: {
        type: String,
        default: 'default-service.jpg'
    },
    gradientTheme: {
        type: String,
        default: 'from-blue-600 to-cyan-500'
    },
    features: [String],
    technologies: [String],
    processSteps: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create slug from title
ServiceSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model('Service', ServiceSchema);
