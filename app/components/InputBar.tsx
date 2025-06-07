'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const COMMON_PROMPTS = [
  'Summarize this judgment',
  'List similar cases',
  'Explain the legal reasoning',
  'Find relevant precedents',
  'Analyze the verdict',
];

interface InputBarProps {
  onSendMessage: (message: string) => void;
}

export default function InputBar({ onSendMessage }: InputBarProps) {
  const [message, setMessage] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(-1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (message.startsWith('/')) {
      setShowPrompts(true);
    } else {
      setShowPrompts(false);
      setSelectedPromptIndex(-1);
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showPrompts) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedPromptIndex((prev) => 
          prev < COMMON_PROMPTS.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedPromptIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter' && selectedPromptIndex >= 0) {
        e.preventDefault();
        setMessage(COMMON_PROMPTS[selectedPromptIndex]);
        setShowPrompts(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleVoiceInput = () => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
      };

      recognition.start();
    } else {
      console.error('Speech recognition not supported');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-bar">
      <div className="relative max-w-4xl mx-auto">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your legal query..."
          className="w-full p-4 pr-24 rounded-lg bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
          rows={1}
          style={{ minHeight: '56px', maxHeight: '200px' }}
        />
        
        <div className="absolute right-2 bottom-2 flex gap-2">
          {isMobile && (
            <button
              type="button"
              onClick={handleVoiceInput}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <MicrophoneIcon className="w-5 h-5" />
            </button>
          )}
          <button
            type="submit"
            className="p-2 rounded-lg bg-[#2979FF] hover:bg-[#1a68e8] transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>

        {showPrompts && (
          <motion.div
            className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {COMMON_PROMPTS.map((prompt, index) => (
              <button
                key={prompt}
                className={`w-full p-2 text-left hover:bg-gray-700 ${
                  index === selectedPromptIndex ? 'bg-gray-700' : ''
                }`}
                onClick={() => {
                  setMessage(prompt);
                  setShowPrompts(false);
                }}
              >
                {prompt}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </form>
  );
} 