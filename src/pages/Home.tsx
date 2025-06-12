import React from 'react';
import { useExitIntent } from '../hooks/useExitIntent';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import BestSellers from '../components/BestSellers';
import ExitIntentPopup from '../components/ExitIntentPopup';

const Home: React.FC = () => {
  const { showExitIntent, closeExitIntent } = useExitIntent();

  return (
    <div>
      <Hero />
      <FeaturesSection />
      <BestSellers />
      <ExitIntentPopup isOpen={showExitIntent} onClose={closeExitIntent} />
    </div>
  );
};

export default Home;