import axios from "axios";
import { useState } from "react";

export const useAddcarrental = () => {
  const [carrentaldata, setCarrentaldata] = useState([]);
  

  const createcarrental = async (carrental, imagefile) => {
    try {
      const formdata = new FormData();

      for (let key in carrental) {
        formdata.append(key, carrental[key]);
      }

      if (imagefile) {
        formdata.append("Choosefile", imagefile); // 👈 change key if backend expects 'image' instead
      }

      const response = await axios.post(
        "http://localhost:4000/api/carrental",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setCarrentaldata(response.data);
    } catch (error) {
      console.error("Error adding car rental:", error.message);
      
    }
  };

  return { createcarrental, carrentaldata  };
};
