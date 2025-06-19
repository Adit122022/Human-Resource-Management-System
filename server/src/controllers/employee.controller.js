const Employee = require("../models/EmployeeModel");

exports.getEmployeeProfile = async (req, res) => {
  try {
    const user = req.user;

    const employee = await Employee.findOne({ user: user.id }).populate('user', 'name email role');
    console.log(employee)

    if (!employee) {
      return res.status(404).json({
        message: 'Employee profile not found',
        user: {
         name: employee.user.name,
        email: employee.user.email,
        role: employee.user.role,
        },
      });
    }

    res.status(200).json({
      user: {
        name: employee.user.name,
        email: employee.user.email,
        role: employee.user.role,
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
