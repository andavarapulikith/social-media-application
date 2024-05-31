import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import classes from './profilemodal.css'
import { uploadImage } from "../../actions/uploadaction";
import { updateUser } from "../../actions/useraction";
function ProfileModal({ modalOpened, setModalOpened,data }) 

{
  
  const theme = useMantineTheme();
  const {password,...other}=data;
  const [formdata,setformdata]=useState(other);
  const [profileimage,setprofileimage]=useState(null);
  const [coverimage,setcoverimage]=useState(null);
  const dispatch=useDispatch();
  const params=useParams();
  const handlechange=(ev)=>{
    setformdata({...formdata,[ev.target.name]:ev.target.value})
  }
  const onimagechange=(ev)=>{
    if(ev.target.files[0]&&ev.target.files){
      let img=ev.target.files[0];
     ev.target.name==="profileimage"?setprofileimage(img):setcoverimage(img);


  }
}
const handlesubmit=(e)=>{
  e.preventDefault();
  let userdata=formdata;
  if(profileimage)
  {
      const data=new FormData();
      const filename=Date.now()+profileimage.name;
      data.append("name",filename);
      data.append("file",profileimage);
      userdata.profilepicture=filename;
      try{
        dispatch(uploadImage(data));
      }
      catch(err)
      {
        console.log(err);
      }

  }
  if(coverimage)
  {
      const data=new FormData();
      const filename=Date.now()+coverimage.name;
      data.append("name",filename);
      data.append("file",coverimage);
      userdata.coverpicture=filename;
      try{
        dispatch(uploadImage(data));
      }
      catch(err)
      {
        console.log(err);
      }

  }
  dispatch(updateUser(params.id,userdata));
  setModalOpened(false);

}
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          

          <input
            type="text"
            className="infoInput"
            name="name"
            placeholder=" Name"
            onChange={handlechange}
            value={formdata.name}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksat"
            placeholder="Works at"
            onChange={handlechange}
            value={formdata.worksat}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="LIves in"
            onChange={handlechange}
            value={formdata.livesin}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handlechange}
            value={formdata.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            name="relationship"
            onChange={handlechange}
            value={formdata.relationship}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profileimage' onChange={onimagechange} />
            Cover Image
            <input type="file" name="coverimage" onChange={onimagechange}/>
        </div>

        <button className="button infoButton" onClick={handlesubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
