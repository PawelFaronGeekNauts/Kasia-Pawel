'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { fetchAPI } from '@/lib/strapi';
import axios from 'axios';

interface MemoryData {
  data: {
    wishes: string;
    media?: number[];
  };
}
interface StrapiFile {
  id: number;
  name: string;
  url: string;
  [key: string]: any;
}

// Maksymalny rozmiar pliku w bajtach (3MB)
const MAX_FILE_SIZE = 3 * 1024 * 1024;

export default function ImageUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [wishes, setWishes] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileErrors, setFileErrors] = useState<string[]>([]);

  // Funkcja do weryfikacji pliku
  const validateFile = (file: File): string | null => {
    // Sprawdź rozmiar pliku
    if (file.size > MAX_FILE_SIZE) {
      return `Plik ${file.name} jest zbyt duży. Maksymalny rozmiar to 3MB.`;
    }

    // Sprawdź typ pliku
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return `Plik ${file.name} ma nieprawidłowy format. Dozwolone formaty to: JPG, PNG, GIF, WebP.`;
    }

    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFiles = Array.from(e.target.files);
    const errors: string[] = [];
    const validFiles: File[] = [];
    
    // Sprawdź każdy plik
    selectedFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        // Dodaj tylko prawidłowe pliki
        validFiles.push(file);
      }
    });
    
    // Pokaż błędy jeśli istnieją
    if (errors.length > 0) {
      setFileErrors(errors);
      errors.forEach(error => toast.error(error));
    } else {
      setFileErrors([]);
    }
  
    setFiles(prevFiles => {
      const uniqueNewFiles = validFiles.filter(newFile => {
        return !prevFiles.some(existingFile =>
          existingFile.name === newFile.name && existingFile.size === newFile.size
        );
      });
  
      return [...prevFiles, ...uniqueNewFiles];
    });
  
    setPreviews(prevPreviews => {
      const currentFiles = files; // use latest state
      const uniqueNewPreviews = validFiles
        .filter(newFile => {
          return !currentFiles.some(existingFile =>
            existingFile.name === newFile.name && existingFile.size === newFile.size
          );
        })
        .map(file => URL.createObjectURL(file));
  
      return [...prevPreviews, ...uniqueNewPreviews];
    });
  };

  const uploadFilesWithAxios = async (files: File[]) => {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    const formData = new FormData();
    
    // Dodaj każdy plik do formData z poprawną nazwą
    files.forEach((file, index) => {
      // Dodaj unikalne znaczniki czasowe do nazwy plików, aby uniknąć konfliktów
      const timestamp = new Date().getTime();
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      
      // Użyj "image" jako nazwy pola, a nie "files"
      formData.append('files', file, `${timestamp}_${cleanFileName}`);
    });

    try {
      console.log('Wysyłanie plików do:', `${API_URL}/api/upload`);
      console.log('Liczba plików:', files.length);
      
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total 
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total) 
            : 0;
          console.log(`Upload progress: ${progress}%`);
          setUploadProgress(progress);
        }
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Error uploading files with axios:', error);
      console.error('Response details:', error.response?.data);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one image to upload');
      return;
    }

    if (fileErrors.length > 0) {
      toast.error('Popraw błędy przed przesłaniem');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Use axios to upload the files with progress tracking
      const uploadedFiles = await uploadFilesWithAxios(files) as StrapiFile[];
      const uploadedIds = uploadedFiles.map(file => file.id);
      
      console.log('Uploaded files:', uploadedFiles);
      console.log('File IDs:', uploadedIds);

      // Próba bezpośredniego wysłania żądania do Strapi z Axios zamiast fetchAPI
      const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
      
      const payload = {
        data: {
          wishes: wishes,
          images: uploadedIds,
        }
      };
      
      console.log('Payload for memory creation:', payload);
      
      try {
        // Używamy axios dla lepszej diagnostyki błędów
        const memoryResponse = await axios.post(
          `${API_URL}/api/memories`, 
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        
        console.log('Memory saved with axios:', memoryResponse.data);
        toast.success('Memory saved successfully!');
        resetForm();
      } catch (axiosError: any) {
        console.error('Axios error details:', {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
          message: axiosError.message
        });
        
        // Sprawdzamy szczegóły błędu
        if (axiosError.response?.data?.error?.message) {
          console.error('Strapi error message:', axiosError.response.data.error.message);
        }
        
        // Próba z inną nazwą pola
        try {
          const alternativePayload = {
            data: {
              wishes: wishes,
              media: uploadedIds,
            }
          };
          
          console.log('Trying alternative payload with media field:', alternativePayload);
          
          const altResponse = await axios.post(
            `${API_URL}/api/memories`, 
            alternativePayload,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          
          console.log('Memory saved with alternative payload:', altResponse.data);
          toast.success('Memory saved successfully!');
          resetForm();
        } catch (altError: any) {
          console.error('Alternative payload error details:', {
            status: altError.response?.status,
            statusText: altError.response?.statusText,
            data: altError.response?.data,
            message: altError.message
          });
          
          // Ostatnia próba - właściwe pole może być inne lub problem jest głębszy
          toast.error('Failed to save memory. See console for details.');
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };
  
  const resetForm = () => {
    setFiles([]);
    setPreviews([]);
    setWishes('');
    setUploadProgress(0);
    setFileErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]); // Clean up the preview URL
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    
    // Usuń również błędy związane z tym plikiem
    if (fileErrors.length > index) {
      const newErrors = [...fileErrors];
      newErrors.splice(index, 1);
      setFileErrors(newErrors);
    }
  };

  return (
    <div className=" mx-auto bg-white p-6 rounded-lg shadow-md w-full gap-8 max-w-[936px] ">
      <div className="mb-6">
        <Label htmlFor="images" className="block text-lg font-medium mb-2">
          Select Images
        </Label>
        <Input
          ref={fileInputRef}
          id="images"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          className="w-full"
        />
        <p className="mt-2 text-sm text-gray-500">
          Akceptowane formaty: JPG, PNG, GIF, WebP. Maksymalny rozmiar: 3MB.
        </p>
      </div>

      {fileErrors.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <h4 className="text-red-600 font-medium mb-2">Błędy plików:</h4>
          <ul className="list-disc pl-5">
            {fileErrors.map((error, index) => (
              <li key={index} className="text-red-500 text-sm">{error}</li>
            ))}
          </ul>
        </div>
      )}

      {previews.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Selected Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <Label htmlFor="wishes" className="block text-lg font-medium mb-2">
          Your Wishes and Memories
        </Label>
        <textarea
          id="wishes"
          value={wishes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setWishes(e.target.value)}
          placeholder="Share your wishes and memories with the couple..."
          className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          rows={3}
        />
      </div>

      {uploading && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-center text-gray-600">
            {uploadProgress < 100 
              ? `Uploading: ${uploadProgress}%` 
              : 'Processing upload...'}
          </p>
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={uploading || files.length === 0 || fileErrors.length > 0}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition"
      >
        {uploading ? 'Uploading...' : 'Share Your Memory'}
      </Button>
    </div>
  );
} 