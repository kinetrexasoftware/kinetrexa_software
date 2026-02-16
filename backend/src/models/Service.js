const mongoose = require('mongoose');
const slugify = require('slugify');

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a service title'],
        unique: true,
        trim: true,
        maxlength: [50, 'Title can not be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    icon: {
        type: String,
        default: 'Settings' // Default Lucide icon name
    },
    category: {
        type: String,
        required: true,
        enum: ['Software', 'Design', 'Marketing', 'Consulting', 'Infrastructure'],
        default: 'Software'
    },
    price: {
        type: String,
        default: 'Custom Quote'
    },
    features: [String],
    active: {
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
