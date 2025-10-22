import React from 'react';

interface WelcomeScreenProps {
    onStartChat: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
    return (
        <div className="w-full max-w-3xl h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center p-8 border border-gray-200 animate-fade-in">
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
            
            <div className="mb-4">
                <svg className="w-16 h-16 text-[#158C6E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#158C6E] mb-3 leading-tight">
                <span className="block text-2xl md:text-3xl font-normal text-gray-600">Welcome to</span>
                ISRA GPT
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
                Your personal AI assistant for Islamic knowledge.
            </p>

            <div className="space-y-2 mb-8 text-gray-700">
                <p>Ask me about:</p>
                <div className="flex flex-wrap justify-center gap-2">
                    <span className="bg-gray-100 text-[#158C6E] px-3 py-1 rounded-full text-sm font-medium">Fiqh</span>
                    <span className="bg-gray-100 text-[#158C6E] px-3 py-1 rounded-full text-sm font-medium">Hadeeth</span>
                    <span className="bg-gray-100 text-[#158C6E] px-3 py-1 rounded-full text-sm font-medium">Thafseer</span>
                    <span className="bg-gray-100 text-[#158C6E] px-3 py-1 rounded-full text-sm font-medium">Seerah</span>
                </div>
            </div>

            <button
                onClick={onStartChat}
                className="bg-[#158C6E] text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
            >
                Start Chatting
            </button>
        </div>
    );
};

export default WelcomeScreen;