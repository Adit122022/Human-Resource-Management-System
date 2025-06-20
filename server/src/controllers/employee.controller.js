const EmployeeModel = require("../models/EmployeeModel");
const UserModel = require("../models/UserModel");

// controllers/profile.controller.js
module.exports.getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    const employee = await EmployeeModel.findOne({ user: user.id }).populate('user', 'name email role');

    if (!employee) {
      // 👇 Handle Admin or HR users who don’t have an employee profile
      return res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        profile: null,
      });
    }

    res.status(200).json({
      user: {
        _id: employee.user._id,
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
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
