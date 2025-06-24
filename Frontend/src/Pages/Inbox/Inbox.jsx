import React, { useState, useEffect, useRef } from 'react';
import './Inbox.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { FiUpload } from 'react-icons/fi';

const Inbox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(''); // whom you're chatting with
  const messagesEndRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <div className="component-container">
      <Sidebar />

      <div id="inbox">
        <div className="dm-container">
          <div className="inbox-input">
            <FaSearch className='inbox-icon' />
            <input type="text" placeholder='Search for contacts' />
          </div>
          {/* Static contact list (replace with dynamic users later) */}
          <ul>
            <li onClick={() => setSelectedUserId('user123')}>Chat with User123</li>
            <li onClick={() => setSelectedUserId('user456')}>Chat with User456</li>
          </ul>
        </div>

        <div className="dm-area">
          <div className="area-header">
            <h2>{selectedUserId ? `Chatting with ${selectedUserId}` : "Select a User To Start Conversation!"}</h2>
          </div>

          <div className="pvt-dm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.from === "current-user-id" ? 'sent' : 'received'}`}
              >
                <div className="msg-content">
                  <div className="text">{msg.message}</div>
                  <p>{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="inbox-upload-container">
            <FiUpload size={24} className='inbox-upload-icon' />
            <input
              type="text"
              placeholder='Write Message'
              className='inbox-upload-input'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="inbox-button">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
