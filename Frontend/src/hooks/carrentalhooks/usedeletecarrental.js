import axios from "axios"
import { deletecarrental } from "../../../../backend/Controllers/carrental.controller";
const BASE_URL =  import.meta.env.VITE_API_BASE_URL;


export const usedletecarrental = () =>{
    try {
        const deletecarrental = async (id) =>{

        const response = await axios.delete(`${BASE_URL}/api/carrental/${id}`,{withCredentials:true});
        return response.data;
    }
    } catch (error) {
        console.error("Carrentalo error !!" ,error.message );
    }
    return {deletecarrental}
    
}