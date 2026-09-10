'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { FaPlus, FaEdit, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

interface Carwash {
  _id: string;
  name: string;
  address: string;
  location: { coordinates: number[] };
  services: { name: string; price: number; duration: number }[];
  hours: { open: string; close: string };
  averageRating: number;
  totalReviews: number;
  isActive: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [carwashes, setCarwashes] = useState<Carwash[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    lat: '',
    lng: '',
    phone: '',
    description: '',
    hours: { open: '08:00', close: '18:00' },
    services: [{ name: '', price: 0, duration: 30 }],
  });

  useEffect(() => {
    if (user && user.role !== 'owner') {
      router.push('/');
    }
    fetchCarwashes();
  }, [user]);

  const fetchCarwashes = async () => {
    try {
      const response = await api.get('/carwashes/owner/my');
      setCarwashes(response.data);
    } catch (error) {
      console.error('Error fetching carwashes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { name: '', price: 0, duration: 30 }],
    });
  };

  const handleServiceChange = (index: number, field: string, value: string | number) => {
    const newServices = [...formData.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setFormData({ ...formData, services: newServices });
  };

  const handleRemoveService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/carwashes', {
        ...formData,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        services: formData.services.filter((s) => s.name),
      });
      setShowAddModal(false);
      fetchCarwashes();
      setFormData({
        name: '',
        address: '',
        lat: '',
        lng: '',
        phone: '',
        description: '',
        hours: { open: '08:00', close: '18:00' },
        services: [{ name: '', price: 0, duration: 30 }],
      });
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to add carwash');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-600">Manage your carwash locations</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Carwash
        </button>
      </div>

      {carwashes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg mb-4">You haven&apos;t added any carwashes yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Add Your First Carwash
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carwashes.map((carwash) => (
            <div key={carwash._id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{carwash.name}</h3>
              <p className="text-gray-600 flex items-center gap-1 mb-2">
                <FaMapMarkerAlt className="text-red-500" /> {carwash.address}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.round(carwash.averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {carwash.averageRating.toFixed(1)} ({carwash.totalReviews})
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {carwash.services.length} services | {carwash.hours.open} - {carwash.hours.close}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/carwash/${carwash._id}`)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 text-sm"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Carwash</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="My Carwash"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="123 Main St, City"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="40.7128"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="-74.0060"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="+254 7XX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows={3}
                  placeholder="Tell customers about your carwash..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opens At</label>
                  <input
                    type="time"
                    value={formData.hours.open}
                    onChange={(e) => setFormData({ ...formData, hours: { ...formData.hours, open: e.target.value } })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Closes At</label>
                  <input
                    type="time"
                    value={formData.hours.close}
                    onChange={(e) => setFormData({ ...formData, hours: { ...formData.hours, close: e.target.value } })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Services</label>
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    + Add Service
                  </button>
                </div>
                {formData.services.map((service, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                      placeholder="Service name"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      value={service.price || ''}
                      onChange={(e) => handleServiceChange(index, 'price', Number(e.target.value))}
                      placeholder="Price"
                      className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      value={service.duration || ''}
                      onChange={(e) => handleServiceChange(index, 'duration', Number(e.target.value))}
                      placeholder="Min"
                      className="w-16 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                    {formData.services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveService(index)}
                        className="text-red-500 hover:text-red-700 px-2"
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Add Carwash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
