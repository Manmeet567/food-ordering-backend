const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

// Define address schema
const addressSchema = new Schema({
  state: {
    type: String,
    required: false 
  },
  city_district: {
    type: String,
    required: false
  },
  pin_code: {
    type: String,
    required: false
  },
  phone_number: {
    type: String,
    required: false
  },
  full_address: {
    type: String,
    required: false
  }
});

// Define payment method schema
const paymentMethodSchema = new Schema({
  card_number: {
    type: String,
    required: false
  },
  expiration: {
    type: String, // storing as a string like 'MM/YY'
    required: false
  },
  CVC: {
    type: String,
    required: false
  },
  name_on_card: {
    type: String,
    required: false
  }
});

// Define user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email format'] // Built-in email validation
  },
  password: {
    type: String,
    required: true
  },
  addresses: [addressSchema], // Array of addresses
  payment_methods: [paymentMethodSchema] // Array of payment methods
});

// Static signup method
userSchema.statics.signup = async function (name, phone_number, email, password, addresses = [], payment_methods = []) {
  
  // Validation
  if (!name || !phone_number || !email || !password) {
    throw Error('All required fields (name, phone number, email, and password) must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  if (!validator.isMobilePhone(phone_number, 'any')) {
    throw Error('Phone number is not valid');
  }

  const emailExists = await this.findOne({ email });
  const phoneExists = await this.findOne({ phone_number });

  if (emailExists) {
    throw Error('Email already in use');
  }

  if (phoneExists) {
    throw Error('Phone number already in use');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create the user
  const user = await this.create({
    name,
    phone_number,
    email,
    password: hash,
    addresses, // Optional array of addresses
    payment_methods // Optional array of payment methods
  });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('User does not exist');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect Password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
