const Employee = require("../models/EmployeeModel");

exports.getEmployeeProfile = async (req, res) => {
  try {
    const user = req.user;

    const employee = await Employee.findOne({ user: user._id }).populate('user', 'name email role');

    if (!employee) {
      return res.status(404).json({
        message: 'Employee profile not found',
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      profile: {
        designation: employee.designation,
        department: employee.department,
        joinDate: employee.joinDate,
        profileImage: employee.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};
