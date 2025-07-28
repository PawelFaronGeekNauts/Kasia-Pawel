'use client';

import { HeroBanner } from './hero-banner';
import { YouTubeVideo } from '@/components/youtube-video';
import { VenueLocation } from '@/components/venue-location';
import { ContactRSVP } from '@/components/contact-rsvp';
import { FAQSection } from '@/components/faq-section';
import { WitnessesSection } from '@/components/witnesses-section';

export function Homepage() {

  const bannerImageUrl ="/couple.jpg";
  
  const witnesses = [
    {
      name: "AGATA",
      phone: "+48 123 456 789",
      imageUrl: "/bouquet.png"
    },
    {
      name: "PAWEŁ",
      phone: "+48 123 456 789",
      imageUrl: "/bouquet.png"
    }
  ];
  
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroBanner 
        title="KASIA & PAWEŁ"
        subtitle="BĘDZIE ŚLUB!"
        imageUrl={bannerImageUrl}
        weddingDate="2026-07-17 16:00:00"
      />
      <div className='px-6 lg:px-0 w-full justify-center items-center max-w-[936px]'>
        <YouTubeVideo 
          videoId="dQw4w9WgXcQ" 
          title="Nasze zaręczyny"
        />
      </div>
      <VenueLocation
        venueName="Nazwa Lokalizacji"
        address="ul. Ulica 123"
        city="Miasto 33-333"
        mapUrl="https://www.google.com/maps/place/Ranczo+Radzicz/@52.8525873,14.7385959,12.25z/data=!4m6!3m5!1s0x4703bd24747ae4ef:0x50bc57395d0fa23a!8m2!3d52.8549063!4d14.7365062!16s%2Fg%2F1tdqmbvy?entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D"
      />
      <ContactRSVP 
        message="Dajcie Nam znać czy będziemy się razem bawić!"
        bride={{
          name: "KASIA",
          phone: "+48 123 456 789"
        }}
        groom={{
          name: "PAWEŁ",
          phone: "+48 123 456 789"
        }}
        imageUrl="/bouquet.png"
      /> 
      <FAQSection
        subtitle="Wy pytacie"
        title="MY ODPOWIADAMY"
        introduction="Najważniejsze informacje, które warto znać:"
      />
      <WitnessesSection
        subtitle="W razie innych pytań"
        title="ŚWIADKOWIE"
        description="Też bardzo chętnie Ci pomogą!"
        witnesses={witnesses}
      />
    </main>
  );
} 