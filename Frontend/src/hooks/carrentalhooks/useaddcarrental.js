import axios from "axios";
import { useEffect,useState } from "react";

export const useAddcarrental = () =>{
    const [carrentaldata, setcarrentaldata] = useState();
    const createcarrental = async (carData) =>{
        try {
            const respone = await axios.post(`http://localhost4000/api/carrental`,{});
            setcarrentaldata(respone.data)
            
        } catch (error) {
            console.error(error.message);
        }
        useEffect(()=>{
            createcarrental()
        })
    }
    return {createcarrental,carrentaldata}
}