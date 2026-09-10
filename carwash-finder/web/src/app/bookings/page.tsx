'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { FaCalendarAlt, FaCheck, FaTimes, FaClock, FaStar } from 'react-icons/fa';

interface Booking {
  _id: string;
  driverId: { _id: string; name: string; email: string };
  carwashId: { _id: string; name: string; address: string };
  serviceName: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [reviewModal, setReviewModal] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId: string, status: string) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status });
      fetchBookings();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to update booking');
    }
  };

  const submitReview = async () => {
    if (!reviewModal) return;
    try {
      const booking = bookings.find((b) => b._id === reviewModal);
      await api.post('/reviews', {
        carwashId: booking?.carwashId._id || booking?.carwashId,
        bookingId: reviewModal,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });
      alert('Review submitted!');
      setReviewModal(null);
      setReviewData({ rating: 5, comment: '' });
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to submit review');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Bookings</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <FaCalendarAlt className="text-4xl mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 text-lg">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{booking.carwashId?.name || 'Carwash'}</h3>
                  <p className="text-gray-600 text-sm">{booking.carwashId?.address || ''}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Service</p>
                  <p className="font-medium">{booking.serviceName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Time</p>
                  <p className="font-medium flex items-center gap-1">
                    <FaClock className="text-gray-400" /> {booking.timeSlot}
                  </p>
                </div>
                <div>
                  {user?.role === 'owner' && booking.driverId && (
                    <>
                      <p className="text-gray-500">Driver</p>
                      <p className="font-medium">{booking.driverId.name}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                {user?.role === 'owner' && booking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(booking._id, 'confirmed')}
                      className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                    >
                      <FaCheck /> Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(booking._id, 'cancelled')}
                      className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                )}
                {user?.role === 'owner' && booking.status === 'confirmed' && (
                  <button
                    onClick={() => updateStatus(booking._id, 'completed')}
                    className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                  >
                    <FaCheck /> Mark Completed
                  </button>
                )}
                {user?.role === 'driver' && booking.status === 'completed' && (
                  <button
                    onClick={() => setReviewModal(booking._id)}
                    className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600"
                  >
                    <FaStar /> Leave Review
                  </button>
                )}
                {user?.role === 'driver' && (booking.status === 'pending' || booking.status === 'confirmed') && (
                  <button
                    onClick={() => updateStatus(booking._id, 'cancelled')}
                    className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                  >
                    <FaTimes /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {reviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Leave a Review</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className={`text-2xl ${star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment (optional)</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows={3}
                  placeholder="How was your experience?"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setReviewModal(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
