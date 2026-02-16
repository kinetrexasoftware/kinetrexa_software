const Contact = require('../models/Contact');
const { asyncHandler } = require('../middleware/error.middleware');
const ErrorResponse = require('../utils/errorResponse');
const { createNotification } = require('./notificationController');
const {
    sendUserConfirmationEmail,
    sendAdminInquiryEmail,
    sendAdminReplyEmail
} = require('../utils/emailService');

/**
 * @desc    Submit contact form
 * @route   POST /api/contacts
 * @access  Public
 */
exports.submitContact = asyncHandler(async (req, res, next) => {
    const contact = await Contact.create({
        ...req.body,
        status: 'received'
    });

    // Notify Admins
    createNotification(
        'contact',
        'New Inquiry Received',
        `${contact.name} sent a message: ${contact.subject}`,
        { contactId: contact._id }
    );

    // Send Emails (Non-blocking)
    sendUserConfirmationEmail(contact.email, {
        name: contact.name,
        subject: contact.subject,
        message: contact.message
    }).catch(err => console.error('Confirmation email failed:', err));

    sendAdminInquiryEmail({
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message
    }).catch(err => console.error('Admin inquiry email failed:', err));

    res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        contact
    });
});

/**
 * @desc    Admin reply to inquiry
 * @route   POST /api/contacts/:id/reply
 * @access  Private/Admin
 */
exports.replyToInquiry = asyncHandler(async (req, res, next) => {
    const { replyMessage } = req.body;

    if (!replyMessage) {
        return next(new ErrorResponse('Please provide a reply message', 400));
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        return next(new ErrorResponse('Inquiry not found', 404));
    }

    contact.replyMessage = replyMessage;
    contact.status = 'replied';
    contact.repliedAt = Date.now();
    await contact.save();

    // Send response email to user (Non-blocking)
    sendAdminReplyEmail(contact.email, {
        subject: contact.subject,
        replyMessage: replyMessage
    }).catch(err => console.error('Admin reply email failed:', err));

    res.status(200).json({
        success: true,
        message: 'Reply sent and inquiry updated',
        contact
    });
});

/**
 * @desc    Get all contacts
 * @route   GET /api/contacts
 * @access  Private/Admin
 */
exports.getContacts = asyncHandler(async (req, res, next) => {
    const { status, search } = req.query;
    const { page, limit, skip } = req.pagination || { page: 1, limit: 10, skip: 0 };

    let query = {};
    if (status) query.status = status;

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { subject: { $regex: search, $options: 'i' } }
        ];
    }

    const contacts = await Contact.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);

    const total = await Contact.countDocuments(query);

    res.status(200).json({
        success: true,
        count: contacts.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        contacts
    });
});

/**
 * @desc    Update contact status
 * @route   PUT /api/contacts/:id
 * @access  Private/Admin
 */
exports.updateContactStatus = asyncHandler(async (req, res, next) => {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
    );

    if (!contact) {
        return next(new ErrorResponse('Contact not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Status updated successfully',
        contact
    });
});

/**
 * @desc    Delete contact
 * @route   DELETE /api/contacts/:id
 * @access  Private/Admin
 */
exports.deleteContact = asyncHandler(async (req, res, next) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
        return next(new ErrorResponse('Contact not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Contact deleted successfully'
    });
});
