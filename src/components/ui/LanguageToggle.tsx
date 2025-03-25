
import React, { useState, useEffect, createContext, useContext } from 'react';

type Language = 'en' | 'hi';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    // In a real app, we would update the app's translations here
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center h-9 px-3 rounded-full hover:bg-muted transition-colors text-sm font-medium"
      aria-label="Toggle language"
    >
      <span className="hidden sm:inline mr-2">{language === 'en' ? 'English' : 'हिंदी'}</span>
      <span className="inline sm:hidden">{language === 'en' ? 'हिंदी' : 'EN'}</span>
    </button>
  );
};

export default LanguageToggle;
