import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usedeletecarpool = () => {
  const deletecarpool = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/carpool/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Carpool delete error!!", error.message);
      return { message: "error" };
    }
  };

  return { deletecarpool };
};
