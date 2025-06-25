
export interface CompanyDetails {
  name: string;
  logoUrl: string;
  heroImageUrl?: string; 
}

export interface JournalEntryLine {
  accountCode: string;
  accountDescription: string;
  debit: number | null;
  credit: number | null;
}

export interface GeneratedJournalEntry {
  entryDate: string; 
  referenceNumber: string;
  lines: JournalEntryLine[];
  transactionDescription: string;
  confidenceLevel: number; 
  reviewFlags: string[];
  sourceDocumentReferences: string[];
  explanation: string;
}

export type GeminiApiResponse = GeneratedJournalEntry | GeneratedJournalEntry[];

// --- New Types ---
export type Theme = 'light' | 'dark' | 'system';
export type AccentColor = 'teal' | 'blue' | 'purple' | 'green' | 'orange';

export interface LanguageOption {
  code: string; // e.g., 'en', 'ta'
  name: string; // e.g., 'English', 'Tamil'
}

export interface AIAssistantMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatMessage { // For Gemini chat history
  role: "user" | "model";
  parts: { text: string }[];
}