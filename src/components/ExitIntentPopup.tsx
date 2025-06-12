import React, { useState, useEffect } from 'react';
import { X, Gift, Clock } from 'lucide-react';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-8 text-white text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Gift className="h-8 w-8 text-yellow-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">¡Espera! Oferta Especial</h2>
            <p className="text-white/90 text-sm">
              Antes de irte, aprovecha esta oferta exclusiva
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-2">15% de Descuento</h3>
            <p className="text-white/90 text-sm mb-4">
              En tu primera compra de productos de herrería
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-yellow-300 mb-4">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg font-bold">
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <p className="text-xs text-white/70">
              Esta oferta expira pronto
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="https://wa.me/541125192502?text=Hola! Me interesa la oferta especial del 15% de descuento"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
            >
              Reclamar Oferta por WhatsApp
            </a>
            
            <button
              onClick={onClose}
              className="w-full text-white/70 hover:text-white text-sm transition-colors duration-200"
            >
              No gracias, continuar navegando
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;