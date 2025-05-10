import React, { useState } from 'react';
import './Carental.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { FaCar } from "react-icons/fa";
import { motion } from 'framer-motion'; // ✅ Import Framer Motion

const Carental = () => {
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "Toyota Corolla",
      rentalAmount: "₹2500/day",
      rentalPeriod: "3 days",
      mileage: "18 km/l",
      description: "A comfortable and fuel-efficient sedan with automatic transmission and spacious seating.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwwQU1H_ySuQXx7lqdv3eCXJ15A3AxDViaA&s",
      available: true,
    },
    {
      id: 2,
      name: "Hyundai Creta",
      rentalAmount: "₹3000/day",
      rentalPeriod: "1 week",
      mileage: "16 km/l",
      description: "Stylish SUV with excellent ground clearance, touchscreen infotainment, and powerful AC.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwwQU1H_ySuQXx7lqdv3eCXJ15A3AxDViaA&s",
      available: true,
    },
    {
      id: 3,
      name: "Maruti Swift",
      rentalAmount: "₹1800/day",
      rentalPeriod: "2 days",
      mileage: "22 km/l",
      description: "Compact hatchback ideal for city rides. Manual transmission and high mileage.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwwQU1H_ySuQXx7lqdv3eCXJ15A3AxDViaA&s",
      available: true,
    },
    {
      id: 4,
      name: "Mahindra Thar",
      rentalAmount: "₹4000/day",
      rentalPeriod: "1 weekend",
      mileage: "15 km/l",
      description: "Rugged off-road SUV with convertible top, 4x4 drive, and strong road presence.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwwQU1H_ySuQXx7lqdv3eCXJ15A3AxDViaA&s",
      available: true,
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newCar, setNewCar] = useState({
    name: '',
    rentalAmount: '',
    rentalPeriod: '',
    mileage: '',
    description: '',
    image: 'carImage',
    available: true
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCar(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();
    setCars(prev => [
      ...prev,
      {
        ...newCar,
        id,
        image: imagePreview || 'https://cdn.pixabay.com/photo/2012/04/12/23/47/car-30984_1280.png',
      }
    ]);
    setShowForm(false);
    setNewCar({
      name: '',
      rentalAmount: '',
      rentalPeriod: '',
      mileage: '',
      description: '',
      image: 'carImage',
      available: true
    });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className='component-container'>
      <Sidebar />
      <motion.div
        id='car-rental'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="car-header">
          <h1>Car Rental</h1>
          <p>Rent Cars From other Students or list your own</p>
        </div>

        <button className='add-car' onClick={() => setShowForm(!showForm)}>
          <FaCar /> {showForm ? 'Cancel' : 'Add Car'}
        </button>

        {showForm && (
          <form className='add-car-form' onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <input type="text" name="name" placeholder="Vehicle Model" value={newCar.name} onChange={handleChange} required />
              <input type="text" name="rentalAmount" placeholder="Rental Amount" value={newCar.rentalAmount} onChange={handleChange} required />
              <input type="text" name="rentalPeriod" placeholder="Rental Period" value={newCar.rentalPeriod} onChange={handleChange} required />
              <input type="text" name="mileage" placeholder="Vehicle Mileage" value={newCar.mileage} onChange={handleChange} required />
              <textarea name="description" placeholder="Vehicle Description" value={newCar.description} onChange={handleChange} required></textarea>

              <label>
                <input type="checkbox" className='form-available' name="available" checked={newCar.available} onChange={handleChange} />
                Available
              </label>
            </div>

            <input type="file" accept="image/*"  onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Car Preview"
                style={{ width: '120px', marginTop: '10px', borderRadius: '8px' }}
              />
            )}

            <button type="submit" className="submit-ride">Submit</button>
          </form>
        )}

        <div className="car-rental-cards">
          {cars.map((car) => (
            <div className={`car-card ${!car.available ? 'disabled-card' : ''}`} key={car.id}>
              <div className="card-img">
                <img
                  src={car.image && car.image !== 'carImage'
                    ? car.image
                    : 'https://cdn.pixabay.com/photo/2012/04/12/23/47/car-30984_1280.png'}
                  alt={car.name}
                />
              </div>
              <div className="car-rental-details">
                <div className="name">
                  <h2>{car.name}</h2>
                  <span className="amount">{car.rentalAmount}</span>
                </div>
                <p className="car-description">{car.description}</p>
                <div className="available">
                  <p>Amount:<span> {car.rentalPeriod}</span></p>
                  <p>Milage:<span>{car.mileage}</span></p>
                </div>
              </div>
              <span className="contact-owner">Contact Owner</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Carental;
