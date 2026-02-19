const Service = require('../models/Service');

exports.getPublicServices = async (req, res, next) => {
    try {
        // Fetch all and filter in JS to be robust against data type mismatches (string vs boolean in DB)
        const allServices = await Service.find({}).sort({ order: 1 });
        const services = allServices.filter(s => s.isActive === true || s.isActive === 'true' || s.active === true);

        res.status(200).json({ success: true, count: services.length, data: services });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getServices = async (req, res, next) => {
    try {
        const services = await Service.find().sort({ order: 1 });
        res.status(200).json({ success: true, count: services.length, data: services });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }
        res.status(200).json({ success: true, data: service });
    } catch (err) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};

exports.getServiceBySlug = async (req, res, next) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug, isActive: true });
        if (!service) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }
        res.status(200).json({ success: true, data: service });
    } catch (err) {
        res.status(400).json({ success: false, error: 'Server Error' });
    }
};

exports.createService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json({ success: true, data: service });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.updateService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!service) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }
        res.status(200).json({ success: true, data: service });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.deleteService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};

exports.reorderServices = async (req, res, next) => {
    try {
        const { services } = req.body;
        const promises = services.map((service, index) => {
            return Service.findByIdAndUpdate(service.id || service._id, { order: index });
        });
        await Promise.all(promises);
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
