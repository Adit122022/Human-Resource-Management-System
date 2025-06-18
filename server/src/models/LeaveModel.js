const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { type: String, enum: ['sick', 'casual', 'vacation'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reason: { type: String },
  leaveBalance: { type: Number, default: 20 }, // Example: 20 days default
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);