const PDFDocument = require('pdfkit');
const Application = require('../models/Application');
const DomainTask = require('../models/DomainTask');
const { asyncHandler } = require('../middleware/error.middleware');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Generate Offer Letter PDF
 * @route   GET /api/documents/offer-letter/:applicationId
 * @access  Public (Validated by Application ID and Email)
 */
exports.generateOfferLetter = asyncHandler(async (req, res, next) => {
    const { applicationId } = req.params;
    const { email } = req.query;

    if (!email) {
        return next(new ErrorResponse('Email is required to verify identity', 400));
    }

    const application = await Application.findOne({
        applicationId: applicationId.toUpperCase(),
        'applicant.email': email
    }).populate('internshipId');

    if (!application) {
        return next(new ErrorResponse('Application not found or unauthorized access', 404));
    }

    if (application.status !== 'selected' && application.status !== 'completed') {
        return next(new ErrorResponse('Offer letter is only available for selected candidates.', 403));
    }

    if (application.payment?.status !== 'Paid') {
        return next(new ErrorResponse('Offer letter is locked until payment is confirmed.', 403));
    }

    const doc = new PDFDocument({
        margin: 50,
        size: 'A4'
    });

    // Filename: KineTrexa_Offer_Letter_<APPLICATION_ID>.pdf
    const filename = `KineTrexa_Offer_Letter_${application.applicationId}.pdf`;

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Track download (Async / Non-blocking)
    application.offerLetterDownloaded = true;
    application.offerLetterDownloadedAt = new Date();
    application.save().catch(err => console.error('Offer letter tracking failed:', err.message));

    // Pipe the PDF into the response
    doc.pipe(res);

    // --- PDF CONTENT START ---

    // Header / BRANDING
    doc.fontSize(25).fillColor('#2563eb').text('KINETREXA', { align: 'right' });
    doc.fontSize(10).fillColor('#64748b').text('Building Skills. Creating Futures.', { align: 'right' });
    doc.moveDown(2);

    // DATE
    const today = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    doc.fontSize(12).fillColor('#1e293b').text(`Date: ${today}`, { align: 'left' });
    doc.moveDown(0.5);
    doc.text(`Ref ID: ${application.applicationId}`);
    doc.moveDown(2);

    // RECIPIENT
    doc.fontSize(14).font('Helvetica-Bold').text('OFFER LETTER');
    doc.moveDown();
    doc.fontSize(12).font('Helvetica').text('Dear ', { continued: true })
        .font('Helvetica-Bold').text(`${application.applicant.firstName} ${application.applicant.lastName},`);
    doc.moveDown();

    // CONTENT
    doc.fontSize(12).font('Helvetica').text(
        `Congratulations! We are pleased to offer you an internship at KineTrexa. Based on your application and subsequent interview process, we found your skills and enthusiasm highly compatible with our requirements.`,
        { align: 'justify' }
    );
    doc.moveDown();

    doc.text('We are excited to welcome you to the team as a ', { continued: true })
        .font('Helvetica-Bold').text(`${application.domain} Intern`, { continued: true })
        .font('Helvetica').text('. Your contribution will be vital in helping us achieve our goals while providing you with significant hands-on experience in the industry.');
    doc.moveDown();

    // TERMS
    doc.font('Helvetica-Bold').text('Internship Details:');
    doc.moveDown(0.5);
    doc.font('Helvetica').text(`- Domain: ${application.domain}`);
    doc.text(`- Application ID: ${application.applicationId}`);

    // Dynamic Start Date from Internship model or default to TBD
    const startDate = application.internshipId?.startDate
        ? new Date(application.internshipId.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'To be announced';
    doc.text(`- Start Date: ${startDate}`);

    doc.text(`- Company: KineTrexa`);
    doc.moveDown();

    doc.text(
        'Please note that this is a professional engagement subject to the company\'s terms and conditions. We expect you to maintain high standards of professionalism and integrity throughout your tenure.',
        { align: 'justify' }
    );
    doc.moveDown(2);

    // CLOSING
    doc.text('We look forward to a successful association.');
    doc.moveDown(2);

    // SIGNATURE
    doc.font('Helvetica-Bold').text('Authorized Signatory,');
    doc.moveDown(0.2);
    doc.text('Human Resources Department');
    doc.font('Helvetica').text('KineTrexa IT Services');
    doc.moveDown(3);

    // FOOTER
    const bottom = doc.page.height - 50;
    doc.fontSize(10).fillColor('#94a3b8').text(
        '© KineTrexa',
        50,
        bottom,
        { align: 'center', width: doc.page.width - 100 }
    );

    // --- PDF CONTENT END ---

    doc.end();
});

/**
 * @desc    Generate Internship Certificate PDF
 * @route   GET /api/documents/certificate/:applicationId
 * @access  Public (Validated by Application ID and Email)
 */
exports.generateCertificate = asyncHandler(async (req, res, next) => {
    const { applicationId } = req.params;
    const { email } = req.query;

    if (!email) {
        return next(new ErrorResponse('Email is required to verify identity', 400));
    }

    const application = await Application.findOne({
        applicationId: applicationId.toUpperCase(),
        'applicant.email': email
    }).populate('internshipId');

    if (!application) {
        return next(new ErrorResponse('Application not found or unauthorized access', 404));
    }

    if (application.status !== 'completed') {
        return next(new ErrorResponse('Certificate is only available for completed internships.', 403));
    }

    // CHECK: Unlock only if current date >= internship end date
    const currentDate = new Date();
    const endDate = application.internshipId?.endDate;

    if (endDate && currentDate < new Date(endDate)) {
        return next(new ErrorResponse('Certificate will be unlocked after the internship completion date.', 403));
    }

    const doc = new PDFDocument({
        margin: 50,
        size: 'A4',
        layout: 'landscape' // Certificates usually look better in landscape
    });

    const filename = `KineTrexa_Certificate_${application.applicationId}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Track download (Async / Non-blocking)
    application.certificateDownloaded = true;
    application.certificateDownloadedAt = new Date();
    application.save().catch(err => console.error('Certificate tracking failed:', err.message));

    doc.pipe(res);

    // --- CERTIFICATE CONTENT START ---

    // BORDER
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).lineWidth(2).strokeColor('#2563eb').stroke();
    doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50).lineWidth(1).strokeColor('#cbd5e1').stroke();

    // Header / BRANDING
    doc.moveDown(4);
    doc.fontSize(30).fillColor('#1e293b').font('Helvetica-Bold').text('KINETREXA', { align: 'center' });
    doc.fontSize(12).fillColor('#64748b').font('Helvetica').text('Building Skills. Creating Futures.', { align: 'center' });
    doc.moveDown(2);

    // TITLE
    doc.fontSize(35).fillColor('#2563eb').font('Helvetica-Bold').text('Internship Completion Certificate', { align: 'center' });
    doc.moveDown(1.5);

    // CERTIFY TEXT
    doc.fontSize(16).fillColor('#475569').font('Helvetica').text('This is to certify that', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(28).fillColor('#0f172a').font('Helvetica-Bold').text(`${application.applicant.firstName} ${application.applicant.lastName}`, { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(16).fillColor('#475569').font('Helvetica').text('has successfully completed an internship program in', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(22).fillColor('#2563eb').font('Helvetica-Bold').text(application.domain, { align: 'center' });
    doc.moveDown(1);

    // DETAILS
    const duration = application.internshipId?.duration || 'Specified Period';
    const completionDate = new Date(application.updatedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    doc.fontSize(14).fillColor('#475569').font('Helvetica').text(`Duration: ${duration}`, { align: 'center' });
    doc.text(`Completion Date: ${completionDate}`, { align: 'center' });
    doc.moveDown(2);

    // MESSAGE
    doc.fontSize(12).font('Helvetica-Oblique').text(
        'During the internship, the candidate demonstrated exceptional professional behavior, technical proficiency, and a collaborative spirit.',
        { align: 'center', width: 600, indent: 110 }
    );
    doc.moveDown(3);

    // SIGNATURE SECTION
    const sigY = doc.y;

    // Left: Certificate ID
    doc.fontSize(10).fillColor('#94a3b8').font('Helvetica').text(`Certificate ID: ${application.applicationId}-CERT`, 80, sigY);

    // Right: Signature
    doc.fontSize(14).fillColor('#1e293b').font('Helvetica-Bold').text('Authorized Signatory', 550, sigY);
    doc.fontSize(11).fillColor('#64748b').font('Helvetica').text('Director, KineTrexa IT Services', 550, sigY + 15);

    // FOOTER
    const bottom = doc.page.height - 60;
    doc.fontSize(9).fillColor('#94a3b8').font('Helvetica').text(
        'This certificate is system generated and digitally verified.',
        20,
        bottom,
        { align: 'center', width: doc.page.width - 40 }
    );

    // --- CERTIFICATE CONTENT END ---

    doc.end();
});

/**
 * @desc    Generate Task Assignment PDF dynamically
 * @route   GET /api/documents/task-assignment/:applicationId
 * @access  Public (Validated by Application ID and Email)
 */
exports.generateTaskAssignment = asyncHandler(async (req, res, next) => {
    const { applicationId } = req.params;
    const { email } = req.query;

    if (!email) {
        return next(new ErrorResponse('Email is required to verify identity', 400));
    }

    const application = await Application.findOne({
        applicationId: applicationId.toUpperCase(),
        'applicant.email': email
    });

    if (!application) {
        return next(new ErrorResponse('Application not found or unauthorized access', 404));
    }

    // Only for selected or completed status
    if (application.status !== 'selected' && application.status !== 'completed') {
        return next(new ErrorResponse('Task assignment is only available for selected candidates.', 403));
    }

    // Find active task for the application domain
    const domainTask = await DomainTask.findOne({
        domain: application.domain,
        isActive: true
    });

    if (!domainTask) {
        return next(new ErrorResponse(`No active task assignment found for ${application.domain}.`, 404));
    }

    const doc = new PDFDocument({
        margin: 50,
        size: 'A4'
    });

    const filename = `Task_Assignment_${application.applicationId}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Track download (Async / Non-blocking)
    application.taskDownloaded = true;
    application.taskDownloadedAt = new Date();
    application.save().catch(err => console.error('Task tracking failed:', err.message));

    doc.pipe(res);

    // --- PDF CONTENT START ---

    // Header / BRANDING
    doc.fontSize(25).fillColor('#2563eb').text('KINETREXA', { align: 'right' });
    doc.fontSize(10).fillColor('#64748b').text('Building Skills. Creating Futures.', { align: 'right' });
    doc.moveDown(2);

    // TITLE
    doc.fontSize(18).fillColor('#1e293b').font('Helvetica-Bold').text('INTERNSHIP TASK ASSIGNMENT');
    doc.moveDown();

    // INTERN INFO
    doc.fontSize(12).font('Helvetica-Bold').text('Internship Details:');
    doc.moveDown(0.5);
    doc.font('Helvetica').text(`Name: ${application.applicant.firstName} ${application.applicant.lastName}`);
    doc.text(`Application ID: ${application.applicationId}`);
    doc.text(`Domain: ${application.domain}`);

    const formatDate = (date) => new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.text(`Duration: ${domainTask.duration} (${formatDate(domainTask.startDate)} - ${formatDate(domainTask.endDate)})`);
    doc.moveDown(2);

    // TASKS
    doc.fontSize(14).font('Helvetica-Bold').text('Project Tasks & Responsibilities:');
    doc.moveDown();

    domainTask.tasks.forEach((task, index) => {
        doc.fontSize(12).font('Helvetica-Bold').text(`${index + 1}. ${task.title}`);
        doc.fontSize(11).font('Helvetica').text(task.description, { align: 'justify' });

        if (task.submissionInstructions) {
            doc.moveDown(0.2);
            doc.fontSize(10).fillColor('#475569').font('Helvetica-Oblique').text(`Submission Info: ${task.submissionInstructions}`, { align: 'justify' });
            doc.fillColor('#000000');
        }

        if (task.deadline) {
            doc.moveDown(0.2);
            doc.fontSize(10).fillColor('#2563eb').font('Helvetica-Bold').text(`Target Completion: ${formatDate(task.deadline)}`);
            doc.fillColor('#000000');
        }
        doc.moveDown(1.5);
    });

    // GUIDELINES
    doc.moveDown();
    doc.fontSize(12).font('Helvetica-Bold').text('Submission Guidelines & Verification Policy:');
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica').text('1. All assigned tasks must be completed with professional quality, proper structure, and clear documentation.');
    doc.text('2. The complete project must be pushed to a public GitHub repository with a clear README.');
    doc.text('3. The project must be deployed live on a publicly accessible platform (Vercel, Netlify, etc.).');
    doc.text('4. You are required to publish a LinkedIn post showcasing your project, features, and KineTrexa internship.');
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').text('Mandatory Submission Links for Verification:');
    doc.font('Helvetica').text('✅ GitHub Repository Link, ✅ Live Project URL, ✅ LinkedIn Post URL');
    doc.moveDown(0.5);
    doc.fontSize(9).fillColor('#64748b').text('All submitted links will be manually verified. Incomplete or non-functional links may result in delay or rejection of internship completion.', { align: 'justify' });
    doc.fillColor('#000000');

    // FOOTER
    const bottom = doc.page.height - 50;
    doc.fontSize(10).fillColor('#94a3b8').text(
        'This document is system generated and does not require a physical signature.',
        50,
        bottom - 15,
        { align: 'center', width: doc.page.width - 100 }
    );
    doc.text(
        '© KineTrexa IT Services',
        50,
        bottom,
        { align: 'center', width: doc.page.width - 100 }
    );

    // --- PDF CONTENT END ---

    doc.end();
});

