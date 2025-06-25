
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div 
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md mb-6 
                 dark:bg-red-900/50 dark:border-red-600 dark:text-red-300" 
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg 
            className="fill-current h-6 w-6 text-red-500 dark:text-red-400 mr-4" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 0 1-1-1V6a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold text-red-700 dark:text-red-200">Error</p>
          <p className="text-sm text-red-700 dark:text-red-300">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
