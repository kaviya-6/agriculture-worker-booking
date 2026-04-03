const router = require('express').Router();
const auth = require('../middleware/auth');
const { createRating, getWorkerRatings } = require('../controllers/ratingController');

router.post('/', auth, createRating);
router.get('/:workerId', getWorkerRatings);

module.exports = router;
