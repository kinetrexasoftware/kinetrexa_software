const Application = require('../models/Application');
const DomainTask = require('../models/DomainTask');
const Internship = require('../models/Internship');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { asyncHandler } = require('../middleware/error.middleware');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Submit application
 * @route   POST /api/applications
 * @access  Public
 */
const { createNotification } = require('./notificationController');
const {
  sendApplicationConfirmation,
  sendSelectionEmail,
  sendCertificateAvailableEmail
} = require('../utils/emailService');

/**
 * @desc    Submit application
 * @route   POST /api/applications
 * @access  Public
 */
exports.submitApplication = async (req, res, next) => {
  try {
    // Parsing multipart/form-data
    const {
      internshipId,
      fullName,
      email,
      phone,
      domain,
      qualification,
      college,
      skills,
      message
    } = req.body;

    const resumeFile = req.file;

    console.log('Submission Attempt:', { email, domain, hasFile: !!resumeFile });

    // Validate required fields
    if (!fullName || !email || !phone || !domain || !qualification || !college || !skills) {
      return next(new ErrorResponse('Please provide all required fields', 400));
    }

    // Split name
    const names = (fullName || '').trim().split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ') || '.';

    // Construct applicant object
    const applicantData = {
      firstName,
      lastName,
      email,
      phone,
      college,
      skills, // Storing as String now
      message: message || '',
      resumeUrl: resumeFile ? `/uploads/resumes/${resumeFile.filename}` : undefined
    };

    // Deadline and Active Status Check
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return next(new ErrorResponse('Internship program not found', 404));
    }

    if (!internship.canApply()) {
      return next(new ErrorResponse('Applications for this internship are now closed.', 400));
    }

    // Create application - Direct DB Insert
    // This relies on the compound unique index on { 'applicant.email': 1, domain: 1 }
    const application = await Application.create({
      internshipId: internshipId || undefined, // Optional
      domain,
      qualification,
      applicant: applicantData,
      status: 'applied'
    });

    // Notify Admins
    await createNotification(
      'application',
      'New Internship Application',
      `${fullName} applied for ${domain}`,
      { applicationId: application._id }
    );

    // Send confirmation email (non-blocking)
    sendApplicationConfirmation(email, {
      name: fullName,
      applicationId: application.applicationId,
      domain: domain
    }).catch(err => console.error('Email failed silently:', err.message));

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    // Handle Duplicate Key Error (Code 11000)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        code: 'ALREADY_REGISTERED',
        message: 'You are already registered for this internship'
      });
    }

    // Handle other errors
    next(error);
  }
};

/**
 * @desc    Submit application AFTER successful payment verification
 * @route   POST /api/internships/submit-application
 * @access  Public
 */
exports.submitApplicationAfterPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      internshipId,
      fullName,
      email,
      phone,
      domain,
      qualification,
      college,
      skills,
      message
    } = req.body;

    const resumeFile = req.file;

    // 1. Basic Validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return next(new ErrorResponse('Payment details are required', 400));
    }

    if (!fullName || !email || !phone || !domain || !qualification || !college || !skills) {
      return next(new ErrorResponse('Please provide all required application fields', 400));
    }

    // 2. Verify Razorpay Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return next(new ErrorResponse('Payment verification failed', 400));
    }

    // 3. Check for Internship exists
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return next(new ErrorResponse('Internship not found', 404));
    }

    if (!internship.canApply()) {
      return next(new ErrorResponse('Applications for this internship are now closed.', 400));
    }

    // 4. Check for Duplicate Application
    const existingApplication = await Application.findOne({
      'applicant.email': email,
      internshipId: internshipId
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        code: 'ALREADY_REGISTERED',
        message: 'You have already applied for this internship'
      });
    }

    // 5. Create Application
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '.';

    const application = await Application.create({
      internshipId,
      domain,
      qualification,
      applicant: {
        firstName,
        lastName,
        email,
        phone,
        college,
        skills,
        message: message || '',
        resumeUrl: resumeFile ? `/uploads/resumes/${resumeFile.filename}` : undefined
      },
      payment: {
        status: 'Paid',
        transactionId: razorpay_payment_id,
        amount: internship.applicationFee?.amount || 1999,
        currency: 'INR',
        initiatedAt: new Date(),
        paidAt: new Date()
      },
      status: 'applied'
    });

    // 6. Notify Admins
    await createNotification(
      'application',
      'New Internship Application (Paid)',
      `${fullName} applied for ${domain} (Payment Verified)`,
      { applicationId: application._id }
    );

    // Send confirmation email (non-blocking)
    sendApplicationConfirmation(email, {
      name: fullName,
      applicationId: application.applicationId,
      domain: domain
    }).catch(err => console.error('Email failed silently:', err.message));

    res.status(201).json({
      success: true,
      message: 'Payment verified and application submitted successfully',
      application
    });

  } catch (error) {
    console.error("Submit Application Filter Payment Error:", error);
    next(error);
  }
};

/**
 * @desc    Create application manually (Admin)
 * @route   POST /api/applications/admin/create
 * @access  Private/Admin
 */
exports.createApplicationByAdmin = asyncHandler(async (req, res, next) => {
  const {
    internshipId,
    fullName,
    email,
    phone,
    domain,
    qualification,
    college,
    skills,
    message,
    status
  } = req.body;

  // Validate required fields
  if (!fullName || !email || !domain || !qualification) {
    return next(new ErrorResponse('Please provide required fields (Name, Email, Domain, Qualification)', 400));
  }

  // Check unique Application (Email + Internship)
  // Logic: Same user cannot have multiple applications for SAME internship.
  if (internshipId) {
    const existing = await Application.findOne({
      'applicant.email': email,
      internshipId
    });
    if (existing) {
      return next(new ErrorResponse(`This user has already applied for this internship (App ID: ${existing.applicationId})`, 409));
    }
  }

  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '.';

  const application = await Application.create({
    internshipId: internshipId || undefined,
    domain,
    qualification,
    createdBy: 'ADMIN', // Explicitly uppercase
    applicant: {
      firstName,
      lastName,
      email,
      phone: phone || '',
      college: college || 'N/A',
      skills: skills || 'Not Provided',
      message: message || ''
    },
    payment: {
      status: 'ADMIN_EXEMPTED', // Correct enum
      amount: 0,
      currency: 'INR',
      initiatedAt: new Date(),
      paidAt: new Date()
    },
    status: status || 'applied'
  });

  // 1. Send Creation Email
  const { sendAdminApplicationCreatedEmail, sendSelectionEmail } = require('../utils/emailService');

  sendAdminApplicationCreatedEmail(email, {
    name: fullName,
    applicationId: application.applicationId,
    domain: domain
  }).catch(err => console.error('Admin app creation email failed:', err.message));

  // 2. If status is 'selected', send Selection Email immediately
  if (status === 'selected') {
    // Need internship dates
    const internship = internshipId ? await Internship.findById(internshipId) : null;

    const emailData = {
      name: fullName,
      applicationId: application.applicationId,
      domain: domain,
      startDate: internship?.startDate
        ? new Date(internship.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'To be announced',
      duration: internship?.duration || 'Specified Period'
    };

    sendSelectionEmail(email, emailData)
      .catch(err => console.error('Selection email failed (admin create):', err.message));

    // Increment slots if applicable
    if (internship && typeof internship.incrementSlots === 'function') {
      await internship.incrementSlots();
    }
  }

  res.status(201).json({
    success: true,
    message: 'Application created successfully by Admin',
    application
  });
});

/**
 * @desc    Get all applications (Admin only)
 * @route   GET /api/applications/admin
 * @access  Private/Admin
 */
exports.getAllApplicationsAdmin = asyncHandler(async (req, res, next) => {
  const { search } = req.query;
  // Show all valid applications (Paid, Admin Exempted, Waived, Not Required)
  // We exclude 'Pending' (abandoned) and 'Failed' to keep the list clean, unless requested otherwise.
  let query = {
    'payment.status': {
      $in: ['Paid', 'ADMIN_EXEMPTED', 'Not Required', 'Waived']
    }
  };

  if (search) {
    query.$or = [
      { 'applicant.firstName': { $regex: search, $options: 'i' } },
      { 'applicant.lastName': { $regex: search, $options: 'i' } },
      { 'applicant.email': { $regex: search, $options: 'i' } },
      { domain: { $regex: search, $options: 'i' } },
      { applicationId: { $regex: search, $options: 'i' } }
    ];
  }

  // Fetch applications, latest first
  const applications = await Application.find(query)
    .populate('internshipId', 'title applicationFee')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: applications.length,
    applications: applications
  });
});

/**
 * @desc    Get all applications
 * @route   GET /api/applications
 * @access  Private/Admin
 */
exports.getApplications = asyncHandler(async (req, res, next) => {
  const { status, internshipId, search } = req.query;
  const { page, limit, skip } = req.pagination || { page: 1, limit: 10, skip: 0 };

  // Build query
  let query = {};

  if (status) query.status = status;
  if (internshipId) query.internshipId = internshipId;

  // Search functionality
  if (search) {
    query.$or = [
      { 'applicant.firstName': { $regex: search, $options: 'i' } },
      { 'applicant.lastName': { $regex: search, $options: 'i' } },
      { 'applicant.email': { $regex: search, $options: 'i' } },
      { 'applicant.college': { $regex: search, $options: 'i' } },
      { applicationId: { $regex: search, $options: 'i' } }
    ];
  }

  // Execute query - Latest First
  const applications = await Application.find(query)
    .populate('internshipId', 'title type duration mode')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  // Get total count
  const total = await Application.countDocuments(query);

  res.status(200).json({
    success: true,
    count: applications.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    applications
  });
});

/**
 * @desc    Get single application
 * @route   GET /api/applications/:id
 * @access  Private/Admin
 */
exports.getApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id)
    .populate('internshipId')
    .populate('statusHistory.updatedBy', 'name email');

  if (!application) {
    return next(new ErrorResponse('Application not found', 404));
  }

  res.status(200).json({
    success: true,
    application
  });
});

/**
 * @desc    Update application status
 * @route   PUT /api/applications/:id/status
 * @access  Private/Admin
 */
exports.updateStatus = asyncHandler(async (req, res, next) => {
  const { status, comment } = req.body;

  const application = await Application.findById(req.params.id).populate('internshipId');

  if (!application) {
    return next(new ErrorResponse('Application not found', 404));
  }

  const oldStatus = application.status;

  // Update status
  await application.updateStatus(status, req.admin.id, comment);

  // TRIGGER EMAILS (Non-blocking)
  if (oldStatus !== 'selected' && status === 'selected') {
    const emailData = {
      name: `${application.applicant.firstName} ${application.applicant.lastName}`,
      applicationId: application.applicationId,
      domain: application.domain,
      startDate: application.internshipId?.startDate
        ? new Date(application.internshipId.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'To be announced',
      duration: application.internshipId?.duration || 'Specified Period'
    };
    sendSelectionEmail(application.applicant.email, emailData)
      .catch(err => console.error('Selection email failed:', err.message));
  } else if (oldStatus !== 'completed' && status === 'completed') {
    const certEmailData = {
      name: `${application.applicant.firstName} ${application.applicant.lastName}`,
      domain: application.domain
    };
    sendCertificateAvailableEmail(application.applicant.email, certEmailData)
      .catch(err => console.error('Certificate email failed:', err.message));
  }

  // If status changed from selected to rejected or vice versa, update slots
  if (oldStatus === 'selected' && status !== 'selected') {
    const internship = await Internship.findById(application.internshipId);
    if (internship && typeof internship.decrementSlots === 'function') {
      await internship.decrementSlots();
    }
  } else if (oldStatus !== 'selected' && status === 'selected') {
    const internship = await Internship.findById(application.internshipId);
    if (internship && typeof internship.incrementSlots === 'function') {
      await internship.incrementSlots();
    }
  }

  res.status(200).json({
    success: true,
    message: 'Application status updated successfully',
    application
  });
});

/**
 * @desc    Add notes to application
 * @route   PUT /api/applications/:id/notes
 * @access  Private/Admin
 */
exports.addNotes = asyncHandler(async (req, res, next) => {
  const { notes } = req.body;

  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { notes },
    { new: true, runValidators: true }
  );

  if (!application) {
    return next(new ErrorResponse('Application not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Notes added successfully',
    application
  });
});

/**
 * @desc    Delete application
 * @route   DELETE /api/applications/:id
 * @access  Private/Admin
 */
exports.deleteApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return next(new ErrorResponse('Application not found', 404));
  }

  // If application was selected, decrement slots
  if (application.status === 'selected') {
    const internship = await Internship.findById(application.internshipId);
    if (internship && typeof internship.decrementSlots === 'function') {
      await internship.decrementSlots();
    }
  }

  await application.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Application deleted successfully'
  });
});

/**
 * @desc    Get application statistics
 * @route   GET /api/applications/stats/overview
 * @access  Private/Admin
 */
exports.getStats = asyncHandler(async (req, res, next) => {
  const stats = await Application.getStats();

  // Get recent applications (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentCount = await Application.countDocuments({
    appliedAt: { $gte: sevenDaysAgo }
  });

  res.status(200).json({
    success: true,
    stats: {
      ...stats,
      recentApplications: recentCount
    }
  });
});

/**
 * @desc    Track application status (Public)
 * @route   GET /api/applications/track/:email
 * @access  Public
 */
exports.trackApplication = asyncHandler(async (req, res, next) => {
  const applications = await Application.find({
    'applicant.email': req.params.email
  })
    .populate('internshipId', 'title type')
    .select('status appliedAt internshipId applicant.firstName applicant.lastName')
    .sort({ appliedAt: -1 });

  res.status(200).json({
    success: true,
    count: applications.length,
    applications
  });
});

/**
 * @desc    Verify application status (Public)
 * @route   POST /api/applications/verify
 * @access  Public
 */
exports.verifyApplication = asyncHandler(async (req, res, next) => {
  const { email, applicationId } = req.body;

  if (!email || !applicationId) {
    return next(new ErrorResponse('Please provide email and application ID', 400));
  }

  const application = await Application.findOne({
    'applicant.email': email,
    applicationId: applicationId.toUpperCase()
  }).populate('internshipId', 'title endDate');

  if (!application) {
    return next(new ErrorResponse('No application found with provided details.', 404));
  }

  // Check if active task exists for this internship program
  const domainTask = await DomainTask.findOne({
    internshipId: application.internshipId,
    isActive: true
  });

  res.status(200).json({
    success: true,
    application: {
      id: application._id,
      applicationId: application.applicationId,
      status: application.status,
      name: `${application.applicant.firstName} ${application.applicant.lastName}`,
      domain: application.domain,
      appliedAt: application.appliedAt,
      paymentStatus: application.payment?.status,
      internshipId: application.internshipId,
      taskAssignment: {
        enabled: !!domainTask,
        downloadUrl: domainTask ? `/api/documents/task-assignment/${application.applicationId}?email=${encodeURIComponent(email)}` : null
      }
    }
  });
});

/**
 * @desc    Download documents (Offer Letter/Certificate)
 * @route   POST /api/applications/download
 * @access  Public
 */
exports.downloadDocument = asyncHandler(async (req, res, next) => {
  const { email, applicationId, type } = req.body;

  const application = await Application.findOne({
    'applicant.email': email,
    applicationId: applicationId.toUpperCase()
  });

  if (!application) {
    return next(new ErrorResponse('Verification failed. Cannot download document.', 401));
  }

  // Verification Logic based on Status
  if (type === 'offer_letter' && application.status !== 'selected' && application.status !== 'completed') {
    return next(new ErrorResponse('Offer letter is only available for selected candidates.', 403));
  }

  if (type === 'certificate' && application.status !== 'completed') {
    return next(new ErrorResponse('Certificate is only available for completed internships.', 403));
  }

  // Placeholder for PDF generation/serving
  res.status(200).json({
    success: true,
    message: `${type === 'offer_letter' ? 'Offer Letter' : 'Certificate'} download started. (PDF Service Integration Pending)`,
    url: '#'
  });
});