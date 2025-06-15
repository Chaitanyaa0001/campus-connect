import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"

export  const uselostnfound = ()=>{
    const [lostAndfound, setlostAndfound] = useState(null);
    const getallLostnfound = async() =>{
        try {
            const response = await axios.get(`http://localhost:4000/api/lostnfound`, { withCredentials: true });
            setlostAndfound(response.data);
            console.log(response.data);
            
        } catch (error) {
            console.error("lostnfound hook error ");
        }
    }
    useEffect(()=>{
        getallLostnfound();
    },[])

    return{getallLostnfound,lostAndfound}
}