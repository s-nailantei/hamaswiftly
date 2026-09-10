const express = require('express');
const { body, validationResult } = require('express-validator');
const Carwash = require('../models/Carwash');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const carwashes = await Carwash.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radius * 1000
        }
      },
      isActive: true
    }).populate('ownerId', 'name phone');

    res.json(carwashes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const carwash = await Carwash.findById(req.params.id)
      .populate('ownerId', 'name phone');

    if (!carwash) {
      return res.status(404).json({ error: 'Carwash not found' });
    }

    res.json(carwash);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, requireRole('owner'), [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('lat').isNumeric().withMessage('Valid latitude required'),
  body('lng').isNumeric().withMessage('Valid longitude required'),
  body('services').isArray({ min: 1 }).withMessage('At least one service is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, address, lat, lng, phone, description, services, hours, photos } = req.body;

    const carwash = new Carwash({
      ownerId: req.user._id,
      name,
      address,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      },
      phone,
      description,
      services,
      hours,
      photos
    });

    await carwash.save();
    res.status(201).json(carwash);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', auth, requireRole('owner'), async (req, res) => {
  try {
    const carwash = await Carwash.findById(req.params.id);

    if (!carwash) {
      return res.status(404).json({ error: 'Carwash not found' });
    }

    if (carwash.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updates = req.body;
    if (updates.lat && updates.lng) {
      updates.location = {
        type: 'Point',
        coordinates: [parseFloat(updates.lng), parseFloat(updates.lat)]
      };
      delete updates.lat;
      delete updates.lng;
    }

    Object.assign(carwash, updates);
    await carwash.save();

    res.json(carwash);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/owner/my', auth, requireRole('owner'), async (req, res) => {
  try {
    const carwashes = await Carwash.find({ ownerId: req.user._id });
    res.json(carwashes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
