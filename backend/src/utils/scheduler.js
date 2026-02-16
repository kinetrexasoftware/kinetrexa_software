const cron = require('node-cron');
const Application = require('../models/Application');
const { sendTaskAssignmentEmail } = require('./emailService');

/**
 * @desc    Schedule tasks for the internship system
 */
const initScheduler = () => {
    // Run every day at 10:00 AM
    cron.schedule('0 10 * * *', async () => {
        console.log('⏰ Running Daily Internship Scheduler...');
        await sendTaskReminders();
    });

    console.log('✅ Internship Scheduler Initialized');
};

/**
 * @desc    Find applications for internships starting tomorrow and send emails
 */
const sendTaskReminders = async () => {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

        // Find selected applications with internship starting tomorrow
        const applications = await Application.find({
            status: 'selected'
        }).populate({
            path: 'internshipId',
            match: {
                startDate: {
                    $gte: tomorrow,
                    $lt: dayAfterTomorrow
                }
            }
        });

        // Filter out those where internshipId didn't match the populate filter
        const startingTomorrow = applications.filter(app => app.internshipId);

        console.log(`🔍 Found ${startingTomorrow.length} internships starting tomorrow.`);

        for (const app of startingTomorrow) {
            const emailData = {
                name: `${app.applicant.firstName} ${app.applicant.lastName}`,
                domain: app.domain,
                startDate: new Date(app.internshipId.startDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })
            };

            await sendTaskAssignmentEmail(app.applicant.email, emailData);
            console.log(`📧 Task reminder sent to ${app.applicant.email} for ${app.domain}`);
        }
    } catch (error) {
        console.error('❌ Scheduler Error:', error.message);
    }
};

module.exports = { initScheduler };
