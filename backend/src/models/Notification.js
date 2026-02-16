const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['application', 'contact', 'system'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    data: {
        type: Object, // Can store { applicationId: ... } etc.
        default: {}
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 30 // Auto-delete after 30 days
    }
});

// Instance method to mark as read
NotificationSchema.methods.markAsRead = async function () {
    this.isRead = true;
    await this.save();
};

module.exports = mongoose.model('Notification', NotificationSchema);
