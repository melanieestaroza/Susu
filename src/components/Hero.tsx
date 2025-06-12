import React from 'react';
import { ArrowRight, Truck, CreditCard, Star, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Herrería <span className="text-blue-400">Jaimes</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Especialistas en metalurgia con más de 20 años de experiencia. 
            Creamos productos de calidad superior para hogares y empresas.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Truck className="h-5 w-5 mr-2 text-green-400" />
              <span className="text-sm font-medium">Envíos Internacionales</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <CreditCard className="h-5 w-5 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Todos los Medios de Pago</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Star className="h-5 w-5 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">Calidad Garantizada</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://wa.me/541125192502"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              WhatsApp
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="mailto:yolanamontiel130@gmail.com"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              Email
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>

          <div className="flex items-center justify-center text-gray-300">
            <MapPin className="h-5 w-5 mr-2 text-red-400" />
            <span>Maipu 1270, Grand Bourg, Buenos Aires, Argentina</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;