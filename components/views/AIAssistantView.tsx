
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAIAssistantResponse } from '../../services/geminiService';
import { AIAssistantMessage, ChatMessage } from '../../types';
import { DEFAULT_ACCENT_COLOR } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext'; // Import useLanguage

// Basic markdown-to-HTML (very simplified)
const simpleMarkdownToHtml = (text: string): string => {
  if (!text) return '';
  // Order matters: Process block elements like lists before inline like newlines
  let html = text;
  
  // Code blocks (```lang\ncode``` or ```code```)
  html = html.replace(/```(\w*\n)?([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre class="bg-slate-100 dark:bg-slate-700 p-2 my-1 rounded text-sm overflow-x-auto text-slate-800 dark:text-slate-200 whitespace-pre-wrap"><code>${code.trim()}</code></pre>`;
  });
  
  // Bold (**text** or __text__)
  html = html.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
  // Italics (*text* or _text_)
  html = html.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>');
  // Inline code (`text`)
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-200 dark:bg-slate-600 px-1 rounded text-sm text-slate-800 dark:text-slate-200">$1</code>');
  
  // Unordered list items ( - item, * item, + item ) - basic, handles one level
  html = html.replace(/^(\s*[-*+]\s+)(.*)/gm, (match, prefix, item) => {
    // Ensure this doesn't capture lines that are not list items
    if (item.startsWith('<pre') || item.startsWith('<strong') || item.startsWith('<em') || item.startsWith('<code')) {
        return match; // Avoid processing already HTML-tagged content as list items
    }
    return `${prefix.replace(/[-*+]/, '<span class="mr-1">&bull;</span>')}${item}`; 
  });

  html = html.replace(/\n/g, '<br />');

  return html;
};


interface AIAssistantViewProps {
  accentColor: typeof DEFAULT_ACCENT_COLOR;
}

const AIAssistantView: React.FC<AIAssistantViewProps> = ({ accentColor }) => {
  const { language, t } = useLanguage(); 
  const [messages, setMessages] = useState<AIAssistantMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async (messageTextFromParam?: string) => {
    const textToSend = (typeof messageTextFromParam === 'string' ? messageTextFromParam : inputValue).trim();
    if (!textToSend || isLoading) return;

    const userMessage: AIAssistantMessage = {
      id: Date.now().toString() + 'user',
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    if (typeof messageTextFromParam !== 'string') { 
        setInputValue('');
    }
    setIsLoading(true);
    setError(null);

    const geminiHistory: ChatMessage[] = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));
    
    // The history passed to Gemini should be what *led up* to this user message, not including it.
    // The userMessage.text is then sent as the current message.
    // However, the current code sends userMessage.text and then adds it to geminiHistory for the call.
    // For `currentChat.sendMessage({ message: userMessage })` with `history` in `create`, the history should be up to the point *before* this new user message.
    // Let's refine history for `getAIAssistantResponse`. `currentTurnHistory` is appropriate for sending to a model that expects current turn as part of history.
    // The service function `getAIAssistantResponse` takes `history` which should be prior history.
    
    const priorHistory: ChatMessage[] = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));


    try {
      // Pass prior history. The userMessage.text is the new message.
      const aiResponseText = await getAIAssistantResponse(userMessage.text, priorHistory);
      const aiMessage: AIAssistantMessage = {
        id: Date.now().toString() + 'ai',
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      const errorText = err.message || 'Failed to get response from AI assistant.';
      setError(errorText);
      const errorMessage: AIAssistantMessage = {
        id: Date.now().toString() + 'error',
        text: errorText,
        sender: 'ai', 
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages, getAIAssistantResponse]); // Removed setters as they are stable


  const handleSendMessageRef = useRef(handleSendMessage);
  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  }, [handleSendMessage]);


  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      speechRecognitionRef.current = new SpeechRecognitionAPI();
      speechRecognitionRef.current.continuous = false;
      speechRecognitionRef.current.interimResults = false;
      speechRecognitionRef.current.lang = language.code; 

      speechRecognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript); // Set input value with transcript
        setIsListening(false);
        handleSendMessageRef.current(transcript); // Send message automatically
      };
      speechRecognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        let errorMsg = `Speech recognition error: ${event.error}.`;
        if (event.error === 'network') {
          errorMsg += ' Please check your internet connection.';
        } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          errorMsg += ' Microphone permission denied. Please enable it in your browser settings.';
        } else if (event.error === 'no-speech') {
            errorMsg = "No speech was detected. Please try again.";
        }
        setError(errorMsg);
        setIsListening(false);
      };
      speechRecognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn('Speech recognition not supported in this browser.');
      setError('Speech recognition not supported in this browser. Microphone input will be unavailable.');
    }
    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    };
  }, [language.code]);


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  
  const handleMicClick = () => {
    if (!speechRecognitionRef.current) {
      setError('Speech recognition is not available in your browser. Please use text input.');
      return;
    }
    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.lang = language.code; // Ensure lang is set before start
        speechRecognitionRef.current.start();
        setIsListening(true);
        setError(null); 
      } catch (e: any) {
         console.error("Error starting speech recognition:", e);
         setError(`Could not start microphone: ${e.message}. Ensure permission & no other app is using it, then try again.`);
         setIsListening(false);
      }
    }
  };
  
  const staticSuggestedQuestions = [ 
    t('aiSuggestionHowToEnterTransaction'), // Example of using t() for static content if needed
    t('aiSuggestionExplainDebitCredit'),
    t('aiSuggestionExampleSales'),
    t('aiSuggestionKeyFeatures'),
    t('aiSuggestionThemeSettings')
  ];

  // Make sure these keys are in translations.ts
  // For now, using hardcoded English examples if keys are not ready:
  const effectiveStaticSuggestions = [
    "How do I enter a new transaction?", 
    "Explain what a debit and credit are.",
    "Can you give me an example of a sales transaction?",
    "What are the key features of this app?",
    "How does the theme setting work?"
  ];


  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl flex flex-col h-[calc(100vh-220px)] max-h-[700px] transition-colors duration-300">
      <h2 className={`text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700 flex items-center ${accentColor.textColorClass} dark:text-${accentColor.value}-300`}>
        <span role="img" aria-label="robot icon" className="mr-3 text-3xl sm:text-4xl">🤖</span>
        {t('aiAssistantTitle')}
      </h2>
      
      {error && <div className="bg-red-100 dark:bg-red-800/30 border-l-4 border-red-500 dark:border-red-600 text-red-700 dark:text-red-300 p-3 text-sm rounded mb-3" role="alert">{error}</div>}

      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="text-center text-slate-500 dark:text-slate-400 p-4">
            <p className="text-lg">{t('aiAssistantWelcome')}</p>
            <p className="text-sm mt-1">{t('aiAssistantHint')}</p>
             <div className="mt-6">
                <p className="text-md font-semibold mb-3 text-slate-700 dark:text-slate-200">{t('aiAssistantSuggestions')}</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {effectiveStaticSuggestions.map((q_text, index) => ( 
                        <button 
                            key={index} 
                            onClick={() => { handleSendMessageRef.current(q_text); }}
                            className={`px-3 py-1.5 text-sm ${accentColor.bgColorClass} ${accentColor.textColorClass} dark:bg-${accentColor.value}-700 dark:text-${accentColor.value}-100 rounded-lg shadow hover:shadow-md hover:bg-${accentColor.value}-100 dark:hover:bg-${accentColor.value}-600 transition-all duration-150 ease-in-out`}
                        >
                            {q_text} 
                        </button>
                    ))}
                </div>
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-xl shadow break-words ${
              msg.sender === 'user' 
                ? `${accentColor.primaryColorClass} text-white` 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
            }`}>
              <div 
                className={`prose prose-sm max-w-none leading-relaxed 
                            ${msg.sender === 'user' ? 'prose-invert' : 'dark:prose-invert prose-p:text-slate-800 dark:prose-p:text-slate-100 prose-strong:text-slate-800 dark:prose-strong:text-slate-100 prose-em:text-slate-800 dark:prose-em:text-slate-100' }`}
                dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(msg.text) }} 
              />
              <p className={`text-xs mt-1.5 ${msg.sender === 'user' ? 'text-right text-sky-100 dark:text-sky-300' : 'text-left text-slate-500 dark:text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && messages.length > 0 && ( 
          <div className="flex justify-start">
             <div className="max-w-xs p-3 rounded-lg shadow bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100">
                <div className="flex items-center">
                    <div className={`animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 ${accentColor.borderColorClass} mr-2`}></div>
                    <span className="text-sm italic text-slate-600 dark:text-slate-300">AI is typing...</span>
                </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessageRef.current(); }} className="flex items-end space-x-2">
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessageRef.current(); } }}
            placeholder={t('askAQuestionPlaceholder')}
            rows={2}
            className={`flex-grow p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-2 ${accentColor.ringColorClass} focus:border-${accentColor.value}-500 dark:focus:border-${accentColor.value}-400 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none transition-colors duration-150`}
            aria-label="Chat input"
            disabled={isLoading || isListening}
          />
          {speechRecognitionRef.current && (
             <button
                type="button"
                onClick={handleMicClick}
                disabled={isLoading} 
                title={isListening ? t('stopListening') : t('useMicrophone')}
                className={`p-2.5 rounded-lg text-white transition-colors
                  ${isListening ? `bg-red-500 hover:bg-red-600 animate-pulse` : `${accentColor.primaryColorClass} ${accentColor.hoverColorClass}`}
                  disabled:opacity-50 h-[50px] w-[50px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${accentColor.ringColorClass}`}
                aria-label={isListening ? t('stopVoiceInput') : t('startVoiceInput')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim() || isListening}
            className={`p-2.5 rounded-lg text-white transition-colors ${accentColor.primaryColorClass} ${accentColor.hoverColorClass} disabled:opacity-50 h-[50px] w-[50px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${accentColor.ringColorClass}`}
            aria-label={t('sendMessage')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistantView;
