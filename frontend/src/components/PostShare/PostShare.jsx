import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { uploadImage } from "../../actions/uploadaction";
import { useDispatch } from "react-redux";
import { uploadPost } from "../../actions/uploadaction";
const PostShare = () => {
  const dispatch=useDispatch();
  const loading=useSelector((state)=>state.postReducer.uploading)
  const [image, setImage] = useState(null);
  const desc=useRef();
  const imageRef = useRef();
  const {user}=useSelector(state=>state.authReducer.authdata);
  const reset=()=>{
    setImage(null);
    desc.current.value=""
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handlesubmit=(e)=>{
    e.preventDefault();
    const newpost={
      userid:user._id,
      desc:desc.current.value

    }
    if(image)
    {
    const data=new FormData();
    const filename=Date.now()+image.name;
    data.append("name",filename);
    data.append("file",image);
    newpost.image=filename;
    console.log(newpost);
    try
    {
      dispatch(uploadImage(data));
    }
    catch(err)
    {
      console.log(err);
    }
    }
    dispatch(uploadPost(newpost));
    reset();


  }
  const serverpublic=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="PostShare">
      <img src={user.profilepicture?serverpublic+user.profilepicture:serverpublic+"defaultprofile.png"} alt="" />
      <div>
        <input type="text" placeholder="Share to the world" ref={desc} required/>
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
          onClick={()=>imageRef.current.click()}
          >
            <UilScenery />
            AttachPhoto
          </div>
          {/* <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div> */}
          <button className="postbutton" disabled={loading} onClick={handlesubmit}>{loading?'uploading':'Share post'}</button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
      {image && (

        <div className="previewImage">
          <UilTimes onClick={()=>setImage(null)}/>
          <img src={ URL.createObjectURL(image)} alt="" />
        </div>

      )}


      </div>
    </div>
  );
};

export default PostShare;
