import classes from './signup.css';
import Card from '../../UI/card'
import { useState } from 'react';
const Signup=(props)=>{


   const [username,setusername]=useState('');
   const [name,setname]=useState('');
   const [password,setpassword]=useState('');
   const [usernametouched,setusernametouched]=useState(false);
   const [nametouched,setnametouched]=useState(false);
   const [passwordtouched,setpasswordtouched]=useState(false);
   const usernameblurhandler=()=>{
    setusernametouched(true);
   }
   const nameblurhandler=()=>{
    setnametouched(true);
   }
   const passwordblurhandler=()=>{
    setpasswordtouched(true);
   }
   const usernamevalid= username.includes('@') && username.length>=6
   const namevalid=name.trim().length>0
   const passwordvalid=password.trim().length>=6;
   const usernameerror=usernametouched&&!usernamevalid;
   const passworderror=passwordtouched&&!passwordvalid;
   const nameerror=nametouched&&!nameerror

   const usernamechangehandler=(event)=>{
    setusername(event.target.value);
   }
   const namechangehandler=(event)=>{
    setname(event.target.value);
   }
   const passwordchangehandler=(event)=>{
    setpassword(event.target.value);
   }
   const isvalid=(usernamevalid &&namevalid && passwordvalid);
   

   const submithandler=(e)=>{
     e.preventDefault();
    if(isvalid)
  {
    const data={username:username,name:name,password:password}
    props.ondata(data);
    setusername('');
    setnametouched(false);
    setusernametouched(false);
    setname('');
    setpassword('');
    setpasswordtouched(false);
  }
    else
    console.log('err')

   }
  const nameclasses=nameerror?'invalid input':'input'
  const usernameclasses=usernameerror?'invalid input':'input'
  const passwordclasses=passworderror?'invalid input':'input'


    return (<div className='signup'>
    <Card>
      <h2 className='heading'>Signup</h2>
      <form onSubmit={submithandler}>
      <div className={usernameclasses}>
      <label htmlFor='username'>User Name (email)</label>
          <input type='text' placeholder='username' id='username' onBlur={usernameblurhandler} onChange={usernamechangehandler} value={username}/>
          </div>
          {/* <div className='input'>
      <label htmlFor='email'>Email</label>
          <input type='email' placeholder='email' id='email'/>
          </div> */}
          <div className={nameclasses}>
      <label htmlFor='name'>Name</label>
          <input type='text' placeholder='name' id='name' onBlur={nameblurhandler} onChange={namechangehandler} value={name}/>
          </div>
          <div className={passwordclasses}>
      <label htmlFor='password'>Password</label>
          <input type='password' placeholder='password' id='password'onBlur={passwordblurhandler} onChange={passwordchangehandler} value={password}/>
          </div>
          <div className='actions'>
              <button disabled={!isvalid}>{props.loading?'loading ...':'Signup'}</button>
              <button onClick={()=>{
                props.onlogin();
             }}>Login</button>
          </div>
      </form>
    </Card>
     
   </div>)
   }

   export default Signup;