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
  quantity: {
    type: Number,
    required: true
  },
  available: {
    type: Number,
    required: true,
    default: function () {
      return this.quantity;
    }
  }
}, { timestamps: true });

const Book = model('Book', bookSchema);

export default Book;
