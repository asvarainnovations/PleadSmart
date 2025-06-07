'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatMessage({ content, isUser, timestamp }: ChatMessageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Message copied to clipboard');
    } catch {
      toast.error('Failed to copy message');
    }
  };

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group">
        <div
          className={`chat-bubble ${
            isUser ? 'chat-bubble-user' : 'chat-bubble-ai'
          }`}
        >
          <div className="prose prose-invert max-w-none">
            {content}
          </div>
          <div className="text-xs text-gray-400 mt-1">{timestamp}</div>
        </div>
        
        {isHovered && (
          <motion.button
            className="absolute top-2 right-2 p-1 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleCopy}
          >
            <ClipboardIcon className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
} 