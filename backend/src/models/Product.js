const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    tagline: {
        type: String,
        required: [true, 'Please add a tagline'],
        maxlength: [100, 'Tagline can not be more than 100 characters']
    },
    shortDescription: {
        type: String,
        required: [true, 'Please add a short description'],
        maxlength: [200, 'Short description can not be more than 200 characters']
    },
    longDescription: {
        type: String,
        required: [true, 'Please add a long description']
    },
    logo: {
        type: String,
        default: 'Box' // Lucide icon name or image URL
    },
    status: {
        type: String,
        enum: ['Live', 'Beta', 'Coming Soon'],
        default: 'Coming Soon'
    },
    category: {
        type: String,
        required: true,
        default: 'SaaS'
    },
    features: [String],
    gradientTheme: {
        type: String,
        default: 'from-blue-600 to-cyan-500'
    },
    websiteLink: String,
    androidLink: String,
    iosLink: String,
    isFeatured: {
        type: Boolean,
        default: false
    },
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

// Create slug from name
ProductSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Product', ProductSchema);
