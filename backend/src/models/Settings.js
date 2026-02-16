const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    general: {
        name: { type: String, default: 'KineTrexa' },
        logo: { type: String, default: '/logo.png' },
        currency: { type: String, default: 'USD' }
    },
    contact: {
        email: { type: String, default: 'contact@kinetrexa.com' },
        phone: { type: String, default: '' },
        address: { type: String, default: '' }
    },
    social: {
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
        github: String
    },
    seo: {
        title: { type: String, default: 'KineTrexa - IT Solutions' },
        description: { type: String, default: 'Leading IT services company.' },
        keywords: { type: String, default: 'software, development, tech' }
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Settings', SettingsSchema);
