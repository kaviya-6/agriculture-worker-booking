const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    try {
        const booking = new Booking({ farmerId: req.user._id, ...req.body });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFarmerBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ farmerId: req.params.id }).populate('workerId', 'name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWorkerBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ workerId: req.params.id }).populate('farmerId', 'name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
