import React, { useState, useEffect, useRef, useCallback } from 'react';
import { type Chat as GeminiChat } from "@google/genai";
import { createChatSession } from '../services/geminiService';
import { type Message, Role } from '../types';
import MessageBubble from './MessageBubble';
import LoadingSpinner from './LoadingSpinner';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const chatSessionRef = useRef<GeminiChat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatSessionRef.current = createChatSession();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chatSessionRef.current) return;
        
        setIsLoading(true);
        setError(null);
        
        const userMessage: Message = { id: Date.now().toString(), role: Role.USER, text: userInput.trim() };
        setMessages(prev => [...prev, userMessage]);
        
        const modelMessageId = (Date.now() + 1).toString();
        // Add a placeholder for the model's response
        setMessages(prev => [...prev, { id: modelMessageId, role: Role.MODEL, text: '' }]);

        try {
            const stream = await chatSessionRef.current.sendMessageStream({ message: userInput.trim() });
            setUserInput('');
            
            let accumulatedText = "";
            for await (const chunk of stream) {
                accumulatedText += chunk.text;
                setMessages(prev => 
                    prev.map(msg => 
                        msg.id === modelMessageId ? { ...msg, text: accumulatedText } : msg
                    )
                );
            }

        } catch (err) {
            console.error(err);
            const errorMessage = "Sorry, I encountered an error. Please try again.";
            setError(errorMessage);
            setMessages(prev => 
                prev.map(msg => 
                    msg.id === modelMessageId ? { ...msg, text: errorMessage } : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    }, [userInput, isLoading]);

    return (
        <div className="w-full max-w-3xl h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
            <div className="flex-grow p-6 overflow-y-auto space-y-6">
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                {isLoading && messages[messages.length-1]?.role === Role.MODEL && (
                    <div className="flex justify-start items-center">
                       <div className="flex items-center space-x-2 bg-gray-100 text-gray-800 rounded-lg p-3 max-w-md rounded-bl-none">
                            <LoadingSpinner />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            {error && <div className="p-4 text-center text-red-500 bg-red-100 border-t border-gray-200">{error}</div>}
            <form onSubmit={handleSendMessage} className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex items-center gap-4">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#158C6E] transition-shadow bg-white text-gray-800 placeholder:text-gray-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className="bg-[#158C6E] text-white p-3 rounded-full hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default Chat;