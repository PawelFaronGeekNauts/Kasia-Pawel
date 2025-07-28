'use client';

import { useEffect, useState, useRef } from 'react';

import { fetchAPI} from '@/lib/strapi';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface Memory {
  id: number;
  createdAt: string;
  wishes: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function MemoriesGallery() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isNavigating = useRef(false);
  const currentImageIndexRef = useRef<number>(0);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetchAPI('/memories?populate=*', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response && response.data && Array.isArray(response.data)) {
          const validMemories = response.data.filter((memory: Memory) => 
            memory && memory.createdAt
          );
      
          const sortedMemories = validMemories
            .sort((a: Memory, b: Memory) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .slice(0, 20);
            
          setMemories(sortedMemories);
        } else {
          console.error('Unexpected API response structure:', response);
          setMemories([]);
        }
      } catch (err) {
        console.error('Error fetching memories:', err);
        setError('Failed to load memories');
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : memories.length - 1;
      return newIndex;
    });
    
    currentImageIndexRef.current = 0;
    
    setTimeout(() => {
      isNavigating.current = false;
    }, 300);
  };

  const handleNextCard = () => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    
    setCurrentCardIndex((prev) => {
      const newIndex = prev < memories.length - 1 ? prev + 1 : 0;
      return newIndex;
    });
    
    currentImageIndexRef.current = 0;
    
    setTimeout(() => {
      isNavigating.current = false;
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handlePrevCard();
      } else {
        handleNextCard();
      }
    }
  };

  if (loading) {
    return <MemoriesLoadingSkeleton />;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (memories.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No memories shared yet. Be the first to share your special moment!
      </div>
    );
  }

  return (
    <div 
      className="relative w-full "
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="transform transition-all duration-300 max-w-[680px] mx-auto">
        <MemoryCard 
          memory={memories[currentCardIndex]} 
          currentImageIndexRef={currentImageIndexRef}
        />
      </div>
      <div className="flex justify-between mt-4 items-center">
        <button 
          onClick={handlePrevCard}
          disabled={memories.length <= 1}
          className={`flex items-center gap-1 px-3 py-1 rounded-full ${
            memories.length <= 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
          }`}
        >
          <ChevronLeft size={16} />
          <span className="text-sm">Poprzednie</span>
        </button>
        <div className="text-center text-sm text-gray-500">
        {currentCardIndex + 1} z {memories.length}
      </div>
        <button 
          onClick={handleNextCard}
          disabled={memories.length <= 1}
          className={`flex items-center gap-1 px-3 py-1 rounded-full ${
            memories.length <= 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
          }`}
        >
          <span className="text-sm">Następne</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function MemoryCard({ 
  memory, 
  currentImageIndexRef 
}: { 
  memory: Memory;
  currentImageIndexRef: React.RefObject<number>;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasImages = memory.images && memory.images.length > 0;
  const formattedDate = new Date(memory.createdAt).toLocaleDateString('pl-PL');

  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentImageIndexRef.current !== undefined) {
      currentImageIndexRef.current = currentImageIndex;
    }
  }, [currentImageIndex, currentImageIndexRef]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [memory.id]);

  useEffect(() => {
    if (hasImages && memory.images.length > 1) {
      startAutoplay();
     
      return () => {
        stopAutoplay();
      };
    }
  }, [memory.id, hasImages]);
    
  const startAutoplay = () => {
    stopAutoplay();

    autoplayIntervalRef.current = setInterval(() => {
      setCurrentImageIndex(prevIndex => {
        const nextIndex = prevIndex < memory.images.length - 1 ? prevIndex + 1 : 0;
        return nextIndex;
      });
    }, 3000); 
  };
    
  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  };
    
  const pauseAutoplay = () => {
    stopAutoplay();
    setTimeout(startAutoplay, 10000);
  };

  const startX = useRef(0);
  const isDragging = useRef(false);
    
  const onTouchStart = (e: React.TouchEvent) => {
    pauseAutoplay();
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
    e.stopPropagation(); 
  };
    
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
      
    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;
      
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        const nextIndex = currentImageIndex < memory.images.length - 1 ? currentImageIndex + 1 : 0;
        setCurrentImageIndex(nextIndex);
      } else {
        const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : memory.images.length - 1;
        setCurrentImageIndex(prevIndex);
      }
      isDragging.current = false;
    }
    e.stopPropagation(); 
  };
    
  const onTouchEnd = (e: React.TouchEvent) => {
    isDragging.current = false;
    e.stopPropagation(); 
  };

  const onMouseEnter = () => {
    pauseAutoplay();
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${!hasImages ? 'flex flex-col justify-center' : ''}`}>
      {hasImages ? (
        <div className="relative w-full ">
          <div 
            className="w-full bg-gray-200 p-2"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseEnter={onMouseEnter}
          >
            <div className="relative h-64 md:h-96 rounded-full">
              {memory.images[currentImageIndex]?.url && (
                 <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL + memory.images[currentImageIndex]?.url}`}
                alt="Memory image"
                fill
                className="object-fill rounded-3xl transition-opacity duration-300 w-full h-full"
              />
              )}
            </div>
            
            {memory.images.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {memory.images.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-blue-600' : 'bg-gray-400'}`}
                    onClick={() => {
                      pauseAutoplay();
                      setCurrentImageIndex(idx);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
      
      <div className={`p-4 ${!hasImages ? 'flex-1 flex flex-col justify-center items-center py-12' : ''}`}>
        {memory.wishes && (
          <p className={`italic mb-2 ${!hasImages ? 'text-center text-xl' : 'text-gray-700'}`}>
           &quot{memory.wishes}&quot
          </p>
        )}
        <p className={`text-sm text-gray-500 ${!hasImages ? 'text-center mt-4' : 'text-right'}`}>
          {formattedDate}
        </p>
      </div>
    </div>
  );
}

function MemoriesLoadingSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(1)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <Skeleton className="w-full h-64 mb-4 rounded-md" />
            <Skeleton className="w-full h-16 mb-2" />
            <Skeleton className="w-24 h-4 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
} 