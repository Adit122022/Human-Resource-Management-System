const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports.signup= async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    
    const token = jwt.sign(
      { id: user._id, role: user.role },config.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ message: 'User created', token });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong!' });
    console.log(err)
  }
}


  module.exports.login =async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    
    const token = jwt.sign(
      { id: user._id, role: user.role },config.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
}