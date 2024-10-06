import React, { useState, useEffect } from 'react';
import { database, ref, onValue, push, remove } from './firebase';
import './chat.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, 'messages');

    // Listen for updates to the messages in the database
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const newMessages = data ? Object.entries(data).map(([id, message]) => ({ id, message })) : [];

      // Check for new messages to alert
      if (newMessages.length > messages.length) {
        const lastMessage = newMessages[newMessages.length - 1].message;
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

  const handleDeleteMessage = (id) => {
    const messageRef = ref(database, `messages/${id}`);
    remove(messageRef)
      .then(() => {
        console.log('Message deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
  };

  return (
    <div className="chat-box-container">
      <div className="chat-box-chat-container">
        {messages.map(({ id, message }) => (
          <div key={id} className="chat-box-message">
            {message}
            <button onClick={() => handleDeleteMessage(id)} className="chat-box-delete-button">
              Delete
            </button>
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
