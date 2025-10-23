'use client';

import React, { useState } from 'react';

interface FAQSectionProps {
  title: string;
  subtitle: string;
  introduction: string;
}

const FAQ_DATA = [
  {
    question: "Gdzie będę spać po tym jak przetańczę całą noc? ",
    answer: "Na miejscu dostępne są przytulne pokoje, więc nie musicie się martwić o powrót do domu. W opcji rezerwacji dostępne jest również dla Was śniadanie. \n Aby z takiej możliwości skorzystać zadzwoń pod numer telefonu 795 000 054 i zarezerwuj dla siebie pokój "
  },
  {
    question: "Drogie panie co z butami? ",
    answer: "Wiemy że szpilki to must have każdej eleganckiej stylizacji. ALE nasza lokalizacja ślubna jest otoczona pięknymi terenami zielonymi.\nDlatego gorąco zachęcamy do zabrania wygodnych butów na zmianę. W końcu wygoda to podstawa dobrej zabawy!"
  }
]

export function FAQSection({ title, subtitle, introduction }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = FAQ_DATA.map(item => ({
    question: item.question,
    answer: item.answer
  })) || [];

  return (
    <div className="w-full py-10 md:py-20 bg-[#C9CAC380] px-6 lg:px-0">
      <div className="max-w-4xl mx-auto max-w-[936px]">
        <div className="mb-8">
          <h3 className="text-gray-600 font-medium font-quicksand text-2xl ">
            {subtitle}
          </h3>
          <h2 className="font-cinzel text-3xl font-semibold text-gray-800 mb-1 mt-4">
            {title}
          </h2>
          <p className="font-quicksand text-2xl font-medium text-gray-700 mb-12 max-w-2xl ">
            {introduction}
          </p>
        </div>
          <div className="rounded-md divide-y divide-[#36363633]">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden">
                <button
                  className="w-full flex items-center justify-between py-5 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <h4 className="font-cinzel text-xl md:text-2xl font-semibold text-gray-800">
                    {faq.question}
                  </h4>
                  <svg
                    className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div
                  className={`pb-5 transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 hidden'
                  }`}
                >
                  <p className="font-quicksand text-lg text-gray-700 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
} 