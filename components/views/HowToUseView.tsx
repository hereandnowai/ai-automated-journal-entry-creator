import React from 'react';
import { DEFAULT_ACCENT_COLOR } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';

interface HowToUseViewProps {
  accentColor: typeof DEFAULT_ACCENT_COLOR;
}

const HowToUseView: React.FC<HowToUseViewProps> = ({ accentColor }) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl transition-colors duration-300">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">{t('howToUseTitle')}</h2>
      
      <div className="space-y-6 text-slate-700 dark:text-slate-200 text-lg">
        <section>
          <h3 className={`text-2xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>1. Navigate to the Dashboard</h3>
          <p>The <strong className="font-semibold text-slate-800 dark:text-slate-100">Dashboard</strong> is your main workspace. If you're not there, click "Dashboard" in the menu bar.</p>
        </section>

        <section>
          <h3 className={`text-2xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>2. Enter Transaction Details</h3>
          <p>In the "Enter Transaction Details" section, describe the business transaction(s) in the text area. Be as specific as possible. Include details like:</p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
            <li>Date of the transaction</li>
            <li>Amount(s) involved (and currency if not default)</li>
            <li>Parties involved (e.g., customer, vendor)</li>
            <li>A clear description of what happened (e.g., "paid for office supplies", "received payment for services")</li>
            <li>Payment method (e.g., credit card, bank transfer, cash)</li>
            <li>Any reference numbers (e.g., invoice number, receipt ID, PO number)</li>
          </ul>
          <p className="mt-2 text-slate-700 dark:text-slate-200">You can also click one of the "Sample" buttons to auto-fill the text area with an example transaction.</p>
        </section>

        <section>
          <h3 className={`text-2xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>3. Generate Journal Entries</h3>
          <p>Once you've entered the transaction details, click the <span className={`font-semibold text-white ${accentColor.primaryColorClass} px-2 py-1 rounded`}>{t('generateJournalEntriesButton')}</span> button.</p>
          <p className="mt-1 text-slate-700 dark:text-slate-200">The AI will process your input and generate the corresponding accounting journal entries.</p>
        </section>

        <section>
          <h3 className={`text-2xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>4. Review the Output</h3>
          <p>The generated journal entries will appear below the input form. Each entry will show:</p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
            <li>Entry date and reference number</li>
            <li>Account codes and descriptions</li>
            <li>Debit and credit amounts</li>
            <li>A summary transaction description</li>
            <li>AI's confidence level and any review flags</li>
            <li>Source document references (if provided/inferred)</li>
            <li>An explanation from the AI about its reasoning</li>
          </ul>
          <p className="mt-2 text-slate-700 dark:text-slate-200">Always review the generated entries for accuracy before using them in your accounting system.</p>
        </section>

        <section>
          <h3 className={`text-2xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mb-3`}>5. Use the AI Assistant</h3>
          <p>Click on <strong className="font-semibold text-slate-800 dark:text-slate-100">"AI Assistant"</strong> in the menu. This feature provides a chat interface to help you:</p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
            <li>Understand how to use specific features of the app.</li>
            <li>Clarify doubts about accounting principles related to your transactions.</li>
            <li>Get help formulating transaction descriptions for the AI.</li>
            <li>Ask general questions about the application or accounting.</li>
          </ul>
        </section>
        
        <p className="pt-4 text-md text-slate-500 dark:text-slate-400">
          This application uses advanced AI to assist you, but it's crucial to verify the outputs.
          The AI learns and improves over time, but human oversight remains essential for financial accuracy.
        </p>
      </div>
    </div>
  );
};

export default HowToUseView;
