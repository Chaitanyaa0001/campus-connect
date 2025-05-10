import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Carpool.css';
import { FaUsers, FaSearch, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { MdLocationOn, MdAirlineSeatReclineNormal } from 'react-icons/md';
import { motion } from 'framer-motion'; // ✅ Import Framer Motion

const Carpool = () => {
  const [searchquery, setsearchquery] = useState("");
  const [carpools, setCarpools] = useState([
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
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newRide, setNewRide] = useState({
    from: "",
    to: "",
    time: "",
    seatsAvailable: "",
    pricePerSeat: ""
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewRide(prev => ({ ...prev, [name]: value }));
  };

  const Submithandler = (e) => {
    e.preventDefault();
    setCarpools(prev => [...prev, newRide]);
    setNewRide({
      from: "",
      to: "",
      time: "",
      seatsAvailable: "",
      pricePerSeat: ""
    });
    setShowForm(false);
  };

  const filteredCarpools = carpools.filter(carpool => {
    const query = searchquery.toLowerCase();
    return (
      carpool.from?.toLowerCase().includes(query) ||
      carpool.to?.toLowerCase().includes(query) ||
      carpool.time?.toLowerCase().includes(query)
    );
  });

  return (
    <div className='component-container'>
      <Sidebar />
      <motion.div
        id="carpool"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="carpool-heading">
          <h1>Carpool</h1>
          <p>Find rides or offer seats in your car</p>
        </div>

        <button className='add-ride' onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : <><FaUsers /> Offer a Ride</>}
        </button>

        {showForm && (
          <form className="add-ride-form" onSubmit={Submithandler}>
            <input
              type="text"
              name="from"
              value={newRide.from}
              onChange={changeHandler}
              placeholder="From"
              required
            />
            <input
              type="text"
              name="to"
              value={newRide.to}
              onChange={changeHandler}
              placeholder="To"
              required
            />
            <input
              type="text"
              name="time"
              value={newRide.time}
              onChange={changeHandler}
              placeholder="Time (e.g., Tomorrow, 8 AM)"
              required
            />
            <input
              type="number"
              name="seatsAvailable"
              value={newRide.seatsAvailable}
              onChange={changeHandler}
              placeholder="Seats Available"
              required
            />
            <input
              type="number"
              name="pricePerSeat"
              value={newRide.pricePerSeat}
              onChange={changeHandler}
              placeholder="Price per seat"
              required
            />
            <button type="submit" className='submit-ride'>Submit Ride</button>
          </form>
        )}

        <h2 className='available-ride'>Available rides</h2>
        <div className="search-bar">
          <FaSearch className='Search-icon' />
          <input
            type="text"
            placeholder="Search by location or time..."
            value={searchquery}
            onChange={(e) => setsearchquery(e.target.value)}
          />
        </div>

        <div className="car-pool-cards">
          {filteredCarpools.map((CP, index) => (
            <div className="CP-card" key={index}>
              <div className="location">
                <h2>{CP.from} to {CP.to}</h2>
              </div>
              <div className="CP-details">
                <p><FaClock /> {CP.time}</p>
                <p><MdAirlineSeatReclineNormal /> {CP.seatsAvailable} seats available</p>
                <p><FaMapMarkerAlt /> From: {CP.from}</p>
                <p><MdLocationOn /> To: {CP.to}</p>
              </div>
              <div className="CP-bookings">
                <h3>₹{CP.pricePerSeat} per seat</h3>
                <button>Request Ride</button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Carpool;
