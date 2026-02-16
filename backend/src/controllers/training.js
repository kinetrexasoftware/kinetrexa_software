const Training = require('../models/Training');

exports.getTrainings = async (req, res, next) => {
    try {
        const trainings = await Training.find();
        res.status(200).json({ success: true, count: trainings.length, data: trainings });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getPublicTrainings = async (req, res, next) => {
    try {
        // Fetch only active trainings, sort by creation date (newest first)
        const trainings = await Training.find({ active: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: trainings.length, data: trainings });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getTraining = async (req, res, next) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(404).json({ success: false, error: 'Training not found' });
        }
        res.status(200).json({ success: true, data: training });
    } catch (err) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};

exports.createTraining = async (req, res, next) => {
    try {
        const training = await Training.create(req.body);
        res.status(201).json({ success: true, data: training });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.updateTraining = async (req, res, next) => {
    try {
        const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!training) {
            return res.status(404).json({ success: false, error: 'Training not found' });
        }
        res.status(200).json({ success: true, data: training });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.deleteTraining = async (req, res, next) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id);
        if (!training) {
            return res.status(404).json({ success: false, error: 'Training not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};
