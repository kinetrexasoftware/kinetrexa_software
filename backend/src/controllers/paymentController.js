const Razorpay = require('razorpay');
const crypto = require('crypto');
const Application = require('../models/Application');
const Internship = require('../models/Internship');
const ErrorResponse = require('../utils/errorResponse');
const { asyncHandler } = require('../middleware/error.middleware');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * @desc    Create Razorpay Order (BEFORE application creation)
 * @route   POST /api/payments/create-order
 * @access  Public
 */
exports.createOrder = asyncHandler(async (req, res, next) => {
    const { internshipId } = req.body;

    if (!internshipId) {
        return next(new ErrorResponse('Internship ID is required', 400));
    }

    const internship = await Internship.findById(internshipId);

    if (!internship) {
        return next(new ErrorResponse('Internship not found', 404));
    }

    // Get price from internship (admin-controlled)
    // Use strict backend source - no hardcoded fallbacks
    let amount = internship.amount;

    // Safety check - strictly prevent 0 or null for paid internships if logic fails elsewhere
    if (!amount || amount <= 0) {
        // If type is Paid but amount is 0, this is a data error.
        // If type is Free, we shouldn't be here (frontend shouldn't call create-order).
        if (internship.type === 'Paid') {
            return next(new ErrorResponse('Invalid internship fee configuration', 500));
        }
        amount = 0; // Should not happen for payment flow
    }

    // Razorpay expects amount in paise
    const amountInPaise = Math.round(amount * 100);

    const options = {
        amount: amountInPaise,
        currency: "INR",
        receipt: `temp_${Date.now()}`, // Temporary receipt
        notes: {
            internshipId: internshipId.toString(),
            domain: internship.title
        }
    };

    try {
        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: amount,
            currency: 'INR',
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        return next(new ErrorResponse('Failed to create payment order', 500));
    }
});

/**
 * @desc    Verify payment and CREATE application
 * @route   POST /api/payments/verify
 * @access  Public
 */
exports.verifyPayment = asyncHandler(async (req, res, next) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        formData,
        internshipId
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return next(new ErrorResponse('Payment details are required', 400));
    }

    if (!formData || !internshipId) {
        return next(new ErrorResponse('Application data is required', 400));
    }

    // Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature !== razorpay_signature) {
        return next(new ErrorResponse('Payment verification failed', 400));
    }

    // Signature is valid - NOW create the application
    try {
        const internship = await Internship.findById(internshipId);
        if (!internship) {
            return next(new ErrorResponse('Internship not found', 404));
        }

        // Check for duplicate application
        const existingApplication = await Application.findOne({
            'applicant.email': formData.email,
            internshipId: internshipId
        });

        if (existingApplication) {
            return res.status(409).json({
                success: false,
                code: 'ALREADY_REGISTERED',
                message: 'You have already applied for this internship'
            });
        }

        // Parse fullName into firstName and lastName
        const nameParts = formData.fullName.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Create application with payment details
        const application = await Application.create({
            internshipId: internshipId,
            domain: formData.domain,
            qualification: formData.qualification,
            applicant: {
                firstName: firstName,
                lastName: lastName,
                email: formData.email,
                phone: formData.phone,
                college: formData.college,
                skills: formData.skills,
                message: formData.message || '',
                resumeUrl: formData.resumeUrl || '' // Handle resume separately if uploaded
            },
            payment: {
                status: 'Paid',
                transactionId: razorpay_payment_id,
                amount: internship.amount,
                currency: 'INR',
                initiatedAt: Date.now(),
                paidAt: Date.now()
            },
            status: 'Applied'
        });

        res.status(201).json({
            success: true,
            status: 'Paid',
            application: application
        });
    } catch (error) {
        console.error("Application Creation Error:", error);
        return next(new ErrorResponse('Failed to create application after payment', 500));
    }
});
