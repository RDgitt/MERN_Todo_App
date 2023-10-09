const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtSecret = process.env.JWTSECRETKEY 


exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email:username });

    // If the user doesn't exist, return an error
    if (!user) {
      success = false
      return res.status(401).json({ success, message: 'Invalid Credentials' });
    }

    // Compare the entered password with the stored hash
    const passwordsMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return an error
    if (!passwordsMatch) {
      success = false
      return res.status(401).json({ success, message: 'Invalid password' });
    }

    // Create and send a JWT token
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    success = true
    res.status(200).json({ success, accessToken: token, message:"Login SuccessFully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error'});
  }
};

exports.getuser = async (req, res) => {
  try {
    userId = (req.user.userId)
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
