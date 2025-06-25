
import React from 'react';
import { GeneratedJournalEntry } from '../types';
import { DEFAULT_ACCENT_COLOR } from '../../constants';


interface JournalEntryDisplayProps {
  entries: GeneratedJournalEntry[];
  accentColor: typeof DEFAULT_ACCENT_COLOR;
}

const ConfidenceBadge: React.FC<{ level: number }> = ({ level }) => {
  let bgColor = 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200';
  let text = 'Unknown';

  if (level >= 0.9) {
    bgColor = 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100';
    text = 'High';
  } else if (level >= 0.7) {
    bgColor = 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100';
    text = 'Medium';
  } else if (level > 0) {
    bgColor = 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100';
    text = 'Low';
  }

  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${bgColor}`}>
      {text} ({level.toFixed(2)})
    </span>
  );
};


const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = ({ entries, accentColor }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center text-slate-500 dark:text-slate-400">
        <p>No journal entries to display. Submit transaction details to generate entries.</p>
      </div>
    );
  }

  const formatCurrency = (amount: number | null) => {
    if (amount === null || amount === undefined) return '-';
    // Consider making currency configurable via props or context
    return amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' }); 
  };

  return (
    <div className="space-y-8">
      <h2 className={`text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-6 pb-2 border-b-2 ${accentColor.borderColorClass}`}>Generated Journal Entries</h2>
      {entries.map((entry, index) => (
        <div key={entry.referenceNumber || index} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
              <h3 className={`text-xl font-bold ${accentColor.textColorClass} dark:text-${accentColor.value}-400`}>Entry #{index + 1} <span className="text-sm text-slate-500 dark:text-slate-400 font-normal">(Ref: {entry.referenceNumber || 'N/A'})</span></h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Date: {new Date(entry.entryDate).toLocaleDateString()}</p>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{entry.transactionDescription}"</p>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Account Code</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Account Description</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Debit</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Credit</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700">
                {entry.lines.map((line, lineIndex) => (
                  <tr key={lineIndex} className={lineIndex % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-700/50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200">{line.accountCode}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200">{line.accountDescription}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200 text-right">{formatCurrency(line.debit)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200 text-right">{formatCurrency(line.credit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <strong className="text-slate-600 dark:text-slate-300">Confidence:</strong> <ConfidenceBadge level={entry.confidenceLevel} />
            </div>
            {entry.sourceDocumentReferences && entry.sourceDocumentReferences.length > 0 && (
              <div>
                <strong className="text-slate-600 dark:text-slate-300">Source Docs:</strong> <span className="text-slate-500 dark:text-slate-400">{entry.sourceDocumentReferences.join(', ')}</span>
              </div>
            )}
          </div>

          {entry.reviewFlags && entry.reviewFlags.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-700/30 border border-yellow-300 dark:border-yellow-600 rounded-md">
              <strong className="text-yellow-700 dark:text-yellow-300">Review Flags:</strong>
              <ul className="list-disc list-inside ml-4 text-yellow-600 dark:text-yellow-400">
                {entry.reviewFlags.map((flag, flagIndex) => (
                  <li key={flagIndex}>{flag}</li>
                ))}
              </ul>
            </div>
          )}
          
          {entry.explanation && (
             <div className={`mt-4 p-3 ${accentColor.bgColorClass} dark:bg-${accentColor.value}-900/30 border ${accentColor.borderColorClass} dark:border-${accentColor.value}-700 rounded-md`}>
                <strong className={`${accentColor.textColorClass} dark:text-${accentColor.value}-300 block mb-1`}>AI Explanation:</strong>
                <p className={`text-xs text-${accentColor.value}-700 dark:text-${accentColor.value}-400`}>{entry.explanation}</p>
             </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default JournalEntryDisplay;
