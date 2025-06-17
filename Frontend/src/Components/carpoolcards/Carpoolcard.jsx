import React from 'react';
import { FaTrash,FaMapMarkerAlt,FaClock} from "react-icons/fa";
import { MdLocationOn,MdAirlineSeatReclineNormal} from 'react-icons/md';
import './carpoolcard.css'

<FaTrash size={20} color="red" />


const Carpoolcard = ({ from, to, time, seatsAvailable, pricePerSeat }) => {
  return (
    <>
    <div className="carpoolcontainer">
    <div className="carpoolcard">
            <div className="location">
              <h2>{from} to  {to}</h2>
            </div>
            <div className="CP-details">
              <p> <FaClock/>  {time}</p>
              <p> <MdAirlineSeatReclineNormal/>  {seatsAvailable} seats available</p>
              <p><FaMapMarkerAlt/>  {from}</p>
              <p><MdLocationOn/>    {to}</p>
          </div>
          <div className="CP-bookings">
            <h3>₹{pricePerSeat} per seat</h3>
            <button><FaTrash size={20} color="red" /></button>
          </div>
    </div>
    </div>
    
    </>
   
      
 
  );
};

export default Carpoolcard;