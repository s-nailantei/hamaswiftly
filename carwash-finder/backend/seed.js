const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../src/models/User');
const Carwash = require('../src/models/Carwash');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gari-spa';

const kenyaLocations = [
  { city: 'Nairobi', lat: -1.2921, lng: 36.8219 },
  { city: 'Mombasa', lat: -4.0435, lng: 39.6682 },
  { city: 'Nakuru', lat: -0.3031, lng: 36.0800 },
  { city: 'Kisumu', lat: -0.1022, lng: 34.7617 },
  { city: 'Machakos', lat: -1.5177, lng: 37.2634 },
  { city: 'Konza', lat: -1.8500, lng: 37.1200 },
  { city: 'Kiambu', lat: -1.1714, lng: 36.8300 },
  { city: 'Ruiru', lat: -1.1467, lng: 36.9606 },
];

const carwashNames = [
  'Gari Spa Express', 'Gari Spa Premium', 'Gari Spa Deluxe',
  'Gari Spa Elite', 'Gari Spa Pro', 'Gari Spa Shine',
  'Gari Spa Blitz', 'Gari Spa Sparkle', 'Gari Spa Fresh',
  'Gari Spa Magic', 'Gari Spa Royal', 'Gari Spa Gold',
];

const services = [
  { name: 'Basic Wash', price: 300, duration: 20 },
  { name: 'Full Detail', price: 800, duration: 60 },
  { name: 'Interior Clean', price: 500, duration: 30 },
  { name: 'Exterior Polish', price: 600, duration: 40 },
  { name: 'Premium Package', price: 1500, duration: 90 },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Carwash.deleteMany({});

    await User.create({
      name: 'Test Driver',
      email: 'test@gmail.com',
      password: 'password123',
      role: 'driver',
      phone: '+254712345678',
    });
    console.log('Created test driver account');

    const ownerPromises = kenyaLocations.map((loc, i) =>
      User.create({
        name: `Owner ${loc.city}`,
        email: `owner${loc.city.toLowerCase().replace(/\s/g, '')}@gmail.com`,
        password: 'password123',
        role: 'owner',
        phone: `+2547${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
      })
    );

    const owners = await Promise.all(ownerPromises);
    console.log(`Created ${owners.length} owners`);

    const carwashPromises = [];
    let nameIdx = 0;

    for (let i = 0; i < kenyaLocations.length; i++) {
      const loc = kenyaLocations[i];
      const numCarwashes = i === 0 ? 3 : 2;

      for (let j = 0; j < numCarwashes; j++) {
        const offsetLat = (Math.random() - 0.5) * 0.02;
        const offsetLng = (Math.random() - 0.5) * 0.02;
        const numServices = 2 + Math.floor(Math.random() * 3);

        carwashPromises.push(
          Carwash.create({
            ownerId: owners[i]._id,
            name: carwashNames[nameIdx % carwashNames.length],
            address: `${loc.city}, Kenya`,
            location: {
              type: 'Point',
              coordinates: [loc.lng + offsetLng, loc.lat + offsetLat],
            },
            phone: owners[i].phone,
            description: `Quality car wash services in ${loc.city}. Your car deserves the best care at Gari Spa.`,
            services: services.slice(0, numServices),
            hours: { open: '07:00', close: '19:00' },
            averageRating: Math.round((3 + Math.random() * 2) * 10) / 10,
            totalReviews: Math.floor(Math.random() * 50) + 5,
          })
        );
        nameIdx++;
      }
    }

    await Promise.all(carwashPromises);
    console.log(`Created ${carwashPromises.length} carwashes across Kenya`);

    console.log('\n--- Test Accounts ---');
    console.log('Driver: test@gmail.com / password123');
    console.log('Owners:');
    kenyaLocations.forEach((loc) => {
      console.log(`  ${loc.city}: owner${loc.city.toLowerCase().replace(/\s/g, '')}@gmail.com / password123`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
