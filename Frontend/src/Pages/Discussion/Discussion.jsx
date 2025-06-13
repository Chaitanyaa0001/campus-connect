import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Discussion.css';
import { FiUpload } from 'react-icons/fi';
import { FaPaperPlane } from 'react-icons/fa';
import {io} from 'socket.io-client';

const Discussion = () => {
  const [messages, setMessages] = useState([
    { name: 'Geetesh', text: 'Hope everyone like this!', time: '10 days ago' },
    { name: 'Rishabh Verma', text: 'Yoooo', time: '10 days ago' },
  ]);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const changeHandler = (e) => setInput(e.target.value);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { name: 'You', text: input, time: 'Just now' }]);
      setInput('');
    }
  };

  return (
    <div className="component-container">
      <Sidebar />

      <div id="discussion">
        <div className="discussion-container">
          <div className="head">
            <h3>Wanna Have a Discussion?</h3>
            <span className="online">1 user online 🟢</span>
          </div>

          <div className="mess-content">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.name === 'You' ? 'sent' : 'received'}`}
              >
                <div className="msg-content">
                  <div className="text">{msg.text}</div>
                  <p>{msg.name} • {msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={SubmitHandler} className="chat-input">
            <FiUpload size={24} className='Ficon' />
            
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                name="message"
                onChange={changeHandler}
                className="chat-textbox"
              />
         
            <button type="submit" className="send-btn">
              <FaPaperPlane size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
