import React from 'react';
import { DEFAULT_ACCENT_COLOR } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';

interface ExtraFeaturesViewProps {
  accentColor: typeof DEFAULT_ACCENT_COLOR;
}

const ExtraFeaturesView: React.FC<ExtraFeaturesViewProps> = ({ accentColor }) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl transition-colors duration-300">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('extraFeaturesTitle')}</h2>
      <div className="space-y-6">
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          This section will highlight upcoming and experimental features.
        </p>
        
        <div className={`p-6 ${accentColor.bgColorClass} dark:bg-${accentColor.value}-900/50 rounded-lg border ${accentColor.borderColorClass} dark:border-${accentColor.value}-700/50`}>
          <h3 className={`text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>🚀 Bulk Import (Coming Soon)</h3>
          <p className="text-slate-600 dark:text-slate-400">Ability to upload CSV or Excel files for batch processing of transactions.</p>
        </div>

        <div className={`p-6 ${accentColor.bgColorClass} dark:bg-${accentColor.value}-900/50 rounded-lg border ${accentColor.borderColorClass} dark:border-${accentColor.value}-700/50`}>
          <h3 className={`text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>📈 Reporting & Analytics (Planned)</h3>
          <p className="text-slate-600 dark:text-slate-400">Basic financial summaries and visualizations based on generated entries.</p>
        </div>

        <div className={`p-6 ${accentColor.bgColorClass} dark:bg-${accentColor.value}-900/50 rounded-lg border ${accentColor.borderColorClass} dark:border-${accentColor.value}-700/50`}>
          <h3 className={`text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>🔗 Direct ERP Integration (Exploratory)</h3>
          <p className="text-slate-600 dark:text-slate-400">Exploring options for direct API connections to popular accounting systems.</p>
        </div>
         <p className="text-slate-500 dark:text-slate-400 text-md pt-4">
          Stay tuned for more exciting updates as we continue to enhance the AI Automated Journal Entry Creator!
        </p>
      </div>
    </div>
  );
};

export default ExtraFeaturesView;
