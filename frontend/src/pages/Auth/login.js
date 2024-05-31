import classes from './login.css'
import Card from "../../UI/card";
import { useState } from 'react';
const Login=(props)=>{
  const [username,setusername]=useState('');
  const [password,setpassword]=useState('');
   const [usernametouched,setusernametouched]=useState(false);
   const [passwordtouched,setpasswordtouched]=useState(false);

   const usernameblurhandler=()=>{
    setusernametouched(true);
   }
   const passwordblurhandler=()=>{
    setpasswordtouched(true);
   }
   const usernamevalid= username.includes('@') && username.length>6
   const passwordvalid=password.trim().length>=6;
   const usernameerror=usernametouched && !usernamevalid;
   const passworderror=passwordtouched&&!passwordvalid;

   const usernamechangehandler=(event)=>{
    setusername(event.target.value);
   }
   const passwordchangehandler=(event)=>{
    setpassword(event.target.value);
   }
   const isvalid=(usernamevalid && passwordvalid);
   const submithandler=(e)=>
   {
    e.preventDefault();
   if(isvalid)
   {
   console.log(username,password);
   const data={username:username,password:password}
   props.ondata(data);
   setusername('');
   setusernametouched(false);
   setpassword('');
   setpasswordtouched(false);
   }
   else
   console.log('err')

  }

 const usernameclasses=usernameerror?'invalid input':'input'
 const passwordclasses=passworderror?'invalid input':'input'
  return (<div className='login'>
   <Card>
     <h2 className='heading'>Login</h2>
     <form onSubmit={submithandler}>
     <div className={usernameclasses}>
     <label htmlFor='username'>User Name</label>
         <input type='text' placeholder='username' id='username' onChange={usernamechangehandler} onBlur={usernameblurhandler} value={username}/>
         </div>
         <div className={passwordclasses}>
     <label htmlFor='password'>Password</label>
         <input type='password' placeholder='password' id='password' onChange={passwordchangehandler} onBlur={passwordblurhandler} value={password}/>
         </div>
         <div className='actions'>
             <button disabled={!isvalid }>{props.loading?'loading ...':'Login'}</button>
             <button onClick={()=>{
                props.onlogin();
             }}>SignUp</button>
         </div>
     </form>
   </Card>
    
  </div>)
 }
 export default Login;