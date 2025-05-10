import React from 'react';
import "./Carrentalcard.css"
import { FaTrash} from "react-icons/fa";


const Carrentalcard = ({ image, name, description, rentalAmount, rentalPeriod, mileage }) => {
  return (
    <div id='carrentalcontainer'>
      <div className="carrentalcard">
      <div className="cardimg">
          <img src={image}alt={name}/>
      </div>
        <div className="carrentaldetailscard">
          <div className="namecard">
            <h2>{name}</h2>
           
          </div>
          <p className="cardescriptioncard">{description}</p>
          <div className="availablecard">
            <p>Amount:<span> {rentalPeriod}</span></p>
            <p>Milage:<span>{mileage}</span></p>
          </div>
          <span className="amountcard">{rentalAmount}</span>
        </div>
        <button className="contactownercard"><FaTrash size={20} color="red" /></button>

        
      </div>
      </div>
        
  );
};

export default Carrentalcard;
