
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Train, Map, Search, Phone, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/train-booking', icon: Train, label: 'Train' },
    { path: '/crowd-map', icon: Map, label: 'Map' },
    { path: '/lost-found', icon: Search, label: 'Find' },
    { path: '/emergency', icon: Phone, label: 'SOS' },
    { path: '/services', icon: Droplets, label: 'Services' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <footer className="mt-auto py-2 border-t border-border/40 bg-background/80 backdrop-blur-md">
      <div className="px-2">
        <div className="flex justify-between items-center">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl transition-all ${
                  isActive(item.path) 
                    ? 'text-sangam-600 dark:text-sangam-400 bg-sangam-50 dark:bg-sangam-900/20' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-sangam-600 dark:text-sangam-400' : ''}`} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-2 pb-1">
          <p className="text-[10px] text-muted-foreground">
            Built by <span className="font-medium">@Anish</span> for <span className="font-medium">Ujjain Maha Kumbh 2028</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
