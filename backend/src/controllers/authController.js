const Admin = require('../models/Admin');
const { asyncHandler } = require('../middleware/error.middleware');
const ErrorResponse = require('../utils/errorResponse');
const { sendTokenResponse } = require('../utils/jwt');

/**
 * @desc    Register new admin (Super Admin only)
 * @route   POST /api/auth/register
 * @access  Private/Super Admin
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return next(new ErrorResponse('Admin with this email already exists', 400));
  }

  // Create admin
  const admin = await Admin.create({
    name,
    email,
    password,
    role: role || 'admin'
  });

  res.status(201).json({
    success: true,
    message: 'Admin registered successfully',
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  });
});

/**
 * @desc    Login admin
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  // Check for admin (include password)
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if admin is active
  if (!admin.isActive) {
    return next(new ErrorResponse('Account is inactive', 401));
  }

  // Check if password matches
  const isMatch = await admin.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Update last login
  await admin.updateLastLogin();

  // Send token response
  sendTokenResponse(admin, 200, res);
});

/**
 * @desc    Get current logged in admin
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id);

  res.status(200).json({
    success: true,
    admin
  });
});

/**
 * @desc    Update admin details
 * @route   PUT /api/auth/update
 * @access  Private
 */
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const admin = await Admin.findByIdAndUpdate(
    req.admin.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: 'Details updated successfully',
    admin
  });
});

/**
 * @desc    Update password
 * @route   PUT /api/auth/update-password
 * @access  Private
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id).select('+password');

  // Check current password
  if (!(await admin.comparePassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Current password is incorrect', 401));
  }

  admin.password = req.body.newPassword;
  await admin.save();

  sendTokenResponse(admin, 200, res);
});

/**
 * @desc    Logout admin
 * @route   POST /api/auth/logout
 * @access  Private
 */
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() - 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * @desc    Get all admins (Super Admin only)
 * @route   GET /api/auth/admins
 * @access  Private/Super Admin
 */
exports.getAdmins = asyncHandler(async (req, res, next) => {
  const admins = await Admin.find();

  res.status(200).json({
    success: true,
    count: admins.length,
    admins
  });
});

/**
 * @desc    Delete admin (Super Admin only)
 * @route   DELETE /api/auth/admins/:id
 * @access  Private/Super Admin
 */
exports.deleteAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    return next(new ErrorResponse('Admin not found', 404));
  }

  // Prevent deleting yourself
  if (admin._id.toString() === req.admin.id) {
    return next(new ErrorResponse('Cannot delete your own account', 400));
  }

  await admin.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Admin deleted successfully'
  });
});