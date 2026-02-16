const jwt = require('jsonwebtoken');
const config = require('../config/env');

/**
 * Generate JWT token
 */
const generateToken = (payload, expiresIn = config.JWT_EXPIRE) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn
  });
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Decode JWT token without verification
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * Generate access and refresh tokens
 */
const generateAuthTokens = (userId) => {
  const accessToken = generateToken(
    { id: userId },
    config.JWT_EXPIRE
  );
  
  const refreshToken = generateToken(
    { id: userId, type: 'refresh' },
    '60d' // 60 days
  );
  
  return { accessToken, refreshToken };
};

/**
 * Send token in cookie
 */
const sendTokenResponse = (admin, statusCode, res) => {
  const token = generateToken({ id: admin._id });
  
  const options = {
    expires: new Date(
      Date.now() + config.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'strict'
  };
  
  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
  generateAuthTokens,
  sendTokenResponse
};