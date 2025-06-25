import React from 'react';
import TransactionInputForm from '../TransactionInputForm';
import JournalEntryDisplay from '../JournalEntryDisplay';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import { GeneratedJournalEntry } from '../../types';
import { DEFAULT_ACCENT_COLOR } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';

interface DashboardViewProps {
  onSubmit: (data: string) => void;
  isLoading: boolean;
  error: string | null;
  generatedEntries: GeneratedJournalEntry[] | null;
  initialLoadComplete: boolean;
  accentColor: typeof DEFAULT_ACCENT_COLOR;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  onSubmit,
  isLoading,
  error,
  generatedEntries,
  initialLoadComplete,
  accentColor
}) => {
  const { t } = useLanguage();

  return (
    <>
      <TransactionInputForm 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        accentColor={accentColor} 
      />
      
      {error && <ErrorMessage message={error} />}
      
      {isLoading && <LoadingSpinner accentColor={accentColor} />}
      
      {!isLoading && generatedEntries && <JournalEntryDisplay entries={generatedEntries} accentColor={accentColor}/>}
      
      {!isLoading && !error && !generatedEntries && initialLoadComplete && (
         <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center text-slate-500 dark:text-slate-400">
            <p>No journal entries to display for the provided input, or the AI could not process the request.</p>
         </div>
      )}

      {!isLoading && !error && !generatedEntries && !initialLoadComplete && (
         <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center">
            <h3 className={`text-2xl font-semibold mb-3 ${accentColor.textColorClass} dark:text-${accentColor.value}-300`}>{t('welcomeToApp')}</h3>
            <p className="text-slate-600 dark:text-slate-300">{t('enterTransactionDetailsPrompt')}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{t('trySampleButtonPrompt')}</p>
         </div>
      )}
    </>
  );
};

export default DashboardView;
