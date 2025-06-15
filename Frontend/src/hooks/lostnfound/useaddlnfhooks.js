// src/hooks/lostnfound/useaddlnfhooks.js
import axios from "axios";
import { useState } from "react";

export const useAddlostnfound = () => {
  const [lostnfounddata, setLostnfounddata] = useState(null);

  const createlostnfound = async (lostnfound, imagefile) => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("itemName", lostnfound.itemName);
      formData.append("itemDescription", lostnfound.itemDescription);
      formData.append("itemStatus", lostnfound.itemStatus);

      // Append the file
      if (imagefile) {
        formData.append("choosefile", imagefile); // 🔁 Ensure matches backend field
      }

      const response = await axios.post(
        "http://localhost:4000/api/lostnfound",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setLostnfounddata(response.data);
    } catch (error) {
      console.error("Error adding lost & found item:", error.message);
    }
  };

  return { createlostnfound, lostnfounddata };
};
