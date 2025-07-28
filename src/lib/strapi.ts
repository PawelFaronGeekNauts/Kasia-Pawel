/**
 * Utility functions for interacting with the Strapi API
 */

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Fetch data from Strapi API
 * @param endpoint The API endpoint to fetch from
 * @param options Additional fetch options
 * @returns The fetched data
 */
export async function fetchAPI(endpoint: string, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const response = await fetch(`${API_URL}/api${endpoint}`, mergedOptions);
  
  if (!response.ok) {
    throw new Error(`Error fetching from Strapi: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
}

/**
 * Get full URL for a Strapi media
 * @param url The media URL from Strapi
 * @returns The full URL to the media
 */
export function getStrapiMedia(url: string | null) {

  if (!url) return null;
 
  if (url.startsWith('/')) {
    return `${API_URL}${url}`;
  }
  
  return url;
}

/**
 * Upload files to Strapi
 * @param formData FormData containing files and metadata
 * @returns The upload response from Strapi
 */
export async function uploadFiles(formData: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('File upload failed');
  }

  const data = await res.json();

  return data;
}
