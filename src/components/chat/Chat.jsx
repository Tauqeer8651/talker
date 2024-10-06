import React, { useState, useEffect } from 'react';
import {database, ref, onValue, push} from './firebase'
import './chat.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    // Listen for updates to the messages in the database
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      } else {
        setMessages([]);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const messagesRef = ref(database, 'messages');
      // Push the new message to the database
      push(messagesRef, inputMessage)
        .then(() => {
          setInputMessage('');
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
      
    }
  };

  return (
    <div className="chat-box-container">
      <div className="chat-box-chat-container">
        {messages.map((message, index) => (
          <div key={index} className="chat-box-message">
            {message}
          </div>
        ))}
      </div>
      <div className="chat-box-input-container">
        <input
          id="chat-message-input" // Added id attribute
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="chat-box-input"
        />
        <button onClick={handleSendMessage} className="chat-box-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
