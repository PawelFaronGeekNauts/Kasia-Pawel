'use client';

import { fetchAPI } from '@/lib/strapi';
import { useQuery } from '@tanstack/react-query';

interface FAQItem {
  id: number;
 
    question: string;
    answer: string;
  
}

interface FAQResponse {
  data: FAQItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function getFAQs() {
  const data = await fetchAPI('/faqs');
  return data as FAQResponse;
}

export function useFAQ() {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: getFAQs,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
} 