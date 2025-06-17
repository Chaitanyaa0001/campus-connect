// src/hooks/projectshooks/useprojectshooks.js
import axios from "axios";
import { useEffect, useState } from "react";

export const useprojects = () => {
  const [projects, setprojects] = useState(null);

  const getallprojects = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/projects`, {
        withCredentials: true,
      });
      setprojects(res.data.projects); // because your backend returns { projects: [...] }
    } catch (error) {
      console.error("API fetching error in projects", error);
    }
  };

  useEffect(() => {
    getallprojects();
  }, []); // Runs once on component mount

  return { projects, setprojects, getallprojects };
};
