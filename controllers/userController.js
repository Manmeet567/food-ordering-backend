const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Function to create JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Login user with email and password
    const user = await User.login(email, password);

    // Create a JWT token
    const token = createToken(user._id);

    // Respond with user email and token
    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
const signupUser = async (req, res) => {
  const { name, phone_number, email, password, addresses, payment_methods } = req.body;

  try {
    // Sign up user with required fields and optional fields for addresses and payment methods
    const user = await User.signup(name, phone_number, email, password, addresses, payment_methods);

    // Create a JWT token
    const token = createToken(user._id);

    // Respond with user email and token
    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser
};
