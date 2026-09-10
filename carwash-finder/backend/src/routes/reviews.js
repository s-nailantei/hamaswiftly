const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const Carwash = require('../models/Carwash');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/carwash/:carwashId', async (req, res) => {
  try {
    const reviews = await Review.find({ carwashId: req.params.carwashId })
      .populate('driverId', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, requireRole('driver'), [
  body('carwashId').notEmpty().withMessage('Carwash ID is required'),
  body('bookingId').notEmpty().withMessage('Booking ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { carwashId, bookingId, rating, comment } = req.body;

    const booking = await Booking.findOne({
      _id: bookingId,
      driverId: req.user._id,
      carwashId,
      status: 'completed'
    });

    if (!booking) {
      return res.status(400).json({ error: 'No completed booking found for this carwash' });
    }

    const existingReview = await Review.findOne({
      driverId: req.user._id,
      carwashId,
      bookingId
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You already reviewed this booking' });
    }

    const review = new Review({
      driverId: req.user._id,
      carwashId,
      bookingId,
      rating,
      comment
    });

    await review.save();

    const allReviews = await Review.find({ carwashId });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);

    await Carwash.findByIdAndUpdate(carwashId, {
      averageRating: totalRating / allReviews.length,
      totalReviews: allReviews.length
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
