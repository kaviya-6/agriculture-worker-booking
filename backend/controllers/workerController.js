const WorkerProfile = require('../models/WorkerProfile');

exports.getMyProfile = async (req, res) => {
    try {
        const profile = await WorkerProfile.findOne({ userId: req.user._id });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProfile = async (req, res) => {
    try {
        const profile = new WorkerProfile({ userId: req.user._id, ...req.body });
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWorkers = async (req, res) => {
    try {
        const { skill, location } = req.query;
        let query = {};
        if (skill) query.skills = { $regex: new RegExp(skill, 'i') };
        if (location) query.location = new RegExp(location, 'i');
        
        const workers = await WorkerProfile.find(query).populate('userId', 'name email');
        res.json(workers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWorkerById = async (req, res) => {
    try {
        const worker = await WorkerProfile.findById(req.params.id).populate('userId', 'name email');
        if (!worker) return res.status(404).json({ message: 'Worker not found' });
        res.json(worker);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const updatedProfile = await WorkerProfile.findOneAndUpdate(
            { userId: req.user._id },
            req.body,
            { new: true }
        );
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
