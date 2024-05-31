import axios from 'axios';


const API=axios.create({baseURL:"http://localhost:5000"})


 export const  LogIn=(formdata)=>API.post('/auth/login',formdata)
 export const  SignUp=(formdata)=>API.post('/auth/register',formdata)