import React from 'react';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import BestSellers from '../components/BestSellers';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <BestSellers />
    </div>
  );
};

export default Home;