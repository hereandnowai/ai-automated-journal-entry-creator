import React from 'react';
import { Theme, AccentColor } from '../../types';
import { THEMES, ACCENT_COLORS, DEFAULT_ACCENT_COLOR } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';

interface SettingsViewProps {
  currentTheme: Theme;
  onSetTheme: (theme: Theme) => void;
  currentAccent: AccentColor;
  onSetAccent: (accent: AccentColor) => void;
  accentColorDetails: typeof DEFAULT_ACCENT_COLOR;
}

const SettingsView: React.FC<SettingsViewProps> = ({ 
  currentTheme, onSetTheme, 
  currentAccent, onSetAccent,
  accentColorDetails
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl transition-colors duration-300">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">{t('settingsTitle')}</h2>
      
      <div className="space-y-8">
        {/* Theme Selection */}
        <section>
          <h3 className={`text-xl font-semibold ${accentColorDetails.textColorClass} dark:text-${accentColorDetails.value}-300 mb-3`}>{t('appearanceTheme')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {THEMES.map((themeOption) => (
              <button
                key={themeOption.value}
                onClick={() => onSetTheme(themeOption.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-150 text-left
                  ${currentTheme === themeOption.value 
                    ? `${accentColorDetails.borderColorClass} ${accentColorDetails.bgColorClass} dark:bg-${accentColorDetails.value}-900/70 ring-2 ${accentColorDetails.ringColorClass}`
                    : 'bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500'
                  }
                `}
                aria-pressed={currentTheme === themeOption.value}
              >
                <span className="block text-lg font-medium text-slate-700 dark:text-slate-100">{themeOption.name}</span>
                {themeOption.value === 'light' && <p className="text-xs text-slate-500 dark:text-slate-400">Bright and clean interface.</p>}
                {themeOption.value === 'dark' && <p className="text-xs text-slate-500 dark:text-slate-400">Easy on the eyes in low light.</p>}
                {themeOption.value === 'system' && <p className="text-xs text-slate-500 dark:text-slate-400">Matches your OS preference.</p>}
              </button>
            ))}
          </div>
        </section>

        {/* Accent Color Selection */}
        <section>
          <h3 className={`text-xl font-semibold ${accentColorDetails.textColorClass} dark:text-${accentColorDetails.value}-300 mb-3`}>{t('accentColor')}</h3>
          <div className="flex flex-wrap gap-3">
            {ACCENT_COLORS.map((colorOption) => (
              <button
                key={colorOption.value}
                onClick={() => onSetAccent(colorOption.value)}
                title={colorOption.name}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-150 focus:outline-none
                  ${colorOption.primaryColorClass} 
                  ${currentAccent === colorOption.value 
                    ? `ring-4 ring-offset-2 dark:ring-offset-slate-800 ${colorOption.ringColorClass}` 
                    : `border-transparent hover:border-slate-400 dark:hover:border-slate-500 focus:ring-2 ${colorOption.ringColorClass}`
                  }
                `}
                aria-label={`Set accent color to ${colorOption.name}`}
                aria-pressed={currentAccent === colorOption.value}
              />
            ))}
          </div>
        </section>
        
        <div className={`p-6 ${accentColorDetails.bgColorClass} dark:bg-${accentColorDetails.value}-900/50 rounded-lg border ${accentColorDetails.borderColorClass} dark:border-${accentColorDetails.value}-700/50`}>
          <h3 className={`text-xl font-semibold ${accentColorDetails.textColorClass} dark:text-${accentColorDetails.value}-300 mb-3`}>{t('otherSettings')}</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Future options for default accounts, tax settings, API configurations (excluding direct key input), etc., will appear here.
          </p>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Note: The API Key is managed via environment variables and is not configurable through this interface.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
