import React, {  useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './User.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Profile.jpg'
import { motion, AnimatePresence,  } from 'framer-motion';
import {FaCar,FaUsers,FaSearch,FaFolderOpen,FaUserAlt} from "react-icons/fa";
import Carpoolcard from '../../Components/carpoolcards/Carpoolcard';
import Carrentalcard from '../../Components/carrentalcards/Carrentalcard';
import Lostnfoundcard from '../../Components/lostnfoundcards/Lostnfoundcard';
import Projectcard from '../../Components/projectcards/Projectcard';
// hooks 
import { useGetUser } from '../../hooks/user/usegetuser';
import { useUpdateUser } from '../../hooks/user/useupdateuser';
import  useDeleteUser from '../../hooks/user/usedeleteuser';
import { useNavigate } from 'react-router-dom';
import { useUserResources } from '../../hooks/user/useUserresources';







const User = () => {
  const [selectedCategory, setSelectedCategory] = useState('profile');
  const navigate = useNavigate();

  const {user,getUserprofile} = useGetUser();
  const {updateUser,updateUserResponse} = useUpdateUser();
  const {deleteUser} = useDeleteUser();
  const {resources, refetchResources} = useUserResources();

  

  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [isOpen, setisOpen] = useState(true)

  const [userdata, setuserdata] = useState({
    username: '',
    email: '',
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
    deleteConfirm: '',
    profilephoto:null,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setuserdata(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

    await updateUser(userdata, userdata.profilephoto);

    // Reset profile fields only (preserve deleteConfirm)
    setuserdata(prev => ({
      ...prev,
      username: '',
      email: '',
      oldpassword: '',
      newpassword: '',
      confirmpassword: '', 
      profilephoto:null
    }));
    } catch (err) {
      console.error(err.message);
    }
  };

    useEffect(() => {
    if (user) {
      setuserdata(prev => ({
        ...prev,
        username: user?.username ||'',
        email: user?.email || '',
        profilephoto: user?.profilephoto ||  null
      }));
    }
  }, [user]);



 const handleDelete = async () => {
  try {
    if (userdata.deleteConfirm.toLowerCase() === 'delete') {
      await deleteUser(); 
    } else {
      alert("Please type 'delete' to confirm account deletion.");
    }
  } catch (err) {
 
    console.error(err);
  }
};

// rendering cards 

const carpools = resources.carpools;
const carrental = resources.carrentals;
const lnfcards = resources.lostnfound;
const projects = resources.projects;


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
          Choosefile={item.Choosefile}
          VechicleModel={item.VechicleModel}
          VechicleDescription={item.VechicleDescription}
          RentalAmount={item.RentalAmount}
          RentalPeriod={item.RentalPeriod}
          VechileMileage={item.VechileMileage}
        />
      ));
    case 'lostnfound':
      return lnfcards.map((item, index) => (
        <Lostnfoundcard
          key={index}
          choosefile={item.choosefile}
          itemName={item.itemName}
          itemDescription={item.itemDescription}
          itemStatus={item.itemStatus}
        />
      ));
    case 'projects':
      return projects.map((item, index) => (
        <Projectcard
          key={index}
          projectTitle={item.projectTitle}
          Description={item.Description}
          Category={item.Category}
          personrequired={item.personrequired}
          dueDate={item.dueDate}
          Technologies={item.Technologies}
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
                 <input type="text" name="deleteConfirm" value={userdata.deleteConfirm} onChange={changeHandler}placeholder="Type 'delete' to confirm"
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
              <label htmlFor="profile-upload" style={{ cursor: "pointer", display: "inline-block" }}>
                  <img
                      src={
                        userdata.profilephoto && typeof userdata.profilephoto !== "string"
                          ? URL.createObjectURL(userdata.profilephoto)
                          : user?.profilephoto || logo
                      }
                    alt={logo}
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </label>
                
              <form onSubmit={submitHandler}>
                <input type="file" id="profile-upload" accept="image/*" style={{ display: "none" }}
                   onChange={(e) =>
                  setuserdata((prev) => ({
                    ...prev,
                    profilephoto: e.target.files[0],
                   }))}/>
                <p>Username</p>
                <input type="text" name="username" value={userdata.username} onChange={changeHandler} placeholder="Username" />
                <p>Email</p>
                <input type="email" name="email" value={userdata.email} onChange={changeHandler} placeholder="Email" />
                <p> Old Password</p>
                <input type="password" name="oldpassword" value={userdata.oldpassword} onChange={changeHandler} placeholder="Old Password" />
                <p> New Password</p>
                <input type="password" name="newpassword" value={userdata.newpassword} onChange={changeHandler} placeholder="New Password" />
                <p>Confirm Password</p>
                <input type="password" name="confirmpassword" value={userdata.confirmpassword} onChange={changeHandler} placeholder="Confirm Password" />
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
