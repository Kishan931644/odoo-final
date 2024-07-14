import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const bookSchema = new Schema({
  ISBN: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  thumbnailLink: {
    type: String,
    required: false
  },
  quantity: {
    type: Number,
    required: true
  },
  borrowedCount: {
    type: Number,
    default: 0
  },
  available: {
    type: Boolean,
    default: function () {
      return this.quantity>0? true: false;
    }
  }
}, { timestamps: true });

const Book = model('Book', bookSchema);

export default Book;
