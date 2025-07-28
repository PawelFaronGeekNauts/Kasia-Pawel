'use client';

import { fetchAPI } from '@/lib/strapi';
import { useQuery } from '@tanstack/react-query';

interface EventAttributes {
  name: string;
  date: string;
  location: string;
  address: string;
  description: string;
  googleMapsUrl: string;
  image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      }
    }
  }
}

interface Event {
  id: number;
  attributes: EventAttributes;
}

interface EventsData {
  data: Event[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}

async function getEvents() {
  const data = await fetchAPI('/events?populate=*');
  return data as EventsData;
}

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
} 