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
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    icon: {
        type: String,
        default: 'Box' // Default Lucide icon name
    },
    status: {
        type: String,
        enum: ['Live', 'Beta', 'Coming Soon'],
        default: 'Coming Soon'
    },
    category: {
        type: String,
        required: true,
        enum: ['SaaS', 'Enterprise', 'Tool', 'Infrastructure', 'Other'],
        default: 'SaaS'
    },
    features: [String],
    link: String,
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

// Create slug from name
ProductSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Product', ProductSchema);
