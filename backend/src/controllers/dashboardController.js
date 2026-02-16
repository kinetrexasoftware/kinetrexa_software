const { asyncHandler } = require('../middleware/error.middleware');
const Application = require('../models/Application');
const Product = require('../models/Product');
const Training = require('../models/Training');
const Contact = require('../models/Contact');
const Notification = require('../models/Notification');

/**
 * @desc    Get Admin Dashboard Stats
 * @route   GET /api/dashboard/stats
 * @access  Private/Admin
 */
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const sixtyDaysAgo = new Date(now.setDate(now.getDate() - 30)); // note: now was already modified

    // Helper to calculate percentage change
    const getChange = (current, previous) => {
        if (previous === 0) return current > 0 ? '+100%' : '0%';
        const change = ((current - previous) / previous) * 100;
        return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
    };

    // Helper to get trend direction
    const getTrend = (current, previous) => {
        if (current > previous) return 'up';
        if (current < previous) return 'down';
        return 'neutral';
    };

    const [
        appTotal, appLast30, appPrev30,
        prodTotal,
        trainTotal,
        inqTotal, inqLast30, inqPrev30,
        recentNotifications
    ] = await Promise.all([
        // Applications
        Application.countDocuments(),
        Application.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        Application.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),

        // Products
        Product.countDocuments({ isActive: true }),

        // Training
        Training.countDocuments({ isActive: true }),

        // Inquiries
        Contact.countDocuments(),
        Contact.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        Contact.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),

        // Activity
        Notification.find().sort({ createdAt: -1 }).limit(10)
    ]);

    res.status(200).json({
        success: true,
        data: {
            applications: {
                total: appTotal,
                change: getChange(appLast30, appPrev30),
                trend: getTrend(appLast30, appPrev30)
            },
            products: {
                total: prodTotal,
                change: '+0%',
                trend: 'neutral'
            },
            training: {
                total: trainTotal,
                change: '+0%',
                trend: 'neutral'
            },
            inquiries: {
                total: inqTotal,
                change: getChange(inqLast30, inqPrev30),
                trend: getTrend(inqLast30, inqPrev30)
            },
            recentActivity: recentNotifications
        }
    });
});


/**
 * @desc    Get Chart Data (Traffic vs Applications)
 * @route   GET /api/dashboard/chart
 * @access  Private/Admin
 */
exports.getChartData = asyncHandler(async (req, res, next) => {
    const { range } = req.query; // daily, weekly, monthly
    const DailyStat = require('../models/DailyStat');

    let daysToFetch = 7;
    if (range === 'monthly') daysToFetch = 30;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - (daysToFetch - 1));

    // 1. Get Visit Stats
    const visits = await DailyStat.find({
        date: { $gte: startDate.toISOString().split('T')[0] }
    }).sort({ date: 1 });

    // 2. Get Application Stats
    const applications = await Application.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 }
            }
        }
    ]);

    // 3. Merge Data
    const chartData = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < daysToFetch; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];

        const visitItem = visits.find(v => v.date === dateStr);
        const appItem = applications.find(a => a._id === dateStr);

        chartData.push({
            name: range === 'monthly' ? dateStr.split('-').slice(1).join('/') : days[d.getDay()],
            fullDate: dateStr,
            visits: visitItem ? visitItem.visits : 0,
            applications: appItem ? appItem.count : 0
        });
    }

    res.status(200).json({
        success: true,
        data: chartData
    });
});
