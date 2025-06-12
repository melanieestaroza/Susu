import React, { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0 group">
              <div className="relative">
                <Hammer className={`h-8 w-8 transition-all duration-300 group-hover:rotate-12 ${
                  scrolled ? 'text-blue-600 dark:text-blue-400' : 'text-white'
                }`} />
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}>
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
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 relative overflow-hidden group ${
                        location.pathname === item.path
                          ? scrolled
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-blue-300 bg-white/10'
                          : scrolled
                            ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Admin Status Indicator */}
              {isAuthenticated && (
                <div className="hidden sm:flex items-center bg-green-100/90 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Admin
                </div>
              )}

              {/* Auth Button */}
              <button
                onClick={handleAuthClick}
                className={`p-2 rounded-xl transition-all duration-300 group relative ${
                  isAuthenticated
                    ? 'text-green-600 dark:text-green-400 hover:bg-green-100/50 dark:hover:bg-green-900/30'
                    : scrolled
                      ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title={isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
              >
                {isAuthenticated ? <LogOut className="h-5 w-5" /> : <User className="h-5 w-5" />}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all duration-300 group relative ${
                  scrolled
                    ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-xl transition-all duration-300 ${
                  scrolled
                    ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto custom-scrollbar">
              {isAuthenticated && (
                <div className="flex items-center justify-center bg-green-100/90 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-2 rounded-xl text-sm font-medium mb-2 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Modo Administrador Activo
                </div>
              )}
              {menuItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 reveal ${
                    location.pathname === item.path
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Navbar;