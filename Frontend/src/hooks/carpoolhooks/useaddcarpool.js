import { useState } from "react";
import axios from "axios";

export const useAddCarpool = () => {
  const [carpoolData, setCarpoolData] = useState(null);

  const addCarpool = async (carpoolInfo) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/carpool`,
        carpoolInfo,
        { withCredentials: true } 
      );
      setCarpoolData(response.data);
    } catch (error) {
      console.error("AddCarpool Error:", error);
    }
  };

  return { addCarpool, carpoolData };
};
