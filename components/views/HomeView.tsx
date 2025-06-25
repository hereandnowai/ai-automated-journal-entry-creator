
import React from 'react';
import { COMPANY_DETAILS, DEFAULT_ACCENT_COLOR } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';

interface HomeViewProps {
  onGetStarted: () => void;
  accentColor: typeof DEFAULT_ACCENT_COLOR;
}

const HomeView: React.FC<HomeViewProps> = ({ onGetStarted, accentColor }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      <header className="mb-8">
        <img 
          src={COMPANY_DETAILS.logoUrl} 
          alt={`${COMPANY_DETAILS.name} Logo`} 
          className={`h-24 w-24 md:h-32 md:w-32 mx-auto rounded-full border-4 ${accentColor.borderColorClass} bg-white shadow-lg`}
        />
      </header>

      {COMPANY_DETAILS.heroImageUrl && (
        <div className="mb-10 max-w-2xl mx-auto">
          <img 
            src={COMPANY_DETAILS.heroImageUrl} 
            alt={`${COMPANY_DETAILS.name} Visual`} 
            className="max-h-32 md:max-h-48 object-contain rounded-lg shadow-xl" 
          />
        </div>
      )}

      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
          {t('welcomeToApp')}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10">
          Leverage the power of AI to automatically analyze business transactions and generate accurate accounting journal entries. Reduce manual data entry and ensure compliance with {COMPANY_DETAILS.name}.
        </p>

        <button
          onClick={onGetStarted}
          className={`px-10 py-4 text-lg font-semibold text-white ${accentColor.primaryColorClass} ${accentColor.hoverColorClass} rounded-lg shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 ${accentColor.ringColorClass} focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-150 ease-in-out transform hover:scale-105`}
          aria-label="Get started with the application"
        >
          {t('getStartedButton')}
        </button>

        <p className="mt-12 text-sm text-slate-500 dark:text-slate-400">
          Powered by Google Gemini AI
        </p>
      </div>
    </div>
  );
};

export default HomeView;
