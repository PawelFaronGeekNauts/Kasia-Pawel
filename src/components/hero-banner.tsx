'use client';

import Image from 'next/image';
import { CountdownTimer } from './countdown-timer';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  weddingDate: string;
}

export function HeroBanner({ title, subtitle, imageUrl, weddingDate }: HeroBannerProps) {
  
  return (
    <div className="relative w-full z-2 mb-[200px] md:mb-[240px]">
      <div className="relative w-full h-[90vh] min-h-[600px] max-h-[900px] z-2">
        <div className="absolute inset-0">
          <Image 
            src={imageUrl} 
            alt="Kasia and Paweł" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="absolute  inset-0 flex flex-col items-center justify-center text-white px-4">
          <div className="text-center max-w-4xl mx-auto  p-6  rounded-lg">
            <h1 className="font-cinzel-decorative text-4xl md:text-[96px] font-normal mb-3 tracking-wider">
              {title}
            </h1>
            <p className="font-cinzel text-xl md:text-5xl mb-8">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="absolute bottom-[-170px] left-1/2 transform -translate-x-1/2 g-white rounded-sm max z-10 w-full">
          <CountdownTimer targetDate={weddingDate} />
        </div>
      </div>
    </div>
  );
} 