import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Hammer } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LoginModal from './LoginModal';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessoriosClicks, setAccessoriosClicks] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const menuItems = [
    { name: 'Puertas', path: '/puertas' },
    { name: 'Portones', path: '/portones' },
    { name: 'Góndolas', path: '/gondolas' },
    { name: 'Estanterías', path: '/estanterias' },
    { name: 'Rejas', path: '/rejas' },
    { name: 'Escaleras', path: '/escaleras' },
    { name: 'Muebles', path: '/muebles' },
    { name: 'Accesorios', path: '/accesorios' },
  ];

  const handleAccessoriosClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir la navegación inmediata
    
    const newCount = accessoriosClicks + 1;
    console.log(`Accesorios click ${newCount}/3`);
    setAccessoriosClicks(newCount);
    
    // Limpiar timeout anterior si existe
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
    
    if (newCount === 3) {
      console.log('Opening login modal');
      setShowLoginModal(true);
      setAccessoriosClicks(0);
      setClickTimeout(null);
    } else {
      // Resetear contador después de 3 segundos si no se completan los 3 clicks
      const timeout = setTimeout(() => {
        console.log('Resetting click counter');
        setAccessoriosClicks(0);
        setClickTimeout(null);
      }, 3000);
      setClickTimeout(timeout);
      
      // Navegar normalmente después de un pequeño delay si no es el tercer click
      setTimeout(() => {
        if (newCount < 3) {
          window.location.href = '/accesorios';
        }
      }, 200);
    }
  };

  return (
    <>
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <Hammer className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Herrería Jaimes
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block flex-1 mx-6">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide max-w-full">
                  {menuItems.map((item) => (
                    item.name === 'Accesorios' ? (
                      <button
                        key={item.name}
                        onClick={handleAccessoriosClick}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                          location.pathname === item.path
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        } ${accessoriosClicks > 0 ? 'ring-2 ring-blue-300 dark:ring-blue-600' : ''}`}
                      >
                        {item.name}
                        {accessoriosClicks > 0 && (
                          <span className="ml-1 text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                            {accessoriosClicks}
                          </span>
                        )}
                      </button>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                          location.pathname === item.path
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 flex-shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
              {menuItems.map((item) => (
                item.name === 'Accesorios' ? (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      handleAccessoriosClick(e);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    } ${accessoriosClicks > 0 ? 'ring-2 ring-blue-300 dark:ring-blue-600' : ''}`}
                  >
                    {item.name}
                    {accessoriosClicks > 0 && (
                      <span className="ml-2 text-xs bg-blue-500 text-white rounded-full w-4 h-4 inline-flex items-center justify-center">
                        {accessoriosClicks}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </nav>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Navbar;