const mongoose = require('mongoose');

const DailyStatSchema = new mongoose.Schema({
    date: {
        type: String, // Format: YYYY-MM-DD
        required: true,
        unique: true,
        index: true
    },
    visits: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('DailyStat', DailyStatSchema);
