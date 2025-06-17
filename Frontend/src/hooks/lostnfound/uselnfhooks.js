import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"

export  const uselostnfound = ()=>{
    const [lostAndFound, setlostAndFound] = useState(null);
    const getallLostnfound = async() =>{
        try {
            const response = await axios.get(`http://localhost:4000/api/lostnfound`, { withCredentials: true });
            setlostAndFound(response.data);
            console.log(response.data);
            
        } catch (error) {
            console.error("lostnfound hook error ");
        }
    }
    useEffect(()=>{
        getallLostnfound();
    },[])

    return{getallLostnfound,lostAndFound}
}