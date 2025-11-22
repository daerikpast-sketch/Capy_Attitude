import { GoogleGenAI } from "@google/genai";

// Helper to convert base64 to data URL
const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export const generateCapybaraImage = async (userPrompt: string, style: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // We rigorously enforce the "middle finger" constraint in the system prompt logic
  // by embedding it into the prompt sent to the model.
  const enforcedPrompt = `
    Subject: A detailed, high-quality image of a Capybara.
    Context/Outfit/Activity: ${userPrompt}.
    CRITICAL VISUAL REQUIREMENT: The Capybara is visibly raising its middle finger directly at the viewer. The gesture must be clear, prominent, and unmistakable. The Capybara has a rude attitude.
    Style: ${style}. High resolution, artistic composition.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: enforcedPrompt,
          },
        ],
      },
      config: {
        // Using standard aspect ratio
        imageConfig: {
          aspectRatio: "1:1", 
        },
      },
    });

    // Iterate through parts to find the image
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
            // The API returns the raw base64 string without the prefix
            return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};