const router = require('express').Router();
const auth = require('../middleware/auth');
const { getMyProfile, createProfile, getWorkers, getWorkerById, updateProfile } = require('../controllers/workerController');

router.get('/me', auth, getMyProfile);
router.post('/profile', auth, createProfile);
router.get('/', getWorkers);
router.get('/:id', getWorkerById);
router.put('/update', auth, updateProfile);

module.exports = router;
