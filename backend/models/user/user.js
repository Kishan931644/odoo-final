const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    required: false // URL or path to the profile image
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Validates 10-digit phone numbers
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  role: {
    type: String,
    enum: ['user', 'librarian', 'admin'],
    default: 'user',
    required: true
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
