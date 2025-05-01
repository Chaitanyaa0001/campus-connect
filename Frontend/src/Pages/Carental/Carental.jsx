import React, { useState } from 'react';
import './Carental.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { FaCar } from "react-icons/fa";

const Carental = () => {
  const [cars, setCars] = useState([
    {
      id: 1, name: 'Honda Civic', year: 2018, owner: 'John Smith',
      price: '$35', image: 'carImage', available: true
    },
    {
      id: 2, name: 'Toyota Corolla', year: 2020, owner: 'Emma Johnson',
      price: '$20', image: 'carImage', available: true
    },
    {
      id: 3, name: 'Ford Focus', year: 2019, owner: 'Michael Brown',
      price: '$10', image: 'carImage', available: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newCar, setNewCar] = useState({
    name: '',
    year: '',
    owner: '',
    price: '',
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
    setCars(prev => [...prev, { ...newCar, id, image: imagePreview || 'carImage' }]);
    setShowForm(false);
    setNewCar({
      name: '',
      year: '',
      owner: '',
      price: '',
      image: 'carImage',
      available: true
    });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className='component-container'>
      <Sidebar />
      <div id='car-rental'>
        <div className="car-header">
          <h1>Car Rental</h1>
          <p>Rent Cars From other Students or list your own</p>
        </div>

        <button className='add-car' onClick={() => setShowForm(!showForm)}>
          <FaCar /> {showForm ? 'Cancel' : 'Add Car'}
        </button>

        {showForm && (
          <form className='add-ride-form' onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Car Name" value={newCar.name} onChange={handleChange} required />
            <input type="number" name="year" placeholder="Year" value={newCar.year} onChange={handleChange} required />
            <input type="text" name="owner" placeholder="Owner Name" value={newCar.owner} onChange={handleChange} required />
            <input type="text" name="price" placeholder="Price" value={newCar.price} onChange={handleChange} required />

            <label>
              <input type="checkbox" name="available" checked={newCar.available} onChange={handleChange} />
              Available
            </label>

            <input type="file" accept="image/*" onChange={handleImageChange} />
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
                  src={
                    car.image !== 'carImage'
                      ? car.image
                      : 'https://cdn.pixabay.com/photo/2012/04/12/23/47/car-30984_1280.png'
                  }
                  alt="car"
                />
              </div>
              <div className="car-rental-details">
                <div className="name">
                  <h2>{car.name}</h2>
                  <p>{car.owner}</p>
                </div>
                <div className="available">
                  <span>{car.price}</span>
                  <p>{car.available ? "Available" : "Not Available"}</p>
                </div>
                <button
                  className={`rent-button ${!car.available ? 'disabled' : ''}`}
                  disabled={!car.available}
                >
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carental;
