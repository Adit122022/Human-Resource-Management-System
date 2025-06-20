const Attendance = require('../models/AttendanceModel');

// Mark Attendance (Employee, HR, Admin)
exports.markAttendance = async (req, res) => {
  const { date, status, checkIn, checkOut } = req.body;
  
// console.log("MarkAttendence-->",req.user)
// console.log("📥 Request Body:", req.body);
  try {
    const attendance = new Attendance({
      userId: req.user.id,
      date,
      status,
      checkIn: checkIn ? new Date(checkIn) : null,
      checkOut: checkOut ? new Date(checkOut) : null,
    });
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked', attendance });
  } catch (err) {
    res.status(500).json({ message: 'Error marking attendance', error: err.message });
  }
};

// Get Attendance History (Employee, HR, Admin)
exports.getAttendanceHistory = async (req, res) => {
  try {
    let attendance;

    if (req.user.role === 'admin' || req.user.role === 'hr') {
      // Show all attendance (admin & hr)
      attendance = await Attendance.find()
        .sort({ date: -1 })
        .populate('userId', 'name email role');
    } else {
      // Only own attendance (employee)
      attendance = await Attendance.find({ userId: req.user.id })
        .sort({ date: -1 });
    }

    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching attendance history',
      error: err.message,
    });
  }
};
