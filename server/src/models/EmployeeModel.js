const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  designation: { type: String, required: true },
  department: { type: String },
  joinDate: { type: Date },
  profileImage: { type: String ,default:"https://pbs.twimg.com/profile_images/1740014865933029376/33ducs-8_400x400.jpg"},
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);