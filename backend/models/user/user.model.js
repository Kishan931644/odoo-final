import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const userSchema = new Schema({
  userid: {
    type: String,
    required: true,
    unique: true
  },
  profileImage: {
    type: String,
    required: false // URL or path to the profile image
  },
  password: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false   
  },
  city: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false,
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
  },
  googleId: { type: String }, // Google ID for OAuth
}, { timestamps: true });

const User = model('User', userSchema);

export default User;
