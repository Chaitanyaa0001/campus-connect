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
  const selectedReceiver = location?.state?.receiverId || '';
  const selectedReceiverUsername = location?.state?.receiverUsername || '';

  const [conversation, setConversation] = useState([]);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(selectedReceiver);
  const [selectedUsername, setSelectedUsername] = useState(selectedReceiverUsername);
  const [chatHistory, setChatHistory] = useState({});
  const [onlineUserList, setOnlineUserList] = useState([]);

  const messagesEndRef = useRef(null);

  // Derived messages from chatHistory
  const messages = chatHistory[selectedUserId] || [];

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/messages/conversations`, {
          withCredentials: true,
        });
        setConversation(res.data);
      } catch (err) {
        console.error("Fetch conversations error:", err);
      }
    };

    if (user) fetchConversations();
  }, [user]);

  // WebSocket setup
  useEffect(() => {
    if (user) {
      const socket = initSocket();
      connectSocket();
      socket.emit("join", user._id);

      socket.on("onlineUsers", (users) => {
        setOnlineUserList(users);
      });

      socket.on("receivePrivateMessage", (message) => {
        const otherUserId = message.senderId === user._id ? message.receiverId : message.senderId;
        setChatHistory(prev => ({
          ...prev,
          [otherUserId]: [...(prev[otherUserId] || []), message]
        }));
      });

      return () => {
        socket.off("onlineUsers");
        socket.off("receivePrivateMessage");
        disconnectSocket();
      };
    }
  }, [user]);

  // Fetch messages when user is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUserId && user && !chatHistory[selectedUserId]) {
        try {
          const res = await axios.get(`${BASE_URL}/api/messages/dm/${selectedUserId}`, {
            withCredentials: true,
          });
          const fetchedMessages = res.data || [];

          setChatHistory((prev) => ({
            ...prev,
            [selectedUserId]: fetchedMessages
          }));
        } catch (err) {
          console.error("Fetch messages error:", err);
        }
      }
    };
    fetchMessages();
  }, [selectedUserId, user, chatHistory]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle message send
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/api/messages/dm/${selectedUserId}`,
        { input },
        { withCredentials: true }
      );

      const message = res.data;

      setChatHistory(prev => ({
        ...prev,
        [selectedUserId]: [...(prev[selectedUserId] || []), message]
      }));

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
        {/* Contact List */}
        <div className="dm-container">
          <div className="inbox-input">
            <FaSearch className='inbox-icon' />
            <input
              type="text"
              placeholder='Search for contacts'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ul>
            {conversation.map((conv, idx) => {
              const otherUser = conv.participants.find(p => p._id !== user?._id);
              if (!otherUser) return null;
              return (
                <li
                  key={idx}
                  onClick={() => {
                    setSelectedUserId(otherUser._id);
                    setSelectedUsername(otherUser.username);
                  }}
                >
                  {otherUser.username}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="dm-area">
          <div className="area-header">
            <h2>{selectedUserId ? `Chatting with ${selectedUsername}` : "Select a User To Start Conversation!"}</h2>
          </div>

          <div className="pvt-dm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.senderId === user?._id ? 'sent' : 'received'}`}
              >
                <div className="msg-content">
                  <div className="text">{msg.message}</div>
                  <p>{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Send Box */}
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
