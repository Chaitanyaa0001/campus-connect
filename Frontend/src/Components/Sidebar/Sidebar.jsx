import React, { useState } from "react";
import {
  FaComments,
  FaCar,
  FaUsers,
  FaSearch,
  FaFolderOpen,
  FaSignOutAlt,
  FaBars, FaTimes ,
} from "react-icons/fa";

import './Sidebar.css';
import logo from "../../assets/Profile.jpg";
import { NavLink,Link} from 'react-router-dom'; 
import { useLogout } from "../../hooks/logouthooks/logouthook";

const Sidebar = () => {
  const logout = useLogout()
  const [isOpen, setisOpen] = useState(true);

  const navbarToggle = () => {
    setisOpen(!isOpen);
    console.log(isOpen);
  }

  return (
    <div className="main">
      <aside className={isOpen ? 'sidebar' : 'sidebar closed'}>
        <div className="sidebar-header" onClick={navbarToggle}>
        {isOpen && <h2 className="close-btn">UniVerse</h2>}
        {isOpen ?  <FaTimes /> : <FaBars />}  
       </div>

       <div className="user-info">
          <Link to="/user" className="user-img">
            <img src={logo} alt="user profile" />
          </Link>

          <div className="user-details">
            {isOpen && 
              <Link to="/user">
                <h3>Ravi</h3>
                <p>Ravibsdka0@gmail.com</p>
              </Link>
             }
          </div>
        
      </div>

      <div className="menu">
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/discussion"><FaComments  size = {25}/>{isOpen && 'Discussion'}</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/inbox"><FaComments  size = {25}/>{isOpen && 'Inbox'}</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/carental"><FaCar size={25} />{isOpen && 'Car Rental'}</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/carpool"><FaUsers  size ={25}/>{isOpen && 'Car Pool'}</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/lost&found"><FaSearch  size = {25}/>{isOpen && 'Lost and Found'} </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/projects"><FaFolderOpen size ={25}/>{isOpen && 'Projects'}</NavLink>
      </div>

      <div className="bottom-menu">
        <button className="menu-item" onClick={logout}>  <FaSignOutAlt size ={25} /> {isOpen && 'Logout'}</button>
      </div>
    </aside>

  </div>

  );
};

export default Sidebar;
