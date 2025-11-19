import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a humorous excuse or status update in Bulgarian explaining why the site isn't ready.
 */
export const generateConstructionUpdate = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate a short, witty, and technical humorous excuse (one sentence) for why a website is still under construction. Translate it directly into informal but polite Bulgarian. Examples of tone: "The developers are stuck in Vim", "Waiting for the CSS to center".',
      config: {
        temperature: 1.2, // High creativity for humor
        maxOutputTokens: 100,
      }
    });

    return response.text || "Сървърът почива за малко. Опитайте пак.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI бригадирът е в почивка. Моля, опитайте по-късно.";
  }
};
