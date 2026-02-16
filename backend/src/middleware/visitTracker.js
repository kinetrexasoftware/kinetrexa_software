const DailyStat = require('../models/DailyStat');

const trackVisits = async (req, res, next) => {
    // Only track GET requests to public pages (optional: or all requests)
    // To avoid bloat, we can track unique IPs or just simple hits.
    // Requirement says "Traffic vs Applications", so let's track hits.

    // We only want to track public traffic, typically GET requests to non-admin, non-api routes?
    // Actually, for a SPA/Next.js app, the backend might only see API requests.
    // If we want to track "Total Website Hits", we can track every request to /api except /api/admin?
    // Or we can create a specific endpoint for the frontend to report a "page view".

    // Let's go with a simple approach: track every request to the backend that isn't from the admin panel
    // or specifically track the main home/internship pages if they call specific APIs.

    // Better: Track daily visits in the background.
    try {
        const today = new Date().toISOString().split('T')[0];

        // Use findOneAndUpdate with upsert to be atomic
        await DailyStat.findOneAndUpdate(
            { date: today },
            { $inc: { visits: 1 } },
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error('Visit tracking error:', error.message);
    }

    next();
};

module.exports = trackVisits;
