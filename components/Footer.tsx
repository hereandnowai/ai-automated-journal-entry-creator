import React from 'react';
import { COMPANY_DETAILS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-700 dark:bg-slate-800 text-slate-300 dark:text-slate-400 p-6 mt-12 text-center transition-colors duration-300">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved.</p>
        <p className="text-sm mt-1">Empowering accounting with Artificial Intelligence.</p>
      </div>
    </footer>
  );
};

export default Footer;
