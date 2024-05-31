import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser,unfollowUser } from "../../actions/useraction";
// import { useSelectionState } from "@mantine/core/lib/components/TransferList/use-selection-state/use-selection-state";


const User=({person})=>{
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.authReducer.authdata);
    const serverpublic=process.env.REACT_APP_PUBLIC_FOLDER;
    const [following,setfollowing]=useState(person.followers.includes(user._id));
    const handlefollow=()=>{
        if(following)
        dispatch(unfollowUser(person._id,user))
        else
        dispatch(followUser(person._id,user))

        setfollowing(prev=>!prev)

    }
    return (<div className="follower">
    <div>
        <img src={person.profilepicture?serverpublic+person.profilepicture:serverpublic+"defaultprofile.png"} alt="" className='followerImage' />
        <div className="name">
            <span>{person.name}</span>
            <span>@{person.username}</span>
        </div>
    </div>
    <button className={following?'unfollowbutton':'followerbutton'} onClick={handlefollow}>
        {following?'unfollow':'follow'}
    </button>
</div>)

}
export default User;