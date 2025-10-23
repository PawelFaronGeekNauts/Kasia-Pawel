'use client';

import React, { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  type ReturnType = {
    current: React.RefObject<HTMLDivElement>;
    isVisible: boolean;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options
    });

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return { current: elementRef, isVisible };
}
