const Employee = require('../models/EmployeModel');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { cloudinary } = require('../services/cloudinary'); // Import Cloudinary for potential deletions

// Add Employee with Profile Picture (HR/Admin)
exports.addEmployee = async (req, res) => {
  const { name, email, department, position, hireDate, phone, role } = req.body;

  try {
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create user account
    const hashedPassword = await bcrypt.hash('default123', 10);
    const user = new User({ name, email, password: hashedPassword, role: role || 'employee' });
    await user.save();

    // Create employee record
    const employee = new Employee({
      userId: user._id,
      name,
      email,
      department,
      position,
      hireDate: hireDate ? new Date(hireDate) : undefined,
      phone,
      profilePicture: req.file ? req.file.path : '', // Cloudinary URL
    });
    await employee.save();

    res.status(201).json({ message: 'Employee added successfully', employee });
  } catch (err) {
    res.status(500).json({ message: 'Error adding employee', error: err.message });
  }
};

// Update Employee with Profile Picture (HR/Admin)
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, department, position, hireDate, phone } = req.body;

  try {
    // Find existing employee
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Prepare update data
    const updateData = {
      name,
      department,
      position,
      hireDate: hireDate ? new Date(hireDate) : undefined,
      phone,
    };

    // If a new profile picture is uploaded, delete the old one from Cloudinary
    if (req.file && employee.profilePicture) {
      const publicId = employee.profilePicture.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`hrms_profiles/${publicId}`);
      updateData.profilePicture = req.file.path; // New Cloudinary URL
    } else if (req.file) {
      updateData.profilePicture = req.file.path;
    }

    // Update employee
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (err) {
    res.status(500).json({ message: 'Error updating employee', error: err.message });
  }
};

// Delete Employee (Admin)
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    // Find employee
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Delete profile picture from Cloudinary if it exists
    if (employee.profilePicture) {
      const publicId = employee.profilePicture.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`hrms_profiles/${publicId}`);
    }

    // Delete employee and associated user
    await Employee.findByIdAndDelete(id);
    await User.findByIdAndDelete(employee.userId);

    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee', error: err.message });
  }
};

// Get All Employees (HR/Admin)
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('userId', 'role');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees', error: err.message });
  }
};

// Get Employee Profile (Employee, HR, Admin)
exports.getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user.id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};