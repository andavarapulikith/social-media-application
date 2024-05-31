import React, { useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/purplelike.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'

import { likePost } from '../../api/postrequest'
const Post = ({data}) => {
  const {user}=useSelector(state=>state.authReducer.authdata);
  //  console.log(data);
  const [liked,setliked]=useState(data.likes.includes(user._id));
  // console.log(liked);
  const [likes,setlikes]=useState(data.likes.length);
  const handlelike=()=>{
    setliked((prev)=>!prev)
   likePost(data._id,user._id);
   liked?setlikes(prev=>prev-1):setlikes(prev=>prev+1)

  }
  return (
    <div className="Post">
    
        <img src={data.image? process.env.REACT_APP_PUBLIC_FOLDER+data.image:''} alt=""  />


        <div className="postReact">
            <img src={liked?Heart: NotLike} style={{width:'1.9rem',height:'1.9rem',cursor:"pointer"}} alt="" onClick={handlelike} />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>

        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post