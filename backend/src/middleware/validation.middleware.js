const Joi = require('joi');
const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Middleware to validate request data against a Joi schema
 * @param {Object} schema - Joi schema object
 * @param {string} property - Request property to validate (body, query, params)
 */
const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });

        if (!error) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: details.map(d => ({
                    field: d.path.join('.'),
                    message: d.message
                }))
            });
        }
    };
};

/**
 * Validate MongoDB ObjectId
 * Can be used as middleware for route params
 */
module.exports = {
    validate
};
