'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaCar, FaUser, FaSignOutAlt, FaTachometerAlt, FaList } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
            <FaCar className="text-2xl" />
            <span>Gari Spa</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/bookings" className="flex items-center space-x-1 hover:text-blue-200">
                  <FaList />
                  <span>My Bookings</span>
                </Link>
                {user.role === 'owner' && (
                  <Link href="/dashboard" className="flex items-center space-x-1 hover:text-blue-200">
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <FaUser />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-200">Login</Link>
                <Link
                  href="/register"
                  className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-blue-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
