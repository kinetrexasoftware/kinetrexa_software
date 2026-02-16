const Notification = require('../models/Notification');
const { asyncHandler } = require('../middleware/error.middleware');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Get all notifications
 * @route   GET /api/notifications
 * @access  Private/Admin
 */
exports.getNotifications = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    const query = {};
    if (req.query.unreadOnly === 'true') {
        query.isRead = false;
    }

    const total = await Notification.countDocuments(query);
    const notifications = await Notification.find(query)
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);

    // Count total unread
    const unreadCount = await Notification.countDocuments({ isRead: false });

    res.status(200).json({
        success: true,
        count: notifications.length,
        total,
        unreadCount,
        pagination: {
            page,
            limit,
            pages: Math.ceil(total / limit)
        },
        notifications
    });
});

/**
 * @desc    Mark notification as read
 * @route   PUT /api/notifications/:id/read
 * @access  Private/Admin
 */
exports.markAsRead = asyncHandler(async (req, res, next) => {
    let notification = await Notification.findById(req.params.id);

    if (!notification) {
        return next(new ErrorResponse('Notification not found', 404));
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({
        success: true,
        notification
    });
});

/**
 * @desc    Mark ALL notifications as read
 * @route   PUT /api/notifications/read-all
 * @access  Private/Admin
 */
exports.markAllRead = asyncHandler(async (req, res, next) => {
    await Notification.updateMany({ isRead: false }, { isRead: true });

    res.status(200).json({
        success: true,
        message: 'All notifications marked as read'
    });
});

/**
 * @desc    Delete notification
 * @route   DELETE /api/notifications/:id
 * @access  Private/Admin
 */
exports.deleteNotification = asyncHandler(async (req, res, next) => {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        return next(new ErrorResponse('Notification not found', 404));
    }

    await notification.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// Helper to create notification internally
exports.createNotification = async (type, title, message, data = {}) => {
    try {
        await Notification.create({
            type,
            title,
            message,
            data
        });
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};
