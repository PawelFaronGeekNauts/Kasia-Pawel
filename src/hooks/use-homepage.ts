'use client';

import { fetchAPI } from '@/lib/strapi';
import { useQuery } from '@tanstack/react-query';


interface HomepageAttributes {
  title: string;
  subtitle: string;
  date: string;
  welcomeMessage: string;
  heroImage?: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      }
    }
  }
}

interface HomepageData {
  data: {
    id: number;
    attributes: HomepageAttributes;
  }
}

async function getHomepage() {
  const data = await fetchAPI('/homepage?populate=*');
  return data as HomepageData;
}

export function useHomepage() {
  return useQuery({
    queryKey: ['homepage'],
    queryFn: getHomepage,
    staleTime: 1000 * 60 * 5,
  });
} 