'use client';

import Image from 'next/image';

interface WitnessInfo {
  name: string;
  phone: string;
  imageUrl: string;
}

interface WitnessesSectionProps {
  title: string;
  subtitle: string;
  description: string;
  witnesses: WitnessInfo[];
}

export function WitnessesSection({ title, subtitle, description, witnesses }: WitnessesSectionProps) {
  return (
    <div className="w-full m-auto pt-10 md:pt-20 pb-0 md:pb-20  bg-white max-w-[936px]">
      <div className="mx-auto text-center md:text-left px-4 lg:px-0">
        <div className=" mb-15">
          <h3 className="text-gray-600 font-quicksand text-xl mb-2 font-medium">
            {subtitle}
          </h3>
          <h2 className="font-cinzel text-4xl font-semibold text-gray-800 mt-4 mb-1">
            {title}
          </h2>
          <p className="font-quicksand font-medium text-lg text-gray-700 max-w-2xl ">
            {description}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center ">
          {witnesses.map((witness, index) => (
            <div key={index} className="mb-12 md:mb-0 text-center" >
             <div className="w-full md:w-1/2 mb-10 md:mb-0">
             <div className="relative w-[300px] h-[380px] mx-auto md:w-[350px] md:h-[420px] lg:w-[400px] lg:h-[548px] rounded-t-full p-[2px] bg-gradient-to-b from-[#363636] to-[#939393]">
  <div className="relative w-full h-full rounded-t-full overflow-hidden bg-white">
    <Image
      src={witness.imageUrl}
      alt={witness.name}
      fill
      className="object-cover px-6 py-6 rounded-t-full"
    />
  </div>
</div>
          </div>
              <h4 className="font-cinzel text-3xl font-semibold text-gray-800 mb-2 mt-6">
                {witness.name}
              </h4>
              <p className="font-quicksand font-medium text-xl text-gray-700">
                {witness.phone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 