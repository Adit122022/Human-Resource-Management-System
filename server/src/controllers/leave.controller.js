const Leave = require('../models/LeaveModel');

// Apply for Leave (Employee, HR, Admin)
module.exports.applyLeave = async (req, res) => {
  const { startDate, endDate, type, reason } = req.body;

  try {
    const leave = new Leave({
      userId: req.user.id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      type,
      reason,
    });
    await leave.save();
    res.status(201).json({ message: 'Leave applied successfully', leave });
  } catch (err) {
    res.status(500).json({ message: 'Error applying leave', error: err.message });
  }
};

// Approve/Reject Leave (HR, Admin)
module.exports.updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json({ message: 'Leave status updated', leave });
  } catch (err) {
    res.status(500).json({ message: 'Error updating leave status', error: err.message });
  }
};

// Get Leave History (Employee, HR, Admin)
module.exports.getLeaveHistory = async (req, res) => {
  try {
    let leaves;

    if (req.user.role === 'admin' || req.user.role === 'hr') {
      leaves = await Leave.find()
        .sort({ createdAt: -1 })
        .populate('userId', 'name email');
    } else {
      leaves = await Leave.find({ userId: req.user.id })
        .sort({ createdAt: -1 });
    }

    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leave history', error: err.message });
  }
};


// Get Leave Balance (Employee, HR, Admin)
module.exports.getLeaveBalance = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.id, status: 'approved' });
    const usedDays = leaves.reduce((total, leave) => {
      const days = (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24);
      return total + days;
    }, 0);
    const balance = 20 - usedDays; // Assuming 20 days default balance
    res.json({ leaveBalance: balance });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leave balance', error: err.message });
  }
};