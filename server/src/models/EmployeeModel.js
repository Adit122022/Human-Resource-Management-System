const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  designation: { type: String, required: true },
  department: { type: String },
  joinDate: { type: Date },
  profileImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);