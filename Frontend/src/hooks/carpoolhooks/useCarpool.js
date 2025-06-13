import axios from "axios"
import { useEffect, useState } from "react";

export const useCarpool = () => {
    const [carpools, setCarpools] = useState(null);
    const getAllCarpools = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/carpool', { withCredentials:true });
                setCarpools(response.data);
            } catch (err) {
                console.error(err.message);
            } 
        }
    useEffect(() => {
        getAllCarpools();
    }, []);

    return { carpools, setCarpools, getAllCarpools }
}