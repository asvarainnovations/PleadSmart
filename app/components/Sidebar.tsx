'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftIcon, 
  Cog6ToothIcon, 
  PlusIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { useMediaQuery } from 'react-responsive';

interface Conversation {
  id: string;
  title: string;
  date: string;
}

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: '1', title: 'Case Analysis: Smith vs. State', date: '2024-03-20' },
    { id: '2', title: 'Legal Research: Property Law', date: '2024-03-19' },
  ]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className={`sidebar ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
      initial={false}
      animate={{ width: isExpanded ? 256 : 64 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex flex-col h-full">
        {/* Mobile Toggle Button */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 m-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        )}

        {/* New Chat Button */}
        <button
          className="flex items-center gap-2 p-3 m-2 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={() => {/* Handle new chat */}}
        >
          <PlusIcon className="w-6 h-6" />
          {isExpanded && <span>New Chat</span>}
        </button>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <motion.div
              key={conv.id}
              className="p-3 m-2 rounded-lg hover:bg-gray-700 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <ChatBubbleLeftIcon className="w-5 h-5" />
                {isExpanded && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{conv.title}</p>
                    <p className="text-xs text-gray-400">{conv.date}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Settings Button */}
        <button
          className="flex items-center gap-2 p-3 m-2 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={() => {/* Handle settings */}}
        >
          <Cog6ToothIcon className="w-6 h-6" />
          {isExpanded && <span>Settings</span>}
        </button>
      </div>
    </motion.div>
  );
} 