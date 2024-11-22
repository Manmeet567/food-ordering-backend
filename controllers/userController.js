const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Function to create JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create a JWT token
    const token = createToken(user._id);

    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const signupUser = async (req, res) => {
  const { name, phone_number, email, password, addresses, payment_methods } = req.body;

  try {
    const user = await User.signup(name, phone_number, email, password, addresses, payment_methods);

    // Create a JWT token
    const token = createToken(user._id);

    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const addAddress = async (req, res) => {
  const { state, city, pincode, phone_number, full_address } = req.body;

  if (!state || !city || !pincode || !phone_number || !full_address) {
      return res.status(400).json({ error: 'All address fields are required' });
  }

  try {
      const user = await User.findById(req.user._id);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const newAddress = {
          state,
          city,
          pincode,
          phone_number,
          full_address
      };

      user.addresses.push(newAddress);

      await user.save();

      res.status(200).json({ message: 'Address added successfully', user });
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
};


const addPaymentMethod = async (req, res) => {
  const { card_number, expiration, CVC, name_on_card } = req.body;

  // Validate required fields
  if (!card_number || !expiration || !CVC || !name_on_card) {
      return res.status(400).json({ error: 'All payment method fields are required' });
  }

  try {
      const user = await User.findById(req.user._id);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const newPaymentMethod = {
          card_number,
          expiration,
          CVC,
          name_on_card,
      };

      user.payment_methods.push(newPaymentMethod);

      await user.save();

      res.status(200).json({ message: 'Payment method added successfully', user });
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  loginUser,
  signupUser,
  addAddress,
  addPaymentMethod
};
