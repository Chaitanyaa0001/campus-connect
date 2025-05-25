import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './User.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Profile.jpg'
import { motion, AnimatePresence, styleEffect } from 'framer-motion';

import {
  FaCar,
  FaUsers,
  FaSearch,
  FaFolderOpen,
  FaUserAlt
} from "react-icons/fa";
import Carpoolcard from '../../Components/carpoolcards/Carpoolcard';
import Carrentalcard from '../../Components/carrentalcards/Carrentalcard';
import Lostnfoundcard from '../../Components/lostnfoundcards/Lostnfoundcard';
import Projectcard from '../../Components/projectcards/Projectcard';

const User = () => {
  const [selectedCategory, setSelectedCategory] = useState('profile');

  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [isOpen, setisOpen] = useState(true)

  const [userdata, setuserdata] = useState({
    username: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    deleteConfirm: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setuserdata(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userdata);

    // Reset profile fields only (preserve deleteConfirm)
    setuserdata(prev => ({
      ...prev,
      username: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  const handleDelete = () => {
    if (userdata.deleteConfirm.toLowerCase() === 'delete') {
      alert('Your account has been deleted.');

      setuserdata({
        username: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        deleteConfirm: '',
      });
      setShowDeleteInput(false);

     
    } else {
      alert("Please type 'delete' to confirm account deletion.");
    }
  };

  const carpools = [
    {
      from: "University Main Campus",
      to: "Downtown",
      time: "Today, 5:30 PM",
      seatsAvailable: 3,
      pricePerSeat: 100,
    },
    {
      from: "College Heights Apartments",
      to: "Science Building",
      time: "Tomorrow, 8:00 AM",
      seatsAvailable: 2,
      pricePerSeat: 150,
    },
    {
      from: "Engineering Building",
      to: "Westside Mall",
      time: "Friday, 4:15 PM",
      seatsAvailable: 3,
      pricePerSeat: 90,
    }
  ];

  const carrental = [
    {
      id: 1,
      name: "Toyota Corolla",
      rentalAmount: "₹2500/day",
      rentalPeriod: "3 days",
      mileage: "18 km/l",
      description: "A comfortable and fuel-efficient sedan with automatic transmission and spacious seating.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwwQU1H_ySuQXx7lqdv3eCXJ15A3AxDViaA&s",
    },
    {
      id: 2,
      name: "Hyundai Creta",
      rentalAmount: "₹3000/day",
      rentalPeriod: "1 week",
      mileage: "16 km/l",
      description: "Stylish SUV with excellent ground clearance, touchscreen infotainment, and powerful AC.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwwQU1H_ySuQXx7lqdv3eCXJ15A3AxDViaA&s",
    },
    {
      id: 3,
      name: "Maruti Swift",
      rentalAmount: "₹1800/day",
      rentalPeriod: "2 days",
      mileage: "22 km/l",
      description: "Compact hatchback ideal for city rides. Manual transmission and high mileage.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwwQU1H_ySuQXx7lqdv3eCXJ15A3AxDViaA&s",
    },
    {
      id: 4,
      name: "Mahindra Thar",
      rentalAmount: "₹4000/day",
      rentalPeriod: "1 weekend",
      mileage: "15 km/l",
      description: "Rugged off-road SUV with convertible top, 4x4 drive, and strong road presence.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwwQU1H_ySuQXx7lqdv3eCXJ15A3AxDViaA&s",
    }
  ];

  const lnfcards = [
    {
      itemName: "Black Wallet",
      itemDescription: "Found near the cafeteria. Contains ID and a few cards.",
      status: "Found",
      image: "https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/w_2560%2Cc_limit/iphonex-TA.jpg"
    },
    {
      itemName: "Silver Water Bottle",
      itemDescription: "Left in the computer lab, has a dent on the side.",
      status: "Found",
      image: "https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/w_2560%2Cc_limit/iphonex-TA.jpg"
    }
  ];

  const projects = [
    {
      title: "Campus Navigation App",
      category: "Mobile Development",
      description: "Creating a mobile app to help navigate the campus buildings and find the shortest routes between classes.",
      members: 5,
      dueDate: "May 15, 2025",
      progress: 65,
      status: "Active",
      technologies: ["React Native", "Maps API"]
    },
    {
      title: "Student Wellness Survey",
      category: "Research",
      description: "Conducting research on student wellness and mental health to inform campus services.",
      members: 3,
      dueDate: "April 30, 2025",
      progress: 40,
      status: "Active",
      technologies: ["Research", "mobile development"]
    },
    {
      title: "Campus Sustainability Initiative",
      category: "Environmental",
      description: "Developing a plan to reduce waste and increase sustainability practices across campus.",
      members: 8,
      dueDate: "June 10, 2025",
      progress: 55,
      status: "Active",
      technologies: ["data analyst"]
    }
  ];

  const renderCards = () => {
    switch (selectedCategory) {
      case 'carpools':
        return carpools.map((item, index) => (
          <Carpoolcard
            key={index}
            from={item.from}
            to={item.to}
            time={item.time}
            seatsAvailable={item.seatsAvailable}
            pricePerSeat={item.pricePerSeat}
          />
        ));
      case 'carrental':
        return carrental.map((item, index) => (
          <Carrentalcard
            key={index}
            image={item.image}
            name={item.name}
            description={item.description}
            rentalAmount={item.rentalAmount}
            rentalPeriod={item.rentalPeriod}
            mileage={item.mileage}
          />
        ));
      case 'lostnfound':
        return lnfcards.map((item, index) => (
          <Lostnfoundcard
            key={index}
            image={item.image}
            itemName={item.itemName}
            itemDescription={item.itemDescription}
            status={item.status}
          />
        ));
      case 'projects':
        return projects.map((item, index) => (
          <Projectcard
            key={index}
            title={item.title}
            description={item.description}
            category={item.category}
            members={item.members}
            dueDate={item.dueDate}
            status={item.status}
            technologies={item.technologies}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <div className='component-container'>
      <Sidebar />
      <div id="user">
        <div className="user-heading">
          <h2>Dashboard</h2>
          <p>Manage Your Account and Profile</p>
        </div>

        <div className="filter-buttons">
          <NavLink  onClick={() => setSelectedCategory('profile') }className={({ isActive }) => isActive ? 'active' : ''} > <FaUserAlt/> {isOpen && 'profile'}</NavLink>
          <NavLink  onClick={() => setSelectedCategory('carpools')}className={({ isActive }) => isActive ? 'active' : ''}><FaUsers />{isOpen && 'Carpool'}</NavLink>
          <NavLink  onClick={() => setSelectedCategory('carrental')}className={({ isActive }) => isActive ? 'active' : ''}><FaCar/>{isOpen && 'Carrental'}</NavLink>
          <NavLink  onClick={() => setSelectedCategory('lostnfound')}className={({ isActive }) => isActive ? 'active' : ''}><FaSearch/>{isOpen && 'Lost & Found'}</NavLink>
          <NavLink  onClick={() => setSelectedCategory('projects')}className={({ isActive }) => isActive ? 'active' : ''}><FaFolderOpen/>{isOpen && 'Projects'}</NavLink>
        </div>

      <AnimatePresence mode="wait">
        {selectedCategory !== 'profile' && (
          <motion.div
            className="card-container"
            key={selectedCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {renderCards()}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {selectedCategory === 'profile' && (
          <motion.div
            key="profile"
            className="user-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
          >
           {selectedCategory === 'profile' && (
          <div className="user-container">
            <div className="form-header">

              <div className="header1">
                <h2>Profile information</h2>
                <p>Update your profile information</p>
              </div>

              <div className='header2'>
              <button type="button" className='deletebutton' onClick={() => setShowDeleteInput(prev => !prev)}>
                {showDeleteInput ? 'Cancel Delete' : 'Delete Account'}
              </button>
              
              {showDeleteInput && (
                <form>
                 <input
                    type="text"
                    name="deleteConfirm"
                    value={userdata.deleteConfirm}
                    onChange={changeHandler}
                    placeholder="Type 'delete' to confirm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleDelete();   
                      }
                    }}
                  />
                </form>
              )}
              </div>
            </div>
            <div className="userform">
              <img src={logo} alt="logo" />
              <form onSubmit={submitHandler}>
                <p>Username</p>
                <input type="text" name="username" value={userdata.username} onChange={changeHandler} placeholder="Username" />
                <p>Email</p>
                <input type="email" name="email" value={userdata.email} onChange={changeHandler} placeholder="Email" />
                <p> Old Password</p>
                <input type="password" name="oldPassword" value={userdata.oldPassword} onChange={changeHandler} placeholder="Old Password" />
                <p> New Password</p>
                <input type="password" name="newPassword" value={userdata.newPassword} onChange={changeHandler} placeholder="New Password" />
                <p>Confirm Password</p>
                <input type="password" name="confirmPassword" value={userdata.confirmPassword} onChange={changeHandler} placeholder="Confirm Password" />
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default User;
