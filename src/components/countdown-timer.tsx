'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string; 
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <div className="w-full  px-6 flex flex-col items-center py-6">
      <div className="w-full max-w-[936px] bg-white rounded-lg shadow-lg py-6">
      <h2 className="font-cinzel-decorative text-2xl md:text-[40px] text-center font-bold text-gray-800 mb-2 md:mb-6">
        {new Date(targetDate).toLocaleDateString('pl-PL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).replace(/\./g, '.')}
        , 16:00
      </h2>
        <div className="w-full flex flex-row items-start justify-center md:justify-between gap-4 text-center px-4 md:px-6">
          <div className="flex flex-col items-center w-full max-w-[177px]">
            <div className="flex items-center justify-center my-4">  
               <span className="font-cinzel-decorative text-2xl md:text-5xl font-bold text-gray-800">
              {formatNumber(timeLeft.days)}
            </span>
            </div>
            <span className="font-quicksand text-sm md:text-2xl text-gray-600">
              Dni
            </span>
          </div>
           <span className="font-cinzel text-2xl md:text-5xl font-bold text-gray-500 mt-4">:</span>
          <div className="flex flex-col items-center w-full max-w-[177px]">
          
            <div className="flex items-center justify-center my-4">  
              <span className="font-cinzel-decorative text-2xl md:text-5xl font-bold text-gray-800">
              {formatNumber(timeLeft.hours)}
            </span>
           
            </div>
            <span className="font-quicksand text-sm md:text-2xl text-gray-600">
              Godziny
            </span>
          </div>
             <span className="font-cinzel text-2xl md:text-5xl font-bold text-gray-500 mt-4">:</span>
          <div className="flex flex-col items-center w-full max-w-[177px]">
            <div className="flex items-center justify-center my-4">
            <span className="font-cinzel-decorative text-2xl md:text-5xl font-bold text-gray-800">
              {formatNumber(timeLeft.minutes)}
            </span>
            </div>
            <span className="font-quicksand text-sm md:text-2xl text-gray-600">
              Minuty
            </span>
          </div>
          <span className="font-cinzel text-2xl md:text-5xl font-bold text-gray-500  mt-4">:</span>
          <div className="flex flex-col items-center w-full max-w-[177px]">
            <div className="flex items-center justify-center my-4 ">
              <span className="font-cinzel-decorative text-2xl md:text-5xl font-bold text-gray-800">
              {formatNumber(timeLeft.seconds)}
              </span>
            </div>
            <span className="font-quicksand text-sm md:text-2xl text-gray-600">
              Sekundy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 