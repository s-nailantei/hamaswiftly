const mongoose = require('mongoose');

const carwashSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  phone: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  services: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true } // in minutes
  }],
  hours: {
    open: { type: String, default: '08:00' },
    close: { type: String, default: '18:00' }
  },
  photos: [String],
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

carwashSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Carwash', carwashSchema);
