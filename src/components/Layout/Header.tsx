
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
            <h1 className="text-lg font-medium text-foreground">{language === 'en' ? title : title}</h1>
          )}
          
          {!title && (
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sangam-500 to-sangam-700 flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-semibold">संगम</span>
              </div>
              <span className="text-foreground font-medium hidden sm:block">{t.appName}</span>
            </Link>
          )}
        </div>
        
        <div className="md:flex items-center space-x-1 hidden">
          {!isHomePage && navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                location.pathname === link.path 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="hidden md:flex items-center space-x-1">
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
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === link.path 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-6 flex items-center justify-between">
                <LanguageToggle />
                <ModeToggle />
              </div>
              
              <div className="mt-auto pt-6 text-center text-xs text-muted-foreground">
                <p>Built with ❤️ by @Anish</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
