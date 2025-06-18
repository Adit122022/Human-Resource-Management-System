const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: ['admin', 'employee', 'hr'],
    default: 'employee'
  },
  profilePicture: { type: String, default: '' }, // Store Cloudinary URL
  department: { type: String }, // Optional fields for employee data
  position: { type: String },
  hireDate: { type: Date },
  phone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Employee', userSchema);