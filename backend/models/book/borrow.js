const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowingRecordSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  borrowDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  lateFees: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const BorrowingRecord = mongoose.model('BorrowingRecord', borrowingRecordSchema);

module.exports = BorrowingRecord;
