import axios from 'axios';


const API=axios.create({baseURL:"http://localhost:5000"})


export const getTimelinePosts=(id)=>{
   return API.get(`/posts/${id}/timeline`)
}
export const likePost=(id,userid)=>API.put(`/posts/${id}/like`,{userid:userid});
