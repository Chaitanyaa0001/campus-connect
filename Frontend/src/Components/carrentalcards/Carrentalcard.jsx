import React from 'react';
import "./Carrentalcard.css";
import { FaTrash } from "react-icons/fa";

const Carrentalcard = ({Choosefile,VechicleModel,VechicleDescription,RentalAmount,RentalPeriod,VechileMileage}) => {
  return (
    <div id='carrentalcontainer'>
      <div className="carrentalcard">
        <div className="cardimg">
          <img src={Choosefile} alt={VechicleModel} />
        </div>
        <div className="carrentaldetailscard">
          <div className="namecard">
            <h2>{VechicleModel}</h2>
          </div>
          <p className="cardescriptioncard">{VechicleDescription}</p>
          <div className="availablecard">
            <p>Period: <span>{RentalPeriod}</span></p>
            <p>Mileage: <span>{VechileMileage}</span></p>
          </div>
          <span className="amountcard">₹{RentalAmount}</span>
        </div>
        <button className="contactownercard"><FaTrash size={20} color="red" /></button>
      </div>
    </div>
  );
};

export default Carrentalcard;
