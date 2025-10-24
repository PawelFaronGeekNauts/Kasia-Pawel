'use client';

import Image from 'next/image';

interface ContactRSVPProps {
  message: string;
  bride: {
    name: string;
    phone: string;
  };
  groom: {
    name: string;
    phone: string;
  };
  imageUrl: string;
}

export function ContactRSVP({ message, bride, groom, imageUrl }: ContactRSVPProps) {
  return (
    <div className="w-full py-10 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto  px-4 lg:px-0  max-w-[936px]">
        <div className="flex flex-col md:flex-row items-center md:space-x-10 lg:space-x-20">
        <div className="relative w-[300px] h-[380px] md:w-[350px] md:h-[420px] lg:w-[400px] lg:h-[548px] rounded-t-full p-[2px] bg-gradient-to-b from-[#363636] to-[#939393]">
        <div className="relative w-full h-full rounded-t-full overflow-hidden bg-white">
              <Image
                src={imageUrl}
                alt="Wedding bouquet"
                fill
                className="object-cover px-6 py-6 rounded-t-full"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <h3 className="text-gray-600 font-quicksand text-3xl">
              Kontakt
            </h3>
            <h2 className="font-cinzel text-4xl md:text-[32px] font-semibold text-gray-800 mb-1 mt-4">
              RSVP
            </h2>
            
            <p className="font-quicksand text-2xl text-gray-700 mb-10 md:mb-19">
              {message}
            </p>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-8 md:mb-0">
                <h4 className="font-cinzel font-semibold text-[32px] text-gray-800 mb-1">
                  {bride.name}
                </h4>
                <p className="font-quicksand text-2xl text-gray-700">
                  {bride.phone}
                </p>
              </div>
              <div>
                <h4 className="font-cinzel font-semibold text-[32px] text-gray-800 mb-1">
                  {groom.name}
                </h4>
                <p className="font-quicksand text-2xl text-gray-700">
                  {groom.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 