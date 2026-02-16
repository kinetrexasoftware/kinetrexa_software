const jwt = require('jsonwebtoken');
const config = require('../config/env');
const Admin = require('../models/Admin');

/**
 * Protect routes - Verify JWT token
 */
const protect = async (req, res, next) => {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookie
    else if (req.cookies.token) {
        token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, config.JWT_SECRET);

        // Get admin from token
        const user = await Admin.findById(decoded.id).select('-password');

        if (!user) {
            res.clearCookie('token');
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.isActive) {
            res.clearCookie('token');
            return res.status(401).json({
                success: false,
                message: 'Account is inactive'
            });
        }

        // Attach user to request object (backward compatibility + standard)
        req.admin = user;
        req.user = user;

        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error.message);
        res.clearCookie('token');
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

/**
 * Optional auth - doesn't fail if no token
 * Useful for public routes that might show extra info if logged in
 */
const optionalAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            const user = await Admin.findById(decoded.id).select('-password');
            if (user && user.isActive) {
                req.admin = user;
                req.user = user;
            }
        } catch (error) {
            // Token invalid, continue without auth
            req.admin = null;
            req.user = null;
        }
    }

    next();
};

module.exports = {
    protect,
    optionalAuth
};
