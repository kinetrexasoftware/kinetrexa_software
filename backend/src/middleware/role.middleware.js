/**
 * Role-Based Authorization Listener
 * Restricts access to specified roles
 * @param {...string} roles - Allowed roles (e.g. 'admin', 'super-admin')
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        // req.user (or req.admin) is populated by auth middleware
        if (!req.user || !roles.includes(req.user.role)) {
            console.log(`[Authorization Error] User: ${req.user?._id}, Role: ${req.user?.role}, Required: ${roles}`);
            return res.status(403).json({
                success: false,
                message: `Access denied. You have role '${req.user ? req.user.role : 'unknown'}', but this action requires: ${roles.join(' or ')}.`
            });
        }
        next();
    };
};

module.exports = authorize;
