'use client';

import Link from 'next/link';

interface VenueLocationProps {
  venueName: string;
  address: string;
  city: string;
  mapUrl?: string;
}

export function VenueLocation({ 
  venueName, 
  address, 
  city, 
  mapUrl = "https://www.google.com/maps/place/Ranczo+Radzicz/@52.8549095,14.7339313,17z/data=!3m1!4b1!4m6!3m5!1s0x4703bd24747ae4ef:0x50bc57395d0fa23a!8m2!3d52.8549063!4d14.7365062!16s%2Fg%2F1tdqmbvy?entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D" 
}: VenueLocationProps) {
  return (
    <div className="relative w-full py-20 md:py-32 bg-cover bg-center mt-[80px]" style={{ 
      backgroundImage: "url('/venue-bg.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 container mx-auto px-6 lg:px-0 text-center text-white max-w-[936px]">
        <h2 className="font-cinzel font-semibold text-5xl md:text-5xl mb-8 tracking-wide">
          TO TUTAJ POWIEMY SOBIE TAK!
        </h2>
        
        <div className="max-w-md mx-auto p-4 md:p-6 rounded-lg">
          <h3 className="font-quicksand text-2xl font-semibold mb-2">
            {venueName}
          </h3>
          <p className="font-quicksand text-xl font-medium mb-1">
            {address}
          </p>
          <p className="font-quicksand text-xl font-medium mb-20">
            {city}
          </p>
          
          <Link 
            href={mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-800 font-quicksand rounded-full transition-all hover:bg-gray-100"
          >
            <span>Zobacz lokalizację na mapie</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 