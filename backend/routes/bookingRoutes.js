const router = require('express').Router();
const auth = require('../middleware/auth');
const { createBooking, getFarmerBookings, getWorkerBookings, updateBookingStatus } = require('../controllers/bookingController');

router.post('/', auth, createBooking);
router.get('/farmer/:id', auth, getFarmerBookings);
router.get('/worker/:id', auth, getWorkerBookings);
router.put('/:id/status', auth, updateBookingStatus);

module.exports = router;
