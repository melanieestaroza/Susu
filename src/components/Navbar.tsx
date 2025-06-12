import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Hammer, User, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
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

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
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
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Admin Status Indicator */}
              {isAuthenticated && (
                <div className="hidden sm:flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Admin
                </div>
              )}

              {/* Auth Button */}
              <button
                onClick={handleAuthClick}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isAuthenticated
                    ? 'text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title={isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
              >
                {isAuthenticated ? <LogOut className="h-5 w-5" /> : <User className="h-5 w-5" />}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {/* Mobile Menu Button */}
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
              {isAuthenticated && (
                <div className="flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-2 rounded-lg text-sm font-medium mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Modo Administrador Activo
                </div>
              )}
              {menuItems.map((item) => (
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