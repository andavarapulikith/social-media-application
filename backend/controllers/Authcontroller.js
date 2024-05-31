import usermodel from "../models/usermodel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const registeruser=async (req,res)=>{
    const {username,password,name}=req.body;

   
    const hashedpassword=await bcrypt.hash(password,12);
    const newuser=new usermodel({username,password:hashedpassword,name});
    try
    {
        const olduser=await usermodel.findOne({username});
        if(olduser)
        return res.status(400).json("username already registered");
       const user=await newuser.save()
       const token=jwt.sign({username:user.username,id:user._id,},process.env.jwtkey,{expiresIn:'1h'})
    //    console.log(newuser);
       res.status(200).json({user,token});
    }
    catch(error)
    {
      res.status(500).json({message:error.message})  
    }

}

export const loginuser=async (req,res)=>{
    const {username,password}=req.body;
    console.log(req.body);
    try{

        const user=await usermodel.findOne({username:username});
        // console.log(user)
        if(user)
        {
           const validity=await bcrypt.compare(password,user.password)
        //    console.log(req.body);
        if(!validity)
        return res.status(400).json("wrong password");
        else
        {
            const token=jwt.sign({username:user.username,id:user._id,},process.env.jwtkey,{expiresIn:'1h'})
            res.status(200).json({user,token})
        }
        }
        else
        {
            res.status(404).json("user does not exist")
        }
    }
    catch(err)
    {
        res.status(500).json({message:error.message}) 
    }
}