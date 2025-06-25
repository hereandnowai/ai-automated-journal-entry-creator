
import { GoogleGenAI, GenerateContentResponse, Chat, FinishReason } from "@google/genai";
import { GeneratedJournalEntry, GeminiApiResponse, ChatMessage as AppChatMessage } from '../types'; // Renamed ChatMessage to avoid conflict
import { GEMINI_MODEL_NAME, GEMINI_API_TEMPERATURE, COMPANY_DETAILS, GEMINI_AI_ASSISTANT_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set. Please set it to use the Gemini API.");
  // It's better to throw an error or handle this state in the UI rather than just logging
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
let activeChat: Chat | null = null; // Store active chat session

// --- Centralized AI Assistant System Instruction ---
const AI_ASSISTANT_SYSTEM_INSTRUCTION = `You are an expert AI Accounting Assistant for ${COMPANY_DETAILS.name}. 
Your role is to help users understand and use the "AI Automated Journal Entry Creator" application and clarify general accounting doubts.
Be friendly, helpful, and provide detailed, relevant, and well-structured answers.
When asked about the app, guide them on its features: Home (landing page), Dashboard (for entering transaction details), AI Assistant (yourself), How to Use, Settings (Theme, Accent Color), Language, Privacy Policy, About.
When asked about accounting, explain concepts clearly.
If a question is ambiguous, ask for clarification.
If you don't know an answer, say so. Do not make up information.
Provide suggestions on how to best formulate transaction descriptions for the journal entry AI if asked.
Keep your responses concise but comprehensive. Use markdown for formatting if it helps readability (e.g., bullet points, bolding).
The user is interacting with you via a chat interface in the application.

IMPORTANT - VERY IMPORTANT: Your primary answer should be complete first. Then, as a separate and final part of your response, ALWAYS provide 3 to 4 distinct, actionable, and relevant suggestions for what the user could ask or do next. Introduce these suggestions clearly, for example, start with a phrase like "Here are some things you could explore:" or "Next, you might want to:". List each suggestion as a bullet point. These suggestions should help the user discover more about the app or related accounting topics. For instance:

"Next, you might want to:
- Ask me to explain how to use the Dashboard for entering transactions.
- Inquire about the different themes available in Settings.
- Get details on how your data is handled by checking the Privacy Policy.
- Find out how to change the application language."

Ensure these suggestions are clearly separated from your main response content.

Do not ask for or discuss the user's API key.
Current date: ${new Date().toDateString()}`;


function buildJournalEntryPrompt(transactionData: string): string {
  return `
Analyze the following business transaction(s) for the company "${COMPANY_DETAILS.name}" and generate journal entries.

Transaction Data:
---
${transactionData}
---

Output Format Requirements:
For each transaction, provide a JSON object adhering to the following structure. If multiple transactions are inferred from the input, return a JSON array of these objects. Ensure the response is ONLY the JSON, without any surrounding text or markdown.

[
  {
    "entryDate": "YYYY-MM-DD", 
    "referenceNumber": "UniqueRefGeneratedByAI-XXXX",
    "lines": [
      {
        "accountCode": "ACT-CODE", 
        "accountDescription": "e.g., Cash, Accounts Receivable, Sales Revenue",
        "debit": 100.00, 
        "credit": null  
      },
      {
        "accountCode": "ACT-CODE",
        "accountDescription": "e.g., Office Supplies Expense",
        "debit": null,
        "credit": 100.00
      }
    ],
    "transactionDescription": "Detailed description of the overall transaction based on input.",
    "confidenceLevel": 0.95, 
    "reviewFlags": ["Flag1", "Flag2"], 
    "sourceDocumentReferences": ["Ref1", "Ref2"], 
    "explanation": "Brief explanation of how the journal entry was derived, including categorization logic and any assumptions made."
  }
]

Core Functionalities to Apply:
- Parse and categorize transaction types.
- Extract key data points.
- Create double-entry bookkeeping entries following GAAP/IFRS principles.
- Auto-assign appropriate account codes and descriptions.
- Generate compound entries.
- Handle accruals and deferrals if evident.
- Ensure debit/credit balance accuracy.
- Identify and flag unusual transactions.
- Provide a confidence score.
- Maintain source document references.

Company Context: The journal entries are for '${COMPANY_DETAILS.name}'.

Process the transaction data and provide ONLY the JSON output as specified.
`;
}

export const generateJournalEntries = async (transactionData: string): Promise<GeneratedJournalEntry[]> => {
  if (!API_KEY) {
    throw new Error("API_KEY for Gemini is not configured. Please set the process.env.API_KEY environment variable.");
  }

  const model = GEMINI_MODEL_NAME;
  const prompt = buildJournalEntryPrompt(transactionData);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: GEMINI_API_TEMPERATURE,
        responseMimeType: "application/json",
      },
    });

    let jsonStr = response.text.trim();
    
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData: GeminiApiResponse = JSON.parse(jsonStr);

    if (Array.isArray(parsedData)) {
      return parsedData as GeneratedJournalEntry[];
    } else if (typeof parsedData === 'object' && parsedData !== null) {
      return [parsedData as GeneratedJournalEntry];
    } else {
       console.error("Parsed data is not an array or a valid object:", parsedData);
      throw new Error("Invalid JSON structure received from API. Expected an array or a single entry object.");
    }

  } catch (error) {
    console.error("Error generating journal entries:", error);
    if (error instanceof Error) {
        const geminiError = error as any;
        if (geminiError.message && geminiError.message.includes("API key not valid")) {
             throw new Error("Invalid API Key. Please check your Gemini API key.");
        }
         if (geminiError.message && geminiError.message.includes("quota")) {
             throw new Error("API quota exceeded. Please check your Gemini API usage.");
        }
         // Check for safety blocks
        if (geminiError.response?.promptFeedback?.blockReason) {
            throw new Error(`Request blocked due to: ${geminiError.response.promptFeedback.blockReason}. Please revise your input.`);
        }
        if (geminiError.message.includes("JSON")) { // More generic JSON parsing error
            throw new Error("Received an invalid JSON response from the AI. The AI might have provided a non-JSON answer or an error message.");
        }
        throw new Error(`Failed to generate journal entries: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating journal entries.");
  }
};


// --- AI Assistant Chat Function ---
const getAIChatSession = (): Chat => {
  if (!activeChat) {
     activeChat = ai.chats.create({
        model: GEMINI_AI_ASSISTANT_MODEL_NAME,
        config: {
          temperature: 0.7, // Slightly more creative for chat
          systemInstruction: AI_ASSISTANT_SYSTEM_INSTRUCTION,
        },
      });
  }
  return activeChat;
}

export const getAIAssistantResponse = async (userMessage: string, history: AppChatMessage[]): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API_KEY for Gemini is not configured.");
  }
  
  // Transform app history to Gemini history format
  const geminiHistory = history.map(h => ({
    role: h.role,
    parts: h.parts,
  }));

  try {
    // Create a new chat session with full history for each turn for robustness
    const currentChat = ai.chats.create({ 
        model: GEMINI_AI_ASSISTANT_MODEL_NAME,
        config: {
          temperature: 0.7,
          systemInstruction: AI_ASSISTANT_SYSTEM_INSTRUCTION,
        },
        history: geminiHistory // Pass the existing conversation history
      });


    const response: GenerateContentResponse = await currentChat.sendMessage({ message: userMessage });

    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates[0].finishReason === FinishReason.SAFETY) {
        return "I'm sorry, I cannot respond to that due to safety guidelines. Please try a different question.";
      }
      return response.text;
    } else {
      return "I'm sorry, I couldn't generate a response. Please try again.";
    }
  } catch (error) {
    console.error("Error getting AI assistant response:", error);
     if (error instanceof Error) {
        const geminiError = error as any;
        if (geminiError.message && geminiError.message.includes("API key not valid")) {
             return "Error: Invalid API Key for AI Assistant.";
        }
        if (geminiError.response?.promptFeedback?.blockReason) {
            return `Assistant Response blocked: ${geminiError.response.promptFeedback.blockReason}.`;
        }
        return `Error communicating with AI Assistant: ${error.message}`;
    }
    return "An unknown error occurred with the AI Assistant.";
  }
};
