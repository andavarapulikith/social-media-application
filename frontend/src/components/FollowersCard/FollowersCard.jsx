import React, { useEffect, useState } from 'react'
import './FollowersCard.css'
import User from '../user/User'
import { Followers } from '../../Data/FollowersData'
import { getAllUser } from '../../api/userrequest'
import { useSelector } from 'react-redux'
const FollowersCard = () => {
    const [persons,setpersons]=useState([]);
    const {user}=useSelector((state)=>state.authReducer.authdata);

    useEffect(()=>{
        const fetchpersons=async ()=>{
            const {data}=await getAllUser();
            console.log(data);
            setpersons(data);
        }
        fetchpersons();

    },[])
  return (
    <div className="FollowersCard">
        <h3>People you may know</h3>

        {persons. map((person, id)=>{
           
                if(person._id!==user._id)
                {
                return <User person={person} key={id}></User>
                }
            
        })}
    </div>
  )
}

export default FollowersCard