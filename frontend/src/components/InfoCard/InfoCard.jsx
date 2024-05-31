import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from '../../api/userrequest'
import { logout } from "../../actions/authaction";
const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileuserid = params.id;
const [profileuser, setprofileuser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authdata);

  useEffect(() => {
    const fetchprofileuser = async () => {
      if (profileuserid === user._id) {
        // console.log(user);
        setprofileuser(user);
        // console.log(profileuser);
      } else {
        const profileuser = await UserApi.getUser(profileuserid);
        // console.log(profileuser)
        setprofileuser(profileuser);
        // console.log(profileuser);
      }
    };
    fetchprofileuser();
  }, [user]);
  const handlelogout=()=>{
    dispatch(logout());
  }
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Information</h4>
        {user._id===profileuserid?( <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data={user}
          />
        </div>):''}
       
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileuser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileuser.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileuser.worksat}</span>
      </div>

      <button className="button logout-button" onClick={handlelogout}>Logout</button>
    </div>
  );
};

export default InfoCard;
