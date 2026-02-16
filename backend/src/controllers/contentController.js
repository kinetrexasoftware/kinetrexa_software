const Content = require('../models/Content');
const { asyncHandler } = require('../middleware/error.middleware');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Get all published content (Public)
 * @route   GET /api/content
 * @access  Public
 */
exports.getAllContent = asyncHandler(async (req, res, next) => {
  const content = await Content.getAllPublished();

  // Format response as key-value pairs
  const formattedContent = {};
  content.forEach(item => {
    formattedContent[item.section] = item.content;
  });

  res.status(200).json({
    success: true,
    content: formattedContent
  });
});

/**
 * @desc    Get content by section (Public)
 * @route   GET /api/content/:section
 * @access  Public
 */
exports.getContentBySection = asyncHandler(async (req, res, next) => {
  const content = await Content.getPublished(req.params.section);

  res.status(200).json({
    success: true,
    content: content ? content.content : {}
  });
});

/**
 * @desc    Get all content including unpublished (Admin)
 * @route   GET /api/content/admin/all
 * @access  Private/Admin
 */
exports.getAllContentAdmin = asyncHandler(async (req, res, next) => {
  const content = await Content.find()
    .populate('updatedBy', 'name email')
    .sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    count: content.length,
    content
  });
});

/**
 * @desc    Get single content by ID (Admin)
 * @route   GET /api/content/admin/:id
 * @access  Private/Admin
 */
exports.getContentById = asyncHandler(async (req, res, next) => {
  const content = await Content.findById(req.params.id)
    .populate('updatedBy', 'name email');

  if (!content) {
    return next(new ErrorResponse('Content not found', 404));
  }

  res.status(200).json({
    success: true,
    content
  });
});

/**
 * @desc    Create or update content
 * @route   POST /api/content
 * @access  Private/Admin
 */
exports.createOrUpdateContent = asyncHandler(async (req, res, next) => {
  const { section, content, metadata, isPublished } = req.body;

  if (!section || !content) {
    return next(new ErrorResponse('Section and content are required', 400));
  }

  // Add updated by
  req.body.updatedBy = req.admin.id;

  // Check if content exists
  let existingContent = await Content.findOne({ section });

  if (existingContent) {
    // Update existing content
    existingContent.content = content;
    if (metadata) existingContent.metadata = metadata;
    if (isPublished !== undefined) existingContent.isPublished = isPublished;
    existingContent.updatedBy = req.admin.id;

    await existingContent.save();

    res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      content: existingContent
    });
  } else {
    // Create new content
    const newContent = await Content.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      content: newContent
    });
  }
});

/**
 * @desc    Update content by ID
 * @route   PUT /api/content/:id
 * @access  Private/Admin
 */
exports.updateContent = asyncHandler(async (req, res, next) => {
  req.body.updatedBy = req.admin.id;

  const content = await Content.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!content) {
    return next(new ErrorResponse('Content not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Content updated successfully',
    content
  });
});

/**
 * @desc    Toggle content publish status
 * @route   PUT /api/content/:id/toggle
 * @access  Private/Admin
 */
exports.togglePublish = asyncHandler(async (req, res, next) => {
  const content = await Content.findById(req.params.id);

  if (!content) {
    return next(new ErrorResponse('Content not found', 404));
  }

  await content.togglePublish();

  res.status(200).json({
    success: true,
    message: `Content ${content.isPublished ? 'published' : 'unpublished'} successfully`,
    content
  });
});

/**
 * @desc    Delete content
 * @route   DELETE /api/content/:id
 * @access  Private/Admin
 */
exports.deleteContent = asyncHandler(async (req, res, next) => {
  const content = await Content.findById(req.params.id);

  if (!content) {
    return next(new ErrorResponse('Content not found', 404));
  }

  await content.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Content deleted successfully'
  });
});

/**
 * @desc    Bulk update multiple sections
 * @route   PUT /api/content/bulk/update
 * @access  Private/Admin
 */
exports.bulkUpdate = asyncHandler(async (req, res, next) => {
  const { updates } = req.body; // Array of { section, content, metadata }

  if (!Array.isArray(updates) || updates.length === 0) {
    return next(new ErrorResponse('Updates array is required', 400));
  }

  const results = [];

  for (const update of updates) {
    try {
      let content = await Content.findOne({ section: update.section });

      if (content) {
        content.content = update.content;
        if (update.metadata) content.metadata = update.metadata;
        content.updatedBy = req.admin.id;
        await content.save();
      } else {
        content = await Content.create({
          section: update.section,
          content: update.content,
          metadata: update.metadata,
          updatedBy: req.admin.id
        });
      }

      results.push({ section: update.section, success: true });
    } catch (error) {
      results.push({ section: update.section, success: false, error: error.message });
    }
  }

  res.status(200).json({
    success: true,
    message: 'Bulk update completed',
    results
  });
});

/**
 * @desc    Update content by Section (Strict Requirement)
 * @route   PUT /api/content/:section
 * @access  Private/Admin
 */
exports.updateSectionContent = asyncHandler(async (req, res, next) => {
  const { section } = req.params;
  const { mission, vision, content } = req.body;

  if (!section) {
    return next(new ErrorResponse('Section is required', 400));
  }

  // Determine content to save: handle flat mission/vision or nested content object
  let contentToSave = content;
  if (mission !== undefined || vision !== undefined) {
    contentToSave = { ...contentToSave, mission, vision }; // Merge if mixed, or creates new
  }

  // If still undefined, and we are updating 'about', ensure we don't wipe it? 
  // No, user says "updates mission & vision".
  if (!contentToSave && section === 'about') {
    // If body is empty, maybe throw error? 
    // But let's assume body might be just { mission: "..." } which is caught above.
  }

  // Fallback if contentToSave is still empty but body has other keys?
  // Let's rely on 'content' or 'mission/vision' being present.

  let existingContent = await Content.findOne({ section });

  if (existingContent) {
    // Merge with existing content to avoid losing other fields if any
    existingContent.content = { ...existingContent.content, ...contentToSave };
    existingContent.updatedBy = req.admin.id;
    await existingContent.save();

    res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      content: existingContent
    });
  } else {
    // Create
    const newContent = await Content.create({
      section,
      content: contentToSave || {}, // Default to empty object if null
      updatedBy: req.admin.id
    });

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      content: newContent
    });
  }
});