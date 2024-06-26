import React, { useEffect } from 'react'
import './Posts.css'

import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../../actions/postAction'
import { useParams } from 'react-router-dom'
const Posts = () => {
  const params=useParams();
  const dispatch=useDispatch();
  const {user}=useSelector(state=>state.authReducer.authdata);
let {posts,loading}=useSelector(state=>state.postReducer);
  useEffect(()=>{
  dispatch(getTimelinePosts(user._id));
  // console.log(loading);
},[user])
if(!posts)
return "no posts";
if(params.id)
 posts=posts.filter((post)=>post.userid===params.id);

  return (
    <div className="Posts">
    {/* {posts.length==0 && <p>no posts available</p>} */}
        {loading?'loading..':posts.map((post, id)=>{
            return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default Posts