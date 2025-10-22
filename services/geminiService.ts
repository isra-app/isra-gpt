
import { GoogleGenAI, Chat } from "@google/genai";
import { MODEL_NAME, SYSTEM_INSTRUCTION } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export function createChatSession(): Chat {
    const chat = ai.chats.create({
        model: MODEL_NAME,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        },
    });
    return chat;
}
