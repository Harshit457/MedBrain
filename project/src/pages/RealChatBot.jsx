import React, { useState } from 'react';
import { MessageCircle, Send, Stethoscope } from 'lucide-react';

export function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setIsLoading(true);
    console.log(input)
    try {
      const response = await fetch('http://localhost:5001/api/content', {
        method: 'POST', // Change to POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.result, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { text: "I'm sorry, I couldn't process your request at the moment.", isUser: false }]);
    }

    setIsLoading(false);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 shadow-lg shadow-gray-300">
      {/* Header */}
      <div className="bg-blue-600 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-center items-center gap-2">
          <Stethoscope className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white ">MedBrain Assistant</h1>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-4 shadow-2xl rounded-md shadow-blue-300">
        <div className="bg-white rounded-lg  min-h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <p>Start a conversation with your healthcare assistant</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 text-gray-800 rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.3s]" />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.5s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your symptoms..."
                className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
