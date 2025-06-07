'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatMessage from './ChatMessage';
import InputBar from './InputBar';
import { Toaster } from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to PleadSmart! How can I help you with your legal research today?',
      isUser: false,
      timestamp: 'Just now',
    },
  ]);

  const handleSendMessage = (content: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: timeString,
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I am analyzing your query. Please give me a moment to provide a comprehensive response.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#121212]">
      <Toaster position="bottom-right" />
      <Sidebar />
      
      <main className="flex-1 flex flex-col ml-16">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
          </div>
        </div>
        
        <div className="p-4">
          <InputBar onSendMessage={handleSendMessage} />
        </div>
      </main>
    </div>
  );
} 