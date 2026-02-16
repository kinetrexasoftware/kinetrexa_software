const morgan = require('morgan');

// Define custom format for logging: Method, URL, Status, Response Time
const logFormat = ':method :url :status :res[content-length] - :response-time ms';

const requestLogger = morgan(logFormat, {
    skip: (req, res) => process.env.NODE_ENV === 'test' // Skip logging in test environment
});

module.exports = requestLogger;
