'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="font-cinzel text-xl font-bold tracking-wider">
            Kasia & Paweł
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium text-gray-700 hover:text-indigo-600 transition">
              Home
            </Link>
            <Link href="/upload" className="font-medium text-gray-700 hover:text-indigo-600 transition">
              Share Memories
            </Link>
            <Link href="/health-card" className="font-medium text-gray-700 hover:text-indigo-600 transition">
              Karta Zdrowia
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="font-medium text-gray-700 hover:text-indigo-600 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/upload" 
                className="font-medium text-gray-700 hover:text-indigo-600 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Share Memories
              </Link>
              <Link 
                href="/health-card" 
                className="font-medium text-gray-700 hover:text-indigo-600 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Karta Zdrowia
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 