import React, { useEffect, useState } from 'react';
import { ArrowRight, Truck, CreditCard, Award, MapPin, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 animated-grid opacity-20"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Interactive Mouse Glow */}
      <div 
        className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl pointer-events-none transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />
      
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="text-center">
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
              <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">Más de 20 años de experiencia</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Herrería{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Jaimes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
              Especialistas en metalurgia con más de 20 años de experiencia. 
              Creamos productos de calidad superior para hogares y empresas.
            </p>
          </div>
          
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { icon: Truck, text: 'Envíos Internacionales', color: 'green' },
              { icon: CreditCard, text: 'Todos los Medios de Pago', color: 'blue' },
              { icon: Award, text: 'Calidad Garantizada', color: 'yellow' }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-center glass rounded-full px-6 py-3 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
              >
                <item.icon className={`h-5 w-5 mr-2 text-${item.color}-400 group-hover:animate-bounce`} />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a
              href="https://wa.me/541125192502"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center shadow-2xl hover:shadow-green-500/25 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Consultar por WhatsApp</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </a>
            
            <a
              href="mailto:yolanamontiel130@gmail.com"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Enviar Email</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </a>
          </div>

          <div className={`flex items-center justify-center text-gray-300 glass rounded-full px-6 py-3 inline-flex border border-white/10 transition-all duration-1000 delay-700 hover:bg-white/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <MapPin className="h-5 w-5 mr-2 text-red-400 animate-pulse" />
            <span className="text-sm">Maipu 1270, Grand Bourg, Buenos Aires, Argentina</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;