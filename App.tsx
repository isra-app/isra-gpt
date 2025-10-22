
import React, { useState } from 'react';
import Chat from './components/Chat';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = () => {
    setShowChat(true);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center font-sans p-4">
      {showChat ? (
        <>
          <header className="text-center mb-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-[#158C6E]">
              ISRA GPT
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Your AI assistant for Fiqh, Hadeeth, Thafseer, and Seerah
            </p>
          </header>
          <Chat />
        </>
      ) : (
        <WelcomeScreen onStartChat={handleStartChat} />
      )}
    </div>
  );
};

export default App;