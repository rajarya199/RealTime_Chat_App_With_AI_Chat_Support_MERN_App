import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const generateResult = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",  
    contents: prompt,          
  });

  return response.text;
}
