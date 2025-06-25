import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { LanguageOption } from '../types';
import { LANGUAGES } from '../constants'; // Assuming constants.ts exports LANGUAGES
import { getTranslation } from '../translations';

interface LanguageContextType {
  language: LanguageOption;
  setLanguage: (language: LanguageOption) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setCurrentLanguage] = useState<LanguageOption>(() => {
    const storedLangCode = localStorage.getItem('app-language-code');
    const foundLang = LANGUAGES.find(l => l.code === storedLangCode);
    return foundLang || LANGUAGES[0]; // Default to English (US)
  });

  useEffect(() => {
    localStorage.setItem('app-language-code', language.code);
    // Potentially update document lang attribute
    document.documentElement.lang = language.code;
  }, [language]);

  const t = useCallback((key: string): string => {
    return getTranslation(language.code, key);
  }, [language]);

  const setLanguage = (newLanguage: LanguageOption) => {
    setCurrentLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
