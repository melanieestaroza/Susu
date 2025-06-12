import React from 'react';
import { ArrowRight, Truck, CreditCard, Award, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Herrería <span className="text-blue-400 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Jaimes</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-300 max-w-4xl mx-auto font-light">
              Especialistas en metalurgia con más de 20 años de experiencia. 
              Creamos productos de calidad superior para hogares y empresas.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Truck className="h-5 w-5 mr-2 text-green-400" />
              <span className="text-sm font-medium">Envíos Internacionales</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <CreditCard className="h-5 w-5 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Todos los Medios de Pago</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Award className="h-5 w-5 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">Calidad Garantizada</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://wa.me/541125192502"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg hover:shadow-xl"
            >
              <span>Consultar por WhatsApp</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="mailto:yolanamontiel130@gmail.com"
              className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg hover:shadow-xl"
            >
              <span>Enviar Email</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          <div className="flex items-center justify-center text-gray-300 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 inline-flex border border-white/10">
            <MapPin className="h-5 w-5 mr-2 text-red-400" />
            <span className="text-sm">Maipu 1270, Grand Bourg, Buenos Aires, Argentina</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  );
};

export default Hero;