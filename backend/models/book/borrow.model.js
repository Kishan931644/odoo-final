import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const borrowingRecordSchema = new Schema({
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
    type: Date,
    default: null
  },
  lateFees: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const BorrowingRecord = model('BorrowingRecord', borrowingRecordSchema);

export default BorrowingRecord;
