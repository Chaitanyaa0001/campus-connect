import axios from "axios";
import { useEffect,useState } from "react";

export const useCarRental = () => {
    const [carrental, setcarrental] = useState(null);
    const getallcarrentals = async() =>{
        try {
             const respone = await axios.get(`http://localhost:4000/api/carrental`, {withCredentials:true});
            setcarrental(respone.data);   
        } catch (error) {
            console.error(error.message);            
        }
        
    };
    useEffect(()=>{
            getallcarrentals();
        },[])
    return {getallcarrentals,carrental}
};
