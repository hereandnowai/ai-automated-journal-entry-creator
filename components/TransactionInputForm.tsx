import React, { useState } from 'react';
import { DEFAULT_ACCENT_COLOR } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';

interface TransactionInputFormProps {
  onSubmit: (data: string) => void;
  isLoading: boolean;
  accentColor: typeof DEFAULT_ACCENT_COLOR;
}

const TransactionInputForm: React.FC<TransactionInputFormProps> = ({ onSubmit, isLoading, accentColor }) => {
  const [transactionData, setTransactionData] = useState<string>('');
  const { t } = useLanguage();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (transactionData.trim()) {
      onSubmit(transactionData.trim());
    }
  };

  const sampleTransactions = [
    "On 2024-07-15, paid $250 for office electricity bill (Utility Expense) via bank transfer, invoice ELEC-001.",
    "Received $1200 from Client Corp for consulting services rendered on 2024-07-16. Payment via check #5678. Issued invoice CSLT-105.",
    "Purchased new office software for $499 on 2024-07-18 using company credit card. Vendor: TechSolutions Inc. Ref: TS-ORD-990."
  ];

  const handleSampleClick = (sample: string) => {
    setTransactionData(sample);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl mb-8">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-100 mb-6">Enter Transaction Details</h2>
        <div className="mb-6">
          <label htmlFor="transactionData" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Describe the transaction(s) below:
          </label>
          <textarea
            id="transactionData"
            name="transactionData"
            rows={8}
            className={`w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-2 ${accentColor.ringColorClass} focus:border-${accentColor.value}-500 dark:focus:border-${accentColor.value}-400 transition-shadow bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
            placeholder="e.g., Paid $150 for office supplies on 2024-07-28 via credit card, receipt #12345"
            value={transactionData}
            onChange={(e) => setTransactionData(e.target.value)}
            disabled={isLoading}
            aria-label="Transaction details input"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Provide as much detail as possible: date, amount, parties, description, payment method, reference numbers.</p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Or try a sample:</p>
          <div className="flex flex-wrap gap-2">
            {sampleTransactions.map((sample, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSampleClick(sample)}
                disabled={isLoading}
                className={`px-3 py-1.5 text-xs ${accentColor.bgColorClass} ${accentColor.textColorClass} dark:bg-${accentColor.value}-800 dark:text-${accentColor.value}-200 rounded-md hover:bg-${accentColor.value}-100 dark:hover:bg-${accentColor.value}-700 transition-colors disabled:opacity-50`}
                aria-label={`Load sample transaction ${index + 1}`}
              >
                Sample {index + 1}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !transactionData.trim()}
          className={`w-full ${accentColor.primaryColorClass} ${accentColor.hoverColorClass} text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${accentColor.ringColorClass} transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
          aria-live="polite"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('processingButton')}
            </>
          ) : (
            t('generateJournalEntriesButton')
          )}
        </button>
      </form>
    </div>
  );
};

export default TransactionInputForm;
