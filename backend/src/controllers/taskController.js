const DomainTask = require('../models/DomainTask');
const { asyncHandler } = require('../middleware/error.middleware');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all domain tasks
// @route   GET /api/tasks
// @access  Private/Admin
exports.getTasks = asyncHandler(async (req, res, next) => {
    const tasks = await DomainTask.find()
        .populate('internshipId', 'title duration startDate deadline')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: tasks.length,
        tasks
    });
});

// @desc    Get single domain task
// @route   GET /api/tasks/:id
// @access  Private/Admin
exports.getTask = asyncHandler(async (req, res, next) => {
    const task = await DomainTask.findById(req.params.id)
        .populate('internshipId', 'title duration startDate deadline');

    if (!task) {
        return next(new ErrorResponse('Task configuration not found', 404));
    }

    res.status(200).json({
        success: true,
        task
    });
});

// @desc    Create new domain task set
// @route   POST /api/tasks
// @access  Private/Admin
exports.createTask = asyncHandler(async (req, res, next) => {
    // Add admin ID
    req.body.createdBy = req.admin.id;

    // Check if tasks array exists and is valid
    if (!req.body.tasks || !Array.isArray(req.body.tasks) || req.body.tasks.length === 0) {
        return next(new ErrorResponse('Please add at least one task item', 400));
    }

    const task = await DomainTask.create(req.body);

    res.status(201).json({
        success: true,
        message: 'Domain tasks created successfully',
        task
    });
});

// @desc    Update domain task set
// @route   PUT /api/tasks/:id
// @access  Private/Admin
exports.updateTask = asyncHandler(async (req, res, next) => {
    let task = await DomainTask.findById(req.params.id);

    if (!task) {
        return next(new ErrorResponse('Task configuration not found', 404));
    }

    task = await DomainTask.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: 'Domain tasks updated successfully',
        task
    });
});

// @desc    Delete domain task set
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
exports.deleteTask = asyncHandler(async (req, res, next) => {
    const task = await DomainTask.findById(req.params.id);

    if (!task) {
        return next(new ErrorResponse('Task configuration not found', 404));
    }

    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Domain tasks deleted successfully'
    });
});

// @desc    Toggle domain task status
// @route   PUT /api/tasks/:id/toggle
// @access  Private/Admin
exports.toggleTaskStatus = asyncHandler(async (req, res, next) => {
    const task = await DomainTask.findById(req.params.id);

    if (!task) {
        return next(new ErrorResponse('Task configuration not found', 404));
    }

    task.isActive = !task.isActive;
    await task.save();

    res.status(200).json({
        success: true,
        message: `Task set ${task.isActive ? 'activated' : 'deactivated'} successfully`,
        task
    });
});
