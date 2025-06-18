const User = require('../models/UserModel');
const Employee = require('../models/EmployeeModel');
const bcrypt = require('bcryptjs');
const { uploadToCloudinary, deleteFromCloudinary } = require('../services/cloudinary');
const fs = require('fs').promises;

exports.addEmployee = async (req, res) => {
  const { name, email, designation, department, joinDate, role } = req.body;
  try {
    if (!name || !email || !designation) {
      return res.status(400).json({ message: 'Name, email, and designation are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash('default123', 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'employee',
    });

    let profileImage = '';
    if (req.file) {
      profileImage = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path).catch(() => {});
    }

    const employee = await Employee.create({
      user: user._id,
      designation,
      department,
      joinDate: joinDate ? new Date(joinDate) : undefined,
      profileImage,
    });
     

    res.status(201).json({ message: 'Employee added successfully', employee });
  } catch (err) {
    if (req.file) await fs.unlink(req.file.path).catch(() => {});
    console.error('Add Employee Error:-->', err);
    res.status(500).json({ message: 'Error adding employee', error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { designation, department, joinDate } = req.body;
  try {
    const employee = await Employee.findOne({ user: id });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const updateData = {
      designation: designation || employee.designation,
      department,
      joinDate: joinDate ? new Date(joinDate) : employee.joinDate,
    };

    if (req.file) {
      if (employee.profileImage) {
        const publicId = employee.profileImage.split('/').pop().split('.')[0];
        await deleteFromCloudinary(publicId);
      }
      updateData.profileImage = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path).catch(() => {});
    }

    const updatedEmployee = await Employee.findOneAndUpdate({ user: id }, updateData, { new: true });
    res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (err) {
    if (req.file) await fs.unlink(req.file.path).catch(() => {});
    console.error('Update Employee Error:', err);
    res.status(500).json({ message: 'Error updating employee', error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({ user: id });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    if (employee.profileImage) {
      const publicId = employee.profileImage.split('/').pop().split('.')[0];
      await deleteFromCloudinary(publicId);
    }

    await Employee.findOneAndDelete({ user: id });
    await User.findByIdAndDelete(id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Delete Employee Error:', err);
    res.status(500).json({ message: 'Error deleting employee', error: err.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('user', 'name email role');
    res.json(employees);
  } catch (err) {
    console.error('Get All Employees Error:', err);
    res.status(500).json({ message: 'Error fetching employees', error: err.message });
  }
};

exports.getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id }).populate('user', 'name email role');
    if (!employee) return res.status(404).json({ message: 'Employee profile not found' });
    res.json(employee);
  } catch (err) {
    console.error('Get Profile Error:', err.message);
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};