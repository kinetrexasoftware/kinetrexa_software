const Career = require('../models/Career');

exports.getCareers = async (req, res, next) => {
    try {
        const careers = await Career.find();
        res.status(200).json({ success: true, count: careers.length, data: careers });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getCareer = async (req, res, next) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) {
            return res.status(404).json({ success: false, error: 'Job not found' });
        }
        res.status(200).json({ success: true, data: career });
    } catch (err) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};

exports.createCareer = async (req, res, next) => {
    try {
        const career = await Career.create(req.body);
        res.status(201).json({ success: true, data: career });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.updateCareer = async (req, res, next) => {
    try {
        const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!career) {
            return res.status(404).json({ success: false, error: 'Job not found' });
        }
        res.status(200).json({ success: true, data: career });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.deleteCareer = async (req, res, next) => {
    try {
        const career = await Career.findByIdAndDelete(req.params.id);
        if (!career) {
            return res.status(404).json({ success: false, error: 'Job not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};
