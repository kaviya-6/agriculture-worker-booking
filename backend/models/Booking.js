const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workType: { type: String, required: true },
  date: { type: Date, required: true },
  numberOfWorkers: { type: Number, required: true, default: 1 },
  totalWage: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Completed'], default: 'Pending' },
  isRated: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
