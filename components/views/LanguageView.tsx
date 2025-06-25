import React from 'react';
import { LanguageOption } from '../../types';
import { LANGUAGES, DEFAULT_ACCENT_COLOR } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext'; // Import useLanguage

interface LanguageViewProps {
  accentColor: typeof DEFAULT_ACCENT_COLOR;
}

const LanguageView: React.FC<LanguageViewProps> = ({ accentColor }) => {
  const { language: currentLanguage, setLanguage, t } = useLanguage(); // Get from context
  
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLangCode = event.target.value;
    const selectedLang = LANGUAGES.find(lang => lang.code === selectedLangCode);
    if (selectedLang) {
      setLanguage(selectedLang);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl transition-colors duration-300">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('languageTitle')}</h2>
      <div className="space-y-4">
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          {t('selectPreferredLanguage')}
        </p>
        <div className={`p-6 ${accentColor.bgColorClass} dark:bg-${accentColor.value}-900/50 rounded-lg border ${accentColor.borderColorClass} dark:border-${accentColor.value}-700/50`}>
          <label htmlFor="language-select" className={`block text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>
            {t('selectLanguageLabel')}
          </label>
          <select
            id="language-select"
            value={currentLanguage.code}
            onChange={handleLanguageChange}
            className={`w-full md:w-1/2 p-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm 
                        focus:ring-2 ${accentColor.ringColorClass} focus:border-${accentColor.value}-500 dark:focus:border-${accentColor.value}-400 
                        transition-shadow bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100`}
            aria-label="Select application language"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name} {/* Language names themselves are usually kept in their own language or a common one like English */}
              </option>
            ))}
          </select>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
            {t('languageTranslationNote')}
          </p>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-lg mt-6">
          {t('selectedLanguageText')} <strong className={`${accentColor.textColorClass} dark:text-${accentColor.value}-300`}>{currentLanguage.name}</strong>
        </p>
      </div>
    </div>
  );
};

export default LanguageView;
