
import { CompanyDetails, Theme, AccentColor, LanguageOption } from './types';

export const COMPANY_DETAILS: CompanyDetails = {
  name: "HEREANDNOW AI RESEARCH INSTITUTE",
  logoUrl: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Fevicon%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-03.png",
  heroImageUrl: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png"
};

export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";
export const GEMINI_API_TEMPERATURE = 0.2;
export const GEMINI_AI_ASSISTANT_MODEL_NAME = "gemini-2.5-flash-preview-04-17";

export const THEMES: { name: string, value: Theme }[] = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'System', value: 'system' },
];

export const ACCENT_COLORS: { name: string, value: AccentColor, primaryColorClass: string, hoverColorClass: string, ringColorClass: string, textColorClass: string, bgColorClass: string, borderColorClass: string }[] = [
  { name: 'Teal', value: 'teal', primaryColorClass: 'bg-teal-600', hoverColorClass: 'hover:bg-teal-700', ringColorClass: 'focus:ring-teal-500', textColorClass: 'text-teal-600', bgColorClass: 'bg-teal-50', borderColorClass: 'border-teal-500' },
  { name: 'Blue', value: 'blue', primaryColorClass: 'bg-blue-600', hoverColorClass: 'hover:bg-blue-700', ringColorClass: 'focus:ring-blue-500', textColorClass: 'text-blue-600', bgColorClass: 'bg-blue-50', borderColorClass: 'border-blue-500' },
  { name: 'Purple', value: 'purple', primaryColorClass: 'bg-purple-600', hoverColorClass: 'hover:bg-purple-700', ringColorClass: 'focus:ring-purple-500', textColorClass: 'text-purple-600', bgColorClass: 'bg-purple-50', borderColorClass: 'border-purple-500' },
  { name: 'Green', value: 'green', primaryColorClass: 'bg-green-600', hoverColorClass: 'hover:bg-green-700', ringColorClass: 'focus:ring-green-500', textColorClass: 'text-green-600', bgColorClass: 'bg-green-50', borderColorClass: 'border-green-500' },
  { name: 'Orange', value: 'orange', primaryColorClass: 'bg-orange-600', hoverColorClass: 'hover:bg-orange-700', ringColorClass: 'focus:ring-orange-500', textColorClass: 'text-orange-600', bgColorClass: 'bg-orange-50', borderColorClass: 'border-orange-500' },
];

export const LANGUAGES: LanguageOption[] = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'ta-IN', name: 'தமிழ் (Tamil)' },
  { code: 'te-IN', name: 'తెలుగు (Telugu)' },
  { code: 'fr-FR', name: 'Français (French)' },
  { code: 'ml-IN', name: 'മലയാളം (Malayalam)' },
  { code: 'de-DE', name: 'Deutsch (German)' },
];

export const DEFAULT_ACCENT_COLOR = ACCENT_COLORS[0]; // Teal
export const DEFAULT_LANGUAGE = LANGUAGES[0]; // English (US)
