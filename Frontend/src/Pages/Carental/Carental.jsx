import React, { useEffect, useState } from 'react';
import './Carental.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { FaCar } from "react-icons/fa";
import { motion } from 'framer-motion'; // ✅ Import Framer Motion
import { useCarRental } from '../../hooks/carrentalhooks/usecarrentalhook';
import { useAddcarrental } from '../../hooks/carrentalhooks/useaddcarrental';
const Carental = () => {
  const {carrental,getallcarrentals} = useCarRental();
  const {createcarrental} = useAddcarrental();


  useEffect(()=>{
    getallcarrentals()
  });


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
          {carrental.map(car => {
            return(
              <div className={`car-card ${!car.available ? 'disabled-card' : ''}`} key={car._id}>
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
            )
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Carental;
