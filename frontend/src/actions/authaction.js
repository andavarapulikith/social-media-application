
import * as authapi from '../api/authrequest'

export const LogIn=(formdata)=>async(dispatch)=>{
    dispatch({type:"AUTH_START"})
    try{
    const {data}=await authapi.LogIn(formdata);
    console.log('hello')
    console.log(formdata);
    dispatch({type:"AUTH_SUCCESS",data:data})
    }
    catch(err)
    {
      console.log(err);
      dispatch({type:"AUTH_FAIL"})
    }
}


export const SignUp=(formdata)=>async(dispatch)=>{
    dispatch({type:"AUTH_START"})
    try{
    const {data}=await authapi.SignUp(formdata);
    dispatch({type:"AUTH_SUCCESS",data:data})
    }
    catch(err)
    {
      console.log(err);
      dispatch({type:"AUTH_FAIL"})
    }
}
export const logout =()=>async (dispatch)=>{
  dispatch({type:"LOG_OUT"})
}


