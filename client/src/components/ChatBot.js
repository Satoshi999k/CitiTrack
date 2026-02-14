import React, { useState, useRef, useEffect } from 'react';
import {
  Close as CloseIcon,
  Send as SendIcon,
  Engineering as EngineeringIcon,
} from '@mui/icons-material';
import './ChatBot.css';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm CitiTrack's ChatBot Assistant. I'm here to help answer your questions about the CitiTrack infrastructure reporting system. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Suggestion questions for users
  const suggestions = [
    "What is CitiTrack?",
    "How to report an issue?",
    "How to sign up?",
    "How to track my report?",
    "What issues can I report?",
    "How does GPS mapping work?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // Trigger message sending after state update
    setTimeout(() => {
      sendMessage(suggestion);
    }, 0);
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log('Sending message:', messageText);
      
      const response = await fetch('http://localhost:5003/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!data || !data.reply) {
        throw new Error('Invalid response from server');
      }

      const botMessage = {
        id: messages.length + 2,
        text: data.reply,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error.message);
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm experiencing technical difficulties. Please try again later. Make sure the backend server is running on http://localhost:5003",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    sendMessage(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          className="chatbot-toggle-btn"
          onClick={() => setIsOpen(true)}
          title="Open Construction Assistant"
        >
          <EngineeringIcon />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <EngineeringIcon className="chatbot-icon" />
              <span>CitiTrack ChatBot Assistant</span>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              title="Close"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.sender === 'bot' && <EngineeringIcon className="bot-avatar-icon" />}
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Show suggestions only when there's just the initial bot message */}
            {messages.length === 1 && (
              <div className="chatbot-suggestions">
                <p className="suggestions-label">Quick questions:</p>
                <div className="suggestions-grid">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-btn"
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={isLoading}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="message bot-message">
                <EngineeringIcon className="bot-avatar-icon" />
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <textarea
              type="text"
              className="chatbot-input"
              placeholder="Ask me anything about CitiTrack..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              rows="2"
            />
            <button
              className="chatbot-send-btn"
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              title="Send message"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
