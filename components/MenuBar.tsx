
import React from 'react';
import { ViewName } from '../App';
import { DEFAULT_ACCENT_COLOR } from '../constants';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage

interface MenuBarProps {
  activeView: ViewName;
  onNavigate: (viewName: ViewName) => void;
  accentColor: typeof DEFAULT_ACCENT_COLOR;
}

// Menu item keys should match keys in translations.ts
const menuItemsConfig: { key: string; view: ViewName; icon?: string }[] = [
  { key: 'dashboard', view: 'dashboard', icon: '📊' },
  { key: 'aiAssistant', view: 'aiAssistant', icon: '🤖' },
  { key: 'howToUse', view: 'howToUse', icon: '❓' },
  { key: 'settings', view: 'settings', icon: '⚙️' },
  { key: 'language', view: 'language', icon: '🌐' },
  { key: 'extraFeatures', view: 'extraFeatures', icon: '✨' },
  { key: 'privacyPolicy', view: 'privacyPolicy', icon: '📜' },
  { key: 'about', view: 'about', icon: 'ℹ️' },
  // 'home' is a view, but usually not an active menu item once inside the app.
  // It's managed by the initial state or a dedicated "Home" button if needed.
];

const MenuBar: React.FC<MenuBarProps> = ({ activeView, onNavigate, accentColor }) => {
  const { t } = useLanguage();
  // Adjust based on actual Header height. Assuming Header is around 80px tall.
  // This value needs to be precise. The Header has p-4, so 1rem padding top/bottom.
  // Logo h-12 (48px). Text size. Let's estimate 72px-80px.
  // A more robust solution might involve JS to get header height or CSS variables.
  const stickyTopClass = "top-[80px]"; 

  return (
    <nav className={`bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-md sticky ${stickyTopClass} z-40 transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center sm:justify-start space-x-1 py-2">
          {menuItemsConfig.map((item) => (
            <li key={item.view} className="py-1">
              <button
                onClick={() => onNavigate(item.view)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 ease-in-out flex items-center space-x-2
                  ${activeView === item.view 
                    ? `${accentColor.primaryColorClass} text-white shadow-sm` 
                    : `text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500`
                  }`}
                aria-current={activeView === item.view ? 'page' : undefined}
              >
                {item.icon && <span className="text-base" aria-hidden="true">{item.icon}</span>}
                <span>{t(item.key)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MenuBar;
