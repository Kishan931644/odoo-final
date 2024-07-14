import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const userSchema = new Schema({
  profileImage: {
    type: String,
    required: false // URL or path to the profile image
  },
  password: {
    type: String,
    required: true
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

const User = model('User', userSchema);

export default User;
