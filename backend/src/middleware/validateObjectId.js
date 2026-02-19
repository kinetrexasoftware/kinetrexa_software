const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Validate MongoDB ObjectId
 * Can be used as middleware for route params
 */
const validateObjectId = (paramName = 'id') => (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
        return next(new ErrorResponse(`Invalid Resource ID: ${req.params[paramName]}`, 404));
    }
    next();
};

module.exports = validateObjectId;
