
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ModeToggle from '../ui/ModeToggle';
import LanguageToggle from '../ui/LanguageToggle';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  transparent = false 
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`${transparent ? 'absolute' : 'relative'} top-0 left-0 right-0 z-10 px-4 py-4 flex items-center justify-between ${transparent ? 'bg-transparent' : 'bg-background/80 backdrop-blur-md border-b border-border/40'}`}>
      <div className="flex items-center">
        {showBackButton && !isHomePage && (
          <Link to="/" className="p-2 -ml-2 mr-1 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
        )}
        
        {title && (
          <h1 className="text-lg font-medium text-foreground">{title}</h1>
        )}
        
        {!title && !showBackButton && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sangam-500 to-sangam-700 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">संगम</span>
            </div>
            <span className="text-foreground font-medium">संगम सहायक</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <LanguageToggle />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
