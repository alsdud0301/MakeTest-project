import React from "react";
import {useState} from "react";
import "./css/start.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Start = () => {
    const [username, setUsername] = useState<string>();
    const navigate = useNavigate();
    const namesubmit= async(event: React.FormEvent) =>{
       event.preventDefault();
       console.log(username);
       try{
        const response = await axios.post("/api/user",{
            username: username,
          
        });
        navigate('/make_test');
        console.log(response.data);

    }catch(error){
        console.error(error);
    }
       
    };

    return(
        
        <div className="form_div">
            <span className="title_p">나를 맞춰봐!</span>
            <span className="title_p2">DIY테스트</span>
            <form  onSubmit={namesubmit} className="start_form">
                <input type="text" className="name_input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="이름 입력"></input>
                <button  className="start_btn" type="submit">시작하기</button>
            </form>
        </div>
    )
}

export default Start
