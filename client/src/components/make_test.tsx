import axios from "axios";
import React, { useEffect, useState } from "react";

const Make_test = () =>{
    const [username, setUsername] = useState<string | null>(null);
    useEffect(()=> {
        axios.get('/api/get-username')
        .then((response)=>{
            setUsername(response.data.username);
        })
    }, []);
    return(
        <section className="test_section">
            <div className="test_div">
                세션에 저장된 이름 : {username}
            </div>
        </section>
    )
} 

export default Make_test