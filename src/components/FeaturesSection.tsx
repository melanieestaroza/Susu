import React from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FeaturesSection: React.FC = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const features = [
    {
      icon: Shield,
      title: 'Garantía de Calidad',
      description: 'Todos nuestros productos cuentan con garantía y están fabricados con los mejores materiales.',
      color: 'blue'
    },
    {
      icon: Award,
      title: '20+ Años de Experiencia',
      description: 'Más de dos décadas perfeccionando nuestras técnicas y satisfaciendo a nuestros clientes.',
      color: 'yellow'
    },
    {
      icon: Users,
      title: 'Trabajo Personalizado',
      description: 'Diseñamos y fabricamos productos únicos adaptados a tus necesidades específicas.',
      color: 'green'
    },
    {
      icon: Clock,
      title: 'Entrega Puntual',
      description: 'Cumplimos con los tiempos de entrega acordados, tu proyecto es nuestra prioridad.',
      color: 'purple'
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-1000 ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Por qué elegir <span className="gradient-text">Herrería Jaimes</span>?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Somos líderes en el sector metalúrgico, ofreciendo productos de calidad superior 
            y un servicio excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`card-enhanced group hover:scale-105 transition-all duration-500 ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className={`flex items-center justify-center w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;