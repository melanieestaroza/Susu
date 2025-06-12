import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  description?: string;
  price?: string;
  category?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  image,
  title,
  description,
  price,
  category
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 image-modal bg-black/80">
      <div className="relative w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-2/3 relative">
            <img
              src={image}
              alt={title}
              className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/3 p-6 lg:p-8 flex flex-col justify-center">
            <div className="space-y-4">
              {category && (
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                  {category}
                </span>
              )}
              
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {title}
              </h2>
              
              {price && (
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {price}
                </p>
              )}
              
              {description && (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              )}
              
              <div className="pt-4 space-y-3">
                <a
                  href="https://wa.me/541125192502"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
                >
                  Consultar por WhatsApp
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
                
                <a
                  href="mailto:yolanamontiel130@gmail.com"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
                >
                  Enviar Email
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;