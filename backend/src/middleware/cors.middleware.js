const cors = require('cors');
const config = require('../config/env');

// Construct allowed origins from config
const rawOrigins = [
    'https://kinetrexa.com',
    'https://www.kinetrexa.com',
    'https://kinetrexa.netlify.app',
    'http://localhost:3000',
    config.FRONTEND_URL,
    config.ADMIN_URL,
    config.CORS_ORIGIN
];

// Split by comma, filter empty, and strip trailing slashes
const allowedOrigins = rawOrigins
    .filter(Boolean)
    .flatMap(origin => origin.split(','))
    .map(origin => origin.trim().replace(/\/$/, ''))
    .filter((v, i, a) => v && a.indexOf(v) === i); // Unique non-empty values

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Normalize incoming origin (strip trailing slash)
        const normalizedOrigin = origin.replace(/\/$/, '');

        if (allowedOrigins.includes(normalizedOrigin) || config.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            console.error(`CORS Blocked: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
