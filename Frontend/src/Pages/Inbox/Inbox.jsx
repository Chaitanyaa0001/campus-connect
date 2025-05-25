import React from 'react';
import './Inbox.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { FiUpload } from 'react-icons/fi';

const Inbox = () => {
  return (
    <div className="component-container">
      <Sidebar />

      <div id="inbox">
        <div className="dm-container">
      
          <div className="inbox-input">
            <FaSearch className='inbox-icon' />
            <input type="text" placeholder='Search for contacts' />
          </div>
        </div>

        <div className="dm-area">
          <div className="area-header">
            <h2>Select a User To Start Conversation!</h2>
          </div>

          {/* Static message area */}
          <div className="pvt-dm">
            hey
          </div>

          {/* Message input area without animation */}
          <div className="inbox-upload-container">
            <FiUpload  size={24}  className='inbox-upload-icon' />
            <input type="text" placeholder='Write Message' className='inbox-upload-input' />
            <button type="submit" className="inbox-button">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
