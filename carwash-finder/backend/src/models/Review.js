const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carwashId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carwash',
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

reviewSchema.index({ carwashId: 1, driverId: 1, bookingId: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
