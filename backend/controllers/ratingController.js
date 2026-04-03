const Rating = require('../models/Rating');
const WorkerProfile = require('../models/WorkerProfile');
const Booking = require('../models/Booking');

exports.createRating = async (req, res) => {
    try {
        const { workerId, bookingId, rating, comment } = req.body;
        const newRating = new Rating({ farmerId: req.user._id, workerId, rating, comment });
        await newRating.save();

        if (bookingId) {
            await Booking.findByIdAndUpdate(bookingId, { isRated: true });
        }

        // Update average rating
        const allRatings = await Rating.find({ workerId });
        const avg = allRatings.reduce((acc, r) => acc + r.rating, 0) / allRatings.length;
        await WorkerProfile.findOneAndUpdate({ userId: workerId }, { rating: avg });

        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWorkerRatings = async (req, res) => {
    try {
        const ratings = await Rating.find({ workerId: req.params.workerId }).populate('farmerId', 'name');
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
