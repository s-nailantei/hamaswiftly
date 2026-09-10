'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { FaSearch, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

interface Carwash {
  _id: string;
  name: string;
  address: string;
  location: { coordinates: number[] };
  averageRating: number;
  totalReviews: number;
  services: { name: string; price: number }[];
  hours: { open: string; close: string };
}

const kenyaCities = [
  { name: 'Nairobi', lat: -1.2921, lng: 36.8219 },
  { name: 'Mombasa', lat: -4.0435, lng: 39.6682 },
  { name: 'Nakuru', lat: -0.3031, lng: 36.0800 },
  { name: 'Kisumu', lat: -0.1022, lng: 34.7617 },
  { name: 'Machakos', lat: -1.5177, lng: 37.2634 },
  { name: 'Konza', lat: -1.8500, lng: 37.1200 },
  { name: 'Kiambu', lat: -1.1714, lng: 36.8300 },
  { name: 'Ruiru', lat: -1.1467, lng: 36.9606 },
];

export default function Home() {
  const router = useRouter();
  const [carwashes, setCarwashes] = useState<Carwash[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState(10);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      searchNearby();
    }
  }, [location, radius]);

  const searchNearby = async () => {
    if (!location) return;
    setLoading(true);
    try {
      const response = await api.get('/carwashes/nearby', {
        params: { lat: location.lat, lng: location.lng, radius },
      });
      setCarwashes(response.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCityClick = (city: typeof kenyaCities[0]) => {
    setActiveCity(city.name);
    setLocation({ lat: city.lat, lng: city.lng });
    setRadius(25);
  };

  const handleAddressSearch = async () => {
    if (!searchQuery.trim()) return;
    setActiveCity(null);
    try {
      const found = kenyaCities.find(
        (c) => c.name.toLowerCase() === searchQuery.toLowerCase().trim()
      );
      if (found) {
        setLocation({ lat: found.lat, lng: found.lng });
        setActiveCity(found.name);
        return;
      }
      alert('Try one of the available cities: Nairobi, Mombasa, Nakuru, Kisumu, Machakos, Konza, Kiambu, Ruiru');
    } catch {
      alert('Could not find that address. Try a different search.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Find the Nearest Gari Spa</h1>
        <p className="text-gray-600">Quality car wash services across Kenya</p>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md p-6 mb-8 text-white">
        <h2 className="text-lg font-semibold mb-3">Quick Search by City</h2>
        <div className="flex flex-wrap gap-3">
          {kenyaCities.map((city) => (
            <button
              key={city.name}
              onClick={() => handleCityClick(city)}
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                activeCity === city.name
                  ? 'bg-white text-blue-700'
                  : 'bg-blue-500 hover:bg-blue-400 text-white'
              }`}
            >
              <FaMapMarkerAlt className="inline mr-1" />
              {city.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search City</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter a Kenyan city..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && handleAddressSearch()}
              />
              <button
                onClick={handleAddressSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <FaSearch /> Search
              </button>
            </div>
          </div>

          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Radius (km)</label>
            <select
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
              <option value={50}>50 km</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching nearby Gari Spa locations...</p>
        </div>
      ) : carwashes.length > 0 ? (
        <>
          <p className="text-gray-600 mb-4">Found {carwashes.length} Gari Spa{carwashes.length !== 1 ? 's' : ''}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carwashes.map((carwash) => (
              <div
                key={carwash._id}
                onClick={() => router.push(`/carwash/${carwash._id}`)}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{carwash.name}</h3>
                <p className="text-gray-600 mb-2 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-red-500" /> {carwash.address}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(carwash.averageRating) ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {carwash.averageRating.toFixed(1)} ({carwash.totalReviews} reviews)
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="mb-1">Hours: {carwash.hours.open} - {carwash.hours.close}</p>
                  <p>Services from KSh {Math.min(...carwash.services.map((s) => s.price))}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : location ? (
        <div className="text-center py-12 text-gray-600">
          <FaSearch className="text-4xl mx-auto mb-4 text-gray-400" />
          <p className="text-lg">No Gari Spa locations found within {radius} km</p>
          <p className="text-sm mt-2">Try a different city or increase the search radius</p>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600">
          <FaMapMarkerAlt className="text-4xl mx-auto mb-4 text-gray-400" />
          <p className="text-lg">Select a city above to find Gari Spa locations</p>
        </div>
      )}
    </div>
  );
}
