import React from 'react';
import './Lostnfoundcard.css'
import { FaTrash} from "react-icons/fa";


const Lostnfoundcard = ({  status,itemName, itemDescription,  image }) => {
  return (
    <div className="lostnfoundcontainer">
      <div className="lostnfound" >
        <div className='lostnfoundimg'>
          <img src={image} alt={itemName} />
        </div>
        <div className="lostnfounddetails">
          <h3>{itemName}</h3>
          <span>Description:</span>
          <p>{itemDescription}</p>
          <p className={`lostnfoundcardstatus ${status.toLowerCase()}`}>{status}</p>
          </div>
        <button className='contactcard'><FaTrash size={20} color='red'/></button>
    </div>
    </div>
    
  );
};

export default Lostnfoundcard;
