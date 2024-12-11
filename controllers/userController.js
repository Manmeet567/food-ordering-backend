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

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const signupUser = async (req, res) => {
  const { name, phone_number, email, password, addresses, payment_methods } = req.body;

  try {
    const user = await User.signup(name, phone_number, email, password, addresses, payment_methods);

    // Create a JWT token
    const token = createToken(user._id);

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const addAddress = async (req, res) => {
  const { state, city, pincode, phone_number, full_address } = req.body;

  if (!state || !city || !pincode || !phone_number || !full_address) {
      return res.status(400).json({ message: 'All address fields are required' });
  }

  try {
      const user = await User.findById(req.user._id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
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
      res.status(500).json({ message: 'Server error' });
  }
};

// Edit Address
const editAddress = async (req, res) => {
  const { addressId } = req.params;
  const { state, city, pincode, phone_number, full_address } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Update fields only if provided in the request
    if (state) address.state = state;
    if (city) address.city = city;
    if (pincode) address.pincode = pincode;
    if (phone_number) address.phone_number = phone_number;
    if (full_address) address.full_address = full_address;

    await user.save();
    res.status(200).json({ message: 'Address updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove Address
const removeAddress = async (req, res) => {
  const { addressId } = req.params;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    address.remove();
    await user.save();
    res.status(200).json({ message: 'Address removed successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



const addPaymentMethod = async (req, res) => {
  const { card_number, expiration, CVC, name_on_card } = req.body;

  // Validate required fields
  if (!card_number || !expiration || !CVC || !name_on_card) {
      return res.status(400).json({ message: 'All payment method fields are required' });
  }

  try {
      const user = await User.findById(req.user._id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
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
      res.status(500).json({ message: 'Server error' });
  }
};

// Edit Payment Method
const editPaymentMethod = async (req, res) => {
  const { paymentMethodId } = req.params;
  const { card_number, expiration, CVC, name_on_card } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const paymentMethod = user.payment_methods.id(paymentMethodId);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    // Update fields only if provided in the request
    if (card_number) paymentMethod.card_number = card_number;
    if (expiration) paymentMethod.expiration = expiration;
    if (CVC) paymentMethod.CVC = CVC;
    if (name_on_card) paymentMethod.name_on_card = name_on_card;

    await user.save();
    res.status(200).json({ message: 'Payment method updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove Payment Method
const removePaymentMethod = async (req, res) => {
  const { paymentMethodId } = req.params;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const paymentMethod = user.payment_methods.id(paymentMethodId);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    paymentMethod.remove();
    await user.save();
    res.status(200).json({ message: 'Payment method removed successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  loginUser,
  signupUser,
  addAddress,
  editAddress,
  removeAddress,
  addPaymentMethod,
  editPaymentMethod,
  removePaymentMethod,
  getUser
};
