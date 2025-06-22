import React from 'react';
import './Lostnfoundcard.css';
import { FaTrash } from "react-icons/fa";

const Lostnfoundcard = ({
  itemName,
  itemDescription,
  itemStatus,
  choosefile // this is the image path
}) => {
  return (
    <div className="lostnfoundcontainer">
      <div className="lostnfound">
        <div className='lostnfoundimg'>
          <img src={choosefile} alt={itemName} />
        </div>
        <div className="lostnfounddetails">
          <h3>{itemName}</h3>
          <span>Description:</span>
          <p>{itemDescription}</p>
          <p className={`lostnfoundcardstatus ${itemStatus.toLowerCase()}`}>
            {itemStatus}
          </p>
        </div>
        <button className='contactcard'>
         Contact
        </button>
      </div>
    </div>
  );
};

export default Lostnfoundcard;
