const mongoose = require('mongoose');

const workerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  skills: [{ type: String }],
  dailyWage: { type: Number, required: true },
  experience: { type: String },
  availability: [{ type: Date }], // array of available dates
  rating: { type: Number, default: 0 },
  location: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('WorkerProfile', workerProfileSchema);
