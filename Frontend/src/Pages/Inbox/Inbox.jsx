import React, { useState, useEffect, useRef } from 'react';
import './Inbox.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { FiUpload } from 'react-icons/fi';
import { useGetUser } from '../../hooks/user/usegetuser';
import {
  getSocket,
  initSocket,
  connectSocket,
  disconnectSocket
} from '../../socket/socket';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Inbox = () => {
  const { user } = useGetUser();
  const location = useLocation();
  const selectedReceiver = location?.state?.receiverId || ''; // from router state

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(selectedReceiver);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Connect to WebSocket and fetch messages
  useEffect(() => {
    if (user) {
      const socket = initSocket();
      connectSocket();
      socket.emit("join", user._id);

      // Update online users
      socket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Handle incoming private messages
      socket.on("receivePrivateMessage", (message) => {
        if (
          message.senderId === selectedUserId ||
          message.receiverId === selectedUserId
        ) {
          setMessages((prev) => [...prev, message]);
        }
      });

      return () => {
        socket.off("onlineUsers");
        socket.off("receivePrivateMessage");
        disconnectSocket();
      };
    }
  }, [user, selectedUserId]);

  // Fetch chat history
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUserId && user) {
        try {
          const response = await axios.get(`${BASE_URL}/api/messages/dm/${selectedUserId}`, {
            withCredentials: true,
          });
          setMessages(response.data.messages || []);
        } catch (error) {
          console.error("Failed to fetch messages", error);
        }
      }
    };
    fetchMessages();
  }, [selectedUserId, user]);

  // Handle send
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/messages/dm/${selectedUserId}`,
        { input },
        { withCredentials: true }
      );

      const message = response.data;
      setMessages((prev) => [...prev, message]);

      const socket = getSocket();
      socket.emit("privateMessage", { receiverId: selectedUserId, message });

      setInput('');
    } catch (err) {
      console.error("Send message error", err);
    }
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
          <ul>
            {onlineUsers.map((uid, idx) => (
              uid !== user?._id && (
                <li key={idx} onClick={() => setSelectedUserId(uid)}>
                  Chat with {uid}
                </li>
              )
            ))}
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
                className={`message ${msg.senderId === user?._id ? 'sent' : 'received'}`}
              >
                <div className="msg-content">
                  <div className="text">{msg.message}</div>
                  <p>{msg.time || ''}</p>
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
