
import React from 'react';
import { DEFAULT_ACCENT_COLOR } from '../constants';

interface LoadingSpinnerProps {
  accentColor?: typeof DEFAULT_ACCENT_COLOR; // Optional, defaults to Teal
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ accentColor = DEFAULT_ACCENT_COLOR }) => {
  return (
    <div className="flex flex-col justify-center items-center p-10 space-y-4">
      <div className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 ${accentColor.borderColorClass}`}></div>
      <p className="text-slate-600 dark:text-slate-300 text-lg">Processing your request...</p>
    </div>
  );
};

export default LoadingSpinner;
