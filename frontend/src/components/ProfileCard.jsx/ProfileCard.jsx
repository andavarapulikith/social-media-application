import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

const ProfileCard = ({location}) => {
  const {user}=useSelector((state)=>state.authReducer.authdata);
const serverpublic=process.env.REACT_APP_PUBLIC_FOLDER;
const posts=useSelector((state)=>state.postReducer.posts)
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={user.coverpicture?serverpublic+user.coverpicture:serverpublic+"defaultcover.webp"} style={{}} alt="" />
        <img src={user.profilepicture?serverpublic+user.profilepicture:serverpublic+"defaultprofile.png"} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user.name}</span>
        <span>{user.worksat?user.worksat:"write about yourself"}</span>
      </div>

      <div className="followStatus">
        {/* <hr /> */}
        <div className="allitems">
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location=='profilepage'&& (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post)=>post.userid==user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        {/* <hr /> */}
      </div>
      {location=='profilepage' ? "" : <span>
     <Link style={{textDecoration:"none"}} to={`/profile/${user._id}`}>My profile</Link></span>}
      
    </div>
  );
};

export default ProfileCard;
