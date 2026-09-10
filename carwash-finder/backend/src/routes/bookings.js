const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Carwash = require('../models/Carwash');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, requireRole('driver'), [
  body('carwashId').notEmpty().withMessage('Carwash ID is required'),
  body('serviceName').trim().notEmpty().withMessage('Service name is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('timeSlot').trim().notEmpty().withMessage('Time slot is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { carwashId, serviceName, date, timeSlot } = req.body;

    const carwash = await Carwash.findById(carwashId);
    if (!carwash) {
      return res.status(404).json({ error: 'Carwash not found' });
    }

    const service = carwash.services.find(s => s.name === serviceName);
    if (!service) {
      return res.status(400).json({ error: 'Service not available at this carwash' });
    }

    const existingBooking = await Booking.findOne({
      carwashId,
      date: new Date(date),
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'Time slot already booked' });
    }

    const booking = new Booking({
      driverId: req.user._id,
      carwashId,
      serviceName,
      date: new Date(date),
      timeSlot,
      status: 'pending'
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/my', auth, async (req, res) => {
  try {
    const query = req.user.role === 'driver'
      ? { driverId: req.user._id }
      : {};

    if (req.user.role === 'owner') {
      const carwashIds = await Carwash.find({ ownerId: req.user._id }).distinct('_id');
      query.carwashId = { $in: carwashIds };
    }

    const bookings = await Booking.find(query)
      .populate('driverId', 'name email phone')
      .populate('carwashId', 'name address')
      .sort({ date: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id)
      .populate('carwashId', 'ownerId');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (req.user.role === 'driver' && booking.driverId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (req.user.role === 'owner' && booking.carwashId.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
