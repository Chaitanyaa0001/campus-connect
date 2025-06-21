import React from 'react';
import { FaTrash, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { MdLocationOn, MdAirlineSeatReclineNormal } from 'react-icons/md';
import './carpoolcard.css';
import { usedeletecarpool } from '../../hooks/carpoolhooks/usedeletecarpool';
import { toast } from 'react-toastify';
import { useUserResources } from '../../hooks/user/useUserresources';

const Carpoolcard = ({ id, from, to, time, seatsAvailable, pricePerSeat, onDeleteLocal }) => {
  const { deletecarpool } = usedeletecarpool();
  const { refetchResources } = useUserResources();

  const deletehandler = async () => {
    // 👇 Instantly remove card from UI
    if (onDeleteLocal) onDeleteLocal();

    const res = await deletecarpool(id);
    if (res?.message === "Carpool deleted successfully") {
      toast.success("Carpool deleted");
      await refetchResources(); // Optional backend sync
    } else {
      toast.error("Failed to delete carpool");
    }
  };

  return (
    <div className="carpoolcontainer">
      <div className="carpoolcard">
        <div className="location">
          <h2>{from ?? 'From'} to {to ?? 'To'}</h2>
        </div>
        <div className="CP-details">
          <p><FaClock /> {time ?? 'N/A'}</p>
          <p><MdAirlineSeatReclineNormal /> {seatsAvailable ?? 0} seats available</p>
          <p><FaMapMarkerAlt /> {from ?? 'From'}</p>
          <p><MdLocationOn /> {to ?? 'To'}</p>
        </div>
        <div className="CP-bookings">
          <h3>₹{pricePerSeat ?? 0} per seat</h3>
          <button onClick={deletehandler}>
            <FaTrash size={20} color="red" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carpoolcard;
