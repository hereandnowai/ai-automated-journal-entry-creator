
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MenuBar from './components/MenuBar';
import HomeView from './components/views/HomeView'; // Import HomeView
import DashboardView from './components/views/DashboardView';
import SettingsView from './components/views/SettingsView';
import LanguageView from './components/views/LanguageView';
import ExtraFeaturesView from './components/views/ExtraFeaturesView';
import HowToUseView from './components/views/HowToUseView';
import PrivacyPolicyView from './components/views/PrivacyPolicyView';
import AboutView from './components/views/AboutView';
import AIAssistantView from './components/views/AIAssistantView';
import { COMPANY_DETAILS, ACCENT_COLORS, DEFAULT_ACCENT_COLOR, THEMES } from './constants';
import { GeneratedJournalEntry, Theme, AccentColor } from './types';
import { generateJournalEntries } from './services/geminiService';
import { useLanguage } from './contexts/LanguageContext';

export type ViewName = 'home' | 'dashboard' | 'settings' | 'language' | 'extraFeatures' | 'howToUse' | 'privacyPolicy' | 'about' | 'aiAssistant';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewName>('home'); // Start with home view
  const [appLayoutVisible, setAppLayoutVisible] = useState<boolean>(false); // Control Header/MenuBar visibility
  const [generatedEntries, setGeneratedEntries] = useState<GeneratedJournalEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { language } = useLanguage();

  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('app-theme') as Theme | null;
    return storedTheme || 'system';
  });
  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    const storedAccent = localStorage.getItem('app-accent-color') as AccentColor | null;
    return storedAccent || DEFAULT_ACCENT_COLOR.value;
  });
  
  const currentAccent = useMemo(() => ACCENT_COLORS.find(ac => ac.value === accentColor) || DEFAULT_ACCENT_COLOR, [accentColor]);

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    const applyTheme = () => {
      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', systemPrefersDark);
      } else {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    };
    applyTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
        if (theme === 'system') {
            applyTheme();
        }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('app-accent-color', accentColor);
  }, [accentColor]);

  const handleSubmitTransactionData = useCallback(async (data: string) => {
    setIsLoading(true);
    setError(null);
    setGeneratedEntries(null);
    try {
      const entries = await generateJournalEntries(data);
      setGeneratedEntries(entries);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      setGeneratedEntries(null); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNavigate = (view: ViewName) => {
    setCurrentView(view);
    if (view !== 'home') {
      setAppLayoutVisible(true);
    }
     // Scroll to top on view change
    window.scrollTo(0, 0);
  };

  const handleGetStarted = () => {
    setCurrentView('dashboard');
    setAppLayoutVisible(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onGetStarted={handleGetStarted} accentColor={currentAccent} />;
      case 'dashboard':
        return (
          <DashboardView
            onSubmit={handleSubmitTransactionData}
            isLoading={isLoading}
            error={error}
            generatedEntries={generatedEntries}
            initialLoadComplete={generatedEntries !== null || error !== null}
            accentColor={currentAccent}
          />
        );
      case 'settings':
        return <SettingsView 
                  currentTheme={theme} 
                  onSetTheme={setTheme} 
                  currentAccent={accentColor} 
                  onSetAccent={setAccentColor} 
                  accentColorDetails={currentAccent}
                />;
      case 'language':
        return <LanguageView 
                  accentColor={currentAccent} 
                />;
      case 'extraFeatures':
        return <ExtraFeaturesView accentColor={currentAccent} />;
      case 'howToUse':
        return <HowToUseView accentColor={currentAccent} />;
      case 'privacyPolicy':
        return <PrivacyPolicyView accentColor={currentAccent} />;
      case 'about':
        // Pass handleNavigate to AboutView to make features clickable
        return <AboutView accentColor={currentAccent} onNavigate={handleNavigate} />; 
      case 'aiAssistant':
        return <AIAssistantView accentColor={currentAccent} />;
      default:
        return <HomeView onGetStarted={handleGetStarted} accentColor={currentAccent} />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200 transition-colors duration-300">
      {appLayoutVisible && <Header accentColor={currentAccent} />}
      {appLayoutVisible && <MenuBar activeView={currentView} onNavigate={handleNavigate} accentColor={currentAccent} />}
      
      <main className={`flex-grow container mx-auto px-4 ${appLayoutVisible ? 'py-8 md:py-12' : 'py-0'}`}>
         {/* If it's home view, we want it to potentially take more of the screen */}
        <div className={currentView !== 'home' ? "max-w-5xl mx-auto" : ""}> 
          {renderView()}
        </div>
      </main>
      
      {/* Footer might be shown always or only with appLayoutVisible */}
      <Footer />
    </div>
  );
};

export default App;
