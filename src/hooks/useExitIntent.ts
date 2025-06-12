import { useEffect, useState } from 'react';

export const useExitIntent = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShowExitIntent(true);
        setHasShown(true);
      }
    };

    const handleTimeout = () => {
      if (!hasShown) {
        setShowExitIntent(true);
        setHasShown(true);
      }
    };

    // Show popup after 10 seconds if user hasn't left
    timeoutId = setTimeout(handleTimeout, 10000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, [hasShown]);

  const closeExitIntent = () => {
    setShowExitIntent(false);
  };

  return { showExitIntent, closeExitIntent };
};