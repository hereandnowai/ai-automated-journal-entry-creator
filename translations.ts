
import { LanguageOption } from './types';

export interface Translations {
  [key: string]: string;
}
export interface LanguagePack {
  [langCode: string]: Translations;
}

export const appTranslations: LanguagePack = {
  'en-US': {
    // Menu & General
    home: 'Home',
    dashboard: 'Dashboard',
    aiAssistant: 'AI Assistant',
    howToUse: 'How to Use',
    settings: 'Settings',
    language: 'Language',
    extraFeatures: 'Extra Features',
    privacyPolicy: 'Privacy Policy',
    about: 'About',
    // View Titles
    settingsTitle: 'Settings',
    languageTitle: 'Language Settings',
    extraFeaturesTitle: 'Extra Features',
    howToUseTitle: 'How to Use This App',
    privacyPolicyTitle: 'Privacy Policy',
    aboutTitle: 'About This Application',
    aiAssistantTitle: 'AI Assistant',
    // Home View
    getStartedButton: 'Get Started',
    // Dashboard
    welcomeToApp: 'Welcome to the AI Journal Entry Creator!', 
    enterTransactionDetailsPrompt: 'Enter transaction details above and click "Generate Journal Entries" to see the AI in action.',
    trySampleButtonPrompt: 'You can also use the sample buttons to quickly populate the form.',
    generateJournalEntriesButton: 'Generate Journal Entries',
    processingButton: 'Processing...',
    // AI Assistant
    aiAssistantWelcome: 'Welcome! How can I help you today?',
    aiAssistantHint: 'You can ask about using the app or general accounting questions. Click a suggestion or type your query below.',
    aiAssistantSuggestions: 'Need a starting point? Try asking:',
    askAQuestionPlaceholder: 'Ask a question or describe your doubt...',
    sendMessage: 'Send message',
    aiSuggestionHowToEnterTransaction: "How do I enter a new transaction?",
    aiSuggestionExplainDebitCredit: "Explain what a debit and credit are.",
    aiSuggestionExampleSales: "Can you give me an example of a sales transaction?",
    aiSuggestionKeyFeatures: "What are the key features of this app?",
    aiSuggestionThemeSettings: "How does the theme setting work?",
    stopListening: "Stop listening",
    useMicrophone: "Use microphone",
    stopVoiceInput: "Stop voice input",
    startVoiceInput: "Start voice input",
    // Settings
    appearanceTheme: 'Appearance Theme',
    accentColor: 'Accent Color',
    otherSettings: 'Other Settings',
    // Language View
    selectPreferredLanguage: 'Select your preferred language for the application interface.',
    selectLanguageLabel: 'Select Language:',
    languageTranslationNote: 'Note: Full application content translation is an ongoing process. Some elements may still appear in the default language (English) until translations are complete.',
    selectedLanguageText: 'Selected language:',
    // About View
    keyFeaturesSectionTitle: 'Key Features to Use',
  },
  'ta-IN': {
    home: 'முகப்பு',
    dashboard: ' டாஷ்போர்டு',
    aiAssistant: 'AI உதவியாளர்',
    howToUse: 'எப்படி உபயோகிப்பது',
    settings: 'அமைப்புகள்',
    language: 'மொழி',
    extraFeatures: 'கூடுதல் அம்சங்கள்',
    privacyPolicy: 'தனியுரிமைக் கொள்கை',
    about: 'பற்றி',
    settingsTitle: 'அமைப்புகள்',
    languageTitle: 'மொழி அமைப்புகள்',
    extraFeaturesTitle: 'கூடுதல் அம்சங்கள்',
    howToUseTitle: 'இந்த பயன்பாட்டை எவ்வாறு பயன்படுத்துவது',
    privacyPolicyTitle: 'தனியுரிமைக் கொள்கை',
    aboutTitle: 'இந்த பயன்பாட்டைப் பற்றி',
    aiAssistantTitle: 'AI உதவியாளர்',
    getStartedButton: 'தொடங்கவும்',
    welcomeToApp: 'AI ஜர்னல் பதிவு கிரியேட்டருக்கு வரவேற்கிறோம்!',
    enterTransactionDetailsPrompt: 'பரிவர்த்தனை விவரங்களை மேலே உள்ளிட்டு, AI செயல்படுவதைக் காண "ஜர்னல் பதிவுகளை உருவாக்கு" என்பதைக் கிளிக் செய்யவும்.',
    trySampleButtonPrompt: 'படிவத்தை விரைவாக நிரப்ப மாதிரி பொத்தான்களையும் நீங்கள் பயன்படுத்தலாம்.',
    generateJournalEntriesButton: 'ஜர்னல் பதிவுகளை உருவாக்கு',
    processingButton: 'செயலாக்கப்படுகிறது...',
    aiAssistantWelcome: 'வரவேற்கிறோம்! இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
    aiAssistantHint: 'செயலியைப் பயன்படுத்துவது அல்லது பொதுவான கணக்கியல் கேள்விகளைப் பற்றி நீங்கள் கேட்கலாம். ஒரு ஆலோசனையை கிளிக் செய்யவும் அல்லது கீழே உங்கள் வினவலை தட்டச்சு செய்யவும்.',
    aiAssistantSuggestions: 'தொடங்குவதற்கு உதவி தேவையா? இதைக் கேட்டுப் பாருங்கள்:',
    askAQuestionPlaceholder: 'ஒரு கேள்வியைக் கேளுங்கள் அல்லது உங்கள் சந்தேகத்தை விவரிக்கவும்...',
    sendMessage: 'செய்தியை அனுப்பு',
    aiSuggestionHowToEnterTransaction: "புதிய பரிவர்த்தனையை நான் எவ்வாறு உள்ளிடுவது?",
    aiSuggestionExplainDebitCredit: "பற்று மற்றும் வரவு என்றால் என்னவென்று விளக்க முடியுமா?",
    aiSuggestionExampleSales: "விற்பனை பரிவர்த்தனைக்கு ஒரு உதாரணம் தர முடியுமா?",
    aiSuggestionKeyFeatures: "இந்த செயலியின் முக்கிய அம்சங்கள் என்ன?",
    aiSuggestionThemeSettings: "தீம் அமைப்பு எவ்வாறு செயல்படுகிறது?",
    stopListening: "கேட்பதை நிறுத்து",
    useMicrophone: "மைக்ரோஃபோனைப் பயன்படுத்து",
    stopVoiceInput: "குரல் உள்ளீட்டை நிறுத்து",
    startVoiceInput: "குரல் உள்ளீட்டைத் தொடங்கு",
    appearanceTheme: 'தோற்ற தீம்',
    accentColor: 'உச்சரிப்பு நிறம்',
    otherSettings: 'மற்ற அமைப்புகள்',
    selectPreferredLanguage: 'பயன்பாட்டு இடைமுகத்திற்கு நீங்கள் விரும்பும் மொழியைத் தேர்ந்தெடுக்கவும்.',
    selectLanguageLabel: 'மொழியை தேர்ந்தெடு:',
    languageTranslationNote: 'குறிப்பு: முழு பயன்பாட்டு உள்ளடக்க மொழிபெயர்ப்பு ஒரு தொடர்ச்சியான செயல்முறையாகும். மொழிபெயர்ப்புகள் முடியும் வரை சில கூறுகள் இயல்புநிலை மொழியில் (ஆங்கிலம்) தோன்றக்கூடும்.',
    selectedLanguageText: 'தேர்ந்தெடுக்கப்பட்ட மொழி:',
    keyFeaturesSectionTitle: 'பயன்படுத்த முக்கிய அம்சங்கள்',
  },
  'te-IN': {
    home: 'హోమ్',
    dashboard: 'డాష్‌బోర్డ్',
    aiAssistant: 'AI సహాయకుడు',
    howToUse: 'ఎలా ఉపయోగించాలి',
    settings: 'సెట్టింగ్‌లు',
    language: 'భాష',
    extraFeatures: 'అదనపు ఫీచర్లు',
    privacyPolicy: 'గోప్యతా విధానం',
    about: 'గురించి',
    settingsTitle: 'సెట్టింగ్‌లు',
    languageTitle: 'భాషా సెట్టింగ్‌లు',
    extraFeaturesTitle: 'అదనపు ఫీచర్లు',
    howToUseTitle: 'ఈ యాప్‌ను ఎలా ఉపయోగించాలి',
    privacyPolicyTitle: 'గోప్యతా విధానం',
    aboutTitle: 'ఈ అప్లికేషన్ గురించి',
    aiAssistantTitle: 'AI సహాయకుడు',
    getStartedButton: 'ప్రారంభించండి',
    welcomeToApp: 'AI జర్నల్ ఎంట్రీ క్రియేటర్‌కు స్వాగతం!',
    enterTransactionDetailsPrompt: 'లావాదేవీ వివరాలను పైన నమోదు చేసి, AI చర్యను చూడటానికి "జర్నల్ ఎంట్రీలను రూపొందించు" క్లిక్ చేయండి.',
    trySampleButtonPrompt: 'ఫారమ్‌ను త్వరగా నింపడానికి మీరు నమూనా బటన్లను కూడా ఉపయోగించవచ్చు.',
    generateJournalEntriesButton: 'జర్నల్ ఎంట్రీలను రూపొందించు',
    processingButton: 'ప్రాసెస్ అవుతోంది...',
    aiAssistantWelcome: 'స్వాగతం! ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?',
    aiAssistantHint: 'మీరు యాప్‌ను ఉపయోగించడం గురించి లేదా సాధారణ అకౌంటింగ్ ప్రశ్నల గురించి అడగవచ్చు. ఒక సూచనను క్లిక్ చేయండి లేదా మీ ప్రశ్నను క్రింద టైప్ చేయండి.',
    aiAssistantSuggestions: 'ప్రారంభించడానికి సహాయం కావాలా? ఇలా అడిగి చూడండి:',
    askAQuestionPlaceholder: 'ప్రశ్న అడగండి లేదా మీ సందేహాన్ని వివరించండి...',
    sendMessage: 'సందేశం పంపండి',
    aiSuggestionHowToEnterTransaction: "నేను కొత్త లావాదేవీని ఎలా నమోదు చేయాలి?",
    aiSuggestionExplainDebitCredit: "డెబిట్ మరియు క్రెడిట్ అంటే ఏమిటో వివరించండి.",
    aiSuggestionExampleSales: "మీరు అమ్మకాల లావాదేవీకి ఉదాహరణ ఇవ్వగలరా?",
    aiSuggestionKeyFeatures: "ఈ యాప్ యొక్క ముఖ్య లక్షణాలు ఏమిటి?",
    aiSuggestionThemeSettings: "థీమ్ సెట్టింగ్ ఎలా పని చేస్తుంది?",
    stopListening: "వినడం ఆపు",
    useMicrophone: "మైక్రోఫోన్ ఉపయోగించండి",
    stopVoiceInput: "వాయిస్ ఇన్‌పుట్ ఆపు",
    startVoiceInput: "వాయిస్ ఇన్‌పుట్ ప్రారంభించండి",
    appearanceTheme: 'స్వరూప థీమ్',
    accentColor: 'ఉచ్చారణ రంగు',
    otherSettings: 'ఇతర సెట్టింగ్‌లు',
    selectPreferredLanguage: 'అప్లికేషన్ ఇంటర్‌ఫేస్ కోసం మీ ఇష్టపడే భాషను ఎంచుకోండి.',
    selectLanguageLabel: 'భాషను ఎంచుకోండి:',
    languageTranslationNote: 'గమనిక: పూర్తి అప్లికేషన్ కంటెంట్ అనువాదం కొనసాగుతున్న ప్రక్రియ. అనువాదాలు పూర్తయ్యే వరకు కొన్ని అంశాలు డిఫాల్ట్ భాషలో (ఇంగ్లీష్) కనిపించవచ్చు.',
    selectedLanguageText: 'ఎంచుకున్న భాష:',
    keyFeaturesSectionTitle: 'ఉపయోగించడానికి ముఖ్య లక్షణాలు',
  },
  'fr-FR': {
    home: 'Accueil',
    dashboard: 'Tableau de bord',
    aiAssistant: 'Assistant IA',
    howToUse: 'Comment utiliser',
    settings: 'Paramètres',
    language: 'Langue',
    extraFeatures: 'Fonctionnalités supplémentaires',
    privacyPolicy: 'Politique de confidentialité',
    about: 'À propos',
    settingsTitle: 'Paramètres',
    languageTitle: 'Paramètres de langue',
    extraFeaturesTitle: 'Fonctionnalités supplémentaires',
    howToUseTitle: 'Comment utiliser cette application',
    privacyPolicyTitle: 'Politique de confidentialité',
    aboutTitle: 'À propos de cette application',
    aiAssistantTitle: 'Assistant IA',
    getStartedButton: 'Commencer',
    welcomeToApp: 'Bienvenue dans le créateur d’écritures de journal IA !',
    enterTransactionDetailsPrompt: 'Saisissez les détails de la transaction ci-dessus et cliquez sur "Générer les écritures de journal" pour voir l\'IA en action.',
    trySampleButtonPrompt: 'Vous pouvez également utiliser les exemples de boutons pour remplir rapidement le formulaire.',
    generateJournalEntriesButton: 'Générer les écritures de journal',
    processingButton: 'En traitement...',
    aiAssistantWelcome: 'Bienvenue ! Comment puis-je vous aider aujourd\'hui ?',
    aiAssistantHint: 'Vous pouvez poser des questions sur l\'utilisation de l\'application ou des questions générales de comptabilité. Cliquez sur une suggestion ou tapez votre question ci-dessous.',
    aiAssistantSuggestions: 'Besoin d\'un point de départ ? Essayez de demander :',
    askAQuestionPlaceholder: 'Posez une question ou décrivez votre doute...',
    sendMessage: 'Envoyer le message',
    aiSuggestionHowToEnterTransaction: "Comment saisir une nouvelle transaction ?",
    aiSuggestionExplainDebitCredit: "Expliquez ce qu'est un débit et un crédit.",
    aiSuggestionExampleSales: "Pouvez-vous me donner un exemple de transaction de vente ?",
    aiSuggestionKeyFeatures: "Quelles sont les fonctionnalités clés de cette application ?",
    aiSuggestionThemeSettings: "Comment fonctionne le paramètre de thème ?",
    stopListening: "Arrêter d'écouter",
    useMicrophone: "Utiliser le microphone",
    stopVoiceInput: "Arrêter la saisie vocale",
    startVoiceInput: "Démarrer la saisie vocale",
    appearanceTheme: 'Thème d\'apparence',
    accentColor: 'Couleur d\'accentuation',
    otherSettings: 'Autres paramètres',
    selectPreferredLanguage: 'Sélectionnez votre langue préférée pour l\'interface de l\'application.',
    selectLanguageLabel: 'Choisir la langue:',
    languageTranslationNote: 'Remarque : La traduction complète du contenu de l\'application est un processus continu. Certains éléments peuvent encore apparaître dans la langue par défaut (anglais) jusqu\'à ce que les traductions soient terminées.',
    selectedLanguageText: 'Langue sélectionnée:',
    keyFeaturesSectionTitle: 'Fonctionnalités clés à utiliser',
  },
  'ml-IN': {
    home: 'ഹോം',
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    aiAssistant: 'AI അസിസ്റ്റന്റ്',
    howToUse: 'എങ്ങനെ ഉപയോഗിക്കാം',
    settings: 'ക്രമീകരണങ്ങൾ',
    language: 'ഭാഷ',
    extraFeatures: 'അധിക സവിശേഷതകൾ',
    privacyPolicy: 'സ്വകാര്യതാ നയം',
    about: 'ആമുഖം',
    settingsTitle: 'ക്രമീകരണങ്ങൾ',
    languageTitle: 'ഭാഷാ ക്രമീകരണങ്ങൾ',
    extraFeaturesTitle: 'അധിക സവിശേഷതകൾ',
    howToUseTitle: 'ഈ ആപ്പ് എങ്ങനെ ഉപയോഗിക്കാം',
    privacyPolicyTitle: 'സ്വകാര്യതാ നയം',
    aboutTitle: 'ഈ ആപ്ലിക്കേഷനെക്കുറിച്ച്',
    aiAssistantTitle: 'AI അസിസ്റ്റന്റ്',
    getStartedButton: 'തുടങ്ങുക',
    welcomeToApp: 'AI ജേണൽ എൻട്രി ക്രിയേറ്ററിലേക്ക് സ്വാഗതം!',
    enterTransactionDetailsPrompt: 'ഇടപാട് വിശദാംശങ്ങൾ മുകളിൽ നൽകി "ജേണൽ എൻട്രികൾ സൃഷ്ടിക്കുക" ക്ലിക്ക് ചെയ്ത് AI പ്രവർത്തനക്ഷമമാക്കുന്നത് കാണുക.',
    trySampleButtonPrompt: 'ഫോം വേഗത്തിൽ പൂരിപ്പിക്കാൻ നിങ്ങൾക്ക് സാമ്പിൾ ബട്ടണുകളും ഉപയോഗിക്കാം.',
    generateJournalEntriesButton: 'ജേണൽ എൻട്രികൾ സൃഷ്ടിക്കുക',
    processingButton: 'പ്രോസസ്സ് ചെയ്യുന്നു...',
    aiAssistantWelcome: 'സ്വാഗതം! ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?',
    aiAssistantHint: 'ആപ്പ് ഉപയോഗിക്കുന്നതിനെക്കുറിച്ചോ പൊതുവായ അക്കൗണ്ടിംഗ് ചോദ്യങ്ങളെക്കുറിച്ചോ നിങ്ങൾക്ക് ചോദിക്കാം. ഒരു നിർദ്ദേശത്തിൽ ക്ലിക്ക് ചെയ്യുക അല്ലെങ്കിൽ നിങ്ങളുടെ ചോദ്യം താഴെ ടൈപ്പ് ചെയ്യുക.',
    aiAssistantSuggestions: 'തുടങ്ങാൻ ഒരു സഹായം വേണോ? ഇങ്ങനെ ചോദിച്ചുനോക്കൂ:',
    askAQuestionPlaceholder: 'ഒരു ചോദ്യം ചോദിക്കുക അല്ലെങ്കിൽ നിങ്ങളുടെ സംശയം വിവരിക്കുക...',
    sendMessage: 'സന്ദേശം അയക്കുക',
    aiSuggestionHowToEnterTransaction: "ഞാൻ എങ്ങനെ ഒരു പുതിയ ഇടപാട് രേഖപ്പെടുത്തും?",
    aiSuggestionExplainDebitCredit: "ഡെബിറ്റും ക്രെഡിറ്റും എന്താണെന്ന് വിശദീകരിക്കാമോ?",
    aiSuggestionExampleSales: "ഒരു വിൽപ്പന ഇടപാടിന് ഉദാഹരണം തരാമോ?",
    aiSuggestionKeyFeatures: "ഈ ആപ്പിന്റെ പ്രധാന സവിശേഷതകൾ എന്തൊക്കെയാണ്?",
    aiSuggestionThemeSettings: "തീം ക്രമീകരണം എങ്ങനെയാണ് പ്രവർത്തിക്കുന്നത്?",
    stopListening: "ശ്രവിക്കുന്നത് നിർത്തുക",
    useMicrophone: "മൈക്രോഫോൺ ഉപയോഗിക്കുക",
    stopVoiceInput: "വോയിസ് ഇൻപുട്ട് നിർത്തുക",
    startVoiceInput: "വോയിസ് ഇൻപുട്ട് ആരംഭിക്കുക",
    appearanceTheme: 'പ്രത്യക്ഷീകരണ തീം',
    accentColor: 'ഊന്നൽ നിറം',
    otherSettings: 'മറ്റ് ക്രമീകരണങ്ങൾ',
    selectPreferredLanguage: 'ആപ്ലിക്കേഷൻ ഇന്റർഫേസിനായി നിങ്ങൾ തിരഞ്ഞെടുത്ത ഭാഷ തിരഞ്ഞെടുക്കുക.',
    selectLanguageLabel: 'ഭാഷ തിരഞ്ഞെടുക്കുക:',
    languageTranslationNote: 'ശ്രദ്ധിക്കുക: പൂർണ്ണമായ ആപ്ലിക്കേഷൻ ഉള്ളടക്ക വിവർത്തനം ഒരു തുടർ പ്രക്രിയയാണ്. വിവർത്തനങ്ങൾ പൂർത്തിയാകുന്നതുവരെ ചില ഘടകങ്ങൾ സ്ഥിരസ്ഥിതി ഭാഷയിൽ (ഇംഗ്ലീഷ്) ദൃശ്യമായേക്കാം.',
    selectedLanguageText: 'തിരഞ്ഞെടുത്ത ഭാഷ:',
    keyFeaturesSectionTitle: 'ഉപയോഗിക്കേണ്ട പ്രധാന സവിശേഷതകൾ',
  },
  'de-DE': {
    home: 'Startseite',
    dashboard: 'Dashboard',
    aiAssistant: 'KI-Assistent',
    howToUse: 'Anwendung',
    settings: 'Einstellungen',
    language: 'Sprache',
    extraFeatures: 'Zusatzfunktionen',
    privacyPolicy: 'Datenschutz',
    about: 'Über',
    settingsTitle: 'Einstellungen',
    languageTitle: 'Spracheinstellungen',
    extraFeaturesTitle: 'Zusatzfunktionen',
    howToUseTitle: 'So verwenden Sie diese App',
    privacyPolicyTitle: 'Datenschutz-Bestimmungen',
    aboutTitle: 'Über diese Anwendung',
    aiAssistantTitle: 'KI-Assistent',
    getStartedButton: 'Loslegen',
    welcomeToApp: 'Willkommen beim KI-Journal-Entry-Creator!',
    enterTransactionDetailsPrompt: 'Geben Sie oben Transaktionsdetails ein und klicken Sie auf "Journaleinträge generieren", um die KI in Aktion zu sehen.',
    trySampleButtonPrompt: 'Sie können auch die Beispielschaltflächen verwenden, um das Formular schnell auszufüllen.',
    generateJournalEntriesButton: 'Journaleinträge erstellen',
    processingButton: 'Verarbeite...',
    aiAssistantWelcome: 'Willkommen! Wie kann ich Ihnen heute helfen?',
    aiAssistantHint: 'Sie können Fragen zur Verwendung der App oder allgemeine Fragen zur Buchhaltung stellen. Klicken Sie auf einen Vorschlag oder geben Sie Ihre Frage unten ein.',
    aiAssistantSuggestions: 'Brauchen Sie einen Ausgangspunkt? Versuchen Sie zu fragen:',
    askAQuestionPlaceholder: 'Stellen Sie eine Frage oder beschreiben Sie Ihren Zweifel...',
    sendMessage: 'Nachricht senden',
    aiSuggestionHowToEnterTransaction: "Wie gebe ich eine neue Transaktion ein?",
    aiSuggestionExplainDebitCredit: "Erklären Sie, was Soll und Haben sind.",
    aiSuggestionExampleSales: "Können Sie mir ein Beispiel für eine Verkaufstransaktion geben?",
    aiSuggestionKeyFeatures: "Was sind die Hauptfunktionen dieser App?",
    aiSuggestionThemeSettings: "Wie funktioniert die Themeneinstellung?",
    stopListening: "Hören aufhören",
    useMicrophone: "Mikrofon verwenden",
    stopVoiceInput: "Spracheingabe stoppen",
    startVoiceInput: "Spracheingabe starten",
    appearanceTheme: 'Erscheinungsbild-Theme',
    accentColor: 'Akzentfarbe',
    otherSettings: 'Andere Einstellungen',
    selectPreferredLanguage: 'Wählen Sie Ihre bevorzugte Sprache für die Anwendungsoberfläche.',
    selectLanguageLabel: 'Sprache auswählen:',
    languageTranslationNote: 'Hinweis: Die vollständige Übersetzung des Anwendungsinhalts ist ein fortlaufender Prozess. Einige Elemente werden möglicherweise weiterhin in der Standardsprache (Englisch) angezeigt, bis die Übersetzungen abgeschlossen sind.',
    selectedLanguageText: 'Ausgewählte Sprache:',
    keyFeaturesSectionTitle: 'Wichtige Funktionen zur Verwendung',
  },
};

export const getTranslation = (langCode: string, key: string, fallbackLangCode: string = 'en-US'): string => {
  const langPack = appTranslations[langCode] || appTranslations[fallbackLangCode];
  // Fallback to English if key not in current lang, then to key itself
  return langPack[key] || appTranslations[fallbackLangCode][key] || key;
};

// Helper to get all translations for a given language, useful for contexts
export const getTranslationsForLanguage = (langCode: string, fallbackLangCode: string = 'en-US'): Translations => {
    return appTranslations[langCode] || appTranslations[fallbackLangCode];
};
