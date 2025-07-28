'use client';

import { useEvents } from '@/hooks/use-events';
import { getStrapiMedia } from '@/lib/strapi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';

export function EventsList() {
  const { data, isLoading, error } = useEvents();
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading...</div>;
  }
  
  if (error || !data) {
    toast.error('Failed to load events data');
    return (
      <div className="text-center">
        <p>No events found. Please check back later.</p>
      </div>
    );
  }

  const events = data.data;
  
  return (
    <main className="min-h-screen py-12 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-center mb-12">Wedding Events</h1>
      
      {events.length === 0 ? (
        <div className="text-center">
          <p>No events found. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              {event.attributes.image?.data && (
                <div className="relative h-64 w-full">
                  <Image
                    src={getStrapiMedia(event.attributes.image.data.attributes.url) || ''}
                    alt={event.attributes.image.data.attributes.alternativeText || event.attributes.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <CardHeader>
                <CardTitle>{event.attributes.name}</CardTitle>
                <CardDescription>
                  {new Date(event.attributes.date).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Location: </span>
                    {event.attributes.location}
                  </p>
                  
                  <p className="text-gray-700">
                    <span className="font-medium">Address: </span>
                    {event.attributes.address}
                  </p>
                </div>
                
                <div 
                  className="mb-4 prose"
                  dangerouslySetInnerHTML={{ __html: event.attributes.description }}
                />
              </CardContent>
              
              <CardFooter>
                {event.attributes.googleMapsUrl && (
                  <Button asChild variant="outline">
                    <a 
                      href={event.attributes.googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
} 