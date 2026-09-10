'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { FaMapMarkerAlt, FaStar, FaPhone, FaClock, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';

interface Carwash {
  _id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  services: { name: string; price: number; duration: number }[];
  hours: { open: string; close: string };
  averageRating: number;
  totalReviews: number;
  ownerId: { name: string; phone: string };
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  driverId: { name: string };
  createdAt: string;
}

export default function CarwashPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [carwash, setCarwash] = useState<Carwash | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchCarwash();
    fetchReviews();
  }, [params.id]);

  const fetchCarwash = async () => {
    try {
      const response = await api.get(`/carwashes/${params.id}`);
      setCarwash(response.data);
    } catch (error) {
      console.error('Error fetching carwash:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/reviews/carwash/${params.id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    setBookingLoading(true);

    try {
      await api.post('/bookings', {
        carwashId: params.id,
        serviceName: selectedService,
        date: selectedDate,
        timeSlot: selectedTime,
      });
      alert('Booking created successfully!');
      setBookingModal(false);
      setSelectedService('');
      setSelectedDate('');
      setSelectedTime('');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!carwash) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Carwash not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft /> Back to results
      </button>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{carwash.name}</h1>
            <p className="text-gray-600 flex items-center gap-1 mt-1">
              <FaMapMarkerAlt className="text-red-500" /> {carwash.address}
            </p>
          </div>
          {user?.role === 'driver' && (
            <button
              onClick={() => setBookingModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
            >
              <FaCalendarAlt /> Book Now
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.round(carwash.averageRating) ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-gray-600">
            {carwash.averageRating.toFixed(1)} ({carwash.totalReviews} reviews)
          </span>
        </div>

        {carwash.description && (
          <p className="text-gray-700 mb-4">{carwash.description}</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
            <p className="text-gray-600 flex items-center gap-2">
              <FaPhone /> {carwash.phone || carwash.ownerId?.phone || 'Not available'}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Hours</h3>
            <p className="text-gray-600 flex items-center gap-2">
              <FaClock /> {carwash.hours.open} - {carwash.hours.close}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
        <div className="space-y-3">
          {carwash.services.map((service, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{service.name}</p>
                <p className="text-sm text-gray-600">{service.duration} min</p>
              </div>
              <p className="text-lg font-bold text-blue-600">KSh {service.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{review.driverId?.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {review.comment && <p className="text-gray-700">{review.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {bookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Book a Service</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Select a service</option>
                  {carwash.services.map((service, index) => (
                    <option key={index} value={service.name}>
                      {service.name} - KSh {service.price} ({service.duration} min)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setBookingModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={!selectedService || !selectedDate || !selectedTime || bookingLoading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400"
              >
                {bookingLoading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
