
import React from 'react';
import { COMPANY_DETAILS, DEFAULT_ACCENT_COLOR } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import { ViewName } from '../../App'; // Import ViewName

interface AboutViewProps {
  accentColor: typeof DEFAULT_ACCENT_COLOR;
  onNavigate: (view: ViewName) => void; // Add onNavigate prop
}

const AboutView: React.FC<AboutViewProps> = ({ accentColor, onNavigate }) => {
  const { t } = useLanguage();

  const features: { icon: string; titleKey: string; description: string; view: ViewName }[] = [
    { icon: '📊', titleKey: 'dashboard', description: 'Enter your raw transaction descriptions here. The AI will analyze them and generate formatted journal entries.', view: 'dashboard' },
    { icon: '🤖', titleKey: 'aiAssistant', description: 'Chat with our AI for help using the app, to understand accounting concepts, or to get tips on phrasing transactions.', view: 'aiAssistant' },
    { icon: '❓', titleKey: 'howToUse', description: 'Step-by-step instructions to get the most out of this application.', view: 'howToUse' },
    { icon: '⚙️', titleKey: 'settings', description: 'Customize your experience by changing the application theme (Light/Dark/System) and accent color.', view: 'settings'},
    { icon: '🌐', titleKey: 'language', description: 'Select your preferred language for the application interface (translations ongoing).', view: 'language'}
  ];


  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 md:mb-0">
          {t('aboutTitle')}
        </h2>
        {COMPANY_DETAILS.heroImageUrl && (
          <img 
            src={COMPANY_DETAILS.heroImageUrl} 
            alt={`${COMPANY_DETAILS.name} Title Logo`} 
            className="max-h-20 object-contain rounded" 
          />
        )}
      </div>
      
      <div className="space-y-8 text-slate-700 dark:text-slate-200 text-lg leading-relaxed">
        
        <section>
          <h3 className={`text-2xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>AI Automated Journal Entry Creator</h3>
          <p>
            Welcome! This application, developed for <strong className="text-slate-800 dark:text-slate-50">{COMPANY_DETAILS.name}</strong>, leverages the power of Google's Gemini AI 
            to streamline and automate the creation of accounting journal entries. Our goal is to reduce manual data entry,
            improve accuracy, and assist in maintaining compliance with accounting standards.
          </p>
        </section>

        <section>
          <h3 className={`text-2xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>{t('keyFeaturesSectionTitle')}</h3>
          <ul className="list-none space-y-3">
            {features.map(feature => (
              <li key={feature.titleKey}>
                <button
                  onClick={() => onNavigate(feature.view)}
                  className={`w-full p-4 rounded-lg flex items-start space-x-4 text-left
                              ${accentColor.bgColorClass} dark:bg-${accentColor.value}-900/50 
                              border ${accentColor.borderColorClass} dark:border-${accentColor.value}-700/50 
                              hover:shadow-lg hover:border-${accentColor.value}-600 dark:hover:border-${accentColor.value}-400 
                              transition-all duration-150 focus:outline-none focus:ring-2 ${accentColor.ringColorClass}`}
                  aria-label={`Go to ${t(feature.titleKey)} section`}
                >
                  <span className="text-3xl pt-1" aria-hidden="true">{feature.icon}</span>
                  <div>
                    <h4 className={`text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300`}>{t(feature.titleKey)}</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-base">{feature.description}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className={`text-2xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>Core Technology</h3>
          <p>
            The application utilizes the <strong className="text-slate-800 dark:text-slate-50">Google Gemini API</strong>, a state-of-the-art large language model from Google, 
            to understand natural language descriptions of business transactions and convert them into structured 
            double-entry bookkeeping records.
          </p>
        </section>
        
        <section>
          <h3 className={`text-2xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>Powered by {COMPANY_DETAILS.name}</h3>
          <p>
            At {COMPANY_DETAILS.name}, we specialize in cutting-edge AI research and development, 
            creating intelligent solutions that solve real-world problems. We believe in the transformative 
            potential of artificial intelligence to enhance efficiency and decision-making across various industries.
          </p>
          <p className="mt-2">
            This tool is a demonstration of our capabilities in applying AI to complex domains like financial accounting.
          </p>
        </section>

        <section>
          <h3 className={`text-2xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>Disclaimer</h3>
          <p>
            While this AI tool is designed for accuracy, it is essential to review all generated journal entries 
            before incorporating them into your official financial records. The AI's output should be considered 
            as a suggestion or a draft, subject to verification by a qualified accounting professional. 
            {COMPANY_DETAILS.name} is not responsible for any errors or omissions in the generated entries or 
            their subsequent use. Always ensure compliance with relevant accounting standards and regulations.
          </p>
        </section>

        <section>
          <h3 className={`text-2xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>Version</h3>
          <p>Application Version: 1.3.0 (Homepage & Interactive About)</p>
        </section>
        
        <p className="pt-4 text-md text-slate-500 dark:text-slate-400 text-center">
          Thank you for using the AI Automated Journal Entry Creator! We welcome feedback for future improvements.
        </p>
      </div>
    </div>
  );
};

export default AboutView;
