const EmployeeModel = require("../models/EmployeeModel");
exports.getEmployeeProfile = async (req, res) => {
  try {
    const employee = await EmployeeModel.findOne({ user: req.user.id }).populate('user', 'name email role');
    console.log(employee)
    if (!employee) return res.status(404).json({ message: 'Employee profile not found' });
    res.json(employee);
  } catch (err) {
    console.error('Get Profile Error:', err.message);
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};