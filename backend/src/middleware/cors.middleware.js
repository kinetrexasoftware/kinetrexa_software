const cors = require('cors');
const config = require('../config/env');

const allowedOrigins = [
    config.FRONTEND_URL,
    config.ADMIN_URL,
    config.CORS_ORIGIN, // Include the generic CORS_ORIGIN as well
    'http://localhost:3000', // Default fallback
    'http://localhost:5173'  // Default fallback
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || config.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

module.exports = cors(corsOptions);
