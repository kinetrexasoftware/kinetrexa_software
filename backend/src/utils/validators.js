/**
 * Email validation
 */
const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Phone validation (basic)
 */
const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Password strength validation
 */
const isStrongPassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

/**
 * URL validation
 */
const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * MongoDB ObjectId validation
 */
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

/**
 * Date validation
 */
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

/**
 * Check if date is in future
 */
const isFutureDate = (date) => {
  return new Date(date) > new Date();
};

/**
 * Check if date is in past
 */
const isPastDate = (date) => {
  return new Date(date) < new Date();
};

/**
 * Sanitize string (remove HTML tags)
 */
const sanitizeString = (str) => {
  return str.replace(/<[^>]*>?/gm, '').trim();
};

/**
 * Validate internship data
 */
const validateInternshipData = (data) => {
  const errors = [];
  
  if (!data.title || data.title.trim().length < 5) {
    errors.push('Title must be at least 5 characters');
  }
  
  if (!data.description || data.description.trim().length < 20) {
    errors.push('Description must be at least 20 characters');
  }
  
  if (!data.duration || data.duration.trim().length === 0) {
    errors.push('Duration is required');
  }
  
  if (!data.slots || data.slots.total < 1) {
    errors.push('At least 1 slot is required');
  }
  
  if (!data.startDate || !isValidDate(new Date(data.startDate))) {
    errors.push('Valid start date is required');
  }
  
  if (!data.deadline || !isValidDate(new Date(data.deadline))) {
    errors.push('Valid deadline is required');
  }
  
  if (data.startDate && data.deadline && new Date(data.deadline) >= new Date(data.startDate)) {
    errors.push('Deadline must be before start date');
  }
  
  return errors;
};

/**
 * Validate application data
 */
const validateApplicationData = (data) => {
  const errors = [];
  
  if (!data.applicant || !data.applicant.firstName || data.applicant.firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters');
  }
  
  if (!data.applicant || !data.applicant.lastName || data.applicant.lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters');
  }
  
  if (!data.applicant || !data.applicant.email || !isValidEmail(data.applicant.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.applicant || !data.applicant.phone) {
    errors.push('Phone number is required');
  }
  
  if (!data.applicant || !data.applicant.college || data.applicant.college.trim().length < 2) {
    errors.push('College name is required');
  }
  
  if (!data.applicant || !data.applicant.degree) {
    errors.push('Degree is required');
  }
  
  if (!data.applicant || !data.applicant.graduationYear || data.applicant.graduationYear < 2020 || data.applicant.graduationYear > 2030) {
    errors.push('Valid graduation year is required (2020-2030)');
  }
  
  return errors;
};

/**
 * Validate contact data
 */
const validateContactData = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.subject || data.subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  
  return errors;
};

module.exports = {
  isValidEmail,
  isValidPhone,
  isStrongPassword,
  isValidURL,
  isValidObjectId,
  isValidDate,
  isFutureDate,
  isPastDate,
  sanitizeString,
  validateInternshipData,
  validateApplicationData,
  validateContactData
};