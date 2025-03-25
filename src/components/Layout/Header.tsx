
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Menu, X } from 'lucide-react';
import ModeToggle from '../ui/ModeToggle';
import LanguageToggle from '../ui/LanguageToggle';
import { useLanguage } from '../ui/LanguageToggle';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  transparent?: boolean;
}

const translations = {
  en: {
    appName: 'Sangam Sahayak',
    home: 'Home',
    trainBooking: 'Train Booking',
    crowdMap: 'Crowd Map',
    lostFound: 'Lost & Found',
    emergency: 'Emergency',
    services: 'Services',
  },
  hi: {
    appName: 'संगम सहायक',
    home: 'होम',
    trainBooking: 'ट्रेन बुकिंग',
    crowdMap: 'भीड़ मानचित्र',
    lostFound: 'खोया-पाया',
    emergency: 'आपातकाल',
    services: 'सेवाएं',
  }
};

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  transparent = false 
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { language } = useLanguage();
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: t.home },
    { path: '/train-booking', label: t.trainBooking },
    { path: '/crowd-map', label: t.crowdMap },
    { path: '/lost-found', label: t.lostFound },
    { path: '/emergency', label: t.emergency },
    { path: '/services', label: t.services },
  ];

  return (
    <>
      <header className={`${transparent ? 'absolute' : 'sticky'} top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between ${transparent ? 'bg-transparent' : 'bg-background/90 backdrop-blur-md border-b border-border/40'}`}>
        <div className="flex items-center">
          {showBackButton && !isHomePage && (
            <Link to="/" className="p-2 -ml-2 mr-1 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
          )}
          
          {title && (
            <h1 className="text-lg font-bold text-sangam-900 dark:text-sangam-100">{language === 'en' ? title : title}</h1>
          )}
          
          {!title && (
            <Link to="/" className="flex items-center space-x-2">
              <motion.div 
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center shadow-md border border-sangam-100 dark:border-sangam-900"
              >
                <img 
                  src="/lovable-uploads/87426195-50c3-4941-a99e-fd22bb0635b7.png" 
                  alt="Sangam Sahayak" 
                  className="w-8 h-8 object-contain"
                />
              </motion.div>
              <span className="text-sangam-900 dark:text-sangam-100 font-semibold hidden sm:block">{t.appName}</span>
            </Link>
          )}
        </div>
        
        <div className="md:flex items-center space-x-2 hidden">
          {!isHomePage && navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                location.pathname === link.path 
                  ? 'bg-sangam-50 dark:bg-sangam-900/30 text-sangam-700 dark:text-sangam-300 font-medium' 
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <LanguageToggle />
            <ModeToggle />
          </div>
          
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-muted transition-colors md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </header>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 pt-16 bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col p-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    key={link.path}
                  >
                    <Link 
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={`px-4 py-3 rounded-lg transition-colors ${
                        location.pathname === link.path 
                          ? 'bg-sangam-50 dark:bg-sangam-900/30 text-sangam-700 dark:text-sangam-300 font-medium' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <div className="mt-6 flex items-center justify-between">
                <LanguageToggle />
                <ModeToggle />
              </div>
              
              <div className="mt-auto pt-6 text-center">
                <p className="text-xs text-muted-foreground">Built for Ujjain Maha Kumbh 2028</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
