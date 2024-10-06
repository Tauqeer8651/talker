import React, { useState, useEffect } from 'react';
import { database, ref, onValue, push } from './firebase';
import './chat.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, 'messages');

    // Listen for updates to the messages in the database
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const newMessages = data ? Object.values(data) : [];

      // Check for new messages to alert
      if (newMessages.length > messages.length) {
        const lastMessage = newMessages[newMessages.length - 1];
        showNotification(lastMessage);
      }

      setMessages(newMessages);
    });
  }, [messages.length]);

  const showNotification = (message) => {
    if (Notification.permission === 'granted') {
      new Notification('New Message', {
        body: message,
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('New Message', {
            body: message,
          });
        }
      });
    }
  };

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
          console.error('Error sending message:', error);
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
          id="chat-message-input"
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
