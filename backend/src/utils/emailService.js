const nodemailer = require('nodemailer');
const config = require('../config/env');

const transporter = nodemailer.createTransport({
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    secure: config.EMAIL_PORT === 465, // true for 465, false for other ports
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
    },
});

/**
 * @desc    Send internship application confirmation email
 * @param   {string} to - Applicant email
 * @param   {object} data - Data for the email template
 */
exports.sendApplicationConfirmation = async (to, data) => {
    const { name, applicationId, domain } = data;

    const mailOptions = {
        from: config.EMAIL_FROM,
        to: to,
        subject: `Application Received – ${domain} Internship | KineTrexa`,
        text: `Dear ${name},

Thank you for applying for the ${domain} internship at KineTrexa. 

Your application has been successfully submitted and recorded.

━━━━━━━━━━━━━━━━━━━━━━━  
👤 Name: ${name}
🆔 Application ID: ${applicationId}
💼 Internship Domain: ${domain}
━━━━━━━━━━━━━━━━━━━━━━━  

Please keep your Application ID safe, as it will be required for all future communication and document downloads.

Next Steps:
- Your application will now be reviewed by our team.
- If you are shortlisted or selected, you will receive another email shortly with instructions to download your official Offer Letter from our portal.

Warm regards,  
Team KineTrexa
Building Skills. Creating Futures.`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; color: #334155; line-height: 1.6;">
                <p>Dear <strong>${name}</strong>,</p>
                <p>Thank you for applying for the <strong>${domain}</strong> internship at <strong>KineTrexa</strong>.</p>
                <p>Your application has been successfully <strong>submitted and recorded</strong>.</p>
                
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #3b82f6;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Application Details</p>
                    <p style="margin: 8px 0; font-size: 16px;">👤 Name: <strong>${name}</strong></p>
                    <p style="margin: 8px 0; font-size: 16px;">🆔 Application ID: <strong style="color: #2563eb; font-family: 'Courier New', Courier, monospace; background: #eff6ff; padding: 2px 6px; border-radius: 4px;">${applicationId}</strong></p>
                    <p style="margin: 8px 0; font-size: 16px;">💼 Internship Domain: <strong>${domain}</strong></p>
                </div>
                
                <p style="background-color: #fff9eb; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; font-size: 0.95em; color: #92400e;">
                    <strong>Important Note:</strong> Please keep your Application ID safe, as it will be required for all future communication and document downloads.
                </p>
                
                <h3 style="color: #0f172a; margin-top: 32px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Next Steps:</h3>
                <ul style="padding-left: 20px; color: #475569;">
                    <li style="margin-bottom: 8px;">Your application will now be reviewed by our admission team.</li>
                    <li>If you are shortlisted or selected, you will receive another email shortly with instructions to download your official <strong>Offer Letter</strong> from our portal.</li>
                </ul>
                
                <div style="margin-top: 48px; border-top: 1px solid #f1f5f9; padding-top: 24px;">
                    <p style="margin-bottom: 0;">Warm regards,</p>
                    <p style="margin-top: 4px; font-weight: bold; color: #0f172a; font-size: 18px;">Team KineTrexa</p>
                    <p style="font-size: 0.9em; color: #94a3b8; font-style: italic; margin-top: 8px;">"Building Skills. Creating Futures."</p>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to ${to}: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`❌ Error sending email to ${to}:`, error.message);
        return { success: false, error: error.message };
    }
};

/**
 * @desc    Send inquiry confirmation email to user
 * @param   {string} to - User email
 * @param   {object} data - { name, subject, message }
 */
exports.sendUserConfirmationEmail = async (to, data) => {
    const { name, subject, message } = data;

    const mailOptions = {
        from: config.EMAIL_FROM,
        to: to,
        subject: `We’ve received your message – KineTrexa`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
                <h2 style="color: #2563eb;">Hello ${name},</h2>
                <p>Thank you for reaching out to <strong>KineTrexa</strong>. We have received your inquiry and our team will get back to you shortly.</p>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Your Message:</strong><br>${message}</p>
                </div>
                <p>If you have any urgent questions, feel free to reply to this email.</p>
                <br>
                <p>Best Regards,<br><strong>Team KineTrexa</strong></p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Confirmation email sent to ${to}`);
    } catch (error) {
        console.error(`❌ Confirmation email failed: ${error.message}`);
    }
};

/**
 * @desc    Send inquiry notification to Admin
 * @param   {object} data - { name, email, subject, message }
 */
exports.sendAdminInquiryEmail = async (data) => {
    const { name, email, subject, message } = data;

    const mailOptions = {
        from: config.EMAIL_FROM,
        to: config.EMAIL_USER,
        subject: `New Inquiry Received – KineTrexa`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
                <h2 style="color: #dc2626;">New Inquiry Alert</h2>
                <p>You have received a new message from the contact form:</p>
                <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border: 1px solid #fee2e2;">
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong><br>${message}</p>
                </div>
                <p style="margin-top: 20px;">Please login to the admin panel to reply.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Admin notification email sent`);
    } catch (error) {
        console.error(`❌ Admin notification email failed: ${error.message}`);
    }
};

/**
 * @desc    Send Selection Email to User
 * @param   {string} to - User email
 * @param   {object} data - Selection details
 */
exports.sendSelectionEmail = async (to, data) => {
    const { name, email, applicationId, domain, startDate, duration } = data;

    const mailOptions = {
        from: config.EMAIL_FROM,
        to: to,
        subject: `Selection Confirmation – ${domain} Internship | KineTrexa`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; color: #334155; line-height: 1.6;">
                <h2 style="color: #2563eb; margin-bottom: 24px;">Congratulations ${name}!</h2>
                <p>We are pleased to inform you that you have been officially <strong>selected</strong> for the <strong>${domain}</strong> internship at <strong>KineTrexa</strong>.</p>
                
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #10b981;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Internship Details</p>
                    <p style="margin: 8px 0; font-size: 16px;">👤 Name: <strong>${name}</strong></p>
                    <p style="margin: 8px 0; font-size: 16px;">🆔 Application ID: <strong style="color: #2563eb;">${applicationId}</strong></p>
                    <p style="margin: 8px 0; font-size: 16px;">💼 Domain: <strong>${domain}</strong></p>
                    <p style="margin: 8px 0; font-size: 16px;">📅 Start Date: <strong>${startDate}</strong></p>
                    <p style="margin: 8px 0; font-size: 16px;">⏳ Duration: <strong>${duration}</strong></p>
                </div>

                <div style="text-align: center; margin: 32px 0;">
                    <a href="https://kinetrexa.com/pricing" style="background-color: #2563eb; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Download Offer Letter</a>
                </div>
                
                <p style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; font-size: 0.95em; color: #1e40af;">
                    <strong>Note:</strong> Your internship task assignment will be shared <strong>one day before</strong> the internship start date via email and will also be available for download on the portal.
                </p>
                
                <p style="margin-top: 32px;">We look forward to having you with us and wish you a productive internship journey.</p>
                
                <div style="margin-top: 48px; border-top: 1px solid #f1f5f9; padding-top: 24px;">
                    <p style="margin-bottom: 0;">Warm regards,</p>
                    <p style="margin-top: 4px; font-weight: bold; color: #0f172a; font-size: 18px;">Team KineTrexa</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Selection email sent to ${to}`);
    } catch (error) {
        console.error(`❌ Selection email failed: ${error.message}`);
    }
};

/**
 * @desc    Send Pre-Internship Task Assignment Email
 * @param   {string} to - User email
 * @param   {object} data - Task details
 */
exports.sendTaskAssignmentEmail = async (to, data) => {
    const { name, domain, startDate } = data;

    const mailOptions = {
        from: config.EMAIL_FROM,
        to: to,
        subject: `Task Assignment Available – ${domain} Internship | KineTrexa`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; color: #334155; line-height: 1.6;">
                <h2 style="color: #2563eb;">Hello ${name},</h2>
                <p>Exciting news! Your internship for <strong>${domain}</strong> starts <strong>${startDate}</strong> (Tomorrow).</p>
                <p>Your internship <strong>task assignment</strong> is now available for download.</p>
                
                <div style="text-align: center; margin: 32px 0;">
                    <a href="https://kinetrexa.com/pricing" style="background-color: #2563eb; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Download Task Document</a>
                </div>
                
                <p style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; font-size: 0.95em;">
                    Please log in to the <strong>KineTrexa Status Portal</strong> using your registered email and Application ID to access your task.
                </p>
                
                <p style="margin-top: 32px;">Get ready to start your professional journey!</p>
                
                <div style="margin-top: 48px; border-top: 1px solid #f1f5f9; padding-top: 24px;">
                    <p style="margin-bottom: 0;">Best Regards,</p>
                    <p style="margin-top: 4px; font-weight: bold; color: #0f172a; font-size: 18px;">Team KineTrexa</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Task assignment email sent to ${to}`);
    } catch (error) {
        console.error(`❌ Task assignment email failed: ${error.message}`);
    }
};

/**
 * @desc    Send Certificate Availability Email
 * @param   {string} to - User email
 * @param   {object} data - Details
 */
exports.sendCertificateAvailableEmail = async (to, data) => {
    const { name, domain } = data;

    const mailOptions = {
        from: config.EMAIL_FROM,
        to: to,
        subject: `Internship Certificate Available – ${domain} | KineTrexa`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; color: #334155; line-height: 1.6;">
                <h2 style="color: #10b981;">Internship Completed!</h2>
                <p>Dear ${name}, congratulations on successfully completing your <strong>${domain}</strong> internship at <strong>KineTrexa</strong>.</p>
                <p>Your <strong>official internship certificate</strong> is now available for download on our portal.</p>
                
                <div style="text-align: center; margin: 32px 0;">
                    <a href="https://kinetrexa.com/pricing" style="background-color: #10b981; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Download Certificate</a>
                </div>
                
                <p>We appreciate your hard work and wish you the very best for your future endeavors.</p>
                
                <div style="margin-top: 48px; border-top: 1px solid #f1f5f9; padding-top: 24px;">
                    <p style="margin-bottom: 0;">Warm regards,</p>
                    <p style="margin-top: 4px; font-weight: bold; color: #0f172a; font-size: 18px;">Team KineTrexa</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Certificate email sent to ${to}`);
    } catch (error) {
        console.error(`❌ Certificate email failed: ${error.message}`);
    }
};

/**
 * @desc    Send email when admin creates application manually
 * @param   {string} to - User email
 * @param   {object} data - { name, applicationId, domain }
 */
exports.sendAdminApplicationCreatedEmail = async (to, data) => {
    const { name, applicationId, domain } = data;

    const mailOptions = {
        from: config.EMAIL_FROM,
        to: to,
        subject: `Internship Application Created – ${domain} | KineTrexa`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; color: #334155; line-height: 1.6;">
                <h2 style="color: #2563eb;">Welcome to KineTrexa!</h2>
                <p>Dear <strong>${name}</strong>,</p>
                <p>An internship application for the <strong>${domain}</strong> domain has been created for you by our admin team.</p>
                
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #3b82f6;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Application Details</p>
                    <p style="margin: 8px 0; font-size: 16px;">👤 Name: <strong>${name}</strong></p>
                    <p style="margin: 8px 0; font-size: 16px;">🆔 Application ID: <strong style="color: #2563eb;">${applicationId}</strong></p>
                    <p style="margin: 8px 0; font-size: 16px;">💼 Domain: <strong>${domain}</strong></p>
                </div>
                
                <p>You can track your status and access documents from the <strong>KineTrexa Status Portal</strong> using your email and Application ID.</p>
                
                <div style="text-align: center; margin: 32px 0;">
                    <a href="https://kinetrexa.com/status" style="background-color: #2563eb; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Check Status</a>
                </div>
                
                <div style="margin-top: 48px; border-top: 1px solid #f1f5f9; padding-top: 24px;">
                    <p style="margin-bottom: 0;">Warm regards,</p>
                    <p style="margin-top: 4px; font-weight: bold; color: #0f172a; font-size: 18px;">Team KineTrexa</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Admin creation email sent to ${to}`);
    } catch (error) {
        console.error(`❌ Admin creation email failed: ${error.message}`);
    }
};
