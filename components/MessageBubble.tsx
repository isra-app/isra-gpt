import React from 'react';
import { type Message, Role } from '../types';

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === Role.USER;

    // A simple markdown-to-html converter for bold text and lists.
    const formatText = (text: string) => {
        const lines = text.split('\n').map((line, index) => {
            // Bold text
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Unordered list items
            if (line.trim().startsWith('* ')) {
                return `<li class="ml-4 list-disc">${line.trim().substring(2)}</li>`;
            }
             // Ordered list items
            if (line.match(/^\d+\.\s/)) {
                 return `<li class="ml-4 list-decimal">${line.replace(/^\d+\.\s/, '')}</li>`;
            }
            return line;
        });

        // Wrap list items in <ul> or <ol>
        let html = '';
        let inUl = false;
        let inOl = false;

        for (const line of lines) {
            if (line.startsWith('<li class="ml-4 list-disc">')) {
                if (!inUl) {
                    html += '<ul class="list-inside my-2">';
                    inUl = true;
                }
                if (inOl) {
                    html += '</ol>';
                    inOl = false;
                }
                html += line;
            } else if (line.startsWith('<li class="ml-4 list-decimal">')) {
                if (!inOl) {
                    html += '<ol class="list-inside my-2">';
                    inOl = true;
                }
                if (inUl) {
                    html += '</ul>';
                    inUl = false;
                }
                html += line;
            } else {
                 if (inUl) {
                    html += '</ul>';
                    inUl = false;
                }
                if (inOl) {
                    html += '</ol>';
                    inOl = false;
                }
                html += `<p>${line}</p>`;
            }
        }
        if (inUl) html += '</ul>';
        if (inOl) html += '</ol>';
        
        return html;
    };


    if (!message.text && message.role === Role.MODEL) {
        return null; // Don't render empty placeholder for model
    }
    
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div 
                className={`prose max-w-md rounded-2xl p-4 ${isUser ? 'bg-[#158C6E] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
                dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
            >
            </div>
        </div>
    );
};

export default MessageBubble;