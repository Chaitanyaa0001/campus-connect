// src/hooks/carpoolhooks/useaddcarpool.js
import { useState } from "react";
import axios from "axios";

export const useAddCarpool = () => {
  const [carpoolData, setCarpoolData] = useState(null);
  const addCarpool = async (carpoolData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/carpool`,
        carpoolData,
        { withCredentials: true } 
      );
      setCarpoolData(response.data);
    } catch (error) {
      console.error("AddCarpool Error:", error.message);
    }
    addCarpool();
  };

  return { addCarpool,carpoolData };
};
