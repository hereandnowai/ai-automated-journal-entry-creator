
import React from 'react';
import { COMPANY_DETAILS, DEFAULT_ACCENT_COLOR } from '../constants';
import { AccentColor } from '../types'; // Assuming AccentColor type has the color class details

interface HeaderProps {
  accentColor: typeof DEFAULT_ACCENT_COLOR; // Use the detailed type from constants
}

const Header: React.FC<HeaderProps> = ({ accentColor }) => {
  return (
    <header className={`bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-900 dark:to-black text-white p-5 shadow-lg sticky top-0 z-50`}> {/* Increased padding p-5 */}
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4"> {/* Increased space-x-4 */}
          <img 
            src={COMPANY_DETAILS.logoUrl} 
            alt={`${COMPANY_DETAILS.name} Logo`} 
            className={`h-14 w-14 rounded-full border-2 ${accentColor.borderColorClass} bg-white`} // Increased size h-14 w-14
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{COMPANY_DETAILS.name}</h1>
            <p className="text-xs sm:text-sm text-sky-100 dark:text-sky-300">AI Automated Journal Entry Creator</p>
          </div>
        </div>
        {COMPANY_DETAILS.heroImageUrl && (
            <img src={COMPANY_DETAILS.heroImageUrl} alt={`${COMPANY_DETAILS.name} Visual`} className="h-10 md:h-12 hidden md:block opacity-90" /> // Slightly increased hero image size
        )}
      </div>
    </header>
  );
};

export default Header;
