import React, { useState } from 'react'
import Button from './common/Button';
import { Loader2 } from 'lucide-react';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage = { role: 'user', content: input.trim() };
    setMessages([...messages, newMessage]);
    setInput('');
    setIsLoading(true);

    // API CALL: Send message to AI chatbot - POST /api/chat
    // This would integrate with Google Gemini or your AI service
    setTimeout(() => {
      const response = { 
        role: 'assistant', 
        content: 'This is a demo response. Integrate with Gemini AI API for real responses.' 
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md rounded-lg p-3 ${
              msg.role === 'user' 
                ? 'bg-[#86c537] text-white' 
                : 'bg-white text-gray-800 shadow-md'
            }`}>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-3 shadow-md">
              <Loader2 className="w-5 h-5 animate-spin text-[#86c537]" />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86c537]"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="px-6">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessagesPage
