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
  city: {
    type: String,
    required: false
  },
  pincode: {
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
  },
  active: {
    type: Boolean,
    default: false
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
  },
  active: {
    type: Boolean,
    default: false
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
    validate: [validator.isEmail, 'Invalid email format']
  },
  password: {
    type: String,
    required: true
  },
  profile_image: {
    type: String,
    default: 'https://res.cloudinary.com/dianvv6lu/image/upload/v1732342764/267a651a652fb2ee7a3f288490b02114_ahbo9f.jpg'
  },
  addresses: [addressSchema],
  payment_methods: [paymentMethodSchema] 
});

// Static signup method
userSchema.statics.signup = async function (name, phone_number, email, password, addresses = [], payment_methods = []) {
  // Validation
  if (!name || !phone_number || !email || !password) {
    throw Error('All required fields must be filled');
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

// Method to activate an address and deactivate others
userSchema.methods.setActiveAddress = async function (addressId) {
  this.addresses.forEach((address) => {
    if (address._id.toString() === addressId.toString()) {
      address.active = true; 
    } else {
      address.active = false; 
    }
  });
  await this.save();
};

// Method to activate a payment method and deactivate others
userSchema.methods.setActivePaymentMethod = async function (paymentMethodId) {
  this.payment_methods.forEach((method) => {
    if (method._id.toString() === paymentMethodId.toString()) {
      method.active = true;
    } else {
      method.active = false; 
    }
  });
  await this.save();
};

module.exports = mongoose.model('User', userSchema);
