import usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
//get a user

export const getallusers=async (req,res)=>{
    try {
        let users = await usermodel.find();
        users = users.map((user)=>{
          const {password, ...otherDetails} = user._doc
          return otherDetails
        })
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json(error);
      }
}
 export const getuser=async (req,res)=>{
    const id=req.params.id;
    try
    {
          const user=await usermodel.findById(id);
          if(user)
          {
            const {password,...otherdetails}=user._doc;
            res.status(200).json(otherdetails)
          }
         else
         {
            res.status(404).json('no such user exists')
         }
    }
    catch(err)
    {
        res.status(500).json(err)
    }
 }

 export const updateuser=async (req,res)=>{
    const id=req.params.id;
    const {_id,currentuseradminstatus,password}=req.body;
    if(id===_id)
    {
        console.log('hello')
        try{
            if(password)
            {
                req.body.password=await bcrypt.hash(password,12);
            }
            const user=await usermodel.findByIdAndUpdate(id,req.body,{new:true});
             const token=jwt.sign({username:user.username,id:user._id},process.env.jwtkey,{expiresIn:"1h"})
                res.status(200).json({user,token});
            
        }
        
        catch(err)
    {
        res.status(500).json(err)
    }

    }
    else
    {
        res.status(403).json("access denied you can only update your own profile")
    }

 }


 export const deleteuser=async (req,res)=>{
    const id=req.params.id;
    const {currentuserid,currentuseradminstatus}=req.body;
    if(currentuseradminstatus||currentuserid===id)
    {
        try{
           await usermodel.findByIdAndDelete(id);
           res.status(200).json("deleted successfully");
        }
        catch(err)
        {
            res.status(500).json(err)
        }
    }
    else
    {
        res.status(403).json("access denied you can only delete your own profile")
    }
 }


 export const followuser=async (req,res)=>{
    const id=req.params.id;
    const {_id}=req.body;
    if(_id===id)
    {
        res.status(403).json("action forbidden");
    }
    else
    {
        try{
            const followuser=await usermodel.findById(id);
            const followinguser=await usermodel.findById(_id);
            

            if(!followuser.followers.includes(_id))
            {
             await followuser.updateOne({$push:{followers:_id}});
             await followinguser.updateOne({$push:{following:id}})
             res.status(200).json("user followed");

            }
            else
            {
                res.status(403).json("user is already followed by you");
            }
 

        }
        catch(err)
        {
            res.status(500).json(err)
        }
    }
 }



 export const unfollowuser=async (req,res)=>{
    const id=req.params.id;
    const {_id}=req.body;
    if(_id===id)
    {
        res.status(403).json("action forbidden");
    }
    else
    {
        try{
            const followuser=await usermodel.findById(id);
            const followinguser=await usermodel.findById(_id);
            

            if(followuser.followers.includes(_id))
            {
             await followuser.updateOne({$pull:{followers:_id}});
             await followinguser.updateOne({$pull:{following:id}})
             res.status(200).json("user unfollowed");

            }
            else
            {
                res.status(403).json("user is not followed by you");
            }
 

        }
        catch(err)
        {
            res.status(500).json(err)
        }
    }
 }