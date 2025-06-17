// src/hooks/projectshooks/useaddprojects.js
import axios from "axios";
import { useState } from "react";

export const useaddprojects = () => {
  const [projectdata, setprojectdata] = useState(null);

  const createproject = async (project) => {
    try {
      const res = await axios.post(`http://localhost:4000/api/projects`, project, {
        withCredentials: true,
      });
      setprojectdata(res.data);
    } catch (error) {
      console.error("Error creating project:", error.message);
    }
  };

  return { createproject, projectdata };
};
