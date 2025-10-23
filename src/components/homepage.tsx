'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HeroBanner } from './hero-banner';
import { YouTubeVideo } from '@/components/youtube-video';
import { VenueLocation } from '@/components/venue-location';
import { ContactRSVP } from '@/components/contact-rsvp';
import { FAQSection } from '@/components/faq-section';
import { WitnessesSection } from '@/components/witnesses-section';
export function Homepage() {

  const videoRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const witnessesRef = useRef<HTMLDivElement>(null);

  const [hasVideoAnimated, setHasVideoAnimated] = useState(false);
  const [hasVenueAnimated, setHasVenueAnimated] = useState(false);
  const [hasContactAnimated, setHasContactAnimated] = useState(false);
  const [hasFaqAnimated, setHasFaqAnimated] = useState(false);
  const [hasWitnessesAnimated, setHasWitnessesAnimated] = useState(false);
    useEffect(() => {
    window.scrollTo(0, 0);

    const checkScrollAndReset = () => {
      if (window.scrollY === 0) {
        setHasContactAnimated(false);
        setHasFaqAnimated(false);
        setHasWitnessesAnimated(false);
        setHasVenueAnimated(false);
        setHasVideoAnimated(false);
        
        window.removeEventListener('scroll', checkScrollAndReset);
      }
    };
    window.addEventListener('scroll', checkScrollAndReset);
    checkScrollAndReset();
    return () => {
      window.removeEventListener('scroll', checkScrollAndReset);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === videoRef.current && entry.isIntersecting) {
            if (!hasVideoAnimated) setHasVideoAnimated(true);
          } else if (entry.target === venueRef.current && entry.isIntersecting) {
            if (!hasVenueAnimated) setHasVenueAnimated(true);
          } else if (entry.target === contactRef.current && entry.isIntersecting) {
            if (!hasContactAnimated) setHasContactAnimated(true);
          } else if (entry.target === faqRef.current && entry.isIntersecting) {
            if (!hasFaqAnimated) setHasFaqAnimated(true);
          } else if (entry.target === witnessesRef.current && entry.isIntersecting) {
            if (!hasWitnessesAnimated) setHasWitnessesAnimated(true);
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = [
      videoRef.current,
      venueRef.current,
      contactRef.current,
      faqRef.current,
      witnessesRef.current,
    ];

    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [hasVideoAnimated, hasVenueAnimated, hasContactAnimated, hasFaqAnimated, hasWitnessesAnimated]);

  const bannerImageUrl ="/couple.jpg";
  
  const witnesses = [
    {
      name: "AGATA",
      phone: "+48 123 456 789",
      imageUrl: "/agaten.jpg"
    },
    {
      name: "PAWEŁ",
      phone: "+48 123 456 789",
      imageUrl: "/malina.jpg"
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
      <div 
        ref={videoRef} 
        className={`px-6 lg:px-0 w-full justify-center items-center max-w-[936px] fade-in-section ${hasVideoAnimated ? 'is-visible has-animated' : ''}`}
      >
        <YouTubeVideo 
          videoId="dQw4w9WgXcQ" 
          title="Nasze zaręczyny"
        />
      </div>
      <div 
        ref={venueRef} 
        className={`w-full fade-in-section ${hasVenueAnimated ? 'is-visible has-animated' : ''}`}
      >
        <VenueLocation
          venueName="Ranczo Radzicz"
          address="ul. Radzicz 2a"
          city="74-311 Różańsko"
          mapUrl="https://www.google.com/maps/place/Ranczo+Radzicz/@52.8525873,14.7385959,12.25z/data=!4m6!3m5!1s0x4703bd24747ae4ef:0x50bc57395d0fa23a!8m2!3d52.8549063!4d14.7365062!16s%2Fg%2F1tdqmbvy?entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D"
        />
      </div>
      <div 
        ref={contactRef} 
        className={`w-full fade-in-section ${hasContactAnimated ? 'is-visible has-animated' : ''}`}
      >
        <ContactRSVP 
          message="Dajcie Nam znać czy będziemy się razem bawić!"
          bride={{
            name: "KASIA",
            phone: "+48 721 652 470"
          }}
          groom={{
            name: "PAWEŁ",
            phone: "+48 792 413 904"
          }}
          imageUrl="/couple.jpg"
        />
      </div>
      <div 
        ref={faqRef} 
        className={`w-full fade-in-section ${hasFaqAnimated ? 'is-visible has-animated' : ''}`}
      >
        <FAQSection
          subtitle="Wy pytacie"
          title="MY ODPOWIADAMY"
          introduction="Najważniejsze informacje, które warto znać:"
        />
      </div>
      <div 
        ref={witnessesRef} 
        className={`w-full fade-in-section ${hasWitnessesAnimated ? 'is-visible has-animated' : ''}`}
      >
        <WitnessesSection
          subtitle="W razie innych pytań"
          title="ŚWIADKOWIE"
          description="Też bardzo chętnie Ci pomogą!"
          witnesses={witnesses}
        />
      </div>
    </main>
  );
} 