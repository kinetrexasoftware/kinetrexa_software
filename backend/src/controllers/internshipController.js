const Internship = require('../models/Internship');
const { asyncHandler } = require('../middleware/error.middleware');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Get all internships (Public - active only)
 * @route   GET /api/internships
 * @access  Public
 */
exports.getInternships = asyncHandler(async (req, res, next) => {
  const { type, mode, isActive, search } = req.query;
  const { page, limit, skip } = req.pagination || { page: 1, limit: 10, skip: 0 };

  // Build query
  let query = {};

  // For public access, only show active internships
  if (!req.admin) {
    query.isActive = true;
    query.deadline = { $gte: new Date() };
  } else {
    // Admin can filter by isActive
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
  }

  if (type) query.type = type;
  if (mode) query.mode = mode;

  // Search functionality
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { technologies: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  // Execute query with pagination
  const internships = await Internship.find(query)
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  // Get total count for pagination
  const total = await Internship.countDocuments(query);

  res.status(200).json({
    success: true,
    count: internships.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    internships
  });
});

/**
 * @desc    Get single internship
 * @route   GET /api/internships/:id
 * @access  Public
 */
exports.getInternship = asyncHandler(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id)
    .populate('createdBy', 'name email');

  if (!internship) {
    return next(new ErrorResponse('Internship not found', 404));
  }

  // If not admin and internship is not active, don't show
  if (!req.admin && !internship.isActive) {
    return next(new ErrorResponse('Internship not found', 404));
  }

  res.status(200).json({
    success: true,
    internship
  });
});

/**
 * @desc    Create internship
 * @route   POST /api/internships
 * @access  Private/Admin
 */
exports.createInternship = asyncHandler(async (req, res, next) => {
  // Add admin ID to request body
  req.body.createdBy = req.admin.id;

  const internship = await Internship.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Internship created successfully',
    internship
  });
});

/**
 * @desc    Update internship
 * @route   PUT /api/internships/:id
 * @access  Private/Admin
 */
exports.updateInternship = asyncHandler(async (req, res, next) => {
  let internship = await Internship.findById(req.params.id);

  if (!internship) {
    return next(new ErrorResponse('Internship not found', 404));
  }

  // Don't allow updating createdBy
  delete req.body.createdBy;

  // Use Object.assign and save() to trigger pre-save hooks
  Object.assign(internship, req.body);
  await internship.save();

  res.status(200).json({
    success: true,
    message: 'Internship updated successfully',
    internship
  });
});

/**
 * @desc    Delete internship
 * @route   DELETE /api/internships/:id
 * @access  Private/Admin
 */
exports.deleteInternship = asyncHandler(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id);

  if (!internship) {
    return next(new ErrorResponse('Internship not found', 404));
  }

  await internship.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Internship deleted successfully'
  });
});

/**
 * @desc    Toggle internship active status
 * @route   PUT /api/internships/:id/toggle
 * @access  Private/Admin
 */
exports.toggleInternship = asyncHandler(async (req, res, next) => {
  let internship = await Internship.findById(req.params.id);

  if (!internship) {
    return next(new ErrorResponse('Internship not found', 404));
  }

  internship.isActive = !internship.isActive;
  await internship.save();

  res.status(200).json({
    success: true,
    message: `Internship ${internship.isActive ? 'activated' : 'deactivated'} successfully`,
    internship
  });
});

/**
 * @desc    Get internship statistics
 * @route   GET /api/internships/stats/overview
 * @access  Private/Admin
 */
exports.getStats = asyncHandler(async (req, res, next) => {
  const stats = await Internship.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        active: {
          $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
        },
        totalSlots: { $sum: '$slots.total' },
        filledSlots: { $sum: '$slots.filled' }
      }
    }
  ]);

  const typeStats = await Internship.aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 }
      }
    }
  ]);

  const result = {
    total: stats[0]?.total || 0,
    active: stats[0]?.active || 0,
    totalSlots: stats[0]?.totalSlots || 0,
    filledSlots: stats[0]?.filledSlots || 0,
    availableSlots: (stats[0]?.totalSlots || 0) - (stats[0]?.filledSlots || 0),
    byType: {}
  };

  typeStats.forEach(stat => {
    result.byType[stat._id] = stat.count;
  });

  res.status(200).json({
    success: true,
    stats: result
  });
});