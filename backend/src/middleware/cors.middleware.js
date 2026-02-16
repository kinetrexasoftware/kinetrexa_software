const cors = require('cors');
const config = require('../config/env');

const allowedOrigins = [
    'https://kinetrexa.com',
    'https://www.kinetrexa.com',
    'https://kinetrexa.netlify.app',
    'http://localhost:3000',
    config.FRONTEND_URL,
    config.CORS_ORIGIN
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || config.NODE_ENV !== 'production') {
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
