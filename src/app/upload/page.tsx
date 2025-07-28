import ImageUploader from '@/components/image-uploader';
import MemoriesGallery from '@/components/memories-gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Share Memories - Kasia & Paweł",
  description: "Share your wishes and memories from our wedding",
};

export default function UploadPage() {
  const now = new Date();
  const releaseDate = new Date('2025-05-02T00:00:00+02:00'); 

  const isAccessible = now >= releaseDate;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-4">
          Share Your Memories
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          Add your photos and wishes from our special day
        </p>
      </div>

      {isAccessible ? (
        <div className="flex flex-col gap-8">
        
            <ImageUploader />
        
          <div className="flex flex-col w-full gap-8 max-w-[936px] mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Galeria</h2>
            <MemoriesGallery />
          </div>
        </div>
      ) : (
        <div className="text-center text-lg text-gray-600 bg-yellow-100 border border-yellow-300 p-6 rounded-lg shadow-md max-w-xl mx-auto">
          Możliwość dodawania zdjęć zostanie odblokowana w dniu ślubu – 17 lipca 2026.
        </div>
      )}
    </div>
  );
}