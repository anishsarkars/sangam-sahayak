
import React, { useState, useEffect } from 'react';

type Language = 'en' | 'hi';

const LanguageToggle: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    // In a real app, we would update the app's translations here
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-full hover:bg-muted transition-colors text-sm font-medium"
      aria-label="Toggle language"
    >
      {language === 'en' ? 'हिंदी' : 'EN'}
    </button>
  );
};

export default LanguageToggle;
