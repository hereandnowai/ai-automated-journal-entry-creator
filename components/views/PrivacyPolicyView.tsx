import React from 'react';
import { COMPANY_DETAILS, DEFAULT_ACCENT_COLOR } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';

interface PrivacyPolicyViewProps {
  accentColor: typeof DEFAULT_ACCENT_COLOR;
}

const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ accentColor }) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl transition-colors duration-300">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('privacyPolicyTitle')}</h2>
      <div className="space-y-4 text-slate-700 dark:text-slate-200 text-lg leading-relaxed">
        <p><strong className="text-slate-800 dark:text-slate-50">Last Updated:</strong> {new Date().toLocaleDateString()}</p>

        <p>
          Welcome to the AI Automated Journal Entry Creator, provided by {COMPANY_DETAILS.name}. 
          We are committed to protecting your privacy. This Privacy Policy explains how we handle 
          information in connection with your use of this application.
        </p>

        <section>
          <h3 className={`text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mt-6 mb-2`}>1. Information We Process</h3>
          <p>
            When you use our application, you provide transaction data for the purpose of generating journal entries, 
            or text prompts for the AI Assistant. This data is sent to the Google Gemini API for processing.
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
            <li><strong>Transaction Data:</strong> Descriptions of financial transactions, amounts, dates, parties, etc., that you input for journal entry generation.</li>
            <li><strong>AI Assistant Prompts:</strong> Text or voice (transcribed to text) queries you send to the AI Assistant.</li>
            <li><strong>API Key:</strong> Your Google Gemini API Key is required to use this application. This key is stored and used by your browser environment to make API calls directly to Google. It is NOT stored or transmitted to {COMPANY_DETAILS.name} servers. Access and security of your API key within your environment are your responsibility.</li>
            <li><strong>Usage Data:</strong> We do not currently collect personal usage data, analytics, or cookies directly through this application interface. The Google Gemini API may have its own data handling policies related to API calls.</li>
            <li><strong>Settings Preferences:</strong> Your chosen theme, accent color, and language preferences are stored locally in your browser's localStorage and are not transmitted to any server.</li>
          </ul>
        </section>

        <section>
          <h3 className={`text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mt-6 mb-2`}>2. How We Use Information</h3>
          <p>
            The data you provide is used solely for the following purposes:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
            <li>To interact with the Google Gemini API to analyze the transaction or assistant prompt.</li>
            <li>To generate accounting journal entries or AI assistant responses based on the AI's analysis.</li>
            <li>To display these generated entries or responses back to you within the application.</li>
            <li>To apply your chosen theme, accent color, and language settings within the application.</li>
          </ul>
          <p className="mt-2 text-slate-700 dark:text-slate-200">
            We do not store your transaction data, AI assistant conversations, or the generated outputs on servers controlled by {COMPANY_DETAILS.name} after your session ends (beyond what's kept in your local browser state for the current session). All processing requiring the AI is done in real-time.
          </p>
        </section>
        
        <section>
          <h3 className={`text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mt-6 mb-2`}>3. Data Sharing and Third Parties</h3>
           <p>
            Your transaction data and AI Assistant prompts are shared with Google when calls are made to the Gemini API. We recommend reviewing Google's API and data privacy policies to understand how they handle data submitted through their services.
            Other than the Google Gemini API, we do not share your input data with any other third parties.
          </p>
        </section>

        <section>
          <h3 className={`text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mt-6 mb-2`}>4. Data Security</h3>
          <p>
            While the application itself is a frontend interface, data security relies on:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
            <li>The security of your own environment where the API key is managed.</li>
            <li>The security measures implemented by Google for their Gemini API service.</li>
            <li>Standard browser security for localStorage where your settings are saved.</li>
          </ul>
           <p className="mt-2 text-slate-700 dark:text-slate-200">We encourage you to use secure practices for managing your API key and accessing this application.</p>
        </section>

        <section>
          <h3 className={`text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mt-6 mb-2`}>5. Children's Privacy</h3>
          <p>
            This application is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h3 className={`text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mt-6 mb-2`}>6. Changes to This Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. 
            You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h3 className={`text-xl font-semibold ${accentColor.textColorClass} dark:text-${accentColor.value}-300 mt-6 mb-2`}>7. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact {COMPANY_DETAILS.name}. 
            (Contact details would typically be provided here if this were a production application with a dedicated support channel).
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyView;
