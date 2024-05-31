import React, { useState } from "react";
import "./Auth.css";
import Login from "./login";
import Signup from "./signup";
import {useDispatch, useSelector} from 'react-redux'
import { LogIn } from "../../actions/authaction";
import { SignUp } from "../../actions/authaction";



 

const Auth = () => {
  
  const [login,setlogin]=useState(true);
  const dispatch =useDispatch();
  const loading=useSelector((state)=>state.authReducer.loading)
   const [data,setdata]=useState({});
   const datahandler=(tdata)=>{
          setdata(tdata);
          console.log(tdata);
          if(!login)
          dispatch(SignUp(tdata));
          else
          dispatch(LogIn(tdata))


   }
   console.log(loading);
  const loginhandler=()=>{
    setlogin((prev)=>!prev)
  }
  return (
    <div >
      {/* {loading && <p>Loading ....</p>} */}
      {login?<Login onlogin={loginhandler} ondata={datahandler} loading={loading}> </Login>:<Signup onlogin={loginhandler} ondata={datahandler} loading={loading}></Signup>}
    </div>
  );
};

export default Auth;
